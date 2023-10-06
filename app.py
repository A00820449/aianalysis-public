from flask import Flask, json, request, jsonify
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_samples
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from statsmodels.tsa.stattools import acf
import numpy as np
import os
from werkzeug.utils import secure_filename
import csv
import pandas as pd

app = Flask(__name__, static_folder="frontend/build", static_url_path="")
cors = CORS(app)

data_type = {}
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = set(["csv"])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# @app.route('/api', methods=["GET"])
# @cross_origin()
# def index():
#     return {
#         "setup": "Flask React Heroku"
#     }

@app.route('/', methods=['GET'])
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/api/v1/upload', methods=["POST"])
@cross_origin()
def upload_file():
    if 'files[]' not in request.files:
        resp = jsonify({'message': 'No file part in the request'})
        resp.status_code = 400
        return resp
    
    files = request.files.getlist('files[]')

    errors = {}
    success = False

    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            success = True
        else:
            errors[file.filename] = 'File type is not allowed'
    
    if success and errors:
        errors['message'] = 'File(s) successfully uploaded'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp

    if success:
        resp = jsonify({'message':'File(s) successfully uploaded'})
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp

@app.route('/api/v1/cleanData', methods=["GET"])
@cross_origin()
def clean_data():
    # Get the operation parameter from the request
    operation = request.args.get('operation')

    # Define a function to clean the data based on the specified method
    def clean_file(file_path, method):
        try:
            # Load the CSV file into a DataFrame
            df = pd.read_csv(file_path)

            original_rows = len(df)  # Get the original number of rows

            if method == 'remove_missing':
                # Remove rows with missing values in any column
                df.dropna(inplace=True)
                rows_changed = original_rows - len(df)  # Calculate rows dropped
            elif method == 'replace_missing_with_mean':
                # Create a copy of the DataFrame for comparison
                original_df = df.copy()

                # Replace missing values with column means
                df.fillna(df.mean(), inplace=True)

                # Count the rows where values were updated
                rows_changed = (original_df != df).any(axis=1).sum()

            elif method == 'eliminate_outliers' :
                    # Eliminar outliers usando el rango intercuartílico (IQR)
                for column in df.select_dtypes(include=['number']).columns:
                    Q1 = df[column].quantile(0.25)
                    Q3 = df[column].quantile(0.75)
                    IQR = Q3 - Q1
                    
                    lower_bound = Q1 - 1.5 * IQR
                    upper_bound = Q3 + 1.5 * IQR
                    
                    # Eliminar filas que contienen outliers
                    df = df[(df[column] >= lower_bound) & (df[column] <= upper_bound)]
                
                rows_changed = original_rows - len(df)  # Calcular filas eliminadas
            
            else:
                raise ValueError("Invalid cleaning method")

            # Save the cleaned DataFrame back to the same file
            df.to_csv(file_path, index=False)

            return rows_changed  # Return the number of rows changed
        except Exception as e:
            return str(e)

    # Get the path to the upload folder
    upload_folder = app.config['UPLOAD_FOLDER']

    # Define the cleaning method ('remove_missing' or 'replace_missing_with_mean')
    cleaning_method = 'remove_missing'  # Change this to the desired method

    if operation == 'clean':
        cleaning_method = 'remove_missing'
    elif operation == 'patch':
        cleaning_method = 'replace_missing_with_mean'
    elif operation == 'Eliminate outliers' :
        cleaning_method == 'eliminate_outliers'

    # Track the total number of rows changed across all files
    total_rows_changed = 0

    # Iterate through the files in the upload folder
    for filename in os.listdir(upload_folder):
        file_path = os.path.join(upload_folder, filename)
        if os.path.isfile(file_path) and file_path.endswith('.csv'):
            # Call the clean_file function to clean the file using the specified method
            rows_changed = clean_file(file_path, cleaning_method)
            total_rows_changed += rows_changed

    # Create the response message
    response_message = f'Total rows changed: {total_rows_changed} ({operation})'

    # Print the response message to the console
    print(response_message)

    # Return a response indicating the total number of rows changed and the operation performed
    resp = jsonify({'message': response_message})
    resp.status_code = 200
    return resp

@app.route('/api/v1/analize', methods=['GET'])
@cross_origin()
def analize_data():
    pass

@app.route('/api/v1/visualize', methods=['GET'])
@cross_origin()
def visualize_data():
    filename = 'parabola_data.csv'
    file = f"./static/uploads/{filename}"
    data = []

    try:
        with open(file, 'r') as f:
            csv_reader = csv.DictReader(f)
            for row in csv_reader:
                data.append(row)
    except:
        return jsonify({"error": "CSV file not found"})
    
    return jsonify(data)


@app.route('/api/v1/statistics', methods=['GET'])
@cross_origin()
def get_statistics():
    global data_type
    all_stats = {}

    for filename in os.listdir(app.config['UPLOAD_FOLDER']):
        if filename.endswith('.csv'):
            determine_data_type(filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            try:
                df = pd.read_csv(file_path)
                file_type = data_type.get(filename, "Unknown")
                stats_json = df.describe(include='all').transpose().to_json(orient="index")

                if file_type == "Linear Model":
                    all_stats[filename] = json.loads(stats_json)

                elif file_type == "Cluster":
                    kmeans = KMeans(n_clusters=2)
                    kmeans.fit(df)
                    clusters, counts = np.unique(kmeans.labels_, return_counts=True)
                    cluster_data = {
                        f"Cluster {cluster+1}": {
                            "Count": int(count),
                            "Centroid": [round(float(val), 2) for val in kmeans.cluster_centers_[cluster]]
                        }
                        for cluster, count in zip(clusters, counts)
                    }
                    all_stats[filename] = cluster_data

                elif file_type == "Parabola":
                    stats = json.loads(stats_json)
                    X = df.iloc[:, :-1].values
                    y = df.iloc[:, -1].values
                    poly_reg = PolynomialFeatures(degree=2)
                    X_poly = poly_reg.fit_transform(X)
                    pol_reg = LinearRegression()
                    pol_reg.fit(X_poly, y)
                    a = pol_reg.coef_[2]
                    b = pol_reg.coef_[1]
                    c = pol_reg.intercept_
                    
                    vertex_x = -b / (2 * a)
                    vertex_y = c - (b**2 / (4*a))
                    
                    stats["Vertex"] = {"x": vertex_x, "y": vertex_y}
                    all_stats[filename] = stats
                    
                    return jsonify(all_stats)
                elif file_type == "Time Series":
                    all_stats[filename] = json.loads(stats_json)

                else:
                    response_message = f'Unknown data type {file_type})'
                    return jsonify({"error": response_message}), 400

            except FileNotFoundError:
                return jsonify({"error": f"{filename} not found"}), 404
            except Exception as e:
                print(e)
                return jsonify({"error": str(e)}), 500

    return jsonify(all_stats)

    
def determine_data_type(filename):
    global data_type
    file_path = f"./static/uploads/{filename}"
        
    if not os.path.exists(file_path):
        data_type[filename]= "Unknown"
        return

    data = pd.read_csv(file_path)
    X = data.iloc[:, :-1]
    y = data.iloc[:, -1]

    # Linear Regression Check
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    lin_reg = LinearRegression()
    lin_reg.fit(X_train, y_train)
    predictions = lin_reg.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    normalized_mse = mse / (y_test.max() - y_test.min())

    if normalized_mse < 0.1:
        data_type[filename] = "Linear Model"
        return

    # Parabola Check
    polynomial = make_pipeline(PolynomialFeatures(2), LinearRegression())
    polynomial.fit(X_train, y_train)
    poly_mse = mean_squared_error(y_test, polynomial.predict(X_test))

    if poly_mse < 0.5:
        data_type[filename] = "Parabola"
        return

    # Cluster Check
    kmeans = KMeans(n_clusters=2)
    kmeans.fit(X)
    silhouette_score = np.mean(silhouette_samples(X, kmeans.labels_))
    if silhouette_score > 0.3:
        data_type[filename] = "Cluster"
        return

    # Time Series Check
    try:
        X.iloc[:, 0] = pd.to_datetime(X.iloc[:, 0])  # Convert the first column to datetime
        autocorrelation = acf(y, nlags=40, fft=True)
        if autocorrelation[1] > 0.5:
            data_type[filename] = "Time Series"
            return
    except Exception as e:
        print(f"Error in Time Series check: {e}")
    
    data_type[filename] = "Unknown"
    


@app.route('/<path>', methods=['GET'])
@cross_origin()
def serve_index_html(path):
    return send_from_directory(app.static_folder, "index.html")

def start():
    app.run()

if __name__ == "__main__":
    start()

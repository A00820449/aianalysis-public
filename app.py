from flask import Flask, json, request, jsonify
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_samples
from sklearn.preprocessing import PolynomialFeatures, MinMaxScaler, StandardScaler
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
UPLOAD_FOLDER = "static/uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = set(["csv"])


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/", methods=["GET"])
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, "index.html")


def file_exists(filename):
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    return os.path.exists(file_path)


@app.route("/api/v1/upload", methods=["POST"])
@cross_origin()
def upload_file():
    if "file" not in request.files:
        resp = jsonify({"message": "No file part in the request"})
        resp.status_code = 400
        return resp

    file = request.files["file"]

    errors = {}
    success = False

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        if file_exists(filename):
            errors[file.filename] = "File already exists"
        else:
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
            success = True
    else:
        errors[file.filename] = "File type is not allowed"

    if success and errors:
        errors["message"] = "File successfully uploaded"
        resp = jsonify(errors)
        resp.status_code = 500
        return resp

    if success:
        resp = jsonify({"message": "File successfully uploaded"})
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp


@app.route("/api/v1/analyze", methods=["GET"])
@cross_origin()
def clean_data():
    operation = request.args.get("operation")
    FileName = request.args.get("filename")

    def clean_file(file_path, method):
        try:
            df = pd.read_csv(file_path)

            original_rows = len(df)  

            if method == "clean":
                df.dropna(inplace=True)
                rows_changed = original_rows - len(df)  
            elif method == "patch":
                original_df = df.copy()
                df.fillna(df.mean(), inplace=True)
                rows_changed = (original_df != df).any(axis=1).sum()
            elif method == "outliers":
                Q1 = df.quantile(0.25)
                Q3 = df.quantile(0.75)
                IQR = Q3 - Q1

                lower_bound = Q1 - 1.5 * IQR
                upper_bound = Q3 + 1.5 * IQR

                df = df[~((df < lower_bound) | (df > upper_bound)).any(axis=1)]

                rows_changed = original_rows - len(df) 
            elif method == "scale":
                # Scale the data to be between 0 and 1
                scaler = MinMaxScaler()
                df[df.columns] = scaler.fit_transform(df)
                rows_changed = original_rows
            elif method == "normalize":
                # Normalize the data to be between -1 and 1
                scaler = StandardScaler()
                df[df.columns] = scaler.fit_transform(df)
                rows_changed = original_rows
            elif method == "standardize":
                # Standardize the data to have a mean of 0 and standard deviation of 1
                scaler = StandardScaler()
                df[df.columns] = scaler.fit_transform(df)
                rows_changed = original_rows
            elif method == "pca":
                from sklearn.decomposition import PCA
                # Retain enough components to explain 95% of the variance
                pca = PCA(0.95)
                transformed_data = pca.fit_transform(df)
                # Convert the transformed data back to a dataframe
                df = pd.DataFrame(transformed_data, columns=[f'PC{i+1}' for i in range(transformed_data.shape[1])])
                rows_changed = original_rows
                
            elif method == "bin":
                # Binning the 'x' column
                df['x_binned'] = pd.cut(df['x'], bins=10, labels=False)
                            
                # Binning the 'y' column
                df['y_binned'] = pd.cut(df['y'], bins=10, labels=False)
                            
                rows_changed = original_rows
                
            elif method == "discretize":
                # Binning the 'x' column into equal frequency bins
                df['x_binned'] = pd.qcut(df['x'], q=10, labels=False)
                            
                # Binning the 'y' column into equal frequency bins
                df['y_binned'] = pd.qcut(df['y'], q=10, labels=False)
                            
                rows_changed = original_rows
            else:
                raise ValueError("Invalid cleaning method")

            df.to_csv(file_path, index=False)

            return rows_changed
        except Exception as e:
            return str(e)

    upload_folder = app.config["UPLOAD_FOLDER"]

    total_rows_changed = 0

    for filename in os.listdir(upload_folder):
        if filename == FileName:  
            file_path = os.path.join(upload_folder, filename)
            if os.path.isfile(file_path) and file_path.endswith(".csv"):
                rows_changed = clean_file(file_path, operation)
                total_rows_changed += rows_changed


    response_message = f"Total rows changed: {total_rows_changed} ({operation} in {FileName})"
    print(response_message)

    resp = jsonify({"message": response_message})
    resp.status_code = 200
    return resp


@app.route("/api/v1/visualize", methods=["GET"])
@cross_origin()
def visualize_data():
    filename = request.args.get("filename", "")
    file = f"./static/uploads/{filename}"
    data = []

    try:
        with open(file, "r") as f:
            csv_reader = csv.DictReader(f)
            for row in csv_reader:
                data.append(row)
    except:
        return jsonify({"error": "CSV file not found"})

    return jsonify(data)


@app.route("/api/v1/statistics", methods=["GET"])
@cross_origin()
def get_statistics():
    global data_type
    output = {}

    filename = request.args.get("filename", None)
    
    if filename is None:
        return jsonify({"error": "filename missing"}), 404
    
    if filename.endswith(".csv"):
        determine_data_type(filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        try:
            df = pd.read_csv(file_path)
            file_type = data_type.get(filename, "Unknown")
            stats_json = (
                df.describe(include="all").transpose().to_json(orient="index")
            )

            if file_type == "Linear Model":
                output = json.loads(stats_json)

            elif file_type == "Cluster":
                kmeans = KMeans(n_clusters=2)
                kmeans.fit(df)
                clusters, counts = np.unique(kmeans.labels_, return_counts=True)
                cluster_data = {
                    f"Cluster {cluster+1}": {
                        "Count": int(count),
                        "Centroid": [
                            round(float(val), 2)
                            for val in kmeans.cluster_centers_[cluster]
                        ],
                    }
                    for cluster, count in zip(clusters, counts)
                }
                output = cluster_data

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
                vertex_y = c - (b**2 / (4 * a))

                stats["Vertex"] = {"x": vertex_x, "y": vertex_y}
                output = stats

                return jsonify(output)
            elif file_type == "Time Series":
                output = json.loads(stats_json)

            else:
                response_message = f"Unknown data type {file_type})"
                return jsonify({"error": response_message}), 400

        except FileNotFoundError:
            return jsonify({"error": f"{filename} not found"}), 404
        except Exception as e:
            print(e)
            return jsonify({"error": str(e)}), 500

    return jsonify(output)


def determine_data_type(filename):
    global data_type
    file_path = f"./static/uploads/{filename}"

    if not os.path.exists(file_path):
        data_type[filename] = "Unknown"
        return

    data = pd.read_csv(file_path)
    X = data.iloc[:, :-1]
    y = data.iloc[:, -1]

    # Linear Regression Check
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
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
        X.iloc[:, 0] = pd.to_datetime(
            X.iloc[:, 0]
        )  # Convert the first column to datetime
        autocorrelation = acf(y, nlags=40, fft=True)
        if autocorrelation[1] > 0.5:
            data_type[filename] = "Time Series"
            return
    except Exception as e:
        print(f"Error in Time Series check: {e}")

    data_type[filename] = "Unknown"


@app.route("/<path>", methods=["GET"])
@cross_origin()
def serve_index_html(path):
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/v1/files", methods=["GET"])
@cross_origin()
def fetch_files():
    files = []
    for file_name in [f for f in os.listdir(UPLOAD_FOLDER) if not f.startswith(".")]:
        file_path = os.path.join(UPLOAD_FOLDER, file_name)

        if os.path.isfile(file_path):
            file_size = os.path.getsize(file_path)
            file_info = {"file_name": file_name, "file_size": file_size}
            files.append(file_info)
    resp = jsonify(files)
    return resp


@app.route("/api/v1/delete/<filename>", methods=["DELETE"])
@cross_origin()
def delete_file(filename):
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify(message="File deleted successfully"), 200
    else:
        return jsonify(error="File not found"), 404


def start():
    app.run()


if __name__ == "__main__":
    start()

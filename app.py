from flask import Flask, json, request, jsonify
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
import os
from werkzeug.utils import secure_filename
import csv
import pandas as pd

app = Flask(__name__, static_folder="frontend/build", static_url_path="")
cors = CORS(app)

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
    filename = 'clustering_data.csv'
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
    filename = 'clustering_data.csv'
    file_path = f"./static/uploads/{filename}"

    try:
        df = pd.read_csv(file_path)
        desc = df.describe(include='all').transpose()
        stats_json = desc.to_json(orient="index")

        return stats_json, 200
    except FileNotFoundError:
        return jsonify({"error": "CSV file not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/<path>', methods=['GET'])
@cross_origin()
def serve_index_html(path):
    return send_from_directory(app.static_folder, "index.html")

def start():
    app.run()

if __name__ == "__main__":
    start()

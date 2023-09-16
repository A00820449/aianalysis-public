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

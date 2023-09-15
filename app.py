from flask import Flask, json, request, jsonify
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
import os
from werkzeug.utils import secure_filename

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

# @app.route('/')
# @cross_origin()
# def serve():
#     return send_from_directory(app.static_folder, "index.html")

@app.route('/ap1/v1/upload', methods=["POST"])
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

if __name__ == "__main__":
    app.run()

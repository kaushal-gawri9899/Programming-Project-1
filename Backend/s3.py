from flask import Flask, render_template, redirect, url_for, request, jsonify, session, Blueprint
import boto3
from werkzeug.utils import secure_filename

s3_client = boto3.client('s3', region_name='us-east-1')

BUCKET_NAME='programming-project-resume'

s3Route = Blueprint('s3Route', __name__)



@s3Route.route('/upload', methods=['GET','POST'])
def upload_file():
    if request.method == 'POST':
        img = request.files['file']
        if img:
                filename = secure_filename(img.filename)
                img.save(filename)
                s3_client.upload_file(
                    Bucket = BUCKET_NAME,
                    Filename=filename,
                    Key = filename
                )
                msg = "Upload Done ! "
        # raw = parser.from_file(filename )
        # print(raw['content'])

    return render_template("uploadFile.html",msg =msg)

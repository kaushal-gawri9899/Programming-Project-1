import os
from flask import Flask, render_template, redirect, url_for, request, jsonify, session, Blueprint
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
import requests
import os
import botocore
import requests
from werkzeug.utils import secure_filename
from tika import parser
from pyresparser import ResumeParser

s3_client = boto3.client('s3', region_name='us-east-1')

BUCKET_NAME='programming-project-resume'

s3Route = Blueprint('s3Route', __name__)

UPLOAD_FOLDER = ''
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

dynamodb_client = boto3.client('dynamodb', region_name = "us-east-1")

APP_CLIENT_ID = "1rfl5n6j4su0mgmgkfh43fqbov"

cognito_client = boto3.client('cognito-idp', region_name='us-east-1')

BUCKET_NAME='programming-project-resume'

cognitoRoute = Blueprint('cognitoRoute', __name__)

@cognitoRoute.route('/auth/signup', methods=['GET'])
def create_account():
    return render_template("login.html")

@cognitoRoute.route('/', methods=['GET'])
def login_page():
    return render_template("uploadFile.html")

@cognitoRoute.route('/home', methods=['GET'])
def home():
    return render_template("home.html")

@cognitoRoute.route('/auth/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        data = request.get_json()
        user_email = data['email']
        user_password = data['password']
        user_name = data['username']
        usertype = data['usertype']
        
        try:
            cognito_client.sign_up(ClientId=APP_CLIENT_ID,
                            Username=user_email,
                            Password=user_password,
                            UserAttributes=[{'Name': 'name', 'Value': user_name}])
            
        except ClientError as e:
            if e.response['Error']['Code'] == 'UsernameExistsException':
                
                print("User already exists")
                return redirect(url_for('cognitoRoute.create_account'))
            if e.response['Error']['Code'] == 'ParamValidationError':
                
                print("Param Validate Error")
                return redirect(url_for('cognitoRoute.create_account'))
            print(e)


        r = requests.post('https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/add_usertype',
            json= {"email":user_email,"usertype":usertype})

        return redirect(url_for('cognitoRoute.login'))


    return redirect(url_for('cognitoRoute.create_account'))


@cognitoRoute.route('/auth/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        user_email = data['email']
        password = data['password']
        
        dynamodb = boto3.resource('dynamodb',  region_name='us-east-1')


        response = None
        session['idToken'] = None 

        try:
            response =  cognito_client.initiate_auth(ClientId=APP_CLIENT_ID,
                                        AuthFlow='USER_PASSWORD_AUTH',
                                        AuthParameters={
                                        'USERNAME': user_email,
                                        'PASSWORD': password
                                        }
            )
            
            session['idToken'] = response['AuthenticationResult']['IdToken']
           

        except ClientError as e:
            if e.response['Error']['Code'] == 'UserNotFoundException':
                print("Can't Find user by Email")
                return render_template("login.html", error = "Can't find user by email")
            if e.response['Error']['Code'] == 'ParamValidationError':
                print("Param Validate Error")
                return render_template("login.html", error = "Param Validate Error")

            if e.response['Error']['Code'] == 'NotAuthorizedException':
                print("Not Valid")
                return render_template("login.html", error = "Wrong Email or Password")
        

        r = requests.get("https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/get_user", 
        headers={"Authorization": session['idToken']})       
        
        usertype = r.json()['Items'][0]['usertype']
        return jsonify(usertype)        
        
    return redirect(url_for('cognitoRoute.login_page'))


@cognitoRoute.route('/upload', methods=['GET','POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'resume_saved')
    
    if not os.path.isdir(target):
        os.mkdir(target)
    
    file = request.files['file']
    
    if file: 
        filename = secure_filename(file.filename)
        destination="/".join([target, filename])
        file.save(destination)
        session['uploadFilePath']=destination
        uploaded_file_name = 'resume_saved/' + filename
        
        s3_client.upload_file(
                    Bucket = BUCKET_NAME,
                    Filename = uploaded_file_name,
                    Key = filename
                )
        
    response = " "
    return response

from warnings import simplefilter 
simplefilter(action='ignore', category=DeprecationWarning)
from flask import Flask, redirect, url_for, request, jsonify, session, Blueprint, jsonify
import boto3
from botocore.exceptions import ClientError
import requests
import requests
import json




BUCKET_NAME='programming-project-resume'



UPLOAD_FOLDER = ''
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

dynamodb_client = boto3.client('dynamodb', region_name = "us-east-1")

APP_CLIENT_ID = "1rfl5n6j4su0mgmgkfh43fqbov"

cognito_client = boto3.client('cognito-idp', region_name='us-east-1')

BUCKET_NAME='programming-project-resume'



cognitoRoute = Blueprint('cognitoRoute', __name__)



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

        return 'redirect(url_for(''))'


    return 'a'


@cognitoRoute.route('/auth/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        global header
        global stored_email
        data = request.get_json()
        print(data)
        user_email = data['email']
        password = data['password']
        stored_email = user_email
        id_token = ''

        try:
            response =  cognito_client.initiate_auth(ClientId=APP_CLIENT_ID,
                                        AuthFlow='USER_PASSWORD_AUTH',
                                        AuthParameters={
                                        'USERNAME': user_email,
                                        'PASSWORD': password
                                        }
            )
            id_token = response['AuthenticationResult']['IdToken']
            header = response['AuthenticationResult']['IdToken']

        except ClientError as e:

            if e.response['Error']['Code'] == 'UserNotFoundException':
                print("Can't Find user by Email")
                return 403
            
            if e.response['Error']['Code'] == 'ParamValidationError':
                print("Param Validate Error")
                return 403

            if e.response['Error']['Code'] == 'NotAuthorizedException':
                print("Not Valid")
                return 403
        
        r = requests.get("https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/get_user", 
        headers={"Authorization": id_token })       
        
        usertype = r.json().get('Items', [])[0]['usertype']
        return jsonify({ 'userType': usertype, 'idToken': id_token})        
        
    return 'a'


@cognitoRoute.route('/Userprofile', methods=['GET','POST'])
def user_profile():
    headers = request.headers.get('Authorization')
    r = requests.get("https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/get_user", 
        headers={"Authorization": headers })       
    print(r.json())
    email = r.json().get('Items', [])[0]['email']
    userType = r.json().get('Items', [])[0]['usertype']
    
    number_of_elements = int(r.json()['Count'])
    print(number_of_elements)
    
    updatedJson  = {"email": email, "usertype": userType}

    finalJson = json.dumps(updatedJson)
    return finalJson

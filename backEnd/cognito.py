import os
from flask import Flask, render_template, redirect, url_for, request, jsonify, session, Blueprint
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
import requests
import os
import botocore
import requests
import uuid

dynamodb_client = boto3.client('dynamodb', region_name = "us-east-1")

APP_CLIENT_ID = "1rfl5n6j4su0mgmgkfh43fqbov"

cognito_client = boto3.client('cognito-idp', region_name='us-east-1')


cognitoRoute = Blueprint('cognitoRoute', __name__)

@cognitoRoute.route('/auth/signup', methods=['GET'])
def create_account():
    return render_template("login.html")

@cognitoRoute.route('/', methods=['GET'])
def login_page():
    return render_template("login.html")

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


@cognitoRoute.route('/create', methods=['GET','POST'])
def getPosting():
    if request.method == 'POST':
        data = request.get_json()
        jobTitle = data['jobTitle']
        jobDescription = data['jobDescription']
        location = data['location']
        jobType = data['jobType']
        workExperince = data['workExperince']
        Id = uuid.uuid4()
        email = "test@test.com"

        
        if jobType == 'a':
            jobType = 'partTime'
        else:
            jobType = 'fullTime'

        print(jobType)
        print("here")
        r = requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/create_job',
            json= {"Id":str(Id),"jobTitle":jobTitle,"jobDescription":jobDescription,"location":location,"jobType":jobType,
            "workExperince":workExperince,"email":email})
        print(r.json)

    

     
    print(request.get_json())
    print(request.get_json()['location'])

    return "a"

@cognitoRoute.route('/jobs', methods=['GET','POST'])
def getJobs():
    r = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/jobs')
    print(r.json()['Items'])
    # print(number_of_elements)
    # dynamodb = boto3.resource('dynamodb',  region_name='us-east-1')

    
    # table = dynamodb.Table('Job_posting')
    # response = table.query(
    #     KeyConditionExpression=Key('email').eq("test@test.com")
    # )
    # print(response['Items'])
    data = r.json()
    print(data)
    return data


import os
from flask import Flask, render_template, redirect, url_for, request, jsonify, session, Blueprint, jsonify
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
import requests
import os
import botocore
import requests
from werkzeug.utils import secure_filename
from tika import parser

# import numpy
from pyresparser import ResumeParser
from gensim.summarization.summarizer import summarize
from gensim.summarization import keywords# Import the library
from pdfminer.high_level import extract_text
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import docx2txt
import uuid


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

global stored_email


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
        # global stored_email
        data = request.get_json()
        print(data)
        user_email = data['email']
        password = data['password']
        # return jsonify({ "userType": "Employer", "idToken": ""})
        # stored_email = user_email
        
       


        id_token = ''
        # session['idToken'] = ' ' 

        try:
            response =  cognito_client.initiate_auth(ClientId=APP_CLIENT_ID,
                                        AuthFlow='USER_PASSWORD_AUTH',
                                        AuthParameters={
                                        'USERNAME': user_email,
                                        'PASSWORD': password
                                        }
            )
            # print(response['AuthenticationResult'])
            id_token = response['AuthenticationResult']['IdToken']
            # session['idToken'] = response['AuthenticationResult']['IdToken']
           

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
        
        # print(session['idToken'])
        r = requests.get("https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/get_user", 
        headers={"Authorization": id_token })       
        
        usertype = r.json().get('Items', [])[0]['usertype']
        return jsonify({ 'userType': usertype, 'idToken': id_token})        
        
    return 'a'


@cognitoRoute.route('/upload', methods=['GET','POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'resume_saved')
    
    

    if not os.path.isdir(target):
        os.mkdir(target)
    
    file = request.files['file']
    
    if file: 
        filename = secure_filename(stored_email)
        destination="/".join([target, filename])
        file.save(destination)
        # session['uploadFilePath']=destination
        uploaded_file_name = 'resume_saved/' + filename
        
        s3_client.upload_file(
                    Bucket = BUCKET_NAME,
                    Filename = uploaded_file_name,
                    Key = filename
                )

    
    data = ResumeParser(uploaded_file_name).get_extracted_data()
    name = data['name']
    experience = data['experience']
    
    r = requests.post("https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/resume", 
        json= {"email":stored_email,"experience":str(experience),"name":str(name)}) 
    
    # print(data['name'])
    
        
    response = " "
    return response

@cognitoRoute.route('/match', methods=['GET','POST'])
def job_match():

    resume = extract_text(stored_email)
    text_resume = str(resume)#Summarize the text with ratio 0.1 (10% of the total words.)
    summarized_resume = summarize(text_resume, ratio=0.5)
    # print(summarized_resume)

    text = "Given Text" # Prompt for the Job description.
    # Convert text to string format
    text = str(text)#Summarize the text with ratio 0.1 (10% of the total words.)
    summarize(text, ratio=0.5) 

    text_list = [text_resume, text]

    cv = CountVectorizer()
    count_matrix = cv.fit_transform(text_list)

    matchPercentage = cosine_similarity(count_matrix)[0][1] * 100
    matchPercentage = round(matchPercentage, 2) # round to two decimal
    # print("Your resume matches about “+ str(matchPercentage)+ “% of the job description.")

    return " "

@cognitoRoute.route('/create', methods=['GET','POST'])
def getPosting():
    if request.method == 'POST':
        data = request.get_json()
        jobTitle = data['jobTitle']
        jobDescription = data['jobDescription']
        location = data['location']
        jobType = data['jobType']
        workExperince = data['workExperince']
        sessionId = data['sessionId']
        print(sessionId)
        Id = uuid.uuid4()
        # email = "test@test.com"


        
        if jobType == 'a':
            jobType = 'partTime'
        else:
            jobType = 'fullTime'

        # print(jobType)
        # print("here")
        r = requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/create_job',
            headers={"Authorization": sessionId},
            json= {"Id":str(Id),"jobTitle":jobTitle,"jobDescription":jobDescription,"location":location,"jobType":jobType,
            "workExperince":workExperince})
        # print(r.json)


    

     
    print(r.json())
    # print(request.get_json()['location'])

    return "a"

@cognitoRoute.route('/jobs', methods=['GET','POST'])
def getJobs():
    print('ss')
    # print(request.get_json())
    headers = request.headers.get('Authorization')
    print(request.headers.get('Authorization'))
    print(request.headers)
   
    r = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/jobs',
    headers={"Authorization": headers}
    )
    # 
    # print(r.json()['Items'])
    # print(number_of_elements)
    # dynamodb = boto3.resource('dynamodb',  region_name='us-east-1')

    
    # table = dynamodb.Table('Job_posting')
    # response = table.query(
    #     KeyConditionExpression=Key('email').eq("test@test.com")
    # )
    # print(response['Items'])
    data = r.json()
    print("HEYYYYYYYY")
    # print(session['test'])
    # print(data)
    
    return data

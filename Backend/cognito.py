from warnings import simplefilter 
simplefilter(action='ignore', category=DeprecationWarning)
import os
from flask import Flask, render_template, redirect, url_for, request, jsonify, session, Blueprint, jsonify
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
import requests
import os
import botocore
import requests
from werkzeug.utils import secure_filename
from tika import parser
import json

# from pyresparser import ResumeParser
# from gensim.summarization.summarizer import summarize
# from gensim.summarization import keywords# Import the library
# from pdfminer.high_level import extract_text
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
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
global header


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
        # return jsonify({ "userType": "Employer", "idToken": ""})
        stored_email = user_email
        
       


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
            header = response['AuthenticationResult']['IdToken']

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
def postPosting():
    if request.method == 'POST':
        data = request.get_json()
        jobTitle = data['jobTitle']
        companyName = data['companyName']
        jobDescription = data['jobDescription']
        location = data['location']
        jobType = data['jobType']
        workExperince = data['workExperince']
        sessionId = data['sessionId']
        print(sessionId)
        degree = data['chips']
        print(degree)
        Id = uuid.uuid4()
        # email = "test@test.com"


        
        # if jobType == 'a':
        #     jobType = 'partTime'
        # else:
        #     jobType = 'fullTime'

        # print(jobType)
        # print("here")
        r = requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/create_job',
            headers={"Authorization": sessionId},
            json= {"Id":str(Id),"jobTitle":jobTitle,"jobDescription":jobDescription,"location":location,"jobType":jobType,
            "workExperince":workExperince,"degree":"Degreeof"+degree,"companyName":companyName})
        # print(r.json)


    

     
    print(r.json())
    # print(request.get_json()['location'])

    return "a"

@cognitoRoute.route('/jobs', methods=['GET','POST'])
def getJobs():
    headers = request.headers.get('Authorization')
   
    r = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/jobs',
    headers={"Authorization": headers}
    )
    
    # print(type(r))
    # data = r.json()
    # print(data)
    number_of_elements = int(r.json()['Count'])
    
    jobTitle = []
    jobType = []
    location = []
    workExperience = []
    jobDescription = []
    degree = []
    Id = []

    for i in range(number_of_elements):
        jobType.append(r.json()['Items'][i]['jobType']['S'])
        location.append(r.json()['Items'][i]['location']['S'])
        jobDescription.append(r.json()['Items'][i]['jobDescription']['S'])
        workExperience.append(r.json()['Items'][i]['workExperince']['S'])
        jobTitle.append(r.json()['Items'][i]['jobTitle']['S'])
        degree.append(r.json()['Items'][i]['degree']['S'])
        Id.append(r.json()['Items'][i]['Id']['S'])


    

    returnedJson  = {"Items":[{"jobDescription": jobDescription[0], "jobType": jobType[0], "location": location[0], "jobTitle": jobTitle[0], "workExperince"
                : workExperience[0], "degree" : degree[0], "Id" : Id[0]}]}

    storingJson = returnedJson['Items']

    for i in range(number_of_elements):
        if i > 0:
            updatedJson  = {"jobDescription": jobDescription[i], "jobType": jobType[i], "location": location[i], "jobTitle": jobTitle[i], "workExperince"
                    : workExperience[i], "degree" : degree[i], "Id": Id[i]}
            storingJson.append(updatedJson)
    
    finalJson = json.dumps(storingJson)
    # print(finalJson)


    return finalJson

@cognitoRoute.route('/getAlljobs', methods=['GET','POST'])
def getMatcheddata():
    # print("ss")
    headers = request.headers.get('Authorization')
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table('Job_Postings')
    response = table.scan()
    items = response['Items']

    # print(items)
    return response

@cognitoRoute.route('/experience', methods=['GET','POST'])
def getExperience():
    headers = request.headers.get('Authorization')

    r = requests.get('https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/experience',
    headers={"Authorization": headers})
    
    data = r.json()
    print(data)
    return 'nothing'

# Need to change Stored Email, Stored Email is Global for now
@cognitoRoute.route('/upload', methods=['GET','POST'])
def fileUpload():
    # data = request.data
    # print(data)

    # data = request.get_json()
    # print(data)
    headers = request.headers.get('Authorization')

    print(headers)

    res = requests.get("https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/get_user", 
        headers={"Authorization": headers })       
        
    print(res.json().get('Items', [])[0]['email'])
    email = res.json().get('Items', [])[0]['email']

    target=os.path.join(UPLOAD_FOLDER,'resume_saved')
    
    if not os.path.isdir(target):
        os.mkdir(target)
    
    file = request.files['file']
    # print(request.files['filename'])
    if file: 
        filename = secure_filename(email + '.pdf')
        destination="/".join([target, filename])
        file.save(destination)
        session['uploadFilePath']=destination
        uploaded_file_name = 'resume_saved/' + filename
        
        s3_client.upload_file(
                    Bucket = BUCKET_NAME,
                    Filename = uploaded_file_name,
                    Key = filename
                )

    
    data = ResumeParser(uploaded_file_name).get_extracted_data()

    print(data)
    name = data['name']
    experience = data['total_experience']
    degree = data['degree'][0]
    # print(degree)
    email = data['email']

    # print(degree)
    r = requests.post("https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/resume", 
        headers={"Authorization": headers},
        json= {"degree":str(degree),"experience":str(experience),"name":str(name)}) 
    
   
        
    response = " "
    return response


@cognitoRoute.route('/getjobs', methods=['GET','POST'])
def getFilteredJobs():
    headers = request.headers.get('Authorization')

    res = requests.get("https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/getEmployeeJobs", 
        headers={"Authorization": headers}) 

    degree = res.json()['Items'][0]['degree']['S']
    newDegree = degree.replace(' ', '')

    r = requests.get("https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/getFilteredJobs/"+ newDegree, 
        headers={"Authorization": headers}) 

    number_of_elements = int(r.json()['Count'])
    
    jobTitle = []
    jobType = []
    location = []
    workExperience = []
    jobDescription = []
    Id = []
    companyName = []
    print(r.json())
    for i in range(number_of_elements):
        jobType.append(r.json()['Items'][i]['jobType']['S'])
        location.append(r.json()['Items'][i]['location']['S'])
        jobDescription.append(r.json()['Items'][i]['jobDescription']['S'])
        workExperience.append(r.json()['Items'][i]['workExperince']['S'])
        jobTitle.append(r.json()['Items'][i]['jobTitle']['S'])
        # degree.append(r.json()['Items'][i]['degree']['S'])
        Id.append(r.json()['Items'][i]['Id']['S'])
        companyName.append(r.json()['Items'][i]['companyName']['S'])


    

    returnedJson  = {"Items":[{"jobDescription": jobDescription[0], "jobType": jobType[0], "location": location[0], "jobTitle": jobTitle[0], "workExperince"
                : workExperience[0],  "Id" : Id[0], "companyName": companyName[0]}]}

    storingJson = returnedJson['Items']

    for i in range(number_of_elements):
        if i > 0:
            updatedJson  = {"jobDescription": jobDescription[i], "jobType": jobType[i], "location": location[i], "jobTitle": jobTitle[i], "workExperince"
                    : workExperience[i], "Id": Id[i], "companyName": companyName[i]}
            storingJson.append(updatedJson)
    
    finalJson = json.dumps(storingJson)
    print(finalJson)

    
    


    return finalJson


@cognitoRoute.route('/edit_job_posting', methods=['GET','POST'])
def editPosting():
    if request.method == 'POST':
        data = request.get_json()
        jobTitle = data['jobTitle']
        jobDescription = data['jobDescription']
        location = data['location']
        jobType = data['jobType']
        workExperince = data['workExperince']
        sessionId = data['sessionId']
        jobId = data['id']
        companyName = data['companyName']
        final_job_id =  jobId[:-1]
        # print(jobTitle)
        
        # print(sessionId)
        # Id = uuid.uuid4()
    
        r = requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/editJob',
            headers={"Authorization": sessionId},
            json= {"id":final_job_id,"jobTitle":jobTitle,"jobDescription":jobDescription,"location":location,"jobType":jobType,
            "workExperince":workExperince,"companyName":companyName})
       


    

     
    print(r.json())
  

    return "a"

@cognitoRoute.route('/filtered_jobs_id', methods=['GET','POST'])
def getFilteredJobsId():
    headers = request.headers.get('Authorization')
    data = request.get_json()
    # print(data)
    jobId = data['job_id']
    headers  = data['headers']['headers']['Authorization']
    final_job_id =  jobId[:-1]
    # print(headers)
    # print(final_job_id)
    # print(jobId)
    r = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/getFilterJobs/' + jobId,
    headers={"Authorization": headers}
    )
    # print(r.json())
    # data = r.json()
    number_of_elements = int(r.json()['Count'])
    
    jobTitle = []
    jobType = []
    location = []
    workExperience = []
    jobDescription = []
    id = []
    companyName = []
    degree = []

    for i in range(number_of_elements):
        id.append(r.json()['Items'][i]['Id']['S'])
        jobType.append(r.json()['Items'][i]['jobType']['S'])
        location.append(r.json()['Items'][i]['location']['S'])
        jobDescription.append(r.json()['Items'][i]['jobDescription']['S'])
        workExperience.append(r.json()['Items'][i]['workExperince']['S'])
        jobTitle.append(r.json()['Items'][i]['jobTitle']['S'])
        companyName.append(r.json()['Items'][i]['companyName']['S'])
        # degree.append(r.json()['Items'][i]['degree']['S'])


    

    returnedJson  = {"Items":{"Id": id[0] ,"jobDescription": jobDescription[0], "jobType": jobType[0], "location": location[0], "jobTitle": jobTitle[0], "workExperince"
                : workExperience[0], "companyName":companyName[0], "degree":"ComputerScience"}}

    # storingJson = returnedJson['Items']

    # for i in range(number_of_elements):
    #     if i > 0:
    #         updatedJson  = {"Id": id[i] ,"jobDescription": jobDescription[i], "jobType": jobType[i], "location": location[i], "jobTitle": jobTitle[i], "workExperince"
    #                 : workExperience[i]}
    #         storingJson.append(updatedJson)
    
    finalJson = json.dumps(returnedJson)
    # print(finalJson)


    return finalJson

@cognitoRoute.route('/applyjob', methods=['GET','POST'])
def applyForJob():
    data = request.get_json()

    jobId = data['job_id']
    headers  = data['headers']['headers']['Authorization']
    
    res = requests.get("https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/getEmployeeJobs", 
        headers={"Authorization": headers}) 

    name = res.json()['Items'][0]['name']['S']
    experience = res.json()['Items'][0]['experience']['S']

    responseForEmail = requests.get("https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/get_user", 
        headers={"Authorization": headers })       
        
    email = responseForEmail.json().get('Items', [])[0]['email']
    newEmail = email.replace('@','') + '.pdf'

    print(newEmail)


    responeForDes = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/getFilterJobs/' + jobId,
    headers={"Authorization": headers}
    )

    jobDescription = responeForDes.json()['Items'][0]['jobDescription']['S']
    # print(jobDescription)

    resume = extract_text('resume_saved/' + newEmail)
    text_resume = str(resume)
    summarized_resume = summarize(text_resume, ratio=0.8)
    # print(summarized_resume)

    text = jobDescription
    text = str(text)
    summarize(text, ratio=0.8) 

    text_list = [text_resume, text]

    cv = CountVectorizer()
    count_matrix = cv.fit_transform(text_list)

    matchPercentage = cosine_similarity(count_matrix)[0][1] * 100
    matchPercentage = round(matchPercentage, 2)
    print(matchPercentage)

    r = requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/apply_job',
            headers={"Authorization": headers},
            json= {"Id":jobId,"name":name,"workExperince":experience,"matchingPercentage":str(matchPercentage)})
    
    #https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/getApplicantJobs/{id}

    # check = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/getApplicantJobs/' + jobId,
    # headers={"Authorization": headers}
    # )
    # print(check.json())

    return jobId

@cognitoRoute.route('/delete_job', methods=['POST','GET','DELETE'])
def delete():
    if request.method == 'DELETE':
        print('please_print')
        data = request.get_json()
        sessionId = data['sessionId']
        jobId = data['id']
        print(jobId)
        # table = dynamodb.Table('Bookings')
        r = requests.delete('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/deleteJob',
            headers={"Authorization": sessionId}, json= {"id":jobId})
        print(r.json)
        # return redirect(url_for('cognitoRoute.admin_home'))
    return "d"
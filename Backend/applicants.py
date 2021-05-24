
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
import json
import docx2txt
import uuid
from pyresparser import ResumeParser
from gensim.summarization.summarizer import summarize
from gensim.summarization import keywords# Import the library
from pdfminer.high_level import extract_text
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from os.path import join as pjoin
import shutil
from pathlib import Path

s3 = boto3.resource('s3')

app = Flask(__name__)
APP_CLIENT_ID = "1rfl5n6j4su0mgmgkfh43fqbov"
s3_client = boto3.client('s3', region_name='us-east-1')
UPLOAD_FOLDER = ''
applicantsRoute = Blueprint('applicantsRoute', __name__)
BUCKET_NAME='programming-project-resume'


@applicantsRoute.route('/applyjob', methods=['GET','POST'])
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
   

    text = jobDescription
    text = str(text)
    summarize(text, ratio=0.8) 

    text_list = [text_resume, text]

    cv = CountVectorizer()
    count_matrix = cv.fit_transform(text_list)

    matchPercentage = cosine_similarity(count_matrix)[0][1] * 100
    matchPercentage = round(matchPercentage, 2)
    print(matchPercentage)

    requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/apply_job',
            headers={"Authorization": headers},
            json= {"Id":jobId,"name":name,"workExperince":experience,"matchingPercentage":str(matchPercentage)})
    

    return jobId

@applicantsRoute.route('/get_applicant', methods=['POST','GET'])
def get_applicants():

    if request.method == 'POST':
        data = request.get_json()
        jobId = data['job_id']
        headers  = data['headers']['headers']['Authorization']
        final_job_id =  jobId[:-1]

        print(headers)

        r = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/getApplicantJobs/' + final_job_id,
            headers={"Authorization": headers}
        )

        print(r.json())

        number_of_elements = int(r.json()['Count'])
        
        if number_of_elements > 0: 
            name = []
            email = []
            matchPercentage = []
            experience = []
        

            for i in range(number_of_elements):
                
                name.append(r.json()['Items'][i]['name']['S'])
                email.append(r.json()['Items'][i]['email']['S'])
                matchPercentage.append(r.json()['Items'][i]['matchingPercentage']['S'])
                experience.append(r.json()['Items'][i]['experience']['S'])
            

            returnedJson  = {"Items":[{"name": name[0], "email": email[0], "matchingPercentage": matchPercentage[0],
            "experience": experience[0]}]}

            storingJson = returnedJson['Items']

            for i in range(number_of_elements):
                if i > 0:
                    updatedJson  = {"Items":[{"name": name[i], "email": email[i], "matchingPercentage": matchPercentage[i],
                        "experience": experience[i]}]}
                    storingJson.append(updatedJson)
        
            finalJson = json.dumps(storingJson)
            print(finalJson)
    


            return finalJson
        else: 
            return "None"
    return "None"

@applicantsRoute.route('/upload', methods=['GET','POST'])
def fileUpload():
  
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
   

   
    r = requests.post("https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/resume", 
        headers={"Authorization": headers},
        json= {"degree":str(degree),"experience":str(experience),"name":str(name)}) 
    
   
        
    response = " "
    print("Upload Sucessful")
    return response

@applicantsRoute.route('/getSearchedjobs', methods=['GET','POST'])
def getSearchedJobs():
    data = request.get_json()
    location = data['searchJobLocation']
    jobType = data['searchedJobType']
    headers = data['headers']['headers']['Authorization']
    r = requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/getSearchedJobs',
       headers={"Authorization": headers}, json= {"location":location,"jobType":jobType})
    
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
        location.append(r.json()['Items'][i]['jobLocation']['S'])
        jobDescription.append(r.json()['Items'][i]['jobDescription']['S'])
        workExperience.append(r.json()['Items'][i]['workExperince']['S'])
        jobTitle.append(r.json()['Items'][i]['jobTitle']['S'])
        
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

    
   
  
   
    return finalJson

@applicantsRoute.route('/downloadResume', methods=['GET','POST'])
def downloadResume():
    data = request.get_json()
    print(data)
    email = data['user_email']
    newEmail = email.replace("@","")
    fileName = newEmail + ".pdf"
    print(fileName)
    try:
        s3.Bucket(BUCKET_NAME).download_file(fileName, fileName)
        path_to_download_folder = str(os.path.join(Path.home(), "Downloads"))
        path_to_file = pjoin(path_to_download_folder, fileName)
        shutil.move(fileName, path_to_file)
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("The object does not exist.")
        else:
            raise
    
    
    
    
    return "None"
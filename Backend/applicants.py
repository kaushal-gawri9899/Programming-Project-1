
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
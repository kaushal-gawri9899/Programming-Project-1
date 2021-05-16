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

app = Flask(__name__)
APP_CLIENT_ID = "1rfl5n6j4su0mgmgkfh43fqbov"


jobsRoute = Blueprint('jobsRoute', __name__)


@jobsRoute.route('/create', methods=['GET','POST'])
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
      


  
        r = requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/create_job',
            headers={"Authorization": sessionId},
            json= {"Id":str(Id),"jobTitle":jobTitle,"jobDescription":jobDescription,"location":location,"jobType":jobType,
            "workExperince":workExperince,"degree":"Degreeof"+degree,"companyName":companyName})
      


    

     
    print(r.json())
   

    return "a"

@jobsRoute.route('/jobs', methods=['GET','POST'])
def getJobs():
    headers = request.headers.get('Authorization')
   
    r = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/jobs',
    headers={"Authorization": headers}
    )
    
   
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
        location.append(r.json()['Items'][i]['jobLocation']['S'])
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

@jobsRoute.route('/getjobs', methods=['GET','POST'])
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
    print(finalJson)

    
    


    return finalJson


@jobsRoute.route('/edit_job_posting', methods=['GET','POST'])
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
        
        r = requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/editJob',
            headers={"Authorization": sessionId},
            json= {"id":final_job_id,"jobTitle":jobTitle,"jobDescription":jobDescription,"location":location,"jobType":jobType,
            "workExperince":workExperince,"companyName":companyName})
       


    

     
    print(r.json())
  

    return "a"

@jobsRoute.route('/filtered_jobs_id', methods=['GET','POST'])
def getFilteredJobsId():
  
    data = request.get_json()
   
    jobId = data['job_id']
    headers  = data['headers']['headers']['Authorization']
    final_job_id =  jobId[:-1]
  
    r = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/getFilterJobs/' + jobId,
    headers={"Authorization": headers}
    )
  
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
        location.append(r.json()['Items'][i]['jobLocation']['S'])
        jobDescription.append(r.json()['Items'][i]['jobDescription']['S'])
        workExperience.append(r.json()['Items'][i]['workExperince']['S'])
        jobTitle.append(r.json()['Items'][i]['jobTitle']['S'])
        companyName.append(r.json()['Items'][i]['companyName']['S'])
        # degree.append(r.json()['Items'][i]['degree']['S'])


    

    returnedJson  = {"Items":{"Id": id[0] ,"jobDescription": jobDescription[0], "jobType": jobType[0], "location": location[0], "jobTitle": jobTitle[0], "workExperince"
                : workExperience[0], "companyName":companyName[0], "degree":"ComputerScience"}}

 
    finalJson = json.dumps(returnedJson)
   


    return finalJson

@jobsRoute.route('/delete_job', methods=['POST','GET','DELETE'])
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
       
    return "d"


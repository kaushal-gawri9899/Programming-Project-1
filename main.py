import json
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

def jobs(event, context):
    
    # email = event.get("requestContext").get("authorizer").get("claims").get("email")
    email = "test@test.com"
    job = {
         "Id":"",
        "jobTitle":"",
        "jobDescription":"",
        "location":"",
        "jobType":"",
        "workExperince":"",
        "email":email
    }

    dynamodb = boto3.resource('dynamodb',  region_name='us-east-1')
    
    try:
    
        table = dynamodb.Table('Job_posting')
        response = table.query(
            KeyConditionExpression=Key('email').eq("test@test.com")
        )
   


    except ClientError:
        return {
            "statusCode": 200,
            "body": json.dumps(response)
        }


    return {
        "statusCode": 200,
        "body": json.dumps(response)
    }
    
    
def create_job(event, context):
    
    # email = event.get("requestContext").get("authorizer").get("claims").get("email")
    dynamodb_client = boto3.client('dynamodb', region_name = "us-east-1")
    request_body = json.loads(event.get("body"))
    Id = request_body.get("Id","")
    jobTitle = request_body.get("jobTitle","")
    jobDescription = request_body.get("jobDescription","")
    location = request_body.get("location","")
    jobType = request_body.get("jobType","")
    workExperince = request_body.get("workExperince","")
    email = request_body.get("email","")
  


    job = {
        "Id":"",
        "jobTitle":"",
        "jobDescription":"",
        "location":"",
        "jobType":"",
        "workExperince":"",
        "email":""
      
    }


    try: 
        response = dynamodb_client.put_item(
            TableName='Job_posting',
            Item={ 
                'Id':{
                    'S':Id
                },
                'jobTitle': {
                    'S': jobTitle
                    },
                'jobDescription': {
                    'S': jobDescription 
                    }, 
                'location': {
                    'S': location
                },
                'jobType': {
                    'S': jobType
                },
                'workExperince': {
                    'S': workExperince
                },
                'email': {
                    'S': email
                }
            },ReturnConsumedCapacity='TOTAL')


        return {
            "statusCode": 200,
            "body": json.dumps(response)
        }

    except ClientError:
        return {
            "statusCode": 200,
            "body": json.dumps(job)
        }

    return {
        "statusCode": 200,
        "body": json.dumps('profile.get("name")')
    }

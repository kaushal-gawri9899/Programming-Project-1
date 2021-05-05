import json
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

def jobs(event, context):
    
    email = event.get("requestContext").get("authorizer").get("claims").get("email")

    job = {
        "Id":"",
        "jobTitle":"",
        "jobDescription":"",
        "location":"",
        "jobType":"",
        "workExperince":"",
        "degree":"",
        "companyName":"",
        "email":email
    }
    dynamodb_client = boto3.client('dynamodb', region_name="us-east-1")


#    dynamodb = boto3.resource('dynamodb',  region_name='us-east-1')
    
    try:
    
        response = dynamodb_client.scan(
            ExpressionAttributeNames={
                '#JT': 'jobType',
                '#JD': 'jobDescription',
                '#L': 'location',
                '#WE': 'workExperince',
                '#JI': 'jobTitle',
                '#CN': 'companyName',
                '#D': 'degree',
                '#ID': 'Id'
                
            },
            ExpressionAttributeValues={
                ':a': {
                    'S': email,
                },
            },
            FilterExpression='email = :a',
            ProjectionExpression='#JT,#JD,#L,#WE,#JI,#CN,#D,#ID',
            TableName='Job_Postings',
        )
   


    except ClientError:
        return {
            "statusCode": 403,
            "body": json.dumps(response)
        }


    return {
        "statusCode": 200,
        "body": json.dumps(response)
    }
    
    
def create_job(event, context):
    
    email = event.get("requestContext").get("authorizer").get("claims").get("email")
    dynamodb_client = boto3.client('dynamodb', region_name = "us-east-1")
    request_body = json.loads(event.get("body"))
    Id = request_body.get("Id","")
    jobTitle = request_body.get("jobTitle","")
    jobDescription = request_body.get("jobDescription","")
    location = request_body.get("location","")
    jobType = request_body.get("jobType","")
    workExperince = request_body.get("workExperince","")
    companyName = request_body.get("companyName","")
    degree = request_body.get("degree","")
  


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
            TableName='Job_Postings',
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
                'companyName': {
                    'S': companyName
                },
                'degree': {
                    'S': degree
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
            "statusCode": 403,
            "body": json.dumps(job)
        }

    return {
        "statusCode": 200,
        "body": json.dumps('profile.get("name")')
    }

def resume(event, context):
    email = event.get("requestContext").get("authorizer").get("claims").get("email")
    dynamodb_client = boto3.client('dynamodb', region_name = "us-east-1")
    request_body = json.loads(event.get("body"))
    experience = request_body.get("experience","")
    name = request_body.get("name","")
    degree = request_body.get("degree","")
    
    try:
        
        response = dynamodb_client.put_item(
            TableName='resume',
            Item={ 
                'username': {
                    'S': email
                    },
                'experience': {
                    'S': experience
                    },
                'name': {
                    'S': name
                },
                'degree': {
                    'S': degree
                }  
            },ReturnConsumedCapacity='TOTAL')

        return {
            "statusCode": 200,
            "body": json.dumps(response)
        }

    except ClientError:
        return {
            "statusCode": 404,
            "body": json.dumps("userDetails")
        }

    return {
        "statusCode": 200,
        "body": json.dumps('profile.get("name")')
    }

def get_filtered_jobs(event, context):
    
    email = event.get("requestContext").get("authorizer").get("claims").get("email")
    # request = event.pathParameters.degree
    degree = (event['pathParameters']['degree'])
   
    
    

#     job = {
#         "Id":"",
#         "jobTitle":"",
#         "jobDescription":"",
#         "location":"",
#         "jobType":"",
#         "workExperince":"",
#         "degree":degree,
#         "companyName":"",
#         "email":email
#     }
    dynamodb_client = boto3.client('dynamodb', region_name="us-east-1")

    


#    dynamodb = boto3.resource('dynamodb',  region_name='us-east-1')
    
    try:
    
        response = dynamodb_client.scan(
            ExpressionAttributeNames={
                '#JT': 'jobType',
                '#JD': 'jobDescription',
                '#L': 'location',
                '#WE': 'workExperince',
                '#JI': 'jobTitle',
                '#CN': 'companyName',
                '#ID': 'Id'
                
            },
            ExpressionAttributeValues={
                ':a': {
                    'S': degree,
                },
            },
            FilterExpression='degree = :a',
            ProjectionExpression='#JT,#JD,#L,#WE,#JI,#CN,#ID',
            TableName='Job_Postings',
        )

    except ClientError:
        return {
            "statusCode": 403,
            "body": json.dumps(response)
        }


    return {
        "statusCode": 200,
        "body": json.dumps(response)
    }

def get_filter_job_id(event, context):
    
    email = event.get("requestContext").get("authorizer").get("claims").get("email")
    # request = event.pathParameters.degree
    id = (event['pathParameters']['id'])
    
    job = {
        "Id":id,
        "jobTitle":"",
        "jobDescription":"",
        "location":"",
        "jobType":"",
        "workExperince":"",
        "degree":"",
        "companyName":"",
        "email":email
    }
    dynamodb_client = boto3.client('dynamodb', region_name="us-east-1")

        
    try:
    
        response = dynamodb_client.scan(
            ExpressionAttributeNames={
                '#JT': 'jobType',
                '#JD': 'jobDescription',
                '#L': 'location',
                '#WE': 'workExperince',
                '#JI': 'jobTitle',
                '#CN': 'companyName',
                '#ID': 'Id'
                
            },
            ExpressionAttributeValues={
                ':a': {
                    'S': id,
                },
            },
            FilterExpression='Id = :a',
            ProjectionExpression='#JT,#JD,#L,#WE,#JI,#CN,#ID',
            TableName='Job_Postings',
        )

    except ClientError:
        return {
            "statusCode": 403,
            "body": json.dumps(response)
        }


    return {
        "statusCode": 200,
        "body": json.dumps(response)
    }

def edit_job_posting(event, context):
    
    email = event.get("requestContext").get("authorizer").get("claims").get("email")
    
    dynamodb_client = boto3.client('dynamodb', region_name = "us-east-1")
    
    request_body = json.loads(event.get("body"))
    job_id = request_body.get("id","")

    jobType = request_body.get("jobType","")
    location = request_body.get("location","")
    jobTitle = request_body.get("jobTitle","")
    jobDescription = request_body.get("jobDescription","")
    workExperince = request_body.get("workExperince","")
    companyName = request_body.get("companyName","")
    degree = request_body.get("degree","")

    
    job = {
        "jobType":jobType,
        "location":location,
        "jobTitle":jobTitle,
        "jobDescritipn":jobDescription,
        "degree":degree,
        "workExperince":workExperince,
        "companyName":companyName,
        "email":email
    }
    
    # return {
    #         "statusCode": 200,
    #         "body": json.dumps(job)
    #     }

    try:
        response = dynamodb_client.update_item(
        ExpressionAttributeNames={
            '#JT': 'jobType',
            '#L': 'location',
            '#T': 'jobTitle',
            '#JD': 'jobDescription',
            '#WE': 'workExperince',
            '#D': 'degree',
            '#CN': 'companyName',

        },
        ExpressionAttributeValues={
            ':jt': {
                'S': jobType ,
            },
            ':l': {
                'S': location ,
            },
            ':t': {
                'S': jobTitle ,
            },
            ':jd': {
                'S': jobDescription,
            },
            ':we': {
                'S': workExperince ,
            },
            ':d': {
                'S': degree ,
            },
            ':cn': {
                'S': companyName ,
            }             
        },
        Key={
            'email': {
                'S': email,
            },
            'Id': {
                'S': job_id,
            }
        },
        ReturnValues='ALL_NEW',
        TableName='Job_Postings',
        UpdateExpression='SET  #JT = :jt,#L = :l,#T = :t,#JD = :jd,#WE = :we,#D = :d,#CN = :cn',
        )
        return {
            "statusCode": 200,
            "body": json.dumps(response)
        }
    except ClientError:
        
        
        return {
            "statusCode": 403,
            "body": json.dumps(response)
        }
        

    return {
        "statusCode": 200,
        "body": json.dumps("booking.get(")
    }

def delete_job_posting(event, context):
    
    email = event.get("requestContext").get("authorizer").get("claims").get("email")
    request_body = json.loads(event.get("body"))
    job_id = request_body.get("id","")
    # booking = {
    #     "admin_email":email,
    #     "booking_id":"",
    #     "meeting_name":"",
    #     "client_name":"",
    #     "client_email":"",
    #     "date":"",
    #     "time":""
    # }

    dynamodb = boto3.resource('dynamodb',  region_name='us-east-1')

    try:         
        table = dynamodb.Table('Job_Postings')
        table.delete_item(
            Key={
                'email': email,
                'Id': job_id
            }
        )

        return {
            "statusCode": 200,
            "body": json.dumps('sdf')
        }

    except ClientError:
        return {
            "statusCode": 403,
            "body": json.dumps("booking")
        }


    return {
        "statusCode": 200,
        "body": json.dumps('profile')
    }

def getJobsForEmployee(event, context):
    
    username = event.get("requestContext").get("authorizer").get("claims").get("email")

    dynamodb_client = boto3.client('dynamodb', region_name="us-east-1")
    

#    dynamodb = boto3.resource('dynamodb',  region_name='us-east-1')
    
    try:
    
        response = dynamodb_client.scan(
            ExpressionAttributeNames={
                '#N': 'name',
                '#D': 'degree',
                '#E': 'experience'
                
                
            },
            ExpressionAttributeValues={
                ':a': {
                    'S': username,
                },
            },
            FilterExpression='username = :a',
            ProjectionExpression='#N,#D,#E',
            TableName='resume',
        )
   


    except ClientError:
        return {
            "statusCode": 403,
            "body": json.dumps(response)
        }


    return {
        "statusCode": 200,
        "body": json.dumps(response)
    }

def apply_job(event, context):
    
    email = event.get("requestContext").get("authorizer").get("claims").get("email")
    dynamodb_client = boto3.client('dynamodb', region_name = "us-east-1")
    request_body = json.loads(event.get("body"))
    name = request_body.get("name","")
    Id = request_body.get("Id","")
    experience = request_body.get("workExperince","")
    matchingPercentage = request_body.get("matchingPercentage","")
    
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
            TableName='Applicants',
            Item={ 
                'Id':{
                    'S':Id
                },
                'name': {
                    'S': name
                    },
                'experience': {
                    'S': experience 
                    }, 
                'email': {
                    'S': email
                }, 
                'matchingPercentage': {
                    'S': matchingPercentage
                }
            },ReturnConsumedCapacity='TOTAL')


        return {
            "statusCode": 200,
            "body": json.dumps(response)
        }

    except ClientError:
        return {
            "statusCode": 403,
            "body": json.dumps(job)
        }

    return {
        "statusCode": 200,
        "body": json.dumps('profile.get("name")')
    }

def get_applicants_for_job(event, context):
    
    email = event.get("requestContext").get("authorizer").get("claims").get("email")
    # request = event.pathParameters.degree
    id = (event['pathParameters']['id'])
    
    job = {
        "Id":id,
        "jobTitle":"",
        "jobDescription":"",
        "location":"",
        "jobType":"",
        "workExperince":"",
        "degree":"",
        "companyName":"",
        "email":email
    }
    
    dynamodb_client = boto3.client('dynamodb', region_name="us-east-1")

        
    try:
    
        response = dynamodb_client.scan(
            ExpressionAttributeNames={
                '#N': 'name',
                '#E': 'experience',
                '#EM': 'email',
                '#M': 'matchingPercentage',                
            },
            ExpressionAttributeValues={
                ':a': {
                    'S': id,
                },
            },
            FilterExpression='Id = :a',
            ProjectionExpression='#N,#E,#EM,#M',
            TableName='Applicants',
        )

    except ClientError:
        return {
            "statusCode": 403,
            "body": json.dumps(response)
        }


    return {
        "statusCode": 200,
        "body": json.dumps(response)
    }



   
    
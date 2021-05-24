import unittest
import requests
import boto3

dynamodb_client = boto3.client('dynamodb', region_name="us-east-1")
cognito_client = boto3.client('cognito-idp', region_name='us-east-1')
APP_CLIENT_ID = "1rfl5n6j4su0mgmgkfh43fqbov"
jobID = "A12"

class TestJobMatchMakingPortal(unittest.TestCase):
 # Return true if a user is created with a usertype Employer
    def test_return_true_if_signed_up_as_a_employer(self):

        user_email = "ali@ninja.com"
        usertype = "Employer"
        postUser = requests.post('https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/add_usertype',
            json= {"email":user_email,"usertype":usertype})

        response = dynamodb_client.scan(
            ExpressionAttributeNames={
                '#E': 'email',
                '#U': 'usertype',                  
            },
            ExpressionAttributeValues={
                ':a': {
                    'S': user_email,
                },
            },
            FilterExpression='email = :a',
            ProjectionExpression='#E, #U',
            TableName='user_details',
        )

        returnedUserType = response['Items'][0]['usertype']['S']
        
        self.assertEqual(usertype,returnedUserType)

# Return true if a usertype is created with the usertype Employee
    def test_return_true_if_signed_up_as_a_employee(self):

        user_email = "pg@we.com"
        usertype = "Employee"
        postUser = requests.post('https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/add_usertype',
            json= {"email":user_email,"usertype":usertype})

        response = dynamodb_client.scan(
            ExpressionAttributeNames={
                '#E': 'email',
                '#U': 'usertype',                  
            },
            ExpressionAttributeValues={
                ':a': {
                    'S': user_email,
                },
            },
            FilterExpression='email = :a',
            ProjectionExpression='#E, #U',
            TableName='user_details',
        )

        returnedUserType = response['Items'][0]['usertype']['S']

        self.assertEqual(usertype,returnedUserType)

# Return true if a user is Signed In as Employer
    def test_return_true_if_user__can_sign_in_as_an_Employer(self):
        
        user_email = "ali@ninja.com"
        password = "Password12@"

        # User already signed up and confirmed on cognito

        loginUser =  cognito_client.initiate_auth(ClientId=APP_CLIENT_ID,
                                        AuthFlow='USER_PASSWORD_AUTH',
                                        AuthParameters={
                                        'USERNAME': user_email,
                                        'PASSWORD': password
                                        }
        )

        id_token = loginUser['AuthenticationResult']['IdToken']

        r = requests.get("https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/get_user", 
        headers={"Authorization": id_token })  

        usertype = r.json().get('Items', [])[0]['usertype']

        self.assertEqual(usertype,"Employer")

# Return true if a user is Signed In as Employee
    def test_return_true_if_user__can_sign_in_as_an_Employee(self):
        
        user_email = "pg@we.com"
        password = "Password12@"

        # User already signed up and confirmed on cognito on Cognito

        loginUser =  cognito_client.initiate_auth(ClientId=APP_CLIENT_ID,
                                        AuthFlow='USER_PASSWORD_AUTH',
                                        AuthParameters={
                                        'USERNAME': user_email,
                                        'PASSWORD': password
                                        }
        )

        id_token = loginUser['AuthenticationResult']['IdToken']

        r = requests.get("https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/get_user", 
        headers={"Authorization": id_token })  

        usertype = r.json().get('Items', [])[0]['usertype']

        self.assertEqual(usertype,"Employee")

# Return true if Employer signs up and deletes a job
    def test_return_true_if_signing_up_and_delete_Job_Posting(self):
        
        user_email = "ali@ninja.com"
        password = "Password12@"

        # User already signed up and confirmed on cognito

        loginUser =  cognito_client.initiate_auth(ClientId=APP_CLIENT_ID,
                                        AuthFlow='USER_PASSWORD_AUTH',
                                        AuthParameters={
                                        'USERNAME': user_email,
                                        'PASSWORD': password
                                        }
        )

        id_token = loginUser['AuthenticationResult']['IdToken']


        getJobBefore = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/jobs',
            headers={"Authorization": id_token}
        )

        jobsBeforeDeletion = getJobBefore.json()['Count']

        deleteJob = requests.delete('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/deleteJob',
            headers={"Authorization": id_token}, json= {"id":jobID})
        
        getJobAfter = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/jobs',
            headers={"Authorization": id_token}
        )

        jobsAfterDeletion = getJobAfter.json()['Count']

        self.assertEqual(jobsBeforeDeletion-1,jobsAfterDeletion)

# Return true if details from File are uploaded
    def test_return_true_if_signing_in_as_employee_and_uploading_resume(self):

        user_email = "pg@we.com"
        password = "Password12@"
        name = "Muhammad Ali Tariq"

        # User already signed up and confirmed on cognito on Cognito

        loginUser =  cognito_client.initiate_auth(ClientId=APP_CLIENT_ID,
                                        AuthFlow='USER_PASSWORD_AUTH',
                                        AuthParameters={
                                        'USERNAME': user_email,
                                        'PASSWORD': password
                                        }
        )

        id_token = loginUser['AuthenticationResult']['IdToken']

        postFileDetails = requests.post("https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/resume", 
        headers={"Authorization": id_token},
        json= {"degree":str("Computer Science"),"experience":str("3 Years"),"name":str(name)}) 


        response = dynamodb_client.scan(
            ExpressionAttributeNames={
                '#E': 'username',
                '#U': 'name', 
                '#EX': 'experience',
                '#D': 'degree',                 
            },
            ExpressionAttributeValues={
                ':a': {
                    'S': user_email,
                },
            },
            FilterExpression='username = :a',
            ProjectionExpression='#E, #U, #EX, #D',
            TableName='resume',
        )

        returnedName = response['Items'][0]['name']['S']


        self.assertEqual(returnedName,name)

# Return true if employer signs up and edits a job        
    def test_return_true_if_signing_up_and_edit_Job_Posting(self):

        user_email = "ali@ninja.com"
        password = "Password12@"

        # User already signed up and confirmed on cognito

        loginUser =  cognito_client.initiate_auth(ClientId=APP_CLIENT_ID,
                                        AuthFlow='USER_PASSWORD_AUTH',
                                        AuthParameters={
                                        'USERNAME': user_email,
                                        'PASSWORD': password
                                        }
        )

        id_token = loginUser['AuthenticationResult']['IdToken']

        # editing Company name
        companyName = "PMM & MAT"

        editJob = requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/editJob',
            headers={"Authorization": id_token},
            json= {"id":jobID,"jobTitle":"Job Portal Tester","jobDescription":"Test our Application","location":"Remote","jobType":"Part Time",
            "workExperince":"0","companyName":companyName})
        
        getJob = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/jobs',
            headers={"Authorization": id_token}
        )
        returnedCompanyName = getJob.json()['Items'][0]['companyName']['S']

        self.assertEqual(companyName,returnedCompanyName)

# Return true if a job is posted with given details 
    def test__return_ture_if_signing_up_and_create_Job_Posting(self):

        user_email = "ali@ninja.com"
        password = "Password12@"

        # User already signed up and confirmed on cognito

        loginUser =  cognito_client.initiate_auth(ClientId=APP_CLIENT_ID,
                                        AuthFlow='USER_PASSWORD_AUTH',
                                        AuthParameters={
                                        'USERNAME': user_email,
                                        'PASSWORD': password
                                        }
        )

        id_token = loginUser['AuthenticationResult']['IdToken']

        # setting a company Name
        companyName = "MAT & PMM"

        createJob = requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/create_job',
            headers={"Authorization": id_token},
            json= {"Id":jobID,"jobTitle":"Job Portal Tester","jobDescription":"Test out Application",
            "location":"Remote","jobType":"Part Time",
            "workExperince":"0","degree":"Degreeof"+"Computer Science","companyName":companyName})

        getJob = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/jobs',
            headers={"Authorization": id_token}
        )

        returnedCompanyName = getJob.json()['Items'][0]['companyName']['S']
        
        self.assertEqual(companyName,returnedCompanyName)

# Return true if user profile information is corred
    def test_return_true_if_signing_in_and_checking_profile_information(self):
        
        # Signing in as Employee so Usertype should be Employee
        expectedUsertype = "Employee"
        user_email = "pg@we.com"
        password = "Password12@"

        # User already signed up and confirmed on cognito

        loginUser =  cognito_client.initiate_auth(ClientId=APP_CLIENT_ID,
                                        AuthFlow='USER_PASSWORD_AUTH',
                                        AuthParameters={
                                        'USERNAME': user_email,
                                        'PASSWORD': password
                                        }
        )

        id_token = loginUser['AuthenticationResult']['IdToken']

        getProfileInformation = requests.get("https://kor6ktyjri.execute-api.us-east-1.amazonaws.com/dev/get_user", 
        headers={"Authorization": id_token})   

        actualUserType = getProfileInformation.json().get('Items', [])[0]['usertype']

        self.assertEqual(expectedUsertype,actualUserType)





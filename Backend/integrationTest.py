
"""
Integration tests which checks that multiple moodules of the app work toghter.

"""

import unittest
import requests
import boto3

dynamodb_client = boto3.client('dynamodb', region_name="us-east-1")
cognito_client = boto3.client('cognito-idp', region_name='us-east-1')
APP_CLIENT_ID = "1rfl5n6j4su0mgmgkfh43fqbov"
jobID = "A12"

class TestJobMatchMakingPortal(unittest.TestCase):
    # Return true if job is Applied
    def test_return_ture_if_employer_can_see_an_applied_job_by_employee(self):

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

        matchPercentage = "20"

        applyForJob = requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/apply_job',
            headers={"Authorization": id_token},
            json= {"Id":jobID,"name":"Ali Tariq","workExperince":"1","matchingPercentage":str(matchPercentage)})
        
        loginEmployer =  cognito_client.initiate_auth(ClientId=APP_CLIENT_ID,
                                        AuthFlow='USER_PASSWORD_AUTH',
                                        AuthParameters={
                                        'USERNAME': "ali@ninja.com",
                                        'PASSWORD': password
                                        }
        )
        
        id_token = loginEmployer['AuthenticationResult']['IdToken']

        getApplicant = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/getApplicantJobs/' + jobID,
            headers={"Authorization": id_token}
        )

        returnedMatchPercentage = getApplicant.json()['Items'][0]['matchingPercentage']['S']

        self.assertEqual(matchPercentage,returnedMatchPercentage)

    def test_return_true_if_an_existing_job_is_edited(self):

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

    def test_return_true_if_a_job_is_deleted(self):

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

    def test_return_true_if_a_job_can_be_edited_and_deleted(self):

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

        editJob = requests.post('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/editJob',
            headers={"Authorization": id_token},
            json= {"id":jobID,"jobTitle":"Job Portal Tester","jobDescription":"Test our Application","location":"Remote","jobType":"Part Time",
            "workExperince":"0","companyName":companyName})
        
        getJob = requests.get('https://jypfk3zpod.execute-api.us-east-1.amazonaws.com/dev/jobs',
            headers={"Authorization": id_token}
        )
        returnedCompanyName = getJob.json()['Items'][0]['companyName']['S']

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


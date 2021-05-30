# Job match making system


## :pencil: PROJECT IDEA

Build an end-to-end job matching portal helping hiring-managers to find their ideal candidate and job seekers to find their dream job and allowing hiring managers to conduct one on one interview within the app through video conferencing feature. 


## :pencil: FEATURES

(1) Allow users to sign up and login to the application

- Employer / Hiring Manager Functionality
(2) Allow employers to view their job listings and how each job is performing

(3) Allow employers to view the number of matched candidates vs total number of candidates using a line chart

(4) Allow employers to create , edit and delete a job posting

(5) Allow employers to view applicants of each job listing

(6) Allow employers to download applicants resume

(7) Allow employers to join or create a video interview session within the same app

(8) Provide employer with matching percentage of a candidate (Using ML Techniques)

- Employee/ Job Seeker Functionality
(1) Allow employees to view all the job listings

(2) Allow employee to filter job postings based on location or job type

(3) Allow employee to upload their resume so they can apply for jobs

(4) Allow employee to join a video interview session

- Admin Dashboard (Required by Client)
(1) Allow admin to view, edit or delete all job postings

(2) Allow admin to view all job applicants

- Frontend (ReactJS)
Frontend folder contains UI for all pages such as Sign In, Sign Up, Employee dashboard, Employer ashboard  and many more. The pages are connected through the backend (Python) using restful APIS, which were done through AXIOS, are loaded upon request through the axios requests. 

NPM version used: 7.11.2

To run the frontend, you have to run the following commands: 
 -   $ npm install
 -   $ npm start

- Backend (Python)
Backend contains restful APIS which triggers lambda functions. Backend uses AWS dynamodb and s3 as a database. It also authenticates a user using AWS Cognito. 

Python Version used: 3.7.7
Flask Version used: 1.1.2

To run the backend, you have to run the following commands: 
-   $ pip3 install -r requirements.txt 
-   $ python3 main.py

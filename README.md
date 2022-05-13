### CMPE282-ELMS

### University Name: http://www.sjsu.edu/

### Course: [Cloud Services]

### Team Members
   ###### [SAKSHI JAIN] (sakshi.jain01@sjsu.edu)
   ###### [VARUN ALLA] (varun.alla@sjsu.edu)
   ###### [SHIVANI PANDIT] (shivani.pandit@sjsu.edu) 
   ###### [RAJ PARAGBHAI KINKHABWALA] (rajparagbhai.kinkhabwala@sjsu.edu)
   
### Project Introduction
   Acquiring loans from financial institutions requires a high amount of documentation and processes to be followed along with necessary proof and capability demonstration for loan repayment. In contrast to the corporate world where all the employees are already vetted and undergo rigorous background checks before initial onboarding. This brings forth a unique proposition of disbursement of loans, which can be a percentage of the salary provided to the employee. This removes the hassle for the employees in acquiring loans and provides the enterprise a unique way of maintaining employee financial welfare.
	The system strives to provide a single place where the employees can request loans and pre-close existing loans. the system provides necessary functionalities to assess the loan application and also provides a facility to approve/reject loan applications, along with dashboards that provide metrics based on the role that is accessing the application. 
	The application is built with security and privacy in mind, leveraging cloud services for delivery. The individual loan application information is obfuscated from the loan approver, to give anonymity to the loan requester by providing only information needed to decide on the approval of the application. The loan requester has holistic access to all the details regarding the loan, including the loan repayment schedule and current credit score rating within the organization. The application provides access restrictions via login roles and Single Sign-On functionalities. The application is built to scale as per requirements and will be cost-effective given the pay-per-user cloud benefits. 


   ###### Feature List:
   
        The Three Personas:
  
        1. EMPLOYEE
        * Login
        * Request for a loan
        * Manage their profile
        * View loan details
        * View all past loans
        
        2. MANAGER
        * Login
        * Request for a loan
        * Approve/Reject loans for an employee
        * Manage their profile
        * View all employees
        * View loan details
        
        3. ADMIN
        * Login
        * Request for a loan
        * Preclose a loan
        * Manage their profile
        * View all employees
        * View loan details
        * Manage all loans


## Architect Diagram:

![WhatsApp Image 2022-05-13 at 1 17 19 PM](https://user-images.githubusercontent.com/90986401/168385661-bdca6696-b278-4f1a-b42a-d5be43dcb05b.jpeg)


## UML Class Diagram

![WhatsApp Image 2022-05-13 at 11 44 12 AM](https://user-images.githubusercontent.com/90986401/168385905-c4aa835d-50e4-4960-a4e1-a8ca2b8111ab.jpeg)

## UML Activity Diagram

![WhatsApp Image 2022-05-13 at 11 44 13 AM](https://user-images.githubusercontent.com/90986401/168385941-8ab024e5-0925-4de2-9dc4-af982c0f81fe.jpeg)


## [Project Board]
We maintained a project board on trello and had bi-weekly sprint where we met daily to discuss on the task progress. This help in collaboration, communication, feedback, resolving blockers, resolving depencies etc.



### Technology Stack

    The project will be developed using:
    
      * Front End UI: React
      * SSO: Cognito. 
      * Backend: Node JS, TypeScript, NestJs, Express,Prisma
      * Database : MySQL
      * DNS : Route53
      * Storage : S3
      * Service Provider : AWS
      * CI/CD : GitHub Actions, Jenkins
      * Other Cloud Services : ALB, EC2 Fargate, Amazon ECR , Terraform
      
    
 ### AWS Configuration Screenshots

#### AWS Cognito


#### AWS S3


#### Terraform


#### AWS Certificate Manager 


#### AWS Route53


### Automate Deployment 


#### GitHub Actions


### Website Screenshots

#### Login


#### Employee Dashboard


#### Loan Details


#### Request a loan


#### View loans


#### Manager Dashboard


#### Approve/Reject Loans


#### View Employees


#### Admin Dashboard


#### Preclose the loans


#### View Employees


###### Backend APIs Postman collection link

https://www.getpostman.com/collections/5cace0e7e51d723410d8


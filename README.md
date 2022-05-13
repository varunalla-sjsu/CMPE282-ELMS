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
        * View their profile
        * View loan details
        * View all loans
        
        2. MANAGER
        * Login
        * Approve/Reject loans for an employee
        * View their profile
        * View all employees of department
        * View all departments
	* View all loans of that department
        
        3. ADMIN
        * Login
        * Preclose a loan
        * View their profile
        * View all employees
        * View all loans


## Architect Diagram:

![WhatsApp Image 2022-05-13 at 1 17 19 PM](https://user-images.githubusercontent.com/90986401/168385661-bdca6696-b278-4f1a-b42a-d5be43dcb05b.jpeg)


## UML Class Diagram

![WhatsApp Image 2022-05-13 at 11 44 12 AM](https://user-images.githubusercontent.com/90986401/168385905-c4aa835d-50e4-4960-a4e1-a8ca2b8111ab.jpeg)

## UML Activity Diagram

![WhatsApp Image 2022-05-13 at 11 44 13 AM](https://user-images.githubusercontent.com/90986401/168385941-8ab024e5-0925-4de2-9dc4-af982c0f81fe.jpeg)


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
      
 
 ### Database Design
 

![DBDesignCMPe282](https://user-images.githubusercontent.com/90986401/168397439-c346d308-03c4-46cc-bdf9-e50fb31ba40a.jpeg)


 ### AWS Configuration Screenshots
 
 
#### AWS Cognito

![image](https://user-images.githubusercontent.com/90986401/168399853-b65e920b-f024-48cd-8965-24ce19fe4c90.png)

![image](https://user-images.githubusercontent.com/90986401/168399876-6a43b065-eafd-46c3-aa16-906acc944284.png)

#### AWS S3

![image](https://user-images.githubusercontent.com/90986401/168399817-ec7f4bd4-7fa2-4252-b13b-6624b61354f5.png)

#### AWS ECS

![image](https://user-images.githubusercontent.com/90986401/168399607-820ae5cd-5327-4bab-af4f-fe03c329053c.png)

![image](https://user-images.githubusercontent.com/90986401/168399619-95d28825-5daf-41db-9b7a-93bab01e572f.png)


#### AWS Certificate Manager 

![image](https://user-images.githubusercontent.com/90986401/168399467-7a0a947b-a245-4ee3-9e64-c904470562cf.png)

#### AWS RDS

![image](https://user-images.githubusercontent.com/90986401/168399508-168779b9-179d-4056-834d-5e39bc44f502.png)

### Application Loan Balancer

![image](https://user-images.githubusercontent.com/90986401/168399542-d9e6367d-f6a2-4071-b545-f2f2cc2b8d2f.png)

![image](https://user-images.githubusercontent.com/90986401/168399696-7beb9be3-949a-4646-9d4b-2d37b848e4ce.png)


#### AWS EC2

![image](https://user-images.githubusercontent.com/90986401/168399573-3e90d976-541c-4b7a-a719-2790ce4ecebd.png)


#### AWS Route53

![image](https://user-images.githubusercontent.com/90986401/168399665-20f41cf1-4dc9-47a8-8567-1c5d62f47b23.png)

### Automate Deployment 


#### GitHub Actions

<img width="1440" alt="Screen Shot 2022-05-13 at 2 27 28 PM" src="https://user-images.githubusercontent.com/90986401/168392170-67626baa-abdb-4710-9652-2a03ed255dec.png">

<img width="1440" alt="Screen Shot 2022-05-13 at 2 28 03 PM" src="https://user-images.githubusercontent.com/90986401/168392180-9005c6cd-d0d2-4c22-93a6-b1e8e0fcd6f1.png">

<img width="1440" alt="Screen Shot 2022-05-13 at 2 28 34 PM" src="https://user-images.githubusercontent.com/90986401/168392188-8ca914d5-cbf5-470b-bd78-0f14f541c9da.png">


### Website Screenshots

#### Login

<img width="1440" alt="Screen Shot 2022-05-13 at 2 31 06 PM" src="https://user-images.githubusercontent.com/90986401/168392265-0537404d-8786-4b3a-98b8-a291fc632322.png">


#### Employee Dashboard

<img width="1440" alt="Screen Shot 2022-05-13 at 2 51 49 PM" src="https://user-images.githubusercontent.com/90986401/168397152-a5ec108d-176d-46fd-8011-7a7ca790dcba.png">



#### Loan Details
<img width="1440" alt="Screen Shot 2022-05-13 at 2 53 10 PM" src="https://user-images.githubusercontent.com/90986401/168397171-a5272ec3-de3c-43ec-8dce-780ea2fb98dc.png">


#### Request a loan
<img width="1440" alt="Screen Shot 2022-05-13 at 2 52 29 PM" src="https://user-images.githubusercontent.com/90986401/168397208-aba5d6be-0e0e-4d95-8bd2-d653bb3af149.png">


#### View loans
<img width="1440" alt="Screen Shot 2022-05-13 at 2 51 49 PM" src="https://user-images.githubusercontent.com/90986401/168397226-fb6382b2-0db7-4159-9127-15859303c631.png">


#### Manager Dashboard
<img width="1440" alt="Screen Shot 2022-05-13 at 2 49 46 PM" src="https://user-images.githubusercontent.com/90986401/168397251-acc99a70-fea3-48f8-8e22-e3e3a51b7aa1.png">


#### Approve/Reject Loans

<img width="1440" alt="Screen Shot 2022-05-13 at 2 54 00 PM" src="https://user-images.githubusercontent.com/90986401/168397259-d63ae243-4e12-4ec7-a9dc-fa2ada5142db.png">

#### View Employees
<img width="1440" alt="Screen Shot 2022-05-13 at 2 49 46 PM" src="https://user-images.githubusercontent.com/90986401/168397291-f62bb745-49bc-47ec-b711-ff29f611ef2a.png">
<img width="1440" alt="Screen Shot 2022-05-13 at 2 48 10 PM" src="https://user-images.githubusercontent.com/90986401/168397296-9b8e118a-6e0d-485c-b531-cfb8ebc069da.png">


#### Admin Dashboard

<img width="1440" alt="Screen Shot 2022-05-13 at 2 48 28 PM" src="https://user-images.githubusercontent.com/90986401/168397352-6d92e388-c4e8-417b-920e-9d7120749698.png">


#### Preclose the loans
<img width="1440" alt="Screen Shot 2022-05-13 at 3 03 49 PM" src="https://user-images.githubusercontent.com/90986401/168397361-9598312f-1d01-454f-8bfe-7f1a777a3b95.png">

### View Profile

<img width="1440" alt="Screen Shot 2022-05-13 at 2 49 06 PM" src="https://user-images.githubusercontent.com/90986401/168397395-bf507e3d-df11-4d14-a370-5d9f082c6524.png">


###### Backend APIs

https://www.getpostman.com/collections/5cace0e7e51d723410d8

http://vcloudoc.com/swagger/#/


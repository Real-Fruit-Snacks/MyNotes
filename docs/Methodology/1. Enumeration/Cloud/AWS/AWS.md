### can you quickly explain the most important components of AWS are from the POV of a pentester?

1. AWS Identity and Access Management (IAM) - This service allows you to manage users and their access to resources within your AWS account. It's important to secure access to your IAM resources, as they control who can access other resources within your AWS account.

2. Amazon Elastic Compute Cloud (EC2) - EC2 is a core component of AWS, allowing you to launch virtual servers in the cloud. These servers can be used to host websites, applications, and other resources. It's important to secure access to your EC2 instances and ensure that they are properly configured to prevent unauthorized access.

3. Amazon Simple Storage Service (S3) - S3 is a scalable, high-speed storage service that can be used to store a wide variety of data types. It's important to properly secure access to your S3 buckets and ensure that they are configured with the appropriate access controls.

4. Amazon Relational Database Service (RDS) - RDS is a managed database service that makes it easy to set up, operate, and scale a relational database in the cloud. It's important to secure access to your RDS databases and ensure that they are properly configured to prevent unauthorized access.

5. AWS Virtual Private Cloud (VPC) - VPC allows you to create a virtual network in the cloud, where you can launch resources in a logically isolated area. It's important to secure access to your VPC and ensure that it is properly configured to prevent unauthorized access to your resources.

Cheat sheets:
<https://github.com/dafthack/CloudPentestCheatsheets/blob/master/cheatsheets/AWS.md>
<https://www.youtube.com/watch?v=u_3cV0pzptY&t=881s>

### As a pentester, you'll likely be interested in the following AWS services:
1. Elastic Compute Cloud (EC2): Allows users to rent virtual computers on which to run their own computer applications.

2. Simple Storage Service (S3): Object storage with a simple web service interface.

3. Identity and Access Management (IAM): Allows you to manage access to AWS services and resources securely.

4. Virtual Private Cloud (VPC): Virtual networking environment.

5. Elastic Block Store (EBS): Block storage volumes for use with EC2 instances.

6. CloudTrail: It helps to monitor the user activity and API usage.

### Yes, Kubernetes (often shortened to "K8s") is often used with Amazon Elastic Compute Cloud (EC2).
Yes, it is becoming more common for web applications to be deployed using containers. 
The 2 most popular contain solutions are dockerer and kubernetes. Docker within kubernetes most common solution
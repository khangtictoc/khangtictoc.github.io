---
title: Company Interview Series 01
author: khangtictoc
date: 2025-07-06 00:34:00 +0800
categories: [Interview]
tags: [tier 2, bank]
---

I have no spoil which company is. This is a set of referenced questions for enhancing personal technical skills

## List of questions

### SESSION 1 (1.5 hrs)

**Topic**: Deep Technicall, every possible core technology

#### Git + Deploy

1. How can you manage app deployment version in your project ? 
   1.1 Describe about your release process. 
   1.2 How can you resolve roll back activities ? 
2. How you manage tags to control microservices's Docker image ? 
3. Some questions as a Git-managed repositories as a Senior Developers -> Forgot 

#### Jenkins

1. Describe your pipeline workflow you have used in your project. 
2. Do you integrate security DAST/SAST in your pipeline ? What is your current tools/solutions?  
   2.1 How do you configure to manage whether that codebase is deployed to releasing environment or not? 
   2.2 What is the metrics you use to evaluate the quality of code ? Do you understand the metrics ? What's it for ? 
3. Can a Jenkins pipelines/jobs run on nodes that running Jenkins ? 
   3.1 Do you use agent ? How does master nodes talk and give command to agent nodes ? Which port should be opened on master/agent nodes?

#### Docker 

1. What do you think Docker is released to solve which problems ? Why is it convenient ? 
2. Do you understand the core of Docker ? 
   - 2.1 How does container run and contact to other containers
   - 2.2 If you were to develop a new solution while Docker does not exist, how could you achieve that (volumes, network, ...)? 
3. Do you know how Docker images are built ? 
   - 3.1 How can you optimize Docker image's size ? What is this technique called ? 
   - 3.2 How can you optimize Docker build's time ? 
   - 3.3 How are Docker images cached ? 
   - 3.4 Why are Docker images built as layered ? Can we start with a Docker image with no "FROM" command ?

#### Kubernetes

1. What do you use Kubernetes environment for ? 
2. Describe a network connection flow from a user's laptop that access by domain , resolving IPs & connect to your pod workload running your application ? 
3. Tell me about all the main components on Master node & Worker nodes, includes all services to make a cluster work ? 
4. As a Kubernetes Developer, why do we need `Replica` resources type ? Could we just have `Deployment` and `Pod` ?
5. As a Kubernetes Developer, why do we need `PersistenVolumeClaim` ? Could we just use `PersistentVolume` or force the `Pod` or any workload to claim a specific an amount of disk storage ? 
6. What is a Container Runtime ? If you are meant to develop a new Container Runtime for your specific K8s cluster, do you have to follow any standard (To make the Kubernetes control plane to talk to Container Runtime) ? Describe a general steps that you will gonna do if you develop this platform ? 

#### Terraform 

1. How do you set up & run Terraform in your project ? 
2. You are in a bad-structured Terraform project, in general developing ways, a moduled resources is created with `count`, zero or one which depends on the variable `is_created`. But not for this project, if you did not specify any variable for that module, it will alert error, then you try to rewrite the code as best practice as possible.

Quest: The current running Terraform moduled resources suddenly switch to Array (zero or one as you rewrite a new code). So what happens if we are gonna plan or apply this time ? Tell me all the possibilities (Hint: in old Terraform version/ in new Terraform version)

1. If you have multiple accounts, for example, your AWS accounts. How can you manage that in your Terraform code? 

#### Cloud

1. How can you make a EC2 instance public so you can access it from your laptop ? How can you setup that instance could perform downloading a file from Internet access.
2. In AWS, we have a concept of "private" and "public" subnet . How about Azure ? What is the common architecture Azure compared to AWS ? 
3. For a scenarios, you have on-prem network, you have AWS cloud VPC. Assume that we have set up VPN connection between these private network. 
Quest: For a client in on-prem network, they need a way to use AWS credentials of a user (Access & secret key) to upload to S3 bucket on the cloud. Describe the main steps that you gonna configure. Client has a main requirement, **only with VPN,** user can use their credentials to perform commands like `aws cp test_file s3://test_bucket/`

### SESSION 2 (2 hrs)

**Topic**: Kubernetes (70% - incidence response, focus more on manage K8s cluster), Terraform (30% - a little bit, how to manage Terraform)

1. Ugrade cluster differs EKS & AKS ? 
2. Describe your experience managing EKS & AKS ?
3. How you manage cost in AKS, EKS ? Control-plan triggered costs in these cloud ? How to optimize cost managing k8s ? 
4. Helm chart deployment organized in your project ? 
5. How did you manage Secrets & Certificate in your K8s cluster ? 
6. How & Which resources did you backup in your K8s cluster ? 
7. Enforce policy in K8s cluster ? For example, a pod must have label "test: silly-label" before been deployed in cluster, it not satisfy policies, that resource should not be exist. 
8. Enforce network policy in K8s cluster ? For example, you have 10 different microservices, how can you make sure 8 services can communicate each others , 2 remains do nothing . 
9. Do you use any tools to spin up K8s ? -> Answer: Terraform -> A series of Terrafomr quest
10. How do your Terraform workflow work in your project ? How can all members of infra teams work together with minimal state conflicts ? 
11. What happens when 2 members apply terraform at the same time ? 
12. If you have 1000 resources created manually that have not been appeared yet in Terraform state. How could you resolve this ? 
13. If you have 1000 resources created by your Terraform in 3 environments (dev,uat, prd) in one single state file in S3 bucket, you want to migrate those resources into 3 separated state files for avoiding and minimalizing conflicts in state files when changes. How could you resolve this ? 
14. (Remaining time) Culture fits
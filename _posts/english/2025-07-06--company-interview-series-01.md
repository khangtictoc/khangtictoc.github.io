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
   2.1 How do you configure to manage whether that codebase is deployed to releasing environment or not  ? 
   2.2 What is the metrics you use to evaluate the quality of code ? Do you understand the metrics ? What's it for ? 
3. Can a Jenkins pipelines/jobs run on nodes that running Jenkins ? 
   3.1 Do you use agent ? How does master nodes talk and give command to agent nodes ? Which port should be opened on master/agent nodes?

#### Docker 

1. What do you think Docker is released to solve which problems ? Why is it convenient ? 
2. Do you understand the core of Docker ? 
   2.1 How does container run and contact to other containers
   2.2 If you were to develop a new solution while Docker does not exist, how could you achieve that (volumes, network, ...)? 
3. Do you know how Docker images are built ? 
   3.1 How can you optimize Docker image's size ? What is this technique called ? 
   3.2 How can you optimize Docker build's time ? 
   3.3 How are Docker images cached ? 
   3.4 Why are Docker images built as layered ? Can we start with a Docker image with no "FROM" command ?

#### Kubernetes

1. What do you use Kubernetes environment for ? 
3. Tell me about all the main components on Master node & Worker nodes, includes all services to make a cluster work ? 
4. As a Kubernetes Developer, why do we need `Replica` resources type ? Could we just have `Deployment` and `Pod` ?
5. As a Kubernetes Developer, why do we need `PersistenVolumeClaim` ? Could we just use `PersistentVolume` or force the `Pod` or any workload to claim a specific an amount of disk storage ? 
6. What is a Container Runtime ? If you are meant to develop a new Container Runtime for your specific K8s cluster, do you have to follow any standard (To make the Kubernetes control plane to talk to Container Runtime) ? Describe a general steps that you will gonna do if you develop this platform ? 

#### Terraform 

1. How do you set up & run Terraform in your project ? 
2. You are in a bad-structured Terraform project, in general developing ways, a moduled resources is create with `count`, zero or one which depends on the variable `is_created`. But not for this project, if you did not specify any variable for that module, it will alerts error, then you try to create as best practice as possible.
Quest: The current running Terraform moduled resources suddenly switch to Array (as it zero or one). So what happens if we are gonna plan or apply this time ? Tell me all the possibilities (Hint: in old Terraform version/ in new Terraform version)
3. If you have multiple account, for example, in your AWS account. Each account is given different permissions. How can you manage that in your Terraform code? 

### SESSION 2 (2 hrs)

**Topic**: Kubernetes (70% - incidence response, focus more on manage K8s cluster), Terraform (30% - a little bit, how to manage Terraform)
---
title: Takoyaki dominates the world
author: khangtictoc
date: 2024-09-22 00:34:00 +0800
categories: [Tutorial]
tags: [cicd, pipelines, deployment]
---


## A few words

In CI/CD, when speaking of CI(Continuous Integration), off the top of our head, we think about prominent solutions like Jenkins, Gitlab, Azure Devops, ... What 'bout **CD**, do we have something beautiful like that ? 
- Well yes, there are not so many solutions for "CD" part. In this post, I would like to bring out a common tool that "big-ass" enterprise are using these days. That is **ArgoCD**

## What is it ? What is it for ?

Look at the architecture below

![ArgoCD Architecture](/_posts/2025/argocd_architecture.png)

And then look straight ahead at **stupid octopus's face**. That's our **ArgoCD**. 

ArgoCD is a deployment tool used for deploying services on specific Kubernetes environment. It adapts **GitOps** mechanism which leverage **Git** source (many documents refer as 'sources of truth') to control the version of deployed infrastructure of Kubernetes environment. We manage declarative configuration files and it could perform an automation process to make the production environment match the described state in the repository

## Installation

## Highlight all-rounded outstanding features

## Some best practices
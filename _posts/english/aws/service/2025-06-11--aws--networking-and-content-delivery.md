---
title: AWS Services Summary - Networking & Content Delivery
author: khangtictoc
date: 2025-06-11 00:34:00 +0800
categories: [Summary, AWS Services Series]
tags: [cloud, aws]
---


## API Gateway

### Main features
- Throttling at multiple levels including global and by service call
- Add caching to API calls by provisioning an Amazon API Gateway cache and specifying its size in gigabytes. 

## CloudFront

### Main features
- Caching static files (images, HTML, CSS, Javascript, ...), front-end content website.
- Caching response contents for a request
- Integrate Lambda@Edge to handle 4 type of requests:
  - After CloudFront receives a request from a viewer (viewer request)
  - Before CloudFront forwards the request to the origin (origin request)
  - After CloudFront receives the response from the origin (origin response)
  - Before CloudFront forwards the response to the viewer (viewer response)

> **HTTP 504 (Gateway Timeout) errors** from CloudFront mean that CloudFront didn’t get a timely response from your origin. 
> **General reason**: origin takes long time to process request/response:
> - Data base query slow
> - Backend processes not efficiently
> - Large data 
> - ...

## AWS Global Accelerator 
### Main features
- Suitable for non-HTTP use cases, such as gaming (UDP), IoT (MQTT), or Voice over IP, as well as for HTTP use cases that specifically require static IP addresses or deterministic, fast regional failover


## VPC
### AWS Network Firewall 
#### Main features
- Supports domain name stateful network traffic inspection -> Create `Allow`  and `Deny` lists with domain names.
- NOT AN INTEGRATION SERVICES to any other resources like ELB, API Gateway, ...
- A feature that exists in VPC, created as a resource separately in VPC, **requires route table to route traffic** through it if we need to apply network policies.
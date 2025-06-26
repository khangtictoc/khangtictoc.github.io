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
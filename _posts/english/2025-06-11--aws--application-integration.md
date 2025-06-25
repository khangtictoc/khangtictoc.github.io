---
title: AWS Services Summary - Application Integration
author: khangtictoc
date: 2024-09-22 00:34:00 +0800
categories: [Summary, AWS Services Series]
tags: [cloud, aws]
---


## Simple Queue Service (SQS)

### Main features
- Create a queue of messages
- Expose an endpoint and wait for other applications to consume
- Producer/Consumer architecture

> NOTE: Can be combined with SNS to create Fan-out architecture.


## Simple Notification Service (SNS)

### Main features
- Create a queue of messages, stored in Topic
- A service or application will register (subscribe) a Topic.
- Whenever a message is pushed (publish) in a SNS Topic, immediately push to a subscribed endpoint
- Pub/Sub architecture

> NOTE: Can be combined with SQS to create Fan-out architecture.
---
title: AWS Services Series - Simple Queue Service (SQS)
author: khangtictoc
date: 2024-09-22 00:34:00 +0800
categories: [Summary]
tags: [cloud, aws]
---


## Instance
## Snapshot
## Auto Scaling Group

### Dynamic scaling policy

**Simple scaling**
- Based on CloudWatch alarm.
- Choose 1 action to conduct.
- Scale-in operation depends on CloudWatch alarm.

**Target tracking policy**
- Based on CloudWatch & built-in metrics (i.e Averge CPU Utilization). CloudWatch metrics must be available or defined. 
- Scale (in/out) operations trigger by calculating the current resources utilization that matches the defined target metric.
- Faster scale-in operation.

**Step scaling**
- It is a `Simple scaling` with various actions.
- Apply multiple actions for a scaling events.
- Allow scaling operation more smoothly and optimized.


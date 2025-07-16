---
title: AWS Services Summary - Compute
author: khangtictoc
date: 2025-06-08 00:34:00 +0800
categories: [Summary, AWS Services Series]
tags: [cloud, aws]
---

## Audience

Me

## EC2

### Storage/Disk

**Instance Store volume**: a temporary block-level storage for EC2 instances

### Monitoring

Default metrics:
- CPU
- Network/Bandwidth, Read/Write bytes

Not-ready metrics:
- Memory, Disk I/O:
  - Memory utilization
  - Disk swap utilization
  - Disk space utilization
  - Page file utilization
  - Log collection

Install metrics:
- Memory, Disk I/O: Install the Amazon CloudWatch agent to all the EC2 instances. View the custom metrics in the CloudWatch console.

### Dynamic scaling policy

**Types:**
Simple scaling
- Based on CloudWatch alarm.
- Choose 1 action to conduct.
- Scale-in operation depends on CloudWatch alarm.

Target tracking policy
- Based on CloudWatch & built-in metrics (i.e Averge CPU Utilization). CloudWatch metrics must be available or defined. 
- Scale (in/out) operations trigger by calculating the current resources utilization that matches the defined target metric.
- Faster scale-in operation.

Step scaling
- It is a `Simple scaling` with various actions.
- Apply multiple actions for a scaling events.
- Allow scaling operation more smoothly and optimized.

**Scale-In Mechanism**

Auto Scaling services choose below critiria to perform terminate EC2 instances

Priority:
1. AZ has the most VMs
2. Oldest launch templates (lowest version)
3. Closet to next billing hour
4. RANDOM if can't decide more.

![Scale-In Mechanism](assets/img/2025/aws/services-series/ASG-default-policy-evaluation-flowchart.png)


### Operation

**Take snapshot & restore**

Annotations:
- Source instance to take snapshot: `instance A`
- Destinated instance to perform restore: `instance B`

Steps:
- Take snapshot of a running `instance A`'s volumes. We have `snapshot A`
- Create a new volume from `snapshot A`. We have `volume A`
- On the target `instance B`, shutdown the instance.
- Force detachment on the `volume B` of `instance B`. **Then delete the volume if not use anymore**
- Attach the new `volume A` to `instance B`.
- Start `instance B`.
- Verify the `instance B` with new snapshot `snapshot A`





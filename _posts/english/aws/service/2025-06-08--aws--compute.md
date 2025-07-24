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

**Restart instance**

Notes:

- Only EBS-backed instances can be stopped and restarted
- Store-backed instance can only be rebooted or terminated, and its data will be erased if the EC2 instance is either stopped or terminated.

Keep-in-mind:

- When stopping an EBS-backed EC2 instance, the volume is preserved, but the data in any attached instance store volume will be erased.
- An EC2 instance has an underlying physical host computer. If the instance is stopped, AWS usually moves the instance to a new host computer.
- Your instance may stay on the same host computer if there are no problems with the host computer.
- In addition, its Elastic IP address is disassociated from the instance if it is an **EC2-Classic** instance. Otherwise, if it is an **EC2-VPC** instance, the Elastic IP address remains associated.

![Restart an EC2 instance](assets/img/2025/aws/services-series/instance-store.jpg)

**Stop Reserved instances**

- Go to the AWS Reserved Instance Marketplace and sell the Reserved instances.
- Terminate the Reserved instances as soon as possible to avoid getting billed at the on-demand price when it expires.

Reference: (https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Stop_Start.html)[https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Stop_Start.html]

### Load Balancer

#### Application Load Balancer

**Main features**

- Layer-7 OSI load balancer
- **Can not assign Elastic IP**

**Configurations**

- Hibernation Mode: It is not possible to enable or disable for an instance after it has been launched -> Migrate to an EC2 instance with hibernation enabled.

#### Network Load Balancer

- Layer-4 OSI load balancer
- **Can assign Elastic IP**

### Billing

#### Instance state lifecycle

![Instance state lifecycle](assets/img/2025/aws/services-series/instance_lifecycle.png)

Below are the valid EC2 lifecycle instance states:

| Instance state    | Description                                                                                                                                                                                                  | Instance usage billing |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| **pending**       | The instance is preparing to enter the running state. An instance enters the pending state when it is launched or when it is started after being in the stopped state.                                       | Not billed             |
| **running**       | The instance is running and ready for use.                                                                                                                                                                   | Billed                 |
| **stopping**      | The instance is preparing to be stopped. **Note:** If you hibernate an instance, you're billed while the instance is in the stopping state.                                                                  | Not billed             |
| **stopped**       | The instance is shut down and cannot be used. The instance can be started at any time.                                                                                                                       | Not billed             |
| **shutting-down** | The instance is preparing to be terminated.                                                                                                                                                                  | Not billed             |
| **terminated**    | The instance has been permanently deleted and cannot be started. **Note:** Reserved Instances that applied to terminated instances are billed until the end of their term according to their payment option. | Not billed             |

Reference: (https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html#instance-billing-by-state
)[https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html#instance-billing-by-state
]

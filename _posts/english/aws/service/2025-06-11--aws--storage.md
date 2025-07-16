---
title: AWS Services Summary - Storage
author: khangtictoc
date: 2025-06-11 00:34:00 +0800
categories: [Summary, AWS Services Series]
tags: [cloud, aws]
---


## Simple Storage Service (S3)

### Main Features

> **Fast-up data transfer:**
> -  Enable Transfer Acceleration in the destination bucket 
> -  Upload the collected data using Multipart Upload.


### Configuration

**Object Lock**

- Enable/Disable to lock on "Objects"

With Bucket Versioning enabled, bucket are controlled with more features:

Default retention mode:
- Governance:
  - Can't overwrite or delete an object version or alter its  settings unless having **special permissions**. 
  - To override or remove this settings, the TWO following conditions MUST BE SATISFIED:
    - Must have the `s3:BypassGovernanceRetention` permission 
    - include `x-amz-bypass-governance-retention:true` as a request header with any request that requires overriding governance mode.
- Compliance:
  - Can't overwrite or delete an object version or alter its  settings, **including the root user in your AWS account.**
  - For compliance purpose in a specific duration.


In compliance mode, a protected object version can't be overwritten or deleted by any user, including the root user in your AWS account. When an object is locked in compliance mode, its retention mode can't be changed, and its retention period can't be shortened. Compliance mode helps ensure that an object version can't be overwritten or deleted for the duration of the retention period.

To override or remove governance-mode settings 

Object Lock legal hold: 
- Apply for "Objects".
- Like "retention period", prevent object from being deleted or overwritten.



## Elastic Filesystem Storage (EFS)

### Configuration
- **EFS lifecycle policies:** maximum days is only up to 365 days

## Elastic Block Storage (EBS)

### Configuration

Amazon Data Lifecycle Manager (Amazon DLM): define policies that govern the lifecycle of these snapshots, ensuring regular backups are created and obsolete snapshots are automatically removed.

## Amazon Storage Gateway 
### Main Features
- Used for creating a backup of data from your on-premises
- Providing low-latency access to data by caching frequently accessed data on-premises


## AWS DataSync 
### Main Features
- Makes it simple and fast to move large amounts of data online between on-premises storage and Amazon S3, Amazon Elastic File System (Amazon EFS), or Amazon FSx for Windows File Server
---
title: AWS Services Summary - Storage
author: khangtictoc
date: 2025-06-13 00:34:00 +0800
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



## Elastic Filesystem Service (EFS)

### Configuration
- **EFS lifecycle policies:** maximum days is only up to 365 days
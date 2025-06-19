---
title: AWS Services Summary - Database
author: khangtictoc
date: 2024-09-22 00:34:00 +0800
categories: [Summary, AWS Services Series]
tags: [cloud, aws]
---


## DynamoDB

### Features & Components

**DynamoDB Accelerator (DAX)** feature is primarily used to significantly improve the in-memory read performance of your database

**A DynamoDB stream** is an ordered flow of information about changes to items in an Amazon DynamoDB table. When you enable a stream on a table, DynamoDB captures information about every modification to data items in the table.

**Amazon Kinesis Client Library (KCL)** is a coding module to write an application that leverages on DynamoDB Streams Kinesis Adapter that will fetch data from the DynamoDB Streams endpoint.

## Redshift

Features:
- Data warehousing solution
- Built on a relational database model


## RDS

### Features
- Multi-AZ failover: Decrease failover rate beside solely using Multi-AZ deployment.


### Configurations

**Enhanced Monitoring:** monitor how the different processes or threads on a DB instance use the CPU, including the percentage of the CPU bandwidth and total memory consumed by each process.

### Amazon Aurora 

A cluster of DB instances

**Features:**
- Connection:
  - Each connection is handled by a specific DB instance
  - When connecting to an Aurora cluster, the host name and port that you specify point to an intermediate handler called an "endpoint" => Abstract these connections
  - Advantages: 
    - Don't have to hardcode **hostnames** or **write logic** for load-balancing and rerouting connections when DB instances aren't available.
    - Different instances or groups perform different roles: Heavy-workload tasks will be redirected to **high-capacity endpoints** and vice versa.
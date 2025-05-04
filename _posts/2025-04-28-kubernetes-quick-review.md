---
title: Kubernetes Quick Review
author: khangtictoc
date: 2024-05-04 00:34:00 +0700
categories: [RKE2]
tags: [intro, kubernetes]
---

- [Introduction](#introduction)
  - [Kubernetes](#kubernetes)
  - [Container orchestration](#container-orchestration)



## Introduction

### Kubernetes

Followed by trendy technology, modern application are developed into multiple microservices. This very architecture encourages everyone to containerize everything. That's why Kubernetes comes to life.

Kubernetes are born to solve multiple problems from networking, storage, ... in an automatic way in a large-scale infrastructure. Every component of any application are seen as "microservices" for efficient management. Also, thanks to Kubernetes, researchers or learner like me can make my living and pay my own bill :-)

**Cluster**

A Kubernetes system has various units. Each unit play a independent role with specific features. A common Kubernetes cluster looks like below:

![Kubernetes Cluster](assets/img/2025/rke2-series/kubernetes-cluster-architecture.svg)

In summary: 

- **Master Node** is the headquarter which is responsible for management tasks like monitor **Worker nodes**'s health, decide and control rule for workloads to be placed on which **Worker**, store important data for cluster (etcd), ... They also expose API on port 6443 for developers like us to interactive with cluster
- **Worker Node** - simple, receive commands from Master nodes to run workload like web, app, ... Like me working for my boss -_-

> Note: **Worker's resources** are scaled to the demand of how heavy the application will run. While **Master's resources** are scaled by number of Worker and depend on specific orchestration.

**Component**

Every kubernetes system has following main components. Have a look!

![Kubernetes Cluster](assets/img/2025/rke2-series/components-of-kubernetes.svg)

*Quote from official Kubernetes document. Let's review all!*

**Control plane components**

**kube-apiserver**
- Exposes the Kubernetes API.

**etcd**
- Consistent and highly-available key value store used as Kubernetes' backing store for all cluster data.
- Make sure you have a back up plan for the data.

**kube-scheduler**
- Watches for newly created Pods with no assigned node, and selects a node for them to run on.
- Factors taken into account for scheduling decisions include: individual and collective resource requirements, hardware/software/policy constraints, affinity and anti-affinity specifications, data locality, inter-workload interference, and deadlines.

**kube-controller-manager**
- Runs controller processes. Logically, each controller is a separate process.
- There are many different types of controllers. Some examples of them are:
  - Node controller: Responsible for noticing and responding when nodes go down.
  - Job controller: Watches for Job objects that represent one-off tasks, then creates Pods to run those tasks to completion.
  - EndpointSlice controller: Populates EndpointSlice objects (to provide a link between Services and Pods).
  - ServiceAccount controller: Create default ServiceAccounts for new namespaces.
  - ...

**cloud-controller-manager**
- Lets you link your cluster into your cloud provider's API
- Only runs controllers that are specific to your cloud provider. If running Kubernetes on your own premises, the cluster does not have a cloud controller manager.

**kubelet**
- An agent that runs on each node in the cluster. It makes sure that containers are running in a Pod.
- The kubelet doesn't manage containers which were not created by Kubernetes.

**kube-proxy (optional)**
- A network proxy that runs on each node in your cluster, implementing part of the Kubernetes "Service" concept.
- Maintains network rules on nodes. 
- Uses the operating system packet filtering layer (`iptables`) if there is one and it's available. Otherwise, kube-proxy forwards the traffic itself.

> Note: If you use a network plugin that implements packet forwarding for Services by itself, and providing equivalent behavior to kube-proxy, then you do not need to run kube-proxy on the nodes in your cluster.

**Container runtime**
- A fundamental component that empowers Kubernetes to run containers effectively. 
- It is responsible for managing the execution and lifecycle of containers within the Kubernetes environment. For example: containerd, CRI-O, and any other implementation of the Kubernetes CRI (Container Runtime Interface).

There are **Addons**(DNS, Network plugins, Dashboard UI, ...). We would dissect these in the incoming topics. 

### Container orchestration

A Kubernetes cluster are very complicated in general. Once upon a time, there is no definition about "orchestration". All components are manually created, all keys or token are manually generated, ... Joining nodes to cluster? - Manual too! 

Refer to [Kubernetes The Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way) if you want to torture yourself. That's why orchestration are introduced to automate these process. Each orchestration will have its advantages, upgrade components for more advanced features or change underlying technology to gain lightweight, ... The table below lists some common orchestration and its prominent features:

<center>
<table>
    <thead> 
        <tr>
            <th>Name</th>
            <th>Features</th>
            <th>Use cases</th>
            <th>Lab/Production?</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Minikube</td>
            <td>
                <ul>
                    <li>All-in-one cluster in a single node</li>
                    <li>Core components are installed</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>Ready for building containered applications</li>
                    <li>Testing K8s ecosystem services</li>
                </ul>
            </td>
            <td><b>Lab Only</b></td>
        </tr>
        <tr>
            <td>K3S</td>
            <td>
                <ul>
                    <li>All-in-one cluster in a single node</li>
                    <li>Light-weight components, less-consumed resources</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>Run non-critical applications that does not use much features of K8s (Storage, Networking, ...)</li>
                    <li>i.e AWX, central dashboard, github, ... depend on contexts of "critical"</li>
                </ul>
            </td>
            <td><b>Both</b></td>
        </tr>
        <tr>
            <td>Kubeadm</td>
            <td>
                <ul>
                    <li>Manually install CRI</li>
                    <li>Manually install CNI</li>
                    <li>Partially self-managed Kubernetes cluster, require administrator skills</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>Researching the K8s architecture</li>
                    <li>Free to install any kind of services, choose any CNI, CRI</li>
                    <li>Running DEV/UAT/PROD applications</li>
                </ul>
            </td>
            <td><b>Both (Mainly for lab)</b></td>
        </tr>
        <tr>
            <td>RKE2</td>
            <td>
                <ul>
                    <li>Less self-managed K8s cluster</li>
                    <li>Boot up cluster or join nodes via YAML config</li>
                    <li>Easy set up</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>General purpose, all kind of domains</li>
                    <li>Be able to run production applications</li>
                    <li>Less taken actions when incidents happen</li>
                </ul>
            </td>
            <td><b>Production</b></td>
        </tr>
        <tr>
            <td>Openshift</td>
            <td>
                <ul>
                    <li>Less self-managed K8s cluster</li>
                    <li>Focus on security</li>
                    <li>Require Redhat licenses</li>
                    <li>Not much easy to set up</li>
                    <li>Benefits with features offered by Redhat</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>Mostly Banking and Finance applications</li>
                </ul>
            </td>
            <td><b>Production</b></td>
        </tr>
    </tbody>
</table>
</center>

> **Next:** [[Set up] Install New Cluster with HA Master](https://khangtictoc.github.io/posts/rke2-series/)
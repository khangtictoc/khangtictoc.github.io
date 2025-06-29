---
title: Docker Quick Review
author: khangtictoc
date: 2025-06-11 00:34:00 +0800
categories: [Theory]
tags: [container]
---

- [Intro](#intro)
  - [A Few words](#a-few-words)
  - [Before Docker](#before-docker)
  - [Docker introduced](#docker-introduced)
- [Concept \& Component](#concept--component)
  - [1. Network](#1-network)
  - [2. Volumes](#2-volumes)
    - [a. Mount](#a-mount)
- [Daemon](#daemon)
- [Context](#context)
- [Swarm](#swarm)
- [Docker Build](#docker-build)
  - [Builder](#builder)
  - [Variable](#variable)
  - [Multi-platform](#multi-platform)
  - [Multi-stages](#multi-stages)
  - [BuildKit](#buildkit)
  - [Best practice](#best-practice)
- [More](#more)


## Intro

### A Few words

This is a long-read journey that gathers all the **fundamental** knowledge about Docker. Especially the [Docker Build](#docker-build) section, this will include all concepts that you can use for **mainly interviewing purpose**. 

### Before Docker

**"It works on my machine" syndrome**
Applications behaved differently across environments due to OS differences, dependencies, or configuration drift.

**Heavy virtual machines (VMs)**
While VMs isolated environments, they were resource-heavy, slow to boot, and hard to manage at scale.

**Complex deployment workflows**
Shipping code from development to production required manual steps, making it error-prone and slow.

**Speed & Efficiency**
An independent VM's start up is much slow.

### Docker introduced

**Speed & Efficiency**
Containers start up faster than an isolated VM, run with the OS layer, use system resources more efficiently, enabling microservices and scalability.

**Immutable Infrastructure**
Once built, a container image doesn’t change. The packaged image represents an immutable version of application.

## Concept & Component

### 1. Network

Much alike traditional VM, isolated by default
- Docker creates virtual networks using Linux kernel features like network namespaces.
- Each container has its own network stack (IP address, routing table, etc.), isolated from other containers and the host.
- Internal Docker DNS daemon is running at each container's loopback ip addresses range. View this at `/etc/resolv.conf`


**Multiple Built-in Network Drivers**
Docker provides several network drivers, each defining a different mode of communication:

| Driver                 | Nature & Use Case                                                                    |  
| ------------------     | ------------------------------------------------------------------------------------ | 
| `bridge` (Default)     | Default for standalone containers. Containers share a bridge (virtual switch).       |
| `host`                 | Container shares host's network stack. No isolation. High performance.               | 
| `none`                 | No network. Full isolation.                                                          |
| `overlay`              | For multi-host networks (e.g., with Docker Swarm). Enables cross-node communication. |
| `macvlan`              | Assigns a MAC address to the container, making it appear like a physical device.     |

> **NOTE:** For testing Docker network, the best case is performing on Linux machines.

**🟦 Bridge Network (default)**

> **NOTE**: Unlike *default bridge network*, a container run on *customed created bridge network* can resolve IP address by container name.

Features:
- Use embedded Internal DNS server `127.0.0.11`
- Use NAT mechanism

Testing steps:
- Create or use default bridge network
- Create 2 containers use this network
- Ping each others, if customed network is used, we can perform ping on *container name*
  
**🟦 Host Network**

Features:
- Use WSL2/Docker Desktop’s DNS.
- No separate interface. No NAT. Use host machine's network.

Testing steps:
- Create a container using host network type
- Run a simple nginx at port 80 (you can use nginx image)
- Access [http://localhost](http://localhost) on local machine


### 2. Volumes

#### a. Mount

Docker supports **three main types of mounts** for volumes and filesystems:

**🔧 `Volumes` (type = volume)**

Managed by Docker. Delete container -> Volume would be deleted.

**Notes**

- On Linux machine, these volumes are stored in `/var/lib/docker/volumes`
- On Window host machine, then Docker-managed volumes are stored at path `\\wsl.localhost\docker-desktop-data\data\docker\volumes\<VOLUME_HASH>\_data` by **Docker Desktop**.

🔹 Syntax

```bash
docker run -v <myvolume_name>:/path/in/container ...
# or with --mount
docker run --mount type=volume,source=<myvolume_name>,target=/path/in/container ...
```

🔹 Use cases
- Best for persisting container data (like databases).
- Docker manages storage lifecycle.
- Named or anonymous volumes.

🔹 Pros
- Portable.
- Backed up easily.
- Works across platforms (e.g. Docker Desktop).



**📁 `Bind` Mounts (type = bind)**

Mounts a host file or directory into the container. Delete container -> Data on local machine persisted.

🔹 Syntax

```bash
docker run -v /host/path:/container/path ...
# or
docker run --mount type=bind,source=/host/path,target=/container/path ...
```

🔹 Use cases
- Development: mount local source code.
- Access files on local host machine.

🔹 Pros
- Full control over what is mounted.
- Reflects live changes from the host.

🔹 Cons
- Can cause permission issues.
- Ties container to host path.
- Not portable across systems.

**🔗 `tmpfs` Mounts (type = tmpfs)**
Mounts a temporary in-memory filesystem (no disk write). Stop container -> Volume would be deleted.

🔹 Syntax

```bash
docker run --mount type=tmpfs,target=/container/path ...
```

🔹 Use cases
- Store sensitive data temporarily (e.g. credentials).
- Improve I/O speed for temporary workloads.
- Avoid writing to disk.

🔹 Pros
Very fast (RAM).
Nothing persists to disk.

🔹 Cons
- Volatile: data lost on stop.
- Uses host memory.

✅ Summary Table
| Type     | CLI flag        | Backed by      | Persistent | Best for                        |
| -------- | --------------- | -------------- | ---------- | ------------------------------- |
| `volume` | `-v`, `--mount` | Docker-managed | ✅ Yes      | Persistent container data       |
| `bind`   | `-v`, `--mount` | Host path      | ✅ Yes      | Dev, host access, config mounts |
| `tmpfs`  | `--mount` only  | Host RAM       | ❌ No       | Secrets, speed, temp files      |


## Daemon

## Context

## Swarm

No one use Swarm any more. We use Kubernetes 😂

## Docker Build

### Builder

### Variable

### Multi-platform

### Multi-stages

### BuildKit

### Best practice

## More
- Labels & Annotation (Image's metadata)
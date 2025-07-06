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

> **NOTE**: Unlike *default bridge network*, a container run on *self-created bridge network* can resolve IP address by container name.

Features:
- Use embedded Internal DNS server `127.0.0.11`, inspect `/etc/resolv.conf`
- Use NAT mechanism

Testing steps:
- Create new or use the default bridge network
- Create 2 containers using this network
- Ping each others, if self-created network is used, we can perform ping on *container name*
  
**🟦 Host Network**

Features:
- Use WSL2/Docker Desktop’s DNS, inspect `/etc/resolv.conf`
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

A **builder** is the environment that executes instructions in the Dockerfile.

- Default: Each line creates a new intermediate layer.
- `FROM` defines the base image (e.g., `alpine`, `node`, `python`, etc.)
- **Custom builders**: You can use different base images via multi-stage builds.

🔹 Common base images:

- `scratch`: empty base, for minimal images
- `alpine`: small size, good for production
- `debian/ubuntu`: feature-rich, more packages available

> **TIP:** Avoid unnecessary layers – keep commands concise (e.g., `RUN apt-get update && apt-get install -y curl`)

---

### Variable

**ARG** and **ENV** let you define variables.

| Keyword | Scope           | Use Case                       |
| ------- | --------------- | ------------------------------ |
| `ARG`   | Build-time      | Conditional installs, flags    |
| `ENV`   | Build & runtime | Configuration, secrets (light) |

🔹 Examples:

```Dockerfile
ARG BASE_VERSION=1.0
FROM myapp:${BASE_VERSION}

ENV PORT=8080
EXPOSE $PORT
```

> `ARG` is not accessible after build. `ENV` persists into the image.

---

### Multi-platform

Use Docker Buildx to build images for different architectures (e.g., `linux/amd64`, `linux/arm64`).

🔹 Command:

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t myimage:latest .
```

🔹 Useful for:

- ARM devices (e.g., Raspberry Pi, Apple Silicon Macs)
- CI/CD pipelines targeting multiple platforms

> Requires **BuildKit** (enabled by default in modern Docker)

---

### Multi-stages

Optimize image size by separating build dependencies from runtime.

🔹 Example:

```Dockerfile
# Stage 1: Build
FROM golang:1.20 AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp

# Stage 2: Runtime
FROM alpine:latest
COPY --from=builder /app/myapp /usr/local/bin/myapp
CMD ["myapp"]
```

Benefits:

- Clean image
- Smaller size
- No compiler/runtime bloat

---

### BuildKit

Modern build engine that improves speed, caching, and functionality.

🔹 Features:

- Parallel build steps
- Secret mounting (`RUN --mount=type=secret`)
- Better caching
- Inline frontend features (e.g., `# syntax=docker/dockerfile:1.5`)

🔹 Enable it:

```bash
export DOCKER_BUILDKIT=1
```

> Automatically enabled on recent Docker versions

---

### Best practice

💪 Do:

- Use `.dockerignore` to reduce context size
- Use multi-stage builds to keep image slim
- Pin image versions (`FROM node:18-alpine`)
- Combine `RUN` steps to reduce layers
- Minimize `ADD`; prefer `COPY`
- Use non-root users in production

🚫 Avoid:

- Hardcoding secrets
- Installing unnecessary dev tools
- Large base images



## More
- Labels & Annotation (Image's metadata)
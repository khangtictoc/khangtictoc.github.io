---
title: Physical & Database Relationship - Modern Data Consistency Over Partitions
author: khangtictoc
date: 2025-06-13 00:34:00 +0800
categories: [Theory]
tags: [storage, database]
---

## 🧾 Goal
- Simulate how keys are mapped to partitions (nodes) using **Consistent Hashing**.
- Then simulate what happens when you add a new partition.
- Show how only some keys are remapped (not all, unlike naive hash % N).

## ⚙️ Setup

- **Hash Ring Range**: `0 - 99` (for simplicity)  
  _(Real systems may use a space like `0` to `2³²` or `2⁶⁴`, but `0–99` makes it easier to follow)_

### 🧱 Initial Partitions (Nodes)

| Node | Hash Position |
|------|---------------|
| A    | 10            |
| B    | 40            |
| C    | 70            |

### 🧑 Sample Keys (Users)

| Key      | `Hash(key)` (simulated) |
|----------|--------------------------|
| alice    | 15                       |
| bob      | 43                       |
| charlie  | 67                       |
| dave     | 84                       |
| eve      | 5                        |

## ✅ Step 1: Place Keys on Ring and Assign to Nodes

### Rules

- Keys go to the **next node clockwise**.
- If a key's hash exceeds the highest node, it wraps around to node at the lowest position.

### 🔗 Assignment

| Key     | Hash | Assigned Node | Reason                          |
|---------|------|----------------|---------------------------------|
| eve     | 5    | A (10)         | 5 → next ≥ 10                  |
| alice   | 15   | B (40)         | 15 → next ≥ 40                 |
| bob     | 43   | C (70)         | 43 → next ≥ 70                 |
| charlie | 67   | C (70)         | 67 → next ≥ 70                 |
| dave    | 84   | A (10, wrap)   | 84 → wrap → next ≥ 10          |

## 📊 Initial Mapping Summary

| Node | Keys Assigned     |
|------|--------------------|
| A    | eve, dave         |
| B    | alice             |
| C    | bob, charlie      |

## ➕ Step 2: Add New Node D at Hash Position 50

### 🆕 Updated Nodes

- A (10)  
- B (40)  
- **D (50)**  
- C (70)

### 🔄 Recalculate Assignments

| Key     | Hash | New Assigned Node | Previously |
|---------|------|-------------------|------------|
| eve     | 5    | A (10)            | A          |
| alice   | 15   | B (40)            | B          |
| bob     | 43   | **D (50)**        | C ✅ moved |
| charlie | 67   | C (70)            | C          |
| dave    | 84   | A (10, wrap)      | A          |

## 📉 Impact of Adding Node D

| Key     | Moved?                     |
|---------|----------------------------|
| bob     | ✅ Yes (C → D)             |
| Others  | ❌ No                      |

> Only **one key (`bob`)** was remapped — this demonstrates the efficiency of consistent hashing.

## 📌 Visual Ring Representation (Simplified)

```
  0           25           50           75          99
   +-----------+------------+------------+-----------+
   |           |            |            |           |
 [A-10]     [B-40]      [D-50]       [C-70]        wrap
   ^           ^            ^            ^
   |           |            |            |
 eve,dave    alice         bob        charlie
```

## 🧠 Why Consistent Hashing is Great

| Feature                        | Benefit                         |
|--------------------------------|----------------------------------|
| Key hash independent of `N`    | Stable unless key changes       |
| Only a subset of keys move     | Scales easily                   |
| Balanced load (with vnodes)    | More even distribution          |

## 🧮 How Do We Get Node D at Hash Position 50?

### ✅ Short Answer

> The node's hash position is calculated using the **same hash function** used for keys, applied to the node's **unique identifier** (e.g., `"NodeD"`).

### 🔍 Step-by-Step

#### 1. Choose an Identifier

- `"NodeD"`  
- Or something like `"192.168.0.4:8080"` or `"server-004"`

#### 2. Apply the Hash Function

```python
# Simplified example
hash("NodeD") % 100  → 50
```

> This gives **Node D** a position of **50** on the ring.

#### 3. Use Consistent Hash Function

```python
import hashlib

def get_ring_position(node_id, ring_size=100):
    hash_bytes = hashlib.md5(node_id.encode()).digest()
    hash_int = int.from_bytes(hash_bytes, byteorder='big')
    return hash_int % ring_size

get_ring_position("NodeD")  # → e.g., 50
```

## 🎯 Bonus: Why Use Virtual Nodes?

| Node   | Virtual Node Positions |
|--------|-------------------------|
| Node D | 50, 73, 91              |

- Using **virtual nodes** (multiple positions per node) helps avoid uneven load.
- This is especially useful if nodes end up clustered in the hash space.

## 🌍 Real-World Uses of Consistent Hashing

Consistent hashing is widely used in modern distributed systems for scalability, fault tolerance, and load balancing.

### ✅ Distributed Databases & Caches

#### 🔹 Amazon DynamoDB
- Uses consistent hashing to partition data and support horizontal scaling.

#### 🔹 Apache Cassandra
- Each node owns a range on the ring.
- New nodes join by taking part of the range, minimal key movement.

#### 🔹 Memcached
- In multi-node deployments, consistent hashing ensures that only a small subset of keys are remapped when a node is added/removed.

### 🌐 Content Delivery Networks (CDNs)

#### 🔹 Akamai, Cloudflare
- Use hashing to assign content or requests to edge servers.
- Minimal rebalance on server change.

### ⚖️ Load Balancers

#### 🔹 NGINX, Envoy
- Hash-based load balancing (e.g., hash by IP) supports sticky sessions.
- Adding/removing backends only affects affected client hashes.

### 🗄️ Object Storage Systems

#### 🔹 Ceph, OpenStack Swift
- Consistent hashing determines where objects are stored across many disks/nodes.

### 🔁 Service Mesh / Routing

#### 🔹 Istio, Linkerd
- Traffic routing based on consistent hashing of keys (like user IDs) to maintain session stickiness or shard requests.

### 📬 Pub/Sub and Messaging Systems

#### 🔹 Apache Kafka
- Partitions are often chosen by key-based hashing.
- Consumers scale predictably with minimal rebalance.

### 🧠 DNS Load Balancing

#### 🔹 Netflix, Google
- Use hash-based routing to send users to the same edge nodes or POPs based on IP or region.

---

### 🧠 Why It’s So Popular

| Feature | Benefit |
|---------|---------|
| Minimal remapping | Only affected keys move |
| Scalable | Add/remove nodes easily |
| Predictable | Same key → same node |
| Fast | Hashing is computationally cheap |
| Stateless | No central coordinator needed |

## ✅ Final Summary

- Each **key** is hashed into a number (0–99).
- It’s then assigned to the **next node clockwise**.
- When you **add a new node**, only **some keys** (between previous and new node) are remapped.


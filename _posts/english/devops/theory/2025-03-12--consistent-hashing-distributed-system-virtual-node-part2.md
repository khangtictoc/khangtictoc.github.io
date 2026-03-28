---
title: Consistent Hashing In Distributed Systems (Part 2 - END)
author: khangtictoc
date: 2025-06-20 00:34:00 +0800
categories: [Theory]
tags: [storage, database]
---

_(AI Generated Testing)_

# Virtual Nodes

## 🧩 Context: Why We Need Virtual Nodes (vnodes)

This article continues from **Part 1** of the series, where we learned the basics of consistent hashing and how keys are mapped onto a hash ring.  
In this part, we focus on a major limitation of the basic model—and the powerful solution used by DynamoDB, Cassandra, Ceph, and most modern distributed systems: **Virtual Nodes (vnodes)**.

---

## 🚨 Problem: Real Nodes Do _Not_ Split the Ring Equally

In theory, we want each node to store **roughly the same amount of data**.  
But in practice:

- Each node only has **one position** on the hash ring.
- That position is determined by a **hash function** (e.g., MD5(node-id)).
- Hash outputs are _uniform_, but when you have only a few nodes (e.g., 3–10), the spacing is random and uneven.

Example:

| Node | Hash Position |
| ---- | ------------- |
| A    | 10            |
| B    | 40            |
| C    | 70            |

These are **not evenly spaced** (10 → 40 = 30; 40 → 70 = 30; 70 → 10 = 40 wrap).  
Even a slightly different input can make gaps worse.

This leads to **data imbalance**. Not an ideal distributed system, a node holds much more data than others.

---

## 🧠 Why Not Just Space Nodes Equally?

Answer:

**We can't**—because the hash function decides positions.  
You cannot force MD5/sha1 to give evenly spaced outputs.

Real distributed systems rely on hashing for determinism, not manual spacing.

---

## 🦾 The Solution: Virtual Nodes

Instead of giving each node **one position**, we give each node **many positions**. These node's positions represent node itself, these logical position calculation divide hash ring into multiple partition. That's why it's called Virtual Node.

Example (Node A with 4 virtual nodes):

- `NodeA#1` → 10
- `NodeA#2` → 35
- `NodeA#3` → 60
- `NodeA#4` → 85

Node A now appears multiple times around the ring.

When all nodes have hundreds of vnodes, the randomness averages out →  
**nearly perfect balance**.

---

## 🔢 How Are Virtual Node Positions Calculated?

`hash(node_id + "#" + vnode_index) % RING_SIZE`

Example using MD5:

```python
hash("NodeA#1") % 100 → 10
hash("NodeA#2") % 100 → 35
hash("NodeA#3") % 100 → 60
hash("NodeA#4") % 100 → 85
```

## 🧱 Example Ring with Virtual Nodes

| Physical Node | Virtual Node Positions |
| ------------- | ---------------------- |
| A             | 10, 35, 85             |
| B             | 20, 50, 90             |
| C             | 5, 40, 70              |

Now each node’s responsibility is spread across the ring.

### ✅ Step 1: Key Assignment with Vnodes

| Key   | Hash | Assigned Node | Reason         |
| ----- | ---- | ------------- | -------------- |
| alice | 12   | B (20)        | 12 → next ≥ 20 |
| bob   | 37   | C (40)        | 37 → next ≥ 40 |
| dave  | 88   | B (90)        | 88 → next ≥ 90 |
| eve   | 72   | A (85)        | 72 → next ≥ 85 |

**📊 Mapping Summary with Vnodes**

| Node | Keys Assigned |
| ---- | ------------- |
| A    | eve           |
| B    | alice, dave   |
| C    | bob           |

👉 Keys are distributed more evenly across A, B, C.

## ➕ Step 2: Adding a New Node D

Node D → virtual positions: 15, 45, 75.

Only keys in ranges near 15, 45, 75 move to Node D.

All other keys stay where they are.

Impact

| Key   | Hash | Old Node | New Node |
| ----- | ---- | -------- | -------- |
| alice | 12   | B        | D        |
| bob   | 37   | C        | D        |
| eve   | 72   | A        | D        |
| dave  | 88   | B        | B        |

👉 Minimal remapping, balanced distribution.

📊 Why Virtual Nodes Work

**Feature Benefit**

- Multiple positions/node Smooths out randomness
- Uniform distribution Keys spread evenly across all nodes
- Weighted assignment Stronger nodes can get more vnodes
- Minimal disruption Only nearby ranges move on node change

## 📌 Visual Ring Representation (Simplified)

```
0           25           50           75          99
  +-----------+------------+------------+-----------+
  |           |            |            |           |
[C-5]     [A-10]       [B-20]       [A-35]       [C-40]
  |           |            |            |           |
[D-45]     [B-50]       [C-70]       [D-75]       [A-85]
```

# Weighted Virtual Nodes

## ⚠️ Problem: Not All Servers Are Equal

- In Part 2, we solved imbalance by giving each node multiple vnodes.
- But we assumed **all servers have the same capacity**.
- In reality:
  - Some servers are **large machines** with more CPU, RAM, and disk.
  - Others are **smaller nodes**.
- If each gets the same number of vnodes, small servers may be **overloaded**.

## 🛠️ Solution: Weighted Virtual Nodes

- Assign each node a **weight** proportional to its capacity.
- Number of vnodes = `base_vnodes × weight`.

### Example

| Node | Capacity | Weight | Virtual Nodes |
| ---- | -------- | ------ | ------------- |
| A    | Large    | 3      | 300           |
| B    | Medium   | 2      | 200           |
| C    | Small    | 1      | 100           |

👉 Stronger servers handle more keys, weaker servers handle fewer.

## ✅ Step 1: Key Assignment with Weighted Vnodes

- `"alice"` → hash = 12 → next vnode → Node A (large server).
- `"bob"` → hash = 37 → next vnode → Node B (medium server).
- `"dave"` → hash = 88 → next vnode → Node C (small server).

Keys are distributed **proportional to capacity**.

## ➕ Step 2: Adding a New Node D

- Node D (weight = 2) → gets 200 vnodes.
- Only keys near those vnodes move to Node D.
- Distribution remains balanced relative to capacity.

## 📊 Why Weighted Vnodes Work

| Feature           | Benefit                               |
| ----------------- | ------------------------------------- |
| Capacity-aware    | Big servers handle more load          |
| Flexible scaling  | Add/remove nodes without disruption   |
| Fair distribution | Prevents small servers from overload  |
| Real-world ready  | Matches heterogeneous cluster reality |

## 📌 Visual Ring Representation (Simplified)

0 25 50 75 99
+-----------+------------+------------+-----------+
| | | | |
[A-...] [B-...] [C-...] [D-...] wrap
^ ^ ^ ^
| | | |
Large Medium Small Medium

## 🌍 Real-World Usage

- **Apache Cassandra** → supports weighted vnodes for heterogeneous clusters.
- **Ceph (CRUSH maps)** → distributes objects based on device weight.
- **Load balancers (NGINX, Envoy)** → weighted hashing ensures bigger backends handle more traffic.

## ✅ Final Summary

- Equal vnodes solve imbalance but assume equal servers.
- Weighted vnodes assign **more positions to stronger servers**.
- This ensures **fair load distribution** in heterogeneous clusters.
- Weighted vnodes are essential for real-world distributed systems.

Thanks for following this long-long series. You don't need to implement to understand this, but you will achieve the fundamental knowlegde for configuring consistent hash ring in the real system: All the relevant parameters in the formular are equally important to make the system run stably and consistently with best performance. Good luck 🎯

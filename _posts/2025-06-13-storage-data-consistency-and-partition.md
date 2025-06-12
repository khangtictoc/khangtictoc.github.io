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

## ✅ Final Summary

- Each **key** is hashed into a number (0–99).
- It’s then assigned to the **next node clockwise**.
- When you **add a new node**, only **some keys** (between previous and new node) are remapped.

## 📌 Want More?

Let me know if you'd like:

- 🐍 A Python implementation of this simulation  
- 🎞 A visual animation or flowchart  
- 🔁 Examples using **virtual nodes** for better balance






You said:
how do we know  New Node D at Hash Position 50  ? 


ChatGPT said:
Excellent follow-up — and a very important detail. In consistent hashing, the position of a node (like Node D at 50) must be determined by hashing, just like we hash keys.

✅ Short Answer:
Node D’s hash position (50) is calculated by applying the same hash function to a unique identifier of the node (like "NodeD" or its IP address or instance ID).

🔍 Step-by-Step: How Node Hash Position is Determined
1. Choose an Identifier for the Node
This should be unique per node, such as:

"NodeD"

"192.168.0.4:8080" (IP + port)

"server-004"

2. Hash the Identifier
Use the same hash function used for keys, e.g., MurmurHash, MD5, SHA-1, etc.

For example:

python
Copy
Edit
hash("NodeD") % 100  → 50  # simplified for hash ring of 0–99
This gives Node D a position of 50 on the ring.

3. That’s Its Position on the Hash Ring
💡 Real-World Example (Python-like logic):
python
Copy
Edit
import hashlib

def get_ring_position(node_id, ring_size=100):
    hash_bytes = hashlib.md5(node_id.encode()).digest()
    hash_int = int.from_bytes(hash_bytes, byteorder='big')
    return hash_int % ring_size

get_ring_position("NodeD")  # e.g., returns 50
🧠 Key Insight
Both keys and nodes are hashed using the same function.

This gives a uniform distribution of nodes and keys across the ring.

When adding new nodes, the ring positions are deterministic based on the identifier.

Bonus: Why Use Virtual Nodes?
If "NodeD" ended up very close to "NodeB" (say at position 42), there could be uneven load. So many systems assign multiple hash positions per node, e.g.:

Node	Virtual Node Positions
Node D	50, 73, 91

This is called virtual nodes or vnodes, and it ensures better load distribution.

✅ Summary
Concept	Value
What is node position?	Hash of node's identifier
Who decides it?	The consistent hashing function
Same as key hashing?	✅ Yes, must be the same
Fixed across restarts?	✅ If identifier is stable


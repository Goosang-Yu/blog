---
title: "Linear Algebra: Coordinate Systems and Basis"
date: "2025-12-26"
description: "A summary of the core concepts of Linear Algebra: Basis and Coordinate Systems."
category: "math"
tags: ["math", "linear-algebra"]
field: "Mathematics"
topic: ["Matrix", "Basis"]
lang: "en"
translationId: "linear-algebra-basis"
---

In Linear Algebra, understanding **Basis** and **Coordinate Systems** is crucial for grasping vector spaces. In this post, we explore their definitions and relationships.

![Coordinate Systems and Basis Visualization](/images/posts/linear-algebra-basis.png)

## 1. Basis

A basis is a set of vectors in a vector space $V$ that spans $V$ and is linearly independent.

If a set $\mathcal{B} = \{v_1, v_2, ..., v_n\}$ is a basis for a vector space $V$, then any vector $x$ in $V$ can be expressed as a unique linear combination of $v_1, ..., v_n$.

$$ 
x = c_1v_1 + c_2v_2 + ... + c_nv_n
$$

Here, $c_1, ..., c_n$ are unique scalars.

## 2. Coordinate Systems

The scalars $c_1, ..., c_n$ obtained above are called the **coordinates** of vector $x$ relative to the basis $\mathcal{B}$.

This is expressed in vector form as:

$$ 
[x]_\mathcal{B} = \begin{bmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{bmatrix}
$$

The common $(3, 2)$ coordinates on an $xy$ plane actually refer to the coordinates relative to the standard basis $e_1 = (1, 0)$, $e_2 = (0, 1)$.

## 3. Change of Basis

The same vector can have different coordinates depending on which basis is used. This is called a **change of basis**. Changing the basis is like changing the 'perspective' from which we view the vector.

For example, when compressing images or analyzing data (like PCA), find a new basis that best represents the data features and transform the coordinates.

## Summary

- **Basis**: The basic structure that forms a space.
- **Coordinates**: Values representing position relative to that structure.

These concepts are applied in various fields such as computer graphics and machine learning.

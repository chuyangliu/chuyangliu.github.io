Sum tree is a data structure similar to [binary heap][wiki-binary-heap]. Instead of the usual heap property, the value of a parent node is the sum of its children. DeepMind used this data structure to efficiently sample data according to their priorities<sup>[[1]](#references)</sup>. Concretely, data with higher priority will be more likely to be sampled and the time complexity of sampling and updating a sum tree is \\(O \left( \log n \right)\\), where \\(n\\) is the number of nodes in the tree. [[Source]][src-sum-tree]

## Definitions

| Symbol | Description |
| ------ | ----------- |
|\\(n\\)|Number of nodes in the sum tree.|
|\\( a_i \ \left( 1 \leqslant i \leqslant n \right) \\)|One specific node in the sum tree. The subscript \\(i\\) is the same as the index of the array representation of binary heap (with \\(i=1\\) indicating the root node, \\(i*2\\) indicating the left child, etc).|
|\\( parent \left( a_i \right) \\)|Parent node of node \\(a_i\\).|
|\\( v \left( a_i \right) \\)|Value of node \\(a_i\\). If the node is a leaf, the value is the priority of the data associated with it. Otherwise, the value is the sum of the values of its two children.|
|\\( P \left( a_i \right) \\)|Probability that node \\(a_i\\) is *visited*.|

## Example

Suppose we have a data set of \\(8\\) elements and the priority values are \\(3,10,12,4,1,2,8,2\\), respectively. Now we want to sample one element from this data set and expect that elements with higher priority will be more likely to be sampled. To solve this problem, we can build a sum tree below:

![](/media/default/sum_tree.png)

From the picture<sup>[[2]](#references)</sup>, we can see that the tree has \\(8\\) leaves storing the priority values of the \\(8\\) elements. The value of each inner node is the sum of the values of its two children. Thus, the value of the root node is the sum of all priority values. In this problem, \\(42\\).

To sample one element, first we uniformly sample a number within the interval \\( \left[ 0,42 \right] \\). Suppose we get the number \\(24\\), we start at the root node and look at its left child (with value \\(29\\)), finding that \\(24 \leqslant 29\\), so we transfer our focus from the root node to the left child. Looking at its left child (with value \\(13\\)), we find \\(24 \nleqslant 13\\), so we transfer our focus to its right child (with value \\(16\\)). Since we pass the left child (with value \\(13\\)), we should subtract \\(13\\) from \\(24\\) and consider \\(11 \left( =24-13 \right)\\) as our number instead of \\(24\\). We now process the right child (with value \\(16\\)), looking at its left child (with value \\(12\\)) and finding that \\(11 \leqslant 12\\), so we transfer our focus to the left child. Since the left child is a leaf, we sample the element with priority \\(12\\). Note that by definition, we have *visited* node \\(a_1, a_2, a_5, a_{10}\\) through this sampling process.

Sampling method described above will ensure that

$$
P \left( a_i \right) = \dfrac{v \left( a_i \right)}{v \left( a_1 \right)} \label{1} \tag{1}
$$

## Proof

Obviously, equation \\(\left(\ref{1}\right)\\) holds when \\(i=1\\) because the root node will always be visited \\(\left( P \left( a_1 \right) = 1 = \dfrac{v \left( a_1 \right)}{v \left( a_1 \right)} \right)\\).

To prove equation \\(\left(\ref{1}\right)\\) holds when \\(i>1\\), we first take a look at a "small" sum tree with \\(3\\) nodes: 

![](/media/default/sum_tree_trivial.png)

According to the sampling method, we start by sampling a number within the interval \\( \left[ 0,a+b \right] \\). Suppose we get a number \\(x\\), if \\(x \leqslant a\\), the left child will be sampled. Otherwise, we will sample the right child. Thus, 

$$
\begin{align}
P \left( a_2 \right) &= P \left( 0 \leqslant x \leqslant a \right) = \dfrac{a}{a+b} = \dfrac{v \left( a_2 \right)}{v \left( a_1 \right)} \\\\
P \left( a_3 \right) &= P \left( a < x \leqslant a+b \right) = \dfrac{b}{a+b} = \dfrac{v \left( a_3 \right)}{v \left( a_1 \right)}
\end{align}
$$

Since every sum tree can be regarded as consisting of several "small" subtrees mentioned above, we can derive that

$$
\begin{align}
P \left( a_i \right) &= P \left( parent \left( a_i \right) \right) P \left( a_i \mid parent \left( a_i \right) \right) \\\\
&= P \left( parent \left( a_i \right) \right) \dfrac{v \left( a_i \right)}{v \left( parent \left( a_i \right) \right)} \quad \left( 1 \leqslant i \leqslant n \right)
\end{align} \label{2} \tag{2}
$$

We can solve equation \\(\left(\ref{2}\right)\\) recursively:

$$
\begin{align}
P \left( a_i \right) &= P \left( parent \left( a_i \right) \right) \dfrac{v \left( a_i \right)}{v \left( parent \left( a_i \right) \right)} \label{3} \tag{3} \\\\
P \left( parent \left( a_i \right) \right) &= P \left( parent \left( parent \left( a_i \right) \right) \right) \dfrac{v \left( parent \left( a_i \right) \right)}{v \left( parent \left( parent \left( a_i \right) \right) \right)} \label{4} \tag{4} \\\\
\dots \tag{...} \\\\
P \left( parent \left( \dots \right) \right) &= P \left( a_1 \right) \dfrac{v \left( parent \left( \dots \right) \right)}{v \left( a_1 \right)} \label{k} \tag{k}
\end{align} 
$$

Multiply equation \\(\left(\ref{3}\right) \thicksim \left(\ref{k}\right)\\), we get

$$
P \left( a_i \right) = P \left( a_1 \right) \dfrac{v \left( a_i \right)}{v \left( a_1 \right)} = \dfrac{v \left( a_i \right)}{v \left( a_1 \right)}
$$

Thus, equation \\(\left(\ref{1}\right)\\) holds.

## References

1. Schaul, T., Quan, J., Antonoglou, I., Silver, D. Prioritized experience replay. *ICLR*, 2016. [[Link]][ref-paper-pri]
2. Mofan Z. Prioritized Experience Replay (DQN) (Tensorflow). 2017. [[Link]][ref-tutorial-pri]

[wiki-binary-heap]: https://en.wikipedia.org/wiki/Binary_heap

[src-sum-tree]: https://github.com/chuyangliu/Snake/blob/master/snake/util/sumtree.py

[ref-paper-pri]: https://arxiv.org/abs/1511.05952/
[ref-tutorial-pri]: https://morvanzhou.github.io/tutorials/machine-learning/reinforcement-learning/4-6-prioritized-replay/

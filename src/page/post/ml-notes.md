## Dataset

$$
X = \begin{bmatrix}
  x_0^{(1)} & x_1^{(1)} & \cdots & x_n^{(1)} \\\\
  x_0^{(2)} & x_1^{(2)} & \cdots & x_n^{(2)} \\\\
  \vdots & \vdots & \ddots & \vdots \\\\
  x_0^{(m)} & x_1^{(m)} & \cdots & x_n^{(m)}
\end{bmatrix} \left( x_0^{(k)}=1 \right), \quad
y = \begin{bmatrix}
  y^{(1)} \\\\ y^{(2)} \\\\ \vdots \\\\ y^{(m)}
\end{bmatrix}
$$

### Feature Scaling

$$
x_i := \dfrac{x_i}{range \left( x_i \right)}
\ \text{ or } \
x_i := \dfrac{x_i - \mu_i}{s_i}
$$

---

## Optimization

### Gradient Descent

$$
\theta_j := \theta_j - \alpha \dfrac{\partial}{\partial \theta_j} J \left( \theta \right)
\quad \left( \ j = 0...n \ \right)
$$

---

## Error Analysis

### Gradient Checking

$$
\dfrac{\partial}{\partial\Theta_j} J \left( \Theta \right)
\approx
\dfrac{ J \left( \Theta_1, \dots, \Theta_j + \epsilon, \dots, \Theta_n \right) - J \left( \Theta_1, \dots, \Theta_j - \epsilon, \dots, \Theta_n \right)}{2 \epsilon}
$$

---

## Linear Regression

### Hypothesis

$$
h_\theta \left( x \right) = \theta^{T} x
$$

### Cost

$$
J(\theta) = \dfrac{1}{2m} \sum\limits_{i=1}^{m} \left[ h_\theta \left( x^{(i)} \right) - y^{(i)} \right] ^2
\+ \dfrac{\lambda}{2m} \sum\limits_{j=1}^{n} \theta_j^{2}
\quad \stackrel{vectorize}{\Longrightarrow}
\dfrac{1}{2m} \left( X\theta - y \right) ^{T} \left( X\theta - y \right)
$$

### Gradient

$$
\dfrac{\partial}{\partial \theta_j} J \left( \theta \right) = \begin{cases}
  \dfrac{1}{m} \sum\limits_{i=1}^{m} \left[ h_\theta \left( x^{(i)} \right) - y^{(i)} \right] x_j^{(i)} & j = 0 \\\\
  \dfrac{1}{m} \sum\limits_{i=1}^{m} \left[ h_\theta \left( x^{(i)} \right) - y^{(i)} \right] x_j^{(i)} + \dfrac{\lambda}{m} \theta_j & j = 1...n
\end{cases}
\stackrel{vectorize}{\Longrightarrow}
\dfrac{1}{m} X^{T} \left( X\theta - y \right)
$$

### Normal Equation

$$
\theta = \left( X^{T} X \right)^{-1} X^{T} y \\\\
\stackrel{regularize}{\Longrightarrow}
\theta = \left( X^{T} X + \lambda L \right)^{-1} X^{T} y, \text{ where } L_{(n+1)\times(n+1)} = \begin{bmatrix}
  0&0&0&0&0 \\\\ 0&1&0&0&0 \\\\ 0&0&1&0&0 \\\\ 0&0&0&1&0 \\\\ 0&0&0&0& \ddots
\end{bmatrix}
$$

---

## Logistic Regression

### Hypothesis

$$
h_\theta \left( x \right) = g \left( \theta^T x \right) = \dfrac{1}{1+e^{-\theta^Tx}}, \quad h_\theta(x) \in (0,1)
$$

### Cost

$$
J \left( \theta \right) = \dfrac{1}{m} \sum\limits_{i=1}^{m} \left\\{ -y^{(i)} \log \left[ h_\theta \left( x^{(i)} \right) \right] - \left( 1 - y^{(i)} \right) \log \left[ 1 - h_\theta \left( x^{(i)} \right) \right] \right\\} + \dfrac{\lambda}{2m} \sum\limits_{j=1}^{n} \theta_j^{2} \\\\
\stackrel{vectorize}{\Longrightarrow}
\dfrac{1}{m} \left\\{ -y^T \log \left[ g \left( X \theta \right) \right] - \left( 1 - y \right)^T \log \left[ 1 - g \left( X \theta \right) \right] \right\\}
$$

### Gradient

$$
\dfrac{\partial}{\partial \theta_j} J \left( \theta \right) = \begin{cases}
  \dfrac{1}{m} \sum\limits_{i=1}^{m} \left[ h_\theta \left( x^{(i)} \right) - y^{(i)} \right] x_j^{(i)} & j = 0 \\\\
  \dfrac{1}{m} \sum\limits_{i=1}^{m} \left[ h_\theta \left( x^{(i)} \right) - y^{(i)} \right] x_j^{(i)} + \dfrac{\lambda}{m} \theta_j & j = 1...n
\end{cases}
\stackrel{vectorize}{\Longrightarrow}
\dfrac{1}{m} X^{T} \left( g \left( X \theta \right) - y \right)
$$

---

## Neural Network

![](/media/nn.png)

$$
a^{(1)} = \begin{bmatrix} x_0 \\\\ x_1 \\\\ \vdots \\\\ x_n \end{bmatrix},
a^{(l)}=\begin{bmatrix} a_0^{(l)}\\\\ a_1^{(l)} \\\\ \vdots \\\\ a_{s_{l}}^{(l)} \end{bmatrix} \left( a_0^{(l)} = 1 \right) \\\\
\begin{align}
  & K = \text{number of nodes in the last layer} \\\\
  & L = \text{total number of layers in the network} \\\\
  & s_{l} = \text{number of units in layer } l \text{ (excluding the bias)}
\end{align}
$$

### Hypothesis

$$
h_\Theta(x) = a^{(L)} = g \left( z^{(L)} \right) \\\\
z^{(l)} = \Theta^{(l-1)} a^{(l-1)}, \text{ where } \Theta^{(l)} \text{ is a } s_{l+1} \times (s_{l} + 1) \text{ matrix} \\\\
$$

### Cost

$$
J(\Theta) = \dfrac{1}{m} \sum\limits_{i=1}^m \sum\limits_{k=1}^K \left\\{ -y^{(i)}\_k \log \left[ h_\Theta^{(k)} \left( x^{(i)} \right) \right] - \left( 1 - y^{(i)}\_k \right) \log \left[ 1 - h_\Theta^{(k)} \left( x^{(i)} \right) \right] \right\\}
\+ \dfrac{\lambda}{2m}\sum\limits_{l=1}^{L-1} \sum\limits_{i=1}^{s_{l+1}} \sum\limits_{j=1}^{s_{l}} \left[ \Theta_{i,j}^{(l)} \right] ^2 \\\\
\stackrel{vectorize}{\Longrightarrow}
\dfrac{1}{m} \sum\limits_{i=1}^m \left\\{ - \left[ y^{(i)} \right] ^{T} \log \left[ h_\Theta \left( x^{(i)} \right) \right] - \left[ 1 - y^{(i)} \right] ^{T} \log \left[ 1 - h_\Theta \left( x^{(i)} \right) \right] \right\\}
$$

### Gradient

$$
\begin{align}
  & \text{For training example } i = 1 \text{ to } m, \text{ repeat } \\{ \\\\
  & \qquad a^{(1)} := x^{(i)} \\\\
  & \qquad \text{Perform forward propagation to compute } z^{(l)}, a^{(l)} \text{ for } l = 2, 3, \dots , L \\\\
  & \qquad \delta^{(L)} := a^{(L)} - y^{(i)} \\\\
  & \qquad \text{Compute } \delta^{(L-1)}, \delta^{(L-2)}, \dots, \delta^{(2)} \text{ using } \delta^{(l)} := \left[ \left( \Theta^{(l)} \right)^T \delta^{(l+1)} \right] \ .\* \ a^{(l)} \ .\* \ \left[ 1 - a^{(l)} \right] \\\\
  & \qquad \Delta^{(l)} := \Delta^{(l)} + \delta^{(l+1)} \left( a^{(l)} \right)^T \ \left( \text{ remove } \delta_0^{(l+1)} \right) \\\\
  & \\}
\end{align} \\\\
\dfrac \partial {\partial \Theta\_{i, j}^{(l)}} J(\Theta) = \begin{cases}
  \dfrac{1}{m} \Delta^{(l)}\_{i, j} & j = 0 \\\\
  \dfrac{1}{m} \Delta^{(l)}\_{i,j} + \dfrac{\lambda}{m} \Theta^{(l)}\_{i,j} & j \neq 0
\end{cases}
$$ 

---

## Convolutional Neural Network

![](/media/cnn.jpg)

### Convolution

The picture below shows a 5x5 image convoluted with a 3x3 convolution kernel, which generates a 3x3 feature map:

![](/media/conv.gif)

### Pooling/Subsampling

The picture below shows a 20x20 feature map pooled with a 10x10 pooling kernel, which generates a 2x2 feature map:

![](/media/pool.gif)

---

## References

1. Andrew Y. Ng. Machine Learning. Coursera. [[Link]](https://www.coursera.org/learn/machine-learning/)
2. Andrew Y. Ng, Jiquan Ngiam, Chuan Yu Foo, et al. Unsupervised Feature Learning and Deep Learning Tutorial. Standford University. [[Link]](http://deeplearning.stanford.edu/wiki/index.php/UFLDL_Tutorial)

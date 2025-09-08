# Poisson Distribution

The **Poisson** distribution models the **count of events** in a fixed interval (time/space/volume) when events occur independently at an average rate \( \lambda > 0 \).

> 💡 **Key idea**  
> If events arrive according to a **Poisson process** with rate \( \lambda \), then the number of arrivals in any interval of length \(t\) is \( \mathrm{Pois}(\lambda t) \). Interarrival times are **Exponential(\(\lambda\))**.

---

## 1) Definition & pmf

For \( X \sim \mathrm{Pois}(\lambda) \),
\[
P(X=k) \;=\; e^{-\lambda}\,\frac{\lambda^k}{k!}, \qquad k=0,1,2,\dots
\]

- **Support:** \( \{0,1,2,\dots\} \)  
- **Mean / Variance:** \( \mathbb{E}[X]=\lambda \), \( \mathrm{Var}(X)=\lambda \)  
- **MGF (bonus):** \( M_X(t) = \exp\!\big(\lambda(e^t-1)\big) \)

> ⚠️ **Assumptions**  
> Events occur one at a time, independently, and the **rate is constant** across the interval (stationarity).

---

## 2) Modelling when Poisson fits

- **Counts per interval**: number of API requests per minute, arrivals per hour, defects per metre.  
- **Agnostic to “capacity”**: unlike Binomial, there’s no fixed maximum; the count can, in principle, be any non-negative integer.  
- **Independence & stationarity**: arrivals in disjoint time windows are independent; expected count is proportional to length.

> 💡 **Check-list**  
> Is the rate roughly constant over the window? Are arrivals approximately independent? If not, consider an inhomogeneous Poisson process or alternatives.

---

## 3) Connections & limits

- **Binomial limit**: if \(n\to\infty\), \(p\to 0\), \(np\to \lambda\), then \(\mathrm{Bin}(n,p) \Rightarrow \mathrm{Pois}(\lambda)\).  
- **Superposition**: if \(X_i \sim \mathrm{Pois}(\lambda_i)\) independent, then \(\sum_i X_i \sim \mathrm{Pois}(\sum_i \lambda_i)\).  
- **Thinning**: if \(X \sim \mathrm{Pois}(\lambda)\) and each event is kept independently with prob. \(q\), the kept count is \(\mathrm{Pois}(q\lambda)\).  
- **Poisson process**: counts over time follow Poisson; **inter-arrivals** are i.i.d. Exponential\((\lambda)\).

---

## 4) Cdf & quick tails

The cdf is
\[
F(k)=P(X\le k) = e^{-\lambda}\sum_{i=0}^k \frac{\lambda^i}{i!}.
\]
Useful checks:
- \(P(X=0)=e^{-\lambda}\)
- \(P(X\ge 1)=1-e^{-\lambda}\)

For large \(\lambda\), a **Normal** approximation works:
\[
X \approx \mathcal{N}(\lambda, \lambda),
\]
with a **continuity correction** (\(\pm 0.5\)) for discrete probabilities.

---

## 5) Worked micro-example

Let \(\lambda=3\).

- \(P(X=0)=e^{-3}\approx 0.0498\)  
- \(P(X=2)=e^{-3}\dfrac{3^2}{2!}\approx 0.2240\)  
- \(\mathbb{E}[X]=\mathrm{Var}(X)=3\)

Try additional values in the interactive panel on this page.

---

## 6) Visual intuition

Poisson pmfs for different \(\lambda\) values:

![poisson-shapes](./images/poisson-shapes-placeholder.png)

<small>Place images for this page under `src/tutorials/probability/discrete/images/` and reference them relatively.</small>

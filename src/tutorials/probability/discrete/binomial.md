# Binomial Distribution

The **Binomial** distribution models the **number of successes** in \(n\) independent and identical Bernoulli(\(p\)) trials.

> 💡 **Key idea**  
> If \(X_i \sim \mathrm{Bernoulli}(p)\) i.i.d., then \(S_n=\sum_{i=1}^n X_i \sim \mathrm{Binomial}(n,p)\).

---

## 1) Definition & pmf

For \(X \sim \mathrm{Binomial}(n,p)\), the probability of exactly \(k\) successes is
\[
P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}, \qquad k=0,1,\dots,n.
\]

- **Support:** \(\{0,1,\dots,n\}\)  
- **Combinatorial term:** \(\binom{n}{k}=\dfrac{n!}{k!(n-k)!}\)

> ⚠️ **Assumptions**  
> - Trials are **independent**.  
> - Each trial has the **same** success probability \(p\).  
> - The number of trials \(n\) is **fixed in advance**.

---

## 2) Moments & shape

- **Mean:** \(\mathbb{E}[X]=np\)  
- **Variance:** \(\mathrm{Var}(X)=np(1-p)\)  
- **Mode(s):** approximately near \((n+1)p\).

The distribution is **skewed** when \(p\) is near 0 or 1, and approximately **symmetric** when \(p\approx 0.5\).

---

## 3) When Binomial applies

Use Binomial when you count successes across a fixed number of repeatable, like-for-like trials:

- Number of customers who convert out of \(n\) visitors (\(p\) constant).
- Number of successful fills out of \(n\) order attempts.
- Number of items passing QC out of \(n\) inspected.

> 💡 **Indicator view**  
> Let \(X_i=\mathbf{1}_{\{\text{trial }i \text{ is success}\}}\). Then \(X=\sum_i X_i\) and  
> \(\mathbb{E}[X]=\sum_i \mathbb{E}[X_i]=np\) by **linearity**, no joint distributions needed.

---

## 4) Cdf & tail probabilities

The cdf \(F(k)=P(X\le k)=\sum_{i=0}^k \binom{n}{i}p^i(1-p)^{n-i}\).  
Right-tail \(P(X\ge k)=\sum_{i=k}^n \binom{n}{i}p^i(1-p)^{n-i}\).

For quick sanity checks:
- \(P(X=0)=(1-p)^n\)
- \(P(X=n)=p^n\)

---

## 5) Approximations

**Normal approximation (with continuity).** If \(np(1-p)\) is **large** (rule-of-thumb: \(\ge 10\)–\(20\)), then
\[
X \approx \mathcal{N}\big(np,\; np(1-p)\big)
\]
and
\[
P(X=k) \approx \Phi\!\left(\frac{k+0.5-np}{\sqrt{np(1-p)}}\right) - \Phi\!\left(\frac{k-0.5-np}{\sqrt{np(1-p)}}\right).
\]
Use continuity corrections (±0.5) for discrete-to-continuous bridging.

**Poisson approximation (rare events).** If \(n\) is **large**, \(p\) is **small**, and \(\lambda=np\) is **fixed**, then
\[
X \approx \mathrm{Poisson}(\lambda),
\quad P(X=k) \approx e^{-\lambda}\dfrac{\lambda^k}{k!}.
\]

> ⚠️ **Pitfall**  
> Don’t apply the Poisson approximation when \(p\) is moderate or large; the variance structure differs.

---

## 6) Worked micro-example

Suppose \(n=10\), \(p=0.3\).

- \(P(X=0)=(0.7)^{10}\)
- \(\mathbb{E}[X]=3\), \(\mathrm{Var}(X)=2.1\)
- \(P(X\le 3)=\sum_{i=0}^3 \binom{10}{i}0.3^i 0.7^{10-i}\)

Try these in the interactive panel below.

---

## 7) Visual intuition

Binomial pmfs for different \(p\) values:

![binomial-shapes](/images/Binomial_distribution.png)


# Bernoulli Distribution

The **Bernoulli** distribution models a **single trial** with two outcomes: *success* (1) with probability \(p\) and *failure* (0) with probability \(1-p\). It is the fundamental building block for many discrete models.

> 💡 **Key idea**  
> A Bernoulli variable is the indicator of an event \(A\): \(X=\mathbf{1}_{\{A\}}\). Then \(\mathbb{E}[X]=P(A)=p\).

---

## 1) Definition & pmf

A random variable \(X\) is **Bernoulli(p)** if
\[
P(X=1)=p,\qquad P(X=0)=1-p,\qquad 0\le p\le 1.
\]

- **Support:** \(\{0,1\}\).
- **pmf:** \(p(x)=p^x(1-p)^{1-x}\) for \(x\in\{0,1\}\).

> ⚠️ **Common pitfall**  
> Confusing the *parameter* \(p\) with an *estimate* of \(p\) from data. Here \(p\) is the true success probability.

---

## 2) Moments & useful identities

- **Mean:** \(\mathbb{E}[X]=p\).
- **Variance:** \(\mathrm{Var}(X)=p(1-p)\).
- **MGF (bonus):** \(M_X(t) = \mathbb{E}[e^{tX}] = (1-p) + p e^{t}\).
- **Indicator trick:** If \(X=\mathbf{1}_{\{A\}}\), then \(X^2=X\) and \(\mathrm{Var}(X)=p(1-p)\).

---

## 3) Modelling with Bernoulli

Use Bernoulli when the story is a **single yes/no outcome** with fixed probability \(p\), e.g.:

- A trade **fills** (1) or **doesn’t** (0).
- A customer **converts** (1) or **doesn’t** (0).
- A quality check **passes** (1) or **fails** (0).

> 💡 **Tip**  
> Many complex models are built from Bernoulli pieces. For example, **Binomial(n,p)** sums \(n\) i.i.d. Bernoulli(p).

---

## 4) From Bernoulli to Binomial

If \(X_1,\dots,X_n\) are i.i.d. Bernoulli(p), the **count of successes**
\[
S_n=\sum_{i=1}^n X_i
\]
is **Binomial(n,p)** with \(\mathbb{E}[S_n]=np\) and \(\mathrm{Var}(S_n)=np(1-p)\).

---

## 5) Quick checks

- Does the event description fit a single trial with two outcomes?
- Is the success probability \(p\) stable across trials (if you repeat)?
- Are we aggregating multiple trials? (then consider Binomial)

---

## 6) Visual intuition

Think of Bernoulli as a biased **coin flip**: \(p\) is the chance of “heads” (1), \(1-p\) the chance of “tails” (0).

![single-coin](/images/Biased-coin-Bernoulli-Distribution.jpg)


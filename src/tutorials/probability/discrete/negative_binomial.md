# Negative Binomial (Pascal) Distribution

The **Negative Binomial** models the number of **trials** needed to achieve the **r-th success**, when each trial is an independent Bernoulli(\(p\)).

> 💡 **Key idea**  
> The variable is a **waiting time** in discrete trials: for \(r=1\) this is **Geometric**(\(p\)); for general \(r\) it’s the **sum of \(r\) independent Geometric(\(p\))** waiting times.

---

## 1) Definition & pmf (support \(\{r, r+1, \dots\}\))

Let \(X \sim \text{NegBin}(r,p)\) denote the number of **trials** until the \(r\)-th success. Then, for \(k=r, r+1, \dots\),
\[
P(X=k) \;=\; \binom{k-1}{r-1}\, p^{\,r}\, (1-p)^{\,k-r}.
\]

- **Support:** \(k \in \{r, r+1, \dots\}\)  
- **Combinatorial term:** \(\binom{k-1}{r-1}\) counts the ways to place the first \(r-1\) successes among the first \(k-1\) trials; the \(k\)-th trial must be a success.

> ⚠️ **Parameterisation alert**  
> Another common version counts **failures before the \(r\)-th success** (support \(\{0,1,\dots\}\)) with pmf \(\binom{k+r-1}{r-1} p^r (1-p)^k\).  
> We use the **trials** version throughout this page.

---

## 2) Moments & shape

- **Mean:** \(\mathbb{E}[X]=\dfrac{r}{p}\)  
- **Variance:** \(\mathrm{Var}(X)=\dfrac{r(1-p)}{p^2}\)  
- **Mode (for \(r>1\))**: \(\left\lfloor \dfrac{(r-1)(1-p)}{p} \right\rfloor + r\) (a typical location of the pmf peak)

The distribution is **right-skewed** for small \(p\). As \(p\) increases (or \(r\) grows), the mass concentrates nearer the mean.

---

## 3) When Negative Binomial applies

Use NegBin(\(r,p\)) when repeating identical, independent trials until **\(r\) successes** are accumulated:

- **Retries** until the \(r\)-th successful API response.
- **Sales attempts** until closing \(r\) deals.
- **Quality tests** until \(r\) passes are observed.

> 💡 **Model check**  
> Are trials independent? Is \(p\) reasonably stable across attempts? Is \(r\) fixed in advance?

---

## 4) Connections

- **Geometric:** \(r=1\) gives \(\text{Geom}(p)\) on trials \(\{1,2,\dots\}\).
- **Sum of Geom:** \(X \stackrel{d}{=} \sum_{i=1}^{r} G_i\), with \(G_i \sim \text{Geom}(p)\) i.i.d.
- **Failures version:** If \(Y=X-r\) is the number of **failures** before the \(r\)-th success, then \(Y\) has support \(\{0,1,\dots\}\) and mean \(r(1-p)/p\).

---

## 5) Cdf & tail checks

The cdf is
\[
F(k)=P(X\le k)=\sum_{t=r}^{k} \binom{t-1}{r-1} p^r (1-p)^{t-r}.
\]
Sanity checks:
- \(P(X=r)=p^r\) (all first \(r\) trials successes).
- \(P(X>k)=(1-p)^{k-r+1}\,\cdot\) (times a finite polynomial in \(k\) for small \(r\)); in practice we use partial sums.

---

## 6) Micro-example

Let \(r=3\), \(p=0.4\).

- \(\mathbb{E}[X]=3/0.4=7.5\)
- \(\mathrm{Var}(X)=3\cdot 0.6/0.16=11.25\)
- \(P(X=3)=p^3=0.064\)
- \(P(X=4)=\binom{3}{2} p^3(1-p)=3 \cdot 0.064 \cdot 0.6=0.1152\)

Try additional values in the interactive panel.

---

## 7) Visual intuition

Right-skew decreases as \(p\) rises or \(r\) increases:

![negbin-shapes](/images/negbin-shapes-placeholder.png)


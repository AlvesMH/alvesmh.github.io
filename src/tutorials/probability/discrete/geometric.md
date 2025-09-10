# Geometric Distribution

The **Geometric** distribution models the number of **trials until the first success**, when each trial is independent and has the same success probability \(p\).

> 💡 **Key idea**  
> A sequence of Bernoulli(\(p\)) trials produces a **waiting time** to the first success. With the "trials-counting" convention used here, the support is \(\{1,2,\dots\}\).

---

## 1) Definition & pmf (support {1,2,…})

For \(X \sim \mathrm{Geom}(p)\) with support \(\{1,2,\dots\}\),
\[
P(X=k) = (1-p)^{k-1}\,p, \qquad k=1,2,\dots
\]

- **Support:** \(\{1,2,\dots\}\) (trial count until first success)
- **Tail:** \(P(X>k) = (1-p)^{k}\)
- **cdf:** \(P(X \le k) = 1-(1-p)^k\)

> ⚠️ **Parameterisation alert**  
> Some texts define Geometric as the **number of failures before the first success**, with support \(\{0,1,2,\dots\}\). Then \(P(Y=k)=(1-p)^k p\).  
> We adopt the **trials-until-first-success** version (\(X=Y+1\)).

---

## 2) Moments & properties

- **Mean:** \(\mathbb{E}[X] = \dfrac{1}{p}\)
- **Variance:** \(\mathrm{Var}(X) = \dfrac{1-p}{p^2}\)
- **Memoryless:** for \(m,n\ge 0\),
  \[
  P(X>m+n \mid X>m) = P(X>n).
  \]
  Geometric is the **only discrete** distribution with this property.

---

## 3) When Geometric applies

Use Geometric when you repeat identical, independent trials until the first success:

- Attempts until a **password** is guessed (in a simplified model).
- **Order retries** until a fill occurs.
- Phone **call attempts** until one is answered.

> 💡 **Model check**  
> Is "success" clearly defined? Is \(p\) stable across attempts? Are trials independent? If not, reconsider the model.

---

## 4) Quick identities

- \(P(X=1)=p\), \(P(X=2)=(1-p)p\), \(P(X=3)=(1-p)^2 p\), …
- \(P(X>k)=(1-p)^{k}\) gives fast tail estimates.
- With \(X\sim\mathrm{Geom}(p)\), the count of **failures** before the first success is \(X-1\sim\mathrm{Geom}_0(p)\) (support \(\{0,1,\dots\}\)).

---

## 5) Micro-example

If \(p=0.2\), then:
- \(E[X]=5\), \(Var(X)=20\).
- \(P(X>3)=(0.8)^3=0.512\).
- \(P(X=4)=(0.8)^3(0.2)=0.1024\).

Try these in the interactive panel on this page.

---

## 6) Visual intuition

The pmf **decays geometrically**: most mass is near 1 when \(p\) is large; heavier tails when \(p\) is small.

![geometric-shape](/images/geometric-shape.png)


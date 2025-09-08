# Uniform Distribution

The **Uniform(a,b)** distribution has a **constant density** on the interval \([a,b]\) with \(a<b\). It is the simplest continuous model and is fundamental to **simulation** via \(U(0,1)\).

> 💡 **Key idea**  
> On \([a,b]\), every sub-interval of the same length has the **same probability mass**.

---

## 1) Definition, pdf & cdf

For \(X \sim \mathrm{Uniform}(a,b)\) with \(a<b\):

- **pdf**
  \[
  f(x)=
  \begin{cases}
  \dfrac{1}{b-a}, & a \le x \le b,\\[4pt]
  0, & \text{otherwise}.
  \end{cases}
  \]

- **cdf**
  \[
  F(x)=
  \begin{cases}
  0, & x < a,\\
  \dfrac{x-a}{b-a}, & a \le x \le b,\\
  1, & x > b.
  \end{cases}
  \]

- **Support:** \([a,b]\)  
- **Quantile:** \(F^{-1}(u)=a+(b-a)u\) for \(u\in[0,1]\)

> ⚠️ **Endpoints**  
> The density is defined on the **closed** interval \([a,b]\). Since points have zero measure, any choice of open/closed at endpoints yields the same probabilities.

---

## 2) Moments & quick identities

- **Mean:** \(\mathbb{E}[X]=\dfrac{a+b}{2}\)
- **Variance:** \(\mathrm{Var}(X)=\dfrac{(b-a)^2}{12}\)
- **Symmetry:** \(X-(a+b)/2\) is symmetric around 0.
- **Scaling:** If \(U\sim \mathrm{U}(0,1)\) then \(X=a+(b-a)U \sim \mathrm{U}(a,b)\).

**Interval probability** (for any \(c\le d\)):
\[
P(c\le X\le d)=\frac{\max(0,\ \min(d,b)-\max(c,a))}{b-a}.
\]

---

## 3) When Uniform fits

Use Uniform when you explicitly **assume ignorance** within an interval (all sub-intervals equally likely) or when a **randomized offset** is appropriate:

- Start time within a given minute/second.
- Phase offsets, hash seeds, randomized delays.
- First-order approximations with no preferred sub-interval.

> 💡 **Model check**  
> If data cluster or show trends within the interval, Uniform is likely **inappropriate**; consider triangular, beta, or empirical distributions.

---

## 4) Simulation via U(0,1)

Most RNGs produce \(U(0,1)\). Transform to \(\mathrm{U}(a,b)\) via:
\[
X = a+(b-a)U.
\]
This mapping preserves uniformity because \(F_X(x)=P(X\le x)=P\!\left(U\le\dfrac{x-a}{b-a}\right)\).

---

## 5) Order statistics (U(0,1))

If \(U_1,\dots,U_n \stackrel{iid}{\sim} \mathrm{U}(0,1)\):

- \(U_{(1)}=\min U_i\) has cdf \(1-(1-x)^n\), pdf \(n(1-x)^{n-1}\).
- \(U_{(n)}=\max U_i\) has cdf \(x^n\), pdf \(n x^{n-1}\).
- More generally, \(U_{(k)} \sim \mathrm{Beta}(k, n-k+1)\).

These facts are handy for thresholds and extremes.

---

## 6) Micro-example

Let \(X \sim \mathrm{U}(2,8)\).

- \(E[X]=(2+8)/2=5\)
- \(\mathrm{Var}(X)=(6)^2/12=3\)
- \(P(3\le X\le 5)=\dfrac{5-3}{8-2}=\dfrac{2}{6}=\dfrac{1}{3}\)

Try these in the interactive panel on the page.

---

## 7) Visual intuition

A flat pdf on \([a,b]\), linearly increasing cdf:

![uniform-shapes](./images/uniform-shapes-placeholder.png)

<small>Place images for this page under `src/tutorials/probability/continuous/images/` and reference them relatively.</small>

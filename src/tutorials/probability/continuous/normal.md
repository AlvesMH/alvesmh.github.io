# Normal (Gaussian) Distribution

The **Normal(μ, σ²)** distribution is the bell-shaped model that often appears as a **limit** for sums/averages (via the **CLT**) and as a convenient model for **symmetric, unimodal** data.

> 💡 **Key idea**  
> Standardize by the **z-score** \(z=(x-μ)/σ\). Probabilities and quantiles reduce to the **standard Normal** cdf \(Φ\) and pdf \(φ\).

---

## 1) Definition, pdf & cdf

If \(X \sim \mathcal{N}(μ, σ^2)\) with \(σ>0\), then

- **pdf**
  \[
  f(x) = \frac{1}{σ\sqrt{2\pi}}\exp\!\left(-\frac{(x-μ)^2}{2σ^2}\right).
  \]

- **cdf**
  \[
  F(x)=P(X\le x)=Φ\!\left(\frac{x-μ}{σ}\right), \quad
  Φ(z) = \int_{-\infty}^{z} \frac{1}{\sqrt{2\pi}}e^{-t^2/2}\,dt.
  \]

- **Mean / Variance:** \( \mathbb{E}[X]=μ, \ \mathrm{Var}(X)=σ^2 \)

---

## 2) z-scores & the 68–95–99.7 rule

For \(Z\sim \mathcal{N}(0,1)\), \(P(|Z|\le 1)\approx 0.6827\), \(P(|Z|\le 2)\approx 0.9545\), \(P(|Z|\le 3)\approx 0.9973\).

> **Common tasks**
> - \(P(X\le x)=Φ\!\big((x-μ)/σ\big)\)  
> - \(P(a\le X\le b)=Φ\!\big((b-μ)/σ\big) - Φ\!\big((a-μ)/σ\big)\)

---

## 3) Symmetry & tails

- \(φ(z)=φ(-z)\), \(Φ(-z)=1-Φ(z)\).  
- Right-tail: \(P(Z>z)=1-Φ(z)\).  
- For large \(z>0\), the **Mills ratio** \(P(Z>z)\approx \dfrac{φ(z)}{z}\) gives a quick bound.

---

## 4) Closure properties

- **Linear transforms:** \(aX+b \sim \mathcal{N}(aμ+b, a^2 σ^2)\).  
- **Sums:** If \(X_i \stackrel{ind}{\sim} \mathcal{N}(μ_i, σ_i^2)\), then \(\sum X_i \sim \mathcal{N}(\sum μ_i, \sum σ_i^2)\).  
- **Conditional/marginal (multivariate):** subsets and conditionals of a **multivariate Normal** are Normal (with updated means/covariances).

---

## 5) When Normal fits

Appropriate for **symmetric** data with light tails; for sample **averages**; and as a working approximation by the **CLT**.

> ⚠️ **Cautions**  
> Heavy tails/outliers violate Normal assumptions; consider **t**, **Laplace**, or robust approaches.

---

## 6) Micro-examples

- If \(X\sim \mathcal{N}(10, 2^2)\), then \(P(X\le 12)=Φ\!\big((12-10)/2\big)=Φ(1)=0.8413\).  
- If \(Z\sim \mathcal{N}(0,1)\), then \(P(|Z|\le 2)=Φ(2)-Φ(-2)\approx 0.9545\).

Try similar calculations with the interactive controls on this page.

---

## 7) Visual intuition

Smooth bell-shaped pdf centered at \(μ\); the cdf is sigmoid-like and approaches 0/1 in the tails:

![normal-shape](./images/normal-shape-placeholder.png)

<small>Place images for this page under `src/tutorials/probability/continuous/images/`.</small>

---

## 8) Connections

- **CLT:** Sample means normalize to **Z ~ N(0,1)** under mild conditions.  
- **Quadratics:** If \(Z\sim N(0,1)\), then \(Z^2\sim χ^2_1\); sums of squares lead to **χ²** and **t** families.  
- **Standardization:** Any Normal reduces to standard Normal via \(Z=(X-μ)/σ\).

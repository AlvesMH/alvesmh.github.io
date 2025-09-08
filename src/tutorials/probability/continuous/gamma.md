# Gamma Distribution

The **Gamma(k, λ)** distribution (shape \(k>0\), **rate** \(λ>0\)) models **positive** waiting times and is a flexible generalisation of the Exponential. We use the **rate** form on this page; the **scale** form is \(\mathrm{Gamma}(k, θ)\) with \(θ=1/λ\).

> 💡 **Key idea**  
> If arrivals follow a Poisson process with rate \(λ\), the waiting time to the **\(k\)-th event** is \( \mathrm{Gamma}(k, λ) \).

---

## 1) Definition & pdf

For \(X \sim \mathrm{Gamma}(k, λ)\) (rate form), support \([0,\infty)\),
\[
f(x) = \frac{λ^k}{\Gamma(k)}\, x^{k-1} e^{-λ x}, \qquad x \ge 0.
\]

- **Mean / Variance:** \( \mathbb{E}[X]=\dfrac{k}{λ}, \ \mathrm{Var}(X)=\dfrac{k}{λ^2}\)  
- **MGF:** \( M_X(t)=\left(\dfrac{λ}{λ-t}\right)^k, \ t<λ \)  
- **cdf:** \( F(x)=P(k, λx) \), the **regularised lower incomplete gamma**.

> ⚠️ **Parametrisation alert**  
> Some sources use \( \mathrm{Gamma}(k, θ) \) with **scale** \(θ\). Convert via \( θ=1/λ \). Then \( f(x)=x^{k-1}e^{-x/θ}/(\Gamma(k)\,θ^k) \), \( \mathbb{E}[X]=kθ \), \( \mathrm{Var}(X)=kθ^2 \).

---

## 2) Connections

- **Exponential:** \(k=1 \Rightarrow X \sim \mathrm{Exp}(λ)\).  
- **Sum of exponentials:** If \(E_i \stackrel{iid}{\sim} \mathrm{Exp}(λ)\), then \(\sum_{i=1}^{k} E_i \sim \mathrm{Gamma}(k,λ)\) for integer \(k\).  
- **Poisson process:** \(T_k\), the time to the \(k\)-th arrival, is \(\mathrm{Gamma}(k,λ)\). Equivalently, \( P(T_k\le x)=1-\sum_{n=0}^{k-1} e^{-λx} (λx)^n/n! \).  
- **Chi-square:** \( \chi^2_\nu \sim \mathrm{Gamma}\big(k=\nu/2,\ θ=2\big) \) (scale form) ⇔ \( \mathrm{Gamma}\big(k=\nu/2,\ λ=1/2\big) \) (rate form).

---

## 3) Shapes & hazard

- For \(k<1\), the pdf is decreasing and the **hazard** \(h(x)=f(x)/S(x)\) is **decreasing**.  
- For \(k=1\), hazard is **constant** (Exponential).  
- For \(k>1\), the pdf is unimodal and hazard is **increasing** (IFR).

Gamma thus adapts from heavy right-skew to near-symmetric as \(k\) grows.

---

## 4) When Gamma fits

Use Gamma for **positive**, right-skewed quantities:

- **Response/repair/service times** with more-than-exponential variability.  
- **Reliability** with monotone (up/down) hazard.  
- **Aggregated waiting**: time to complete \(k\) independent exponential phases.

> 💡 **Model check**  
> Inspect skew and hazard shape; if hazard is non-monotone, consider **Weibull** or **log-normal**.

---

## 5) Useful identities

- **Scaling:** If \(X\sim\mathrm{Gamma}(k,λ)\) and \(Y=aX\) with \(a>0\), then \(Y\sim\mathrm{Gamma}(k, λ/a)\).  
- **Additivity (common λ):** independent \(X_i \sim \mathrm{Gamma}(k_i, λ)\) ⇒ \(\sum X_i \sim \mathrm{Gamma}(\sum k_i, λ)\).  
- **Mode (k>1):** \((k-1)/λ\).  
- **Median:** no closed form; use numerical solve of \(F(m)=0.5\).

---

## 6) Micro-example

Let \(k=3\), \(λ=2\) (rate per hour).

- \(E[X]=3/2=1.5\) hours, \(\mathrm{Var}(X)=3/4=0.75\).  
- \(P(X\le 1)=F(1)=P(3, 2\cdot 1)=1 - e^{-2}\big(1 + 2 + 2^2/2!\big)\approx 1 - e^{-2}(1+2+2)=1 - 5e^{-2}\).  
- Mode \(=(k-1)/λ=1\) hour.

Try these in the interactive panel.

---

## 7) Bayesian note (optional)

As a prior for a **rate** (Poisson or Exponential models), \( \mathrm{Gamma}(α, β) \) (shape-rate) is **conjugate**:
- **Poisson(y | λ)** with exposure \(t\): posterior \( \mathrm{Gamma}(α + y, β + t) \).
- **Exponential(x_i | λ)** data: posterior \( \mathrm{Gamma}\!\left(α + n,\; β + \sum x_i\right) \).

---

## 8) Visual intuition

Gamma pdfs for varying \(k\) and common \(λ\):

![gamma-shapes](./images/gamma-shapes-placeholder.png)

<small>Place images for this page under `src/tutorials/probability/continuous/images/` and reference them relatively.</small>

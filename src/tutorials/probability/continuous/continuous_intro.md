# Continuous Variables & the CLT

Many real-world quantities—time to failure, height, latency, returns—are best modelled as **continuous** random variables. In this section we recap key ideas (pdf/cdf, expectations by integration, transformations) and build intuition for the **Law of Large Numbers (LLN)** and the **Central Limit Theorem (CLT)**.

> 💡 **Key idea**  
> Continuous models replace discrete sums with **integrals**. Probabilities are **areas under a curve** (the **pdf**) and cumulative probabilities are given by the **cdf**.

---

## 1) pdf and cdf

A continuous random variable \(X\) admits a **probability density function** (pdf) \(f(x)\) with:
\[
f(x)\ge 0,\qquad \int_{-\infty}^{\infty} f(x)\,dx=1.
\]
For any interval \([a,b]\),
\[
P(a\le X\le b)=\int_a^b f(x)\,dx.
\]

The **cumulative distribution function** (cdf) \(F(x)=P(X\le x)\) satisfies:
- \(F\) is non-decreasing and right-continuous;
- \(F(x)=\int_{-\infty}^{x} f(t)\,dt\) when \(f\) exists;
- \(P(X=x)=0\) at any single point (area under a “line” is zero).

---

## 2) Expectation and variance (by integration)

For integrable \(X\),
\[
\mathbb{E}[X]=\int_{-\infty}^{\infty} x\,f(x)\,dx, \qquad
\mathbb{E}[g(X)]=\int_{-\infty}^{\infty} g(x)\,f(x)\,dx.
\]
The **variance** is
\[
\mathrm{Var}(X)=\mathbb{E}[X^2]-\big(\mathbb{E}[X]\big)^2.
\]

> 💡 **Shortcut**  
> If \(X\) has mean \(\mu\) and variance \(\sigma^2\), then for independent \(X_1,\ldots,X_n\):  
> \(\mathbb{E}[\overline{X}]=\mu\), \(\mathrm{Var}(\overline{X})=\sigma^2/n\).

---

## 3) Transformations & change of variables

For a **monotone** differentiable mapping \(Y=g(X)\), with inverse \(x=g^{-1}(y)\),
\[
f_Y(y)= f_X\!\big(g^{-1}(y)\big)\,\left|\frac{d}{dy}g^{-1}(y)\right|.
\]
This is the **change-of-variables** rule for densities.

> ⚠️ **Non-monotone cases**  
> Break the domain into monotone pieces and **sum** contributions. For vector transforms \(\mathbf{Y}=g(\mathbf{X})\), use the **Jacobian determinant** \( |\det J| \).

---

## 4) Joint, marginal, conditional

For two continuous variables \(X,Y\) with joint pdf \(f_{X,Y}(x,y)\):
- **Marginals:** \(f_X(x)=\int f_{X,Y}(x,y)\,dy\), \(f_Y(y)=\int f_{X,Y}(x,y)\,dx\).
- **Conditionals:** \(f_{X\mid Y}(x\mid y)=\dfrac{f_{X,Y}(x,y)}{f_Y(y)}\) (if \(f_Y(y)>0\)).
- **Independence:** \(f_{X,Y}(x,y)=f_X(x)f_Y(y)\) for all \(x,y\).

---

## 5) LLN & CLT (practical intuition)

Let \(X_1,\ldots, X_n\) be i.i.d. with mean \(\mu\) and variance \(\sigma^2\).

- **LLN:** the sample mean \(\overline{X}\) **converges** to \(\mu\) as \(n\to\infty\).
- **CLT:** the **standardized** sample mean approaches a **standard Normal**:
  \[
  \frac{\overline{X}-\mu}{\sigma/\sqrt{n}} \;\Rightarrow\; \mathcal{N}(0,1).
  \]

**Why this matters.**  
Even when the data are **not Normal**, sums/averages behave **approximately Normal** for moderate \(n\), enabling confidence intervals and hypothesis tests based on Normal quantiles. Heavy tails or strong dependence may **slow** convergence—always check assumptions.

---

## 6) Modelling guidelines

- Pick a **simple** family first (Uniform, Exponential, Normal); check fit with plots/residuals.
- Ensure units and supports match the story (e.g., times \(\ge 0\)).
- Prefer models with interpretable parameters (e.g., Exponential rate \(\lambda\)).
- For skewed, positive data, try **Gamma/Log-Normal**; for symmetric unimodal, **Normal** may suffice.
- Use **transformations** (e.g., log) when variance scales with the mean.

---

## 7) Visual intuition

PDFs and CDFs connect by integration:

![pdf-cdf-schematic](./images/pdf-cdf-schematic-placeholder.png)

<small>Place images for this section under `src/tutorials/probability/continuous/images/` and reference them relatively as above.</small>

---

## 8) What’s next

We’ll tour common continuous families:

- **Uniform(a,b):** equal density on an interval.  
- **Exponential(λ):** waiting times with memorylessness.  
- **Gamma(k,θ):** sums of exponentials; flexible positive-support models.  
- **Normal(μ,σ²):** the CLT’s fixed point.  

Each page includes examples, tips, an “On This Page” menu, flashcards, and a dedicated quiz.

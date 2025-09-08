# Central Limit Theorem (CLT)

Let \(X_1, X_2, \dots\) be i.i.d. with finite mean \( \mu \) and variance \( \sigma^2>0 \). Define the **sample mean**
\[
\overline{X}_n = \frac{1}{n}\sum_{i=1}^n X_i.
\]
The **CLT** states that the standardized mean
\[
Z_n \;=\; \frac{\overline{X}_n-\mu}{\sigma/\sqrt{n}}
\]
converges **in distribution** to the **standard Normal**:
\[
Z_n \;\Rightarrow\; \mathcal{N}(0,1)\qquad\text{as }n\to\infty.
\]

> 💡 **Interpretation**  
> Sums/averages of many small, independent contributions behave approximately **Normal**, regardless of the parent distribution (provided basic regularity holds).

---

## 1) LLN vs CLT

- **Law of Large Numbers (LLN):** \( \overline{X}_n \xrightarrow{P} \mu \) (convergence in probability).  
- **CLT:** \( \sqrt{n}(\overline{X}_n-\mu) \Rightarrow \mathcal{N}(0,\sigma^2) \) (distributional convergence).

LLN ensures **consistency** of the mean; CLT gives an **approximate sampling distribution** for finite \(n\).

---

## 2) Rates: Berry–Esseen (sketch)

If \( \rho_3 = \mathbb{E}|X-\mu|^3 < \infty \), then for some universal constant \(C\) (e.g., \(C\approx 0.56\)),
\[
\sup_{x}\big| P(Z_n\le x) - \Phi(x) \big| \;\le\; C\frac{\rho_3}{\sigma^3\sqrt{n}}.
\]
So Normal approximation **improves like \(1/\sqrt{n}\)**, and is slower when the parent is **skewed/heavy-tailed**.

---

## 3) When CLT can fail

- **Infinite variance:** heavy-tailed distributions with tail index \( \alpha\le 2 \) (e.g., **Cauchy**, **Pareto(α≤2)**) do **not** satisfy the classical CLT.  
- **Strong dependence:** correlations across observations can break the i.i.d. conditions (there are dependent CLTs with extra assumptions).  
- **Non-identical:** require additional conditions (e.g., **Lindeberg** or **Lyapunov** CLTs for triangular arrays).

> ⚠️ **Caution**  
> Even with finite variance, **very heavy skew** can require **larger n** for a good Normal approximation.

---

## 4) Studentization & t-approximation

In practice \( \sigma \) is unknown. Replace it with the sample standard deviation \( S \). The **Studentized** mean
\[
T_n=\frac{\overline{X}_n-\mu}{S/\sqrt{n}}
\]
has an exact **t** distribution when the parent is Normal (with \(n-1\) degrees of freedom), and more generally \(T_n\Rightarrow \mathcal{N}(0,1)\).

---

## 5) Finite population correction (FPC)

If sampling **without replacement** from a finite population of size \(N\) (SRSWOR), the variance of \( \overline{X} \) is
\[
\mathrm{Var}(\overline{X})= \frac{\sigma^2}{n}\left(1-\frac{n}{N}\right)\cdot \frac{N}{N-1},
\]
often approximated by multiplying the standard error by \( \sqrt{\frac{N-n}{N-1}} \).

---

## 6) Quick examples

- **Bernoulli(p):** \( \mu=p, \ \sigma^2=p(1-p) \). Then \( Z_n \) approximates \( \mathcal{N}(0,1) \).  
- **Exponential(1):** \( \mu=1, \ \sigma^2=1 \). Despite skew, \( Z_n \) moves toward Normal; coverage is slower than symmetric cases.  
- **Cauchy(0,1):** no mean/variance ⇒ the classical CLT **does not apply**; sample means are Cauchy distributed for all \(n\).

---

## 7) Practical guidance

- Check **skewness/heavy tails**; consider **transformations** or **robust** summaries if needed.  
- For **proportions** \( \hat{p} \), use Normal only if \( np \) and \( n(1-p) \) are both moderate (e.g., ≥10).  
- Prefer **exact** or **Wilson/Agresti–Coull** intervals for small \(n\) in binomial problems.  
- Plot the empirical distribution of standardized means if possible; compare coverage to the **68–95–99.7** rule.

---

## 8) Visual intuition

CLT stacks independent “jittery” contributions; after standardisation, the sum smooths toward a bell curve:

![clt-schematic](./images/clt-schematic-placeholder.png)

<small>Place images for this page under `src/tutorials/probability/continuous/images/`.</small>

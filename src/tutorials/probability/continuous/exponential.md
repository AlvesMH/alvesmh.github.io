# Exponential Distribution

The **Exponential(λ)** distribution (rate \(λ>0\)) models **waiting times** with a **constant hazard**. It is the continuous analogue of the **Geometric** distribution and is the inter-arrival time in a **Poisson process**.

> 💡 **Key idea**  
> Exponential is **memoryless**: \(P(X>s+t\mid X>s)=P(X>t)\). Past waiting does not change the remaining wait.

---

## 1) Definition, pdf / cdf / survival / hazard

For \(X \sim \mathrm{Exp}(λ)\) with support \([0,\infty)\):

- **pdf:** \(f(x)=λ e^{-λx}\) for \(x\ge 0\), else \(0\)  
- **cdf:** \(F(x)=P(X\le x)=1-e^{-λx}\) for \(x\ge 0\), else \(0\)  
- **survival:** \(S(x)=P(X>x)=e^{-λx}\)  
- **hazard:** \(h(x)=\dfrac{f(x)}{S(x)}=λ\) (constant)

> ⚠️ **Parameterisation alert**  
> Some texts use **scale** \(θ=1/λ\) and write \(X\sim\mathrm{Exp}(θ)\) with pdf \(f(x)=\frac{1}{θ}e^{-x/θ}\). We use the **rate** form \(λ\).

---

## 2) Moments & transforms

- **Mean:** \(\mathbb{E}[X]=\dfrac{1}{λ}\)  
- **Variance:** \(\mathrm{Var}(X)=\dfrac{1}{λ^2}\)  
- **MGF:** \(M_X(t)=\dfrac{λ}{λ-t}\) for \(t<λ\)  
- **Quantile (p-th):** \(x_p=F^{-1}(p)=-\dfrac{1}{λ}\ln(1-p)\)  
- **Median:** \(x_{0.5}=\dfrac{\ln 2}{λ}\)

**Memoryless property.** For \(s,t\ge 0\),
\[
P(X>s+t\mid X>s)=\frac{S(s+t)}{S(s)}=\frac{e^{-λ(s+t)}}{e^{-λs}}=e^{-λt}=P(X>t).
\]

---

## 3) When Exponential fits

- **Poisson arrivals:** time between events when counts follow **Poisson(λt)** over length \(t\).  
- **Reliability with constant hazard:** electronic components in the “useful life” phase (no wear-in/out).  
- **Service/queue times:** when waiting time variability is well-approximated by a single-parameter positive model.

> 💡 **Model check**  
> If hazard increases or decreases with \(x\), Exponential may be inappropriate—consider **Weibull** (increasing/decreasing hazard) or **Gamma**.

---

## 4) Connections

- **Poisson process:** inter-arrivals i.i.d. Exponential(λ); \(N(t)\sim \mathrm{Pois}(λt)\).  
- **Min of exponentials:** if \(X_i\sim\mathrm{Exp}(λ_i)\) independent, then \(\min_i X_i \sim \mathrm{Exp}\!\big(\sum_i λ_i\big)\).  
- **Argmin selection:** \(P(\arg\min X_i = j)=\dfrac{λ_j}{\sum_i λ_i}\).  
- **Sum to Gamma:** If \(X_1,\dots,X_k\stackrel{iid}{\sim} \mathrm{Exp}(λ)\), then \(\sum_i X_i \sim \mathrm{Gamma}(k, λ)\) (rate form).

---

## 5) Quick identities & checks

- \(P(X>c)=e^{-λc}\)  
- \(P(c\le X\le d)=e^{-λc}-e^{-λd}\) for \(0\le c\le d\)  
- Scaling: if \(Y=aX\) with \(a>0\) and \(X\sim\mathrm{Exp}(λ)\), then \(Y\sim\mathrm{Exp}(λ/a)\).

---

## 6) Micro-example

Let \(λ=1.5\) (events per hour).

- \(E[X]=1/1.5=0.6667\) hours  
- \(P(X>1)=e^{-1.5}\approx 0.2231\)  
- \(P(0.5\le X\le 2)=e^{-1.5\cdot 0.5}-e^{-1.5\cdot 2}\approx 0.4724-0.0498\approx 0.4226\)

Try these in the interactive panel on this page.

---

## 7) Visual intuition

An exponentially decaying pdf from \(x=0\); the cdf climbs quickly at small \(x\) and flattens:

![exp-shapes](./images/exp-shapes-placeholder.png)

<small>Place images for this page under `src/tutorials/probability/continuous/images/` and reference them relatively.</small>

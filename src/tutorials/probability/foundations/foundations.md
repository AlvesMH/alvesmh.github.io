# Foundations of Probability

Uncertainty pervades engineering, finance, science, and everyday life. This chapter equips you with the **core rules and tools** to reason rigorously about uncertain events and numerical quantities.

> 💡 **Key idea**  
> Probability is a **consistent calculus of plausibility**. The axioms enforce internal consistency; everything else is technique and interpretation.

## Learning outcomes

By the end of this chapter you should be able to:

- Work with **events** and set operations; apply complement, union, intersection, and De Morgan’s laws.
- Compute **conditional probability** \(P(A\mid B)\), recognise **independence**, and use the **law of total probability**.
- Apply **Bayes’ theorem** to update beliefs from data.
- Use **counting** (permutations/combinations) to justify discrete models.
- Define **random variables** (pmf/pdf, cdf), compute **expectation** \(\mathbb{E}[X]\) and **variance** \(\mathrm{Var}(X)\), and use **linearity of expectation**.

---

## 1) Axioms & event algebra

Let \(\Omega\) be the **sample space** of all possible outcomes, and \(\mathcal{F}\) a collection of events (subsets of \(\Omega\)).

**Kolmogorov’s axioms.** A function \(P:\mathcal{F}\to[0,1]\) is a probability measure if:

1. \(0 \le P(E) \le 1\) for any event \(E\in\mathcal{F}\)
2. \(P(\Omega) = 1\)
3. (**Countable additivity**) For pairwise disjoint events \(\{E_i\}\),
   \[
   P\!\left(\bigcup_{i=1}^\infty E_i\right) = \sum_{i=1}^\infty P(E_i).
   \]

**Basic identities.**

- Complement: \(P(A^c)=1-P(A)\).
- Inclusion–exclusion (two sets): \(P(A\cup B)=P(A)+P(B)-P(A\cap B)\).
- Monotonicity: if \(A\subseteq B\) then \(P(A)\le P(B)\).
- De Morgan: \((A\cup B)^c=A^c\cap B^c\), \((A\cap B)^c=A^c\cup B^c\).

> ⚠️ **Common pitfall**  
> Do **not** add probabilities for overlapping events without subtracting the intersection.

---

## 2) Conditional probability & independence

Given \(P(B)>0\),
\[
P(A\mid B) = \frac{P(A\cap B)}{P(B)}.
\]

Events \(A,B\) are **independent** iff
\[
P(A\cap B) = P(A)P(B).
\]
Independence is stronger than disjointness and does **not** follow from it.

**Law of total probability.** If \(\{B_i\}\) is a partition of \(\Omega\) (disjoint, exhaustive, with \(P(B_i)>0\)),
\[
P(A)=\sum_i P(A\mid B_i)P(B_i).
\]

> 💡 **Tip**  
> Draw a quick Venn diagram or tree: it clarifies where conditionals and intersections live.

---

## 3) Bayes’ theorem

For a partition \(\{H_i\}\) of hypotheses and data/event \(D\) with \(P(D)>0\),
\[
P(H_i\mid D)
= \frac{P(D\mid H_i)\,P(H_i)}{\sum_j P(D\mid H_j)\,P(H_j)}.
\]

Interpretation: **posterior** \(\propto\) **likelihood** \(\times\) **prior**.  
Diagnostic testing: prevalence is the prior \(P(H)\); sensitivity/specificity live in \(P(D\mid H)\), \(P(D\mid H^c)\).

---

## 4) Counting: permutations & combinations

Counting underpins many discrete models.

- Factorial: \(n! = n(n-1)\cdots 1\), \(0!=1\).
- Permutations (ordered selections): \(_nP_r = \frac{n!}{(n-r)!}\).
- Combinations (unordered selections): \(_nC_r = \binom{n}{r} = \frac{n!}{r!(n-r)!}\).

**Example.** Number of 5-card hands from a 52-card deck: \(\binom{52}{5}\).

> ⚠️ **Mind the assumptions**  
> Many formulas assume **sampling without replacement** and **distinct items**. Check the model matches the story.

---

## 5) Random variables & moments

A **random variable** \(X\) maps outcomes to numbers.

- **Discrete:** pmf \(p(x)=P(X=x)\), with \(\sum_x p(x)=1\).
- **Continuous:** pdf \(f(x)\ge 0\), with \(\int_{-\infty}^{\infty} f(x)\,dx=1\).
- **Cdf:** \(F(x)=P(X\le x)\) equals \(\sum_{t\le x}p(t)\) (discrete) or \(\int_{-\infty}^x f(t)\,dt\) (continuous).

**Expectation and variance.**
\[
\mathbb{E}[X] =
\begin{cases}
\sum_x x\,p(x), & \text{discrete} \\
\int_{-\infty}^{\infty} x\,f(x)\,dx, & \text{continuous}
\end{cases}
\quad\quad
\mathrm{Var}(X)=\mathbb{E}[X^2] - \big(\mathbb{E}[X]\big)^2.
\]

**Linearity of expectation.** For constants \(a,b,c\),
\[
\mathbb{E}[aX+bY+c] = a\,\mathbb{E}[X] + b\,\mathbb{E}[Y] + c
\]
(no independence needed).

> 💡 **Heuristic**  
> Use linearity to compute \(\mathbb{E}[\text{sum}]\) by summing expectations, even when variables are dependent.

---

## Notation & conventions

- \(\Omega\): sample space; \(A,B\subseteq\Omega\) events. \(P\): probability.
- Discrete rv \(X\): pmf \(p(x)\). Continuous rv \(X\): pdf \(f(x)\), cdf \(F(x)\).
- Expectation \(\mathbb{E}[X]\) and variance \(\mathrm{Var}(X)\).
- Independence: \(A\perp B\).
- Indicator \(\mathbf{1}_{\{\cdot\}}\) for event truth values in formulas.

---

## Visual: sets & probability

An illustrative Venn diagram can help cement the identities above.

![Venn diagram: A, B, A∩B, complements](/images/venn-placeholder.png)


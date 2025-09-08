import React from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import QuizMCQ from "../../shell/components/QuizMCQ";

/**
 * NormalQuiz.jsx — dedicated quiz page for Normal(μ, σ²)
 */

const questions = [
  {
    question: "For X ~ Normal(μ, σ²), the pdf is",
    options: [
      "f(x)= (1/(σ√(2π))) exp(−(x−μ)²/(2σ²))",
      "f(x)= λ e^{−λx},  x≥0",
      "f(x)= 1/(b−a) on [a,b]",
      "f(x)= (1/√(2π)) exp(−x²/2),  x∈ℝ",
    ],
    correctIndex: 0,
    rationale:
      "Option 4 is the standard Normal pdf; with general μ,σ, shift/scale by σ.",
  },
  {
    question: "Which statement about the cdf is correct?",
    options: [
      "P(X≤x)=Φ((x−μ)/σ)",
      "P(X≤x)=1−Φ((x−μ)/σ)",
      "P(X≤x)=e^{−(x−μ)²/(2σ²)}",
      "P(X≤x)= (x−μ)/(σ√(2π))",
    ],
    correctIndex: 0,
    rationale: "Standardize with z=(x−μ)/σ and use the standard Normal cdf Φ.",
  },
  {
    question: "z-score is defined as",
    options: [
      "z = (x−μ)/σ",
      "z = (x−μ)σ",
      "z = (x+μ)/σ",
      "z = x/σ²",
    ],
    correctIndex: 0,
    rationale: "Standardization maps Normal(μ,σ²) to standard Normal.",
  },
  {
    question: "Approximate mass within ±1σ for a Normal is",
    options: ["≈68%", "≈50%", "≈95%", "≈99.7%"],
    correctIndex: 0,
    rationale: "68–95–99.7 rule.",
  },
  {
    question: "If X ~ N(μ, σ²), then aX+b is distributed as",
    options: [
      "N(aμ+b, a²σ²)",
      "N(aμ+b, σ²/a²)",
      "N(μ, σ²)+b",
      "N(a+b, σ²)",
    ],
    correctIndex: 0,
    rationale: "Linear transformation preserves Normal with mean/variance scaling.",
  },
  {
    question: "If X ~ N(μ1, σ1²) and Y ~ N(μ2, σ2²) independent, then X+Y ~",
    options: [
      "N(μ1+μ2, σ1²+σ2²)",
      "N(μ1+μ2, (σ1+σ2)²)",
      "N(μ1μ2, σ1²σ2²)",
      "Not Normal",
    ],
    correctIndex: 0,
    rationale: "Sums of independent Normals are Normal; variances add.",
  },
  {
    question: "Which symmetry identity holds for the standard Normal?",
    options: [
      "Φ(−z)=1−Φ(z)",
      "Φ(−z)=Φ(z)",
      "φ(−z)=−φ(z)",
      "P(Z>z)=Φ(z)",
    ],
    correctIndex: 0,
    rationale: "Standard Normal is symmetric: φ(−z)=φ(z), hence Φ(−z)=1−Φ(z).",
  },
  {
    question: "Quick calc: X ~ N(10, 2²). P(X ≤ 12) equals",
    options: [
      "Φ((12−10)/2)",
      "Φ((12−10)·2)",
      "1 − Φ((12−10)/2)",
      "Φ(12)",
    ],
    correctIndex: 0,
    rationale: "Standardize with z=(12−10)/2=1.",
  },
  {
    question: "For large z>0, a quick right-tail bound is",
    options: [
      "P(Z>z) ≈ φ(z)/z (Mills ratio)",
      "P(Z>z) ≈ 1/z",
      "P(Z>z) ≈ e^{−z}",
      "P(Z>z) ≈ z·φ(z)",
    ],
    correctIndex: 0,
    rationale: "Mills ratio gives a sharp asymptotic approximation.",
  },
];

export default function NormalQuiz() {
  return (
    <>
      <AppHeaderMini
        tutorialSlug="introduction-to-probability-distribution"
        sectionId="continuous"
        sectionTitle="Continuous"
      />

      <main className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quiz — Normal(μ, σ²)
          </h1>
          <p className="mt-2 text-slate-700">
            Check your understanding of pdf/cdf, z-scores, rule-of-thumb coverage, and closure properties.
          </p>
        </div>

        <section className="space-y-4">
          <QuizMCQ questions={questions} storageNamespace="quiz:normal" />
        </section>

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/normal"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← Back to Lesson
          </Link>
          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Continuous Intro →
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

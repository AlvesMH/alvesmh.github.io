import React from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import QuizMCQ from "../../shell/components/QuizMCQ";

/**
 * UniformQuiz.jsx — dedicated quiz page for Uniform(a,b)
 */

const questions = [
  {
    question: "For X ~ Uniform(a,b) with a<b, the pdf is",
    options: [
      "f(x)=1/(b−a) for a≤x≤b, 0 otherwise",
      "f(x)=(x−a)/(b−a) for a≤x≤b, 0 otherwise",
      "f(x)=e^{−(x−a)} on [a,∞)",
      "f(x)=p^x(1−p)^{1−x} on {0,1}",
    ],
    correctIndex: 0,
    rationale: "Uniform has constant density on [a,b].",
  },
  {
    question: "The cdf of X ~ Uniform(a,b) is",
    options: [
      "0 (x<a), (x−a)/(b−a) (a≤x≤b), 1 (x>b)",
      "e^{−(x−a)} (x≥a)",
      "x^n on [0,1]",
      "1−(1−x)^n on [0,1]",
    ],
    correctIndex: 0,
    rationale: "Integrating the flat pdf yields a linear cdf on [a,b].",
  },
  {
    question: "Which moments are correct for Uniform(a,b)?",
    options: [
      "E[X]=(a+b)/2 and Var(X)=(b−a)^2/12",
      "E[X]=a and Var(X)=b−a",
      "E[X]=(b−a)/2 and Var(X)=(a+b)^2",
      "E[X]=0 and Var(X)=1",
    ],
    correctIndex: 0,
    rationale: "Standard formulas for Uniform(a,b) moments.",
  },
  {
    question: "If U ~ Uniform(0,1), then a+(b−a)U has distribution",
    options: [
      "Uniform(a,b)",
      "Exponential(b−a)",
      "Normal((a+b)/2, (b−a)^2/12)",
      "Beta(a,b)",
    ],
    correctIndex: 0,
    rationale: "Linear transform maps U(0,1) to U(a,b).",
  },
  {
    question: "Let X ~ Uniform(2,8). What is P(3 ≤ X ≤ 5)?",
    options: ["(5−3)/(8−2)", "(5−2)/(8−3)", "(5−3)/8", "Cannot be determined"],
    correctIndex: 0,
    rationale: "Interval length divided by width: (5−3)/(8−2)=1/3.",
  },
  {
    question: "For U1,…,Un i.i.d. Uniform(0,1), the pdf of max(Ui) is",
    options: [
      "n x^{n−1} on [0,1]",
      "n (1−x)^{n−1} on [0,1]",
      "1 on [0,1]",
      "e^{−x} on [0,∞)",
    ],
    correctIndex: 0,
    rationale: "Fmax(x)=x^n ⇒ fmax(x)=n x^{n−1}.",
  },
  {
    question: "Which statement is TRUE?",
    options: [
      "P(X=a)=1/(b−a)",
      "P(X=b)=1/(b−a)",
      "P(X=c)=0 for any single point c",
      "P(X≤a)=1",
    ],
    correctIndex: 2,
    rationale: "Continuous distributions assign zero mass to single points.",
  },
];

export default function UniformQuiz() {
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
            Quiz — Uniform(a,b)
          </h1>
          <p className="mt-2 text-slate-700">
            Quick check on pdf/cdf, moments, transformation, and simple interval probabilities.
          </p>
        </div>

        <section className="space-y-4">
          <QuizMCQ questions={questions} storageNamespace="quiz:uniform" />
        </section>

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/uniform"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← Back to Lesson
          </Link>
          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/exponential"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continue to Exponential →
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

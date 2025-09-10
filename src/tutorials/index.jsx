// src/tutorials/index.jsx
import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import TutorialsHome from "./TutorialsHome.jsx";

// ===== Quizzes =====
import GammaQuiz from "./probability/continuous/GammaQuiz.jsx";
import NormalQuiz from "./probability/continuous/NormalQuiz.jsx";
import ExponentialQuiz from "./probability/continuous/ExponentialQuiz.jsx";
import UniformQuiz from "./probability/continuous/UniformQuiz.jsx";
import CLTQuiz from "./probability/continuous/CLTQuiz.jsx";

import BernoulliQuiz from "./probability/discrete/BernoulliQuiz.jsx";
import BinomialQuiz from "./probability/discrete/BinomialQuiz.jsx";
import GeometricQuiz from "./probability/discrete/GeometricQuiz.jsx";
import NegativeBinomialQuiz from "./probability/discrete/NegativeBinomialQuiz.jsx";
import PoissonQuiz from "./probability/discrete/PoissonQuiz.jsx";

// ===== Lessons =====
import Foundations from "./probability/foundations/Foundations";
import Practice from "./probability/practice/Practice";

// Discrete lessons
import Bernoulli from "./probability/discrete/Bernoulli";
import Binomial from "./probability/discrete/Binomial";
import Geometric from "./probability/discrete/Geometric";
import NegativeBinomial from "./probability/discrete/NegativeBinomial";
import Poisson from "./probability/discrete/Poisson";

// Continuous lessons
import ContinuousIntro from "./probability/continuous/ContinuousIntro";
import Uniform from "./probability/continuous/Uniform";
import Exponential from "./probability/continuous/Exponential";
import Gamma from "./probability/continuous/Gamma";
import Normal from "./probability/continuous/Normal";
import CLT from "./probability/continuous/CLT";

export default function TutorialsApp() {
  return (
    <Routes>
      {/* /tutorials */}
      <Route index element={<TutorialsHome />} />

      {/* /tutorials/introduction-to-probability-distribution/* */}
      <Route path="introduction-to-probability-distribution">
        <Route index element={<Navigate to="foundations" replace />} />

        {/* Foundations */}
        <Route path="foundations" element={<Foundations />} />

        {/* Discrete topics */}
        <Route path="discrete" element={<Outlet />}>
          <Route index element={<Navigate to="bernoulli" replace />} />
          <Route path="bernoulli" element={<Bernoulli />} />
          <Route path="binomial" element={<Binomial />} />
          <Route path="geometric" element={<Geometric />} />
          <Route path="negative-binomial" element={<NegativeBinomial />} />
          <Route path="poisson" element={<Poisson />} />

          {/* Discrete quizzes — NOTE: relative paths */}
          <Route path="bernoulli/quiz" element={<BernoulliQuiz />} />
          <Route path="binomial/quiz" element={<BinomialQuiz />} />
          <Route path="geometric/quiz" element={<GeometricQuiz />} />
          <Route path="negative-binomial/quiz" element={<NegativeBinomialQuiz />} />
          <Route path="poisson/quiz" element={<PoissonQuiz />} />
        </Route>

        {/* Continuous topics */}
        <Route path="continuous" element={<Outlet />}>
          <Route index element={<Navigate to="continuous-intro" replace />} />
          <Route path="continuous-intro" element={<ContinuousIntro />} />
          <Route path="uniform" element={<Uniform />} />
          <Route path="exponential" element={<Exponential />} />
          <Route path="gamma" element={<Gamma />} />
          <Route path="normal" element={<Normal />} />
          <Route path="clt" element={<CLT />} />

          {/* Continuous quizzes — NOTE: relative paths */}
          <Route path="uniform/quiz" element={<UniformQuiz />} />
          <Route path="exponential/quiz" element={<ExponentialQuiz />} />
          <Route path="gamma/quiz" element={<GammaQuiz />} />
          <Route path="normal/quiz" element={<NormalQuiz />} />
          <Route path="clt/quiz" element={<CLTQuiz />} />
        </Route>

        {/* Practice */}
        <Route path="practice" element={<Practice />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/tutorials" replace />} />
    </Routes>
  );
}

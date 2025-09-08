// src/tutorials/index.jsx
import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import TutorialsHome from "./TutorialsHome";

// Probability — new architecture
import Foundations from "./probability/foundations/Foundations";
import Practice from "./probability/practice/Practice";

// Discrete
import Bernoulli from "./probability/discrete/Bernoulli";
import Binomial from "./probability/discrete/Binomial";
import Geometric from "./probability/discrete/Geometric";
import NegativeBinomial from "./probability/discrete/NegativeBinomial";
import Poisson from "./probability/discrete/Poisson";

// Continuous & CLT
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
          {/* When user hits /.../discrete, send them to the first lesson */}
          <Route index element={<Navigate to="bernoulli" replace />} />
          <Route path="bernoulli" element={<Bernoulli />} />
          <Route path="binomial" element={<Binomial />} />
          <Route path="geometric" element={<Geometric />} />
          <Route path="negative-binomial" element={<NegativeBinomial />} />
          <Route path="poisson" element={<Poisson />} />
        </Route>

        {/* Continuous topics */}
        <Route path="continuous" element={<Outlet />}>
          {/* When user hits /.../continuous, send them to the intro or first topic */}
          <Route index element={<Navigate to="uniform" replace />} />
          <Route index element={<ContinuousIntro />} />
          <Route path="uniform" element={<Uniform />} />
          <Route path="exponential" element={<Exponential />} />
          <Route path="gamma" element={<Gamma />} />
          <Route path="normal" element={<Normal />} />
          <Route path="clt" element={<CLT />} />
        </Route>

        {/* Practice */}
        <Route path="practice" element={<Practice />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/tutorials" replace />} />
    </Routes>
  );
}




import React from 'react';
import { Helmet } from 'react-helmet-async';
import Canonical from '../components/Canonical';

export default function HumanAIWork() {
  return <main id="main-content" className="page-shell case-study">
    <Canonical path="/work/human-ai-work" />
    <Helmet><title>Human–AI Work — Hugo Martins</title><meta name="description" content="Hugo Martins on adaptive expertise, human-AI collaboration, work redesign, organisational adaptation and AI advantage." /></Helmet>
    <header className="page-intro"><p className="section-kicker">Research &amp; practice</p><h1>Human–AI Work</h1><p>What becomes valuable when intelligent systems can participate in planning, analysis, production and execution?</p><div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium text-[#687181]"><span>Adaptive expertise</span><span>Work redesign</span><span>Organisational adaptation</span></div></header>
    <div className="prose-profile">
      <section><h2>Adaptive expertise</h2><p>As AI absorbs more routine cognitive production, job readiness becomes less about reproducing standard procedures and more about framing unfamiliar problems, evaluating evidence, handling exceptions and adapting knowledge to changing contexts.</p></section>
      <section><h2>From tools to work systems</h2><p>The unit of analysis should not be the model alone. Performance emerges from the whole human–AI work system: task allocation, interfaces, incentives, escalation paths, accountability, skills and organisational routines.</p></section>
      <section><h2>AI adoption vs AI advantage</h2><p>Access to similar models is increasingly commoditised. Sustainable advantage therefore shifts toward complementary organisational capabilities: work redesign, domain expertise, data and process quality, managerial judgement and the ability to integrate human and machine strengths.</p></section>
      <section><h2>Current questions</h2><ul><li>Which human capabilities become more valuable as agentic AI becomes more autonomous?</li><li>How should roles be redesigned around exception handling, judgement and accountability?</li><li>When does AI augment cognition, and when does it erode capability through over-reliance?</li><li>How should organisations evaluate AI systems when performance is jointly produced by humans and machines?</li></ul></section>
    </div>
  </main>;
}

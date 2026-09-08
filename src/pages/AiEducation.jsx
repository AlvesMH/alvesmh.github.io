import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';

const learningStages = [
  {
    number: '01',
    title: 'Foundational readiness',
    label: 'Asynchronous preparation',
    copy: 'Students establish a baseline in source-grounded research, prompt design and responsible tool use through curated guidance before the live session.'
  },
  {
    number: '02',
    title: 'Facilitated application',
    label: 'Synchronous inquiry',
    copy: 'Weekly cases turn the classroom into a place for critique and iteration. Students compare outputs, expose weak assumptions and improve how they question, steer and verify AI.'
  },
  {
    number: '03',
    title: 'Applied mastery',
    label: 'Project-based synthesis',
    copy: 'Teams use grounded research and agentic workflows to address complex human-centred challenges, while documenting the decisions that must remain with people.'
  }
];

const assessmentStages = [
  ['Research and frame', 'Teams build a multi-perspective source library, critically evaluate AI-assisted research and define a defensible problem statement.'],
  ['Develop and communicate', 'Students create a grounded interdisciplinary response and translate it into a visual argument and a stakeholder-focused oral pitch.'],
  ['Synthesize and reflect', 'Each student explains how their understanding changed, what the group learned across disciplines and where human intervention altered the AI-supported process.']
];

export default function AiEducation() {
  return <main id="main-content" className="page-shell case-study">
    <Canonical path="/teaching/ai-literacy-ntu" />
    <Helmet>
      <title>AI Literacy in the NTU Core Curriculum — Hugo Martins</title>
      <meta name="description" content="A detailed case study of Hugo Martins' approach to AI literacy, inquiry-led learning, human-in-the-loop assessment and agentic learning in NTU's interdisciplinary Core Curriculum." />
    </Helmet>

    <header className="page-intro">
      <p className="section-kicker">Teaching case · AI literacy at scale</p>
      <h1>AI Literacy in the NTU Core Curriculum</h1>
      <p>Designing a learning environment in which students use AI extensively while retaining responsibility for evidence, reasoning, judgement and decisions.</p>
      <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium text-[#687181]">
        <span>Nanyang Technological University</span><span>2024–Present</span><span>CC0007 · Science &amp; Technology for Humanity</span>
      </div>
    </header>

    <div className="case-facts" aria-label="Case study at a glance">
      <div><strong>36</strong><span>CC0007 tutorial classes</span></div>
      <div><strong>1,700+</strong><span>students reached</span></div>
      <div><strong>3</strong><span>learning stages</span></div>
      <div><strong>3</strong><span>assessment phases</span></div>
    </div>

    <div className="prose-profile">
      <section>
        <h2>Context and scope</h2>
        <div>
          <p>CC0007 sits within NTU's interdisciplinary Core Curriculum and asks students to examine how science and technology shape human life. Public reporting on NTU's AI initiative identifies Science and Technology for Humanity as the mandatory course in which responsible AI and AI-agent skills are taught.</p>
          <p>The institutional setting emphasises inquiry-driven experiential learning, project work, collaborative knowledge building and ethical, data-informed use of AI.</p>
          <p>Within that setting, my contribution has been to <strong>co-create and deliver the AI-literacy curriculum at tutorial level</strong>: translating broad pedagogical ambitions into weekly activities, research workflows, assessment guidance, feedback and classroom facilitation.</p>
          <aside className="case-note"><strong>Attribution note.</strong> NTU's education-transformation, signature-pedagogy and 4Learn frameworks provide the institutional context. This case study focuses on how I have interpreted and implemented those principles in CC0007 teaching. <a href="https://www.channelnewsasia.com/singapore/nanyang-technological-university-ai-initiative-google-6038731" target="_blank" rel="noreferrer">Read the public account of the wider initiative.</a></aside>
        </div>
      </section>

      <section>
        <h2>The design challenge</h2>
        <div>
          <p>Generative AI makes fluent answers abundant. That changes the educational problem. If students are assessed mainly on producing an answer to a predefined question, AI can complete much of the visible task while leaving the most important learning invisible.</p>
          <blockquote>The curriculum therefore has to move from solving predefined problems toward framing complex inquiries.</blockquote>
          <p>Students need to learn how to decide what is worth investigating, assemble trustworthy evidence, reconcile perspectives, identify the limits of an AI-generated proposal and take responsibility for a course of action.</p>
        </div>
      </section>

      <section>
        <h2>Course design thesis</h2>
        <div>
          <p>The learning design joins two elements that are often separated:</p>
          <div className="case-pair-grid">
            <article className="case-panel">
              <p className="case-panel-label">Capability</p>
              <h3>Foundational AI literacy</h3>
              <p>Students learn to use grounded research tools and agentic systems for inquiry, synthesis and project work.</p>
            </article>
            <article className="case-panel">
              <p className="case-panel-label">Purpose</p>
              <h3>Human-centred challenges</h3>
              <p>Students apply those capabilities to complex sociotechnical questions where values, stakeholders and consequences cannot be delegated to a model.</p>
            </article>
          </div>
          <p>The intended result is not faster content production. It is stronger critical awareness, interdisciplinary collaboration and a more explicit human–AI division of cognitive work.</p>
        </div>
      </section>

      <section>
        <h2>Learning architecture</h2>
        <div>
          <p>Agency is scaffolded rather than assumed. Students progress through three levels, with support reducing as the inquiry becomes more open-ended.</p>
          <ol className="case-steps">
            {learningStages.map(stage => <li key={stage.number}>
              <span className="case-step-number">{stage.number}</span>
              <div><p className="case-step-label">{stage.label}</p><h3>{stage.title}</h3><p>{stage.copy}</p></div>
            </li>)}
          </ol>
        </div>
      </section>

      <section>
        <h2>Assessment path</h2>
        <div>
          <p>The assessment sequence makes the inquiry process visible across collective and individual work.</p>
          <ol className="case-steps case-steps-compact">
            {assessmentStages.map(([title, copy], index) => <li key={title}>
              <span className="case-step-number">0{index + 1}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </li>)}
          </ol>
          <p>This progression separates three capabilities that a polished final answer can otherwise conceal: <strong>framing a problem, developing a justified response and reflecting on how judgement changed</strong>.</p>
        </div>
      </section>

      <section>
        <h2>Tool orchestration</h2>
        <div>
          <p>Different AI systems are assigned different cognitive roles rather than offered as a generic toolbox.</p>
          <div className="case-pair-grid">
            <article className="case-panel">
              <p className="case-panel-label">The library</p>
              <h3>Grounded synthesis</h3>
              <p>NotebookLM supports the construction of curated source libraries and citation-backed synthesis. Students can trace claims to evidence and identify gaps rather than accept an ungrounded response.</p>
            </article>
            <article className="case-panel">
              <p className="case-panel-label">The strategist</p>
              <h3>Agentic inquiry</h3>
              <p>Gemini-based agent environments support decomposition, stakeholder perspectives and iterative questioning. Students examine the agent's logic, probe bias and decide when intervention is necessary.</p>
            </article>
          </div>
          <p>The pairing matters: agents can expand the search and reasoning process, while a bounded evidence base helps keep conclusions inspectable and verifiable.</p>
        </div>
      </section>

      <section>
        <h2>Competencies made visible</h2>
        <div>
          <ul>
            <li><strong>Data provenance:</strong> curating credible sources and tracing claims back to evidence.</li>
            <li><strong>Output verification:</strong> moving from plausible generation to evidence-based academic work.</li>
            <li><strong>Agentic inquiry:</strong> progressing from passive search and retrieval to active questioning, critique and iteration.</li>
            <li><strong>Human intervention:</strong> recording where human logic overrode, redirected or constrained an AI-supported process.</li>
            <li><strong>Collaborative knowledge building:</strong> asking, creating, connecting and improving ideas across disciplinary perspectives.</li>
            <li><strong>Responsible judgement:</strong> deciding what to delegate, what to verify and what must remain a human decision.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Recurring learning challenges</h2>
        <div>
          <p>Across project work, the difficult parts are rarely producing a plausible solution. The recurring challenges are more fundamental:</p>
          <ul>
            <li>shallow problem framing and premature convergence on an answer;</li>
            <li>weak evaluation of source quality and AI-supported claims;</li>
            <li>limited integration across disciplinary and stakeholder perspectives;</li>
            <li>insufficient attention to trade-offs, feasibility and implementation context;</li>
            <li>low visibility of the student's own intervention and judgement.</li>
          </ul>
          <p>The curriculum responds by making the process of inquiry observable and by assessing decisions that fluent output can otherwise conceal.</p>
        </div>
      </section>

      <section>
        <h2>Implementation at scale</h2>
        <div>
          <p>Across 36 CC0007 tutorial classes, I have taught approximately 1,700+ unique undergraduate students. This scale has made coherence, clear scaffolding and inspectable evidence of learning central to my practice.</p>
          <p>Scale makes coherence important. The three-tier structure provides a repeatable rhythm—prepare, practise, apply—while leaving room for students to pursue different problems, sources and stakeholder perspectives.</p>
        </div>
      </section>

      <section>
        <h2>What I learned at scale</h2>
        <div>
          <ul>
            <li><strong>Structure and agency must develop together.</strong> Open-ended inquiry works better when students first have a reliable process for grounding, critique and iteration.</li>
            <li><strong>Verification needs an artifact.</strong> Source libraries and intervention records turn “critical thinking” from an aspiration into visible practice.</li>
            <li><strong>AI literacy is relational.</strong> Students learn from comparing approaches, challenging each other's assumptions and building stronger explanations together.</li>
            <li><strong>Assessment directs attention.</strong> If framing, evidence and reflection are not rewarded, students rationally focus on the polish of the final product.</li>
            <li><strong>Human judgement must be named.</strong> Students need explicit practice deciding what to delegate, what to verify and what they remain responsible for.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>What changes</h2>
        <div>
          <p>The practical shift is from treating AI literacy as prompt technique to treating it as <strong>a curriculum of judgement</strong>. Assessment must reward the quality of the question, the integrity of the evidence trail, the rationale for human intervention and the student's ability to defend a decision—not merely the fluency of the final artefact.</p>
          <blockquote>AI literacy is the capability to reason, learn and act effectively when AI becomes part of the cognitive system.</blockquote>
          <div className="mt-8 flex flex-wrap gap-5">
            <Link to="/teaching" className="button-primary">Teaching portfolio</Link>
            <Link to="/work/adaptive-expertise" className="button-secondary">Adaptive expertise framework</Link>
          </div>
          <p className="last-reviewed">Last reviewed September 2026.</p>
        </div>
      </section>
    </div>
  </main>;
}

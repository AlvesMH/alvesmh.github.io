import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Github, Linkedin, Mail, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';

export default function CVPage() {
  const ulTight = 'mt-2 list-disc list-outside pl-5 text-gray-800 space-y-1';
  const ulNormal = 'mt-2 list-disc list-outside pl-5 text-gray-800 space-y-2';

  // Hanging-indent style for reference-like entries
  const refItemStyle = { paddingLeft: '1.5rem', textIndent: '-1.5rem' };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Canonical path="/cv" />

      <Helmet>
        <title>CV — Hugo Martins</title>
        <meta
          name="description"
          content="Curriculum Vitae — Hugo Martins (PhD). ICC Lecturer at NTU (Singapore). Teaching and curriculum work focused on AI literacy, project-based learning, competency-based outcomes, and assessment design for an AI-enabled future."
        />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Curriculum Vitae</h1>
          <p className="mt-2 text-xl text-gray-900 font-semibold tracking-tight">Hugo Martins, PhD.</p>
          <p className="text-gray-700">
            Interdisciplinary Core Curriculum (ICC) Lecturer, Nanyang Technological University (Singapore)
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-700">
            <a
              href="https://github.com/alvesmh"
              className="inline-flex items-center gap-2 hover:text-blue-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
              github.com/alvesmh
            </a>

            <a
              href="https://www.linkedin.com/in/hugoalvesmartins/"
              className="inline-flex items-center gap-2 hover:text-blue-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
              linkedin.com/in/hugoalvesmartins
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 hover:text-blue-700 transition-colors"
              aria-label="Contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Mail className="w-4 h-4" />
              Contact
            </Link>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:border-blue-600 hover:text-blue-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              aria-label="Print CV"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>

        <div className="shrink-0">
          <img
            src="/profile.jpg"
            alt="Hugo Martins"
            className="w-28 h-28 rounded-full object-cover shadow-md border border-slate-200"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <hr className="my-8 border-slate-200" />

      {/* Teaching-forward profile */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Teaching profile</h2>
        <p className="text-gray-800 leading-relaxed">
          I am an interdisciplinary educator working at the intersection of human behaviour, data, and emerging
          technologies. My teaching practice is designed to help undergraduates develop durable competencies for an
          AI-enabled future: AI literacy, critical thinking, ethical reasoning, and evidence-based decision-making.
        </p>
        <p className="text-gray-800 leading-relaxed">
          In my teaching at NTU and at NIE, I combine structured inquiry with real-world cases, project-based learning,
          and assessment designs that make students&apos; reasoning visible and assessable in the age of generative AI. I
          emphasise responsible tool use, academic integrity, and clear performance standards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900">Competency-based outcomes</p>
            <ul className={ulTight}>
              <li>Clear learning outcomes mapped to demonstrable skills</li>
              <li>Rubrics aligned to reasoning quality and evidence use</li>
              <li>Progressive scaffolding and feedback cycles</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900">Signature pedagogy</p>
            <ul className={ulTight}>
              <li>Project-based learning and authentic case analysis</li>
              <li>Less didactic, more learning-by-doing</li>
              <li>Human-centred evaluation of technology impacts</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900">Assessments for the AI era</p>
            <ul className={ulTight}>
              <li>Process + outcomes (drafts, rationales, reflection)</li>
              <li>Individual + group; peer + self components</li>
              <li>Transparent AI-use expectations and integrity checks</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      {/* Academic appointment & teaching experience */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-900">Academic appointments and university teaching</h2>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-gray-900 font-semibold">
            Nanyang Technological University (NTU), Singapore — Part-Time Lecturer
          </p>
          <p className="text-gray-700">Interdisciplinary Collaborative Core Curriculum Office (2024 – Present)</p>

          <div className="mt-4 space-y-4">
            <div>
              <p className="font-semibold text-gray-900">CC0002 — Navigating the Digital World</p>
              <p className="text-gray-800 leading-relaxed">
                Interdisciplinary undergraduate course focused on computational thinking and digital literacy. I guide
                students in structured problem-solving and quantitative reasoning to analyse data and make defensible
                judgments in the digital age.
              </p>
              <ul className={ulTight}>
                <li>Topics taught include quantitative reasoning, cybersecurity fundamentals, digital misinformation, and data ethics/privacy.</li>
                <li>Teaching leadership: 6 TGs (~150 students).</li>
                <li>Introduced real-world cases (e.g., misinformation analysis on social media) to strengthen transfer to practice.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900">CC0007 — Science and Technology for Humanity</p>
              <p className="text-gray-800 leading-relaxed">
                3AU course examining how scientific and technological innovations shape human communities. Students
                critically evaluate emerging technologies and social challenges through technical, scientific, business,
                and social perspectives, culminating in collaborative proposals addressing real-life challenges.
              </p>
              <ul className={ulTight}>
                <li>Teaching leadership: 24 TGs (~900 students).</li>
                <li>Facilitated structured debates on benefits, costs, and second-order implications of technology adoption.</li>
                <li>Consistently strong student feedback for cultivating curiosity, responsibility, and human-centred judgment.</li>
              </ul>
            </div>

            <div className="pt-2">
              <p className="font-semibold text-gray-900">Responsibilities (across NTU courses)</p>
              <ul className={ulTight}>
                <li>Weekly lectures and interactive tutorials; student consultations.</li>
                <li>Design of teaching materials; creation of quizzes; grading assignments and projects.</li>
                <li>Consistent delivery against administrative timelines (marks entry, invigilation, coordination).</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-gray-900 font-semibold">National Institute of Education (NIE), Singapore — Part-Time Lecturer</p>
          <p className="text-gray-700">Sport Science &amp; Management Programme (2023 – Present)</p>

          <div className="mt-4">
            <p className="font-semibold text-gray-900">SS3612 — Human Resource Management in Sport</p>
            <p className="text-gray-800 leading-relaxed">
              Undergraduate HRM course focused on recruitment/selection, training and development, performance appraisal,
              and reward systems, with a particular emphasis on volunteer management in sport and recreation contexts.
            </p>
            <ul className={ulTight}>
              <li>Designed case studies and role-play exercises to develop applied HR judgement.</li>
              <li>Achieved a 100% pass rate each semester; mentored student teams on local organisational analyses.</li>
              <li>Developed teaching materials, rubrics, and graded assessments in alignment with NIE guidelines.</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      {/* Education */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-6">
          <div>
            <p className="text-gray-900 font-semibold">Ph.D. in Management (Organizational Behaviour)</p>
            <p className="text-gray-700">Nanyang Technological University (NTU), Singapore</p>
            <ul className={ulTight}>
              <li>Specialisation: teams collaboration and performance.</li>
              <li>Methods focus: structural equation modelling, social network analysis, mediation analysis, and experience sampling methods.</li>
              <li>Thesis work included longitudinal team performance analysis using graph theory and cross-nested hierarchical models (Python, SPSS, R).</li>
            </ul>
          </div>

          <div>
            <p className="text-gray-900 font-semibold">Sloan Master’s (M.Sc.) in Leadership and Strategy</p>
            <p className="text-gray-700">London Business School, United Kingdom</p>
            <ul className={ulTight}>
              <li>Executive-format programme for experienced professionals.</li>
              <li>Focus on global business strategy, organisational leadership, and innovation.</li>
            </ul>
          </div>

          <div>
            <p className="text-gray-900 font-semibold">B.Sc. in Economics</p>
            <p className="text-gray-700">University of Porto, Portugal</p>
            <ul className={ulTight}>
              <li>Strong foundation in quantitative analysis and economic theory.</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      {/* Certifications */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Certifications and professional development</h2>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="font-semibold text-gray-900">Teaching and education</p>
          <ul className="mt-3 list-disc list-outside pl-5 text-gray-800 space-y-4">
            <li>
              <p className="font-semibold text-gray-900">
                WSQ Advanced Certificate in Learning and Performance (ACLP) — Institute of Adult Learning (IAL), Singapore (2024)
              </p>
              <p className="mt-1 text-gray-700 leading-relaxed">
                Adult learning principles, instructional design, facilitation, and assessment literacy; supports designing and delivering certified training programmes and technology-enabled learning experiences.
              </p>
            </li>
            <li>
              <p className="font-semibold text-gray-900">
                Graduate Certificate in Teaching and Learning in Higher Education — National Institute of Education (NIE), Singapore (2025)
              </p>
              <p className="mt-1 text-gray-700 leading-relaxed">
                Evidence-informed university pedagogy with an emphasis on constructive alignment, assessment design, and reflective teaching practice.
              </p>
            </li>
            <li>
              <p className="font-semibold text-gray-900">
                Professional Certificate in Educational Technology for Educators — SMU Academy, Singapore (2021)
              </p>
              <p className="mt-1 text-gray-700 leading-relaxed">
                Designing effective blended learning; selecting and integrating digital tools to support engagement, feedback cycles, and learning outcomes.
              </p>
            </li>
            <li>
              <p className="font-semibold text-gray-900">
                Teaching Assistant Certification (University Teaching for TAs) — NTU, Singapore (2016)
              </p>
              <p className="mt-1 text-gray-700 leading-relaxed">
                Foundations of university teaching practice, including facilitation, student engagement, feedback and grading.
              </p>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="font-semibold text-gray-900">Data science and AI</p>
          <ul className="mt-3 list-disc list-outside pl-5 text-gray-800 space-y-4">
            <li>
              <p className="font-semibold text-gray-900">
                Advanced Professional Certificate in Data Science and AI — NTU PaCE (SkillsFuture CTP), Singapore (2025)
              </p>
              <p className="mt-1 text-gray-700 leading-relaxed">
                Data science, data engineering, machine learning, and applied AI; strengthens end-to-end capability from data preparation to model development and applied deployment.
              </p>
            </li>
            <li>
              <p className="font-semibold text-gray-900">
                Tech Immersion and Placement Programme (Applied Artificial Intelligence) — Republic Polytechnic &amp; IMDA, Singapore (2020)
              </p>
              <p className="mt-1 text-gray-700 leading-relaxed">
                Applied AI programme covering machine learning algorithms, software development workflows, and hands-on project implementation.
              </p>
            </li>
            <li>
              <p className="font-semibold text-gray-900">
                IBM Specialization: Generative AI Engineering with LLMs — Coursera (IBM) (2024)
              </p>
              <p className="mt-1 text-gray-700 leading-relaxed">
                Practical LLM development and evaluation with modern tooling (e.g., transformer workflows and retrieval-augmented generation).
              </p>
            </li>
            <li>
              <p className="font-semibold text-gray-900">
                IBM Specialization: Generative AI for Educators — Coursera (IBM) (2024)
              </p>
              <p className="mt-1 text-gray-700 leading-relaxed">
                Pedagogical integration of generative AI for learning design and feedback, including responsible use, prompting strategies, and classroom-ready implementation patterns.
              </p>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="font-semibold text-gray-900">Finance</p>
          <ul className="mt-3 list-disc list-outside pl-5 text-gray-800 space-y-3">
            <li>
              <p className="font-semibold text-gray-900">Chartered Financial Analyst (CFA)</p>
              <p className="mt-1 text-gray-700 leading-relaxed">
                Professional credential in investment analysis, portfolio management, and ethical standards—strong grounding for data-driven reasoning under uncertainty.
              </p>
            </li>
            <li>
              <p className="font-semibold text-gray-900">
                CFAME — Certificate on Financial Asset Management Engineering (Swiss Finance Institute)
              </p>
              <p className="mt-1 text-gray-700 leading-relaxed">
                Quantitative asset management training emphasising modelling, risk, and systematic investment decision processes.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      {/* AI teaching tools */}
      <section className="space-y-3">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="text-xl font-semibold text-gray-900">AI teaching tools (portfolio)</h2>
          <p className="text-gray-800 leading-relaxed">
            I build practical AI-enabled tools to support pedagogy, feedback, and students&apos; development of structured
            reasoning. These are experimental and designed to be used responsibly and to strengthen - not replace—human judgement.
          </p>
          <ul className={ulNormal}>
            <li>
              <strong>Critical Thinker</strong> — structured, multi-agent critique to support argument evaluation, reasoning quality,
              and consolidated reporting.
            </li>
            <li>
              <strong>Six Thinking Hats</strong> — Student Group Analysis App for analysing an idea, solution, or problem statement using Edward de Bono’s Six Thinking Hats method.
            </li>
            <li>
              <strong>Generative Lesson Planner</strong> — Retrieval Augmented Generation - enabled lesson planning assistant that produces lesson plans and supporting
              materials from instructors&apos; source documents.
            </li>
            <li>
              <strong>Academic Summariser / Generator</strong> — structured summarisation and generation workflow for academic PDFs to support seminar
              preparation and evidence-based writing.
            </li>
          </ul>

          <br />
          <p className="text-gray-700">
            See detailed pedagogical use cases and assessment alignment on the{' '}
            <Link
              className="text-blue-700 hover:underline"
              to="/tools"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Tools
            </Link>{' '}
            page.
          </p>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      {/* Research */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Research experience and methods</h2>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="font-semibold text-gray-900">
            Nanyang Business School, NTU — PhD research (Leadership, Management &amp; Organization)
          </p>
          <ul className={ulTight}>
            <li>End-to-end research and analytics pipelines: study design, data discovery, integration, modelling and interpretation.</li>
            <li>Advanced methods: structural equation modelling, social network analysis, mediation analysis, experience sampling methods.</li>
            <li>Thesis: longitudinal team performance analysis using graph theory and ordered probit models with cross-nested hierarchical data (Python, SPSS, R).</li>
          </ul>
        </div>       
      </section>

      <hr className="my-8 border-slate-200" />

      {/* Industry */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Industry experience</h2>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="font-semibold text-gray-900">
            Business Management Consultant — Singapore &amp; International (2017 – 2023)
          </p>
          <ul className={ulTight}>
            <li>Strategic advisory on internationalisation and new market penetration across China, South Korea, Japan and Southeast Asia.</li>
            <li>Stakeholder engagement with government bodies and industry associations; multi-partner execution.</li>
            <li>Projects involving emerging technologies in sport and entertainment (e.g., social media, e-commerce, e-gaming).</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="font-semibold text-gray-900">Trader — Banco Invest S.A, Portugal (2000 – 2014)</p>
          <ul className={ulTight}>
            <li>Executed and managed equity and derivatives positions, translating macro/news flow and microstructure signals into trade construction, sizing, and risk limits.</li>
            <li>Monitored and controlled trading risk through disciplined exposure management (limits, drawdowns, stress scenarios) and systematic post-trade review to refine decision rules.</li>
            <li>Produced daily/weekly trading commentary and performance attribution for internal stakeholders, documenting rationale, catalysts, and lessons learned to improve repeatability and team learning.</li>
          </ul>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      {/* Skills */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900">Teaching, curriculum &amp; assessment</p>
            <ul className={ulTight}>
              <li>Constructive alignment: outcomes → learning activities → assessments; competency-based rubrics</li>
              <li>Signature pedagogy: project-based and case-based learning with structured inquiry and reflection</li>
              <li>Assessment design for generative AI contexts (process evidence, rationale, transparent AI-use expectations)</li>
              <li>Feedback design: iterative drafts, peer/self components, and actionable feedback cycles</li>
              <li>Technology-enabled and inclusive delivery (blended learning, facilitation across large cohorts)</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900">Applied data &amp; AI</p>
            <ul className={ulTight}>
              <li>Python, R, SQL; analytics and modelling workflows</li>
              <li>Behavioural research methods: SEM, social network analysis, mediation, experience sampling; longitudinal/hierarchical modelling</li>
              <li>Machine learning development and evaluation (applied data science and AI workflows)</li>
              <li>LLM applications: prompt design, retrieval-augmented generation, and evaluation for education and knowledge work</li>
              <li>Full-stack prototyping: FastAPI; React (Vite); dashboards and decision-support tooling</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="font-semibold text-gray-900">Languages</p>
          <p className="mt-2 text-gray-800">English, Portuguese, Spanish</p>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      {/* References */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">References</h2>
        <p className="text-gray-800 leading-relaxed">
          Available upon request (including academic supervisors at NTU and supervisors from industry roles).
        </p>
      </section>
    </div>
  );
}

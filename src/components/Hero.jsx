import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="bg-[#f7f7f5]">
      <div className="site-shell grid min-h-[650px] gap-16 py-[96px] md:grid-cols-[7.5fr_4.5fr] md:items-center lg:py-[118px]">
        <div className="max-w-[700px]">
          <p className="section-kicker">Hugo Martins, PhD · AI literacy educator</p>
          <h1 className="hero-title mt-5 max-w-[690px] font-[680] leading-[.98] tracking-[-.048em] text-[#111318]">
            AI Literacy
            <span className="block">for Higher Education</span>
          </h1>
          <p className="mt-8 max-w-[680px] text-[18px] leading-[1.65] text-[#272b33] sm:text-[19px]">
            Applied and interdisciplinary AI-literacy curriculum, assessment and Project-Based Learning (PBL) for an AI-enabled world.
          </p>
          <p className="mt-4 max-w-[650px] text-[16px] leading-7 text-[#687181]">
            My work connects <strong className="font-semibold text-[#4b5360]">Project-Based Learning (PBL), interdisciplinary adaptive expertise and responsible human–AI work</strong>.
          </p>
          <p className="mt-7 max-w-[680px] text-[13px] leading-6 text-[#687181]">
            Nanyang Technological University <span aria-hidden="true">·</span><br className="sm:hidden" /> CC0007 Science &amp; Technology for Humanity · Singapore
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/teaching" className="button-primary">Explore teaching and curriculum</Link>
            <Link to="/cv" className="button-secondary">View CV</Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[320px] md:mx-0 md:justify-self-end">
          <div aria-hidden="true" className="absolute -bottom-5 -left-5 h-full w-full rounded-[14px] border border-[#d9dde1] bg-[#eceeeb]" />
          <img
            src="/profile.jpg"
            alt="Portrait of Hugo Martins"
            width="320"
            height="375"
            className="relative h-[350px] w-full rounded-[14px] object-cover object-top shadow-[0_1px_2px_rgba(15,23,42,.03),0_12px_36px_rgba(15,23,42,.055)] sm:h-[375px]"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

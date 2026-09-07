import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <main id="main-content" className="page-shell min-h-[560px]">
      <Helmet><title>Message received — Hugo Martins</title><meta name="robots" content="noindex" /></Helmet>
      <div className="max-w-[680px] border-t border-[#1d4f91] pt-8">
        <p className="section-kicker">Message received</p>
        <h1 className="mt-3 text-[clamp(2.6rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-.04em] text-[#111318]">Thank you.</h1>
        <p className="mt-6 text-[19px] leading-[1.65] text-[#4b5360]">Your message has been received. I’ll get back to you if the conversation is a good fit.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/" className="button-primary">Return home</Link>
          <Link to="/ideas" className="button-secondary">Browse writing</Link>
        </div>
      </div>
    </main>
  );
}

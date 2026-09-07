import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Canonical from '../components/Canonical';
import { WEB3FORMS_KEY } from '../config';
import { SITE } from '../data/site';

const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [isLocalPreview, setIsLocalPreview] = useState(false);

  useEffect(() => {
    setIsLocalPreview(['localhost', '127.0.0.1', '::1'].includes(window.location.hostname));
  }, []);

  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    if (sending) return;
    if (!WEB3FORMS_KEY) {
      setStatus('The contact form is temporarily unavailable. Please use LinkedIn instead.');
      return;
    }
    if (!captchaToken) {
      setCaptchaError('Please complete the verification step.');
      return;
    }

    setSending(true);
    setStatus('');
    setCaptchaError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: 'Hugo Martins website',
          subject: `Website enquiry from ${form.name}`,
          name: form.name,
          email: form.email.trim().toLowerCase(),
          message: form.message,
          reply_to: form.email.trim().toLowerCase(),
          botcheck: '',
          'h-captcha-response': captchaToken
        })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !(result?.success || result?.ok)) throw new Error(result?.message || `HTTP ${response.status}`);
      setForm({ name: '', email: '', message: '' });
      setCaptchaToken('');
      navigate('/thank-you', { replace: true });
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('Your message could not be sent. Please try again or connect through LinkedIn.');
    } finally {
      setSending(false);
    }
  }

  return (
    <main id="main-content" className="page-shell">
      <Canonical path="/contact" />
      <Helmet>
        <title>Contact — Hugo Martins</title>
        <meta name="description" content="Contact Hugo Martins about AI literacy, higher-education curriculum, assessment, learning innovation and responsible human–AI work." />
      </Helmet>

      <div className="grid gap-14 md:grid-cols-[5fr_7fr] md:gap-20">
        <section aria-labelledby="contact-heading">
          <p className="section-kicker">Contact</p>
          <h1 id="contact-heading" className="mt-3 text-[clamp(2.65rem,4.5vw,4.1rem)] font-semibold leading-[1.02] tracking-[-.04em] text-[#111318]">Start a thoughtful conversation</h1>
          <p className="mt-7 text-[19px] leading-[1.65] text-[#4b5360]">I welcome conversations about AI-literacy curriculum, assessment redesign, learning innovation, speaking and responsible human–AI work.</p>
          <p className="mt-5 text-[14px] leading-6 text-[#687181]">Based in Singapore and open to selected higher-education and learning-innovation opportunities in Singapore, Saudi Arabia, the UAE and Europe.</p>

          <div className="mt-11 border-t border-[#c9cdd3] pt-7">
            <h2 className="text-[14px] font-semibold text-[#111318]">Helpful context to include</h2>
            <ol className="contact-context mt-5 space-y-4 text-[14px] leading-6 text-[#687181]">
              <li>What you are working on or exploring</li>
              <li>Why you think my perspective may be useful</li>
              <li>Any relevant timing or format</li>
            </ol>
          </div>

          <div className="mt-9 border-t border-[#e1e4e8] pt-7">
            <p className="text-[13px] leading-6 text-[#687181]">Prefer a professional network?</p>
            <a href={SITE.links.linkedin} target="_blank" rel="noreferrer" className="text-link mt-2 inline-block">Connect on LinkedIn ↗</a>
          </div>
        </section>

        <section className="contact-card rounded-[12px] border border-[#e1e4e8] bg-white p-7 sm:p-10" aria-labelledby="message-heading">
          <div className="border-b border-[#e1e4e8] pb-7">
            <p className="section-kicker">Send a message</p>
            <h2 id="message-heading" className="mt-3 text-[28px] font-semibold tracking-[-.03em] text-[#111318]">Tell me what you have in mind</h2>
            <p className="mt-3 text-[14px] leading-6 text-[#687181]">A concise note is enough. I’ll reply if the conversation is a good fit.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="field-label" htmlFor="contact-name">Name</label>
              <input id="contact-name" className="field-control" type="text" name="name" value={form.name} onChange={update} autoComplete="name" required />
            </div>
            <div>
              <label className="field-label" htmlFor="contact-email">Email</label>
              <input id="contact-email" className="field-control" type="email" name="email" value={form.email} onChange={update} autoComplete="email" inputMode="email" required />
            </div>
            <div>
              <label className="field-label" htmlFor="contact-message">Message</label>
              <textarea id="contact-message" className="field-control min-h-[160px] resize-y" name="message" value={form.message} onChange={update} required />
            </div>

            <div className="overflow-x-auto py-1">
              {isLocalPreview ? (
                <div className="captcha-preview">Human verification is enabled on the live website.</div>
              ) : (
                <HCaptcha
                  sitekey={HCAPTCHA_SITEKEY}
                  reCaptchaCompat={false}
                  onVerify={token => { setCaptchaToken(token); setCaptchaError(''); }}
                  onExpire={() => setCaptchaToken('')}
                  onError={() => setCaptchaError('Verification could not load. Please retry.')}
                />
              )}
            </div>
            {captchaError && <p className="text-[13px] text-red-700" role="alert">{captchaError}</p>}

            <div className="flex flex-col gap-4 border-t border-[#e1e4e8] pt-7 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="button-primary sm:min-w-[150px]" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</button>
              <p className="max-w-[270px] text-[11px] leading-5 text-[#8b929e]">Your details are used only to respond to this enquiry.</p>
            </div>
            <p className="text-[13px] leading-6 text-red-700" aria-live="polite">{status}</p>
          </form>
        </section>
      </div>

      <div className="mt-20 border-t border-[#c9cdd3] pt-8 text-[14px] text-[#687181]">
        Looking for teaching evidence first? <Link to="/teaching" className="text-link">View the teaching portfolio →</Link>
      </div>
    </main>
  );
}

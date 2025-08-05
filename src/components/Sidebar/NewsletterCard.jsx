import React, { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

// Prefer env var at build-time; fallback to placeholder for convenience.
const ENV_KEY = import.meta.env?.VITE_WEB3FORMS_KEY;
const ACCESS_KEY_PLACEHOLDER = 'YOUR_WEB3FORMS_ACCESS_KEY';
const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

const NewsletterCard = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    if (!captchaToken) {
      setCaptchaError('Please complete the captcha.');
      return;
    }

    const access_key = (ENV_KEY || ACCESS_KEY_PLACEHOLDER || '').trim();
    if (!access_key || access_key === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setStatus('❌ Missing Web3Forms access key. Set VITE_WEB3FORMS_KEY or replace the placeholder in NewsletterCard.jsx.');
      return;
    }

    setSending(true);
    setStatus('');
    setCaptchaError('');

    try {
      const payload = {
        access_key,
        from_name: 'New Newsletter Subscriber',
        subject: '🆕 New newsletter subscriber',
        email: (email || '').trim().toLowerCase(),
        reply_to: (email || '').trim().toLowerCase(),
        botcheck: '',
        'h-captcha-response': captchaToken,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok && (json?.success || json?.ok)) {
        setStatus('✅ You have subscribed successfully!');
        setEmail('');
        setCaptchaToken('');
      } else {
        throw new Error(json?.message || `HTTP ${res.status}`);
      }
    } catch (err) {
      console.error('Web3Forms error:', err);
      setStatus('❌ Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
      <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
      <p className="text-blue-100 mb-4 text-sm">
        Get notified when I publish new posts about technology and academia.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        {/* Honeypot */}
        <input
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
          onChange={() => {}}
        />

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
        />

        <div className="flex justify-center">
          <HCaptcha
            sitekey={HCAPTCHA_SITEKEY}
            reCaptchaCompat={false}
            onVerify={(token) => { setCaptchaToken(token); setCaptchaError(''); }}
            onExpire={() => setCaptchaToken('')}
            onError={() => setCaptchaError('Captcha failed to load. Please retry.')}
          />
        </div>
        {captchaError && <p className="text-white/90 text-sm text-center">{captchaError}</p>}

        <button
          type="submit"
          disabled={sending}
          className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-60"
        >
          {sending ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
};

export default NewsletterCard;

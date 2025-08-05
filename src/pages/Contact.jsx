import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { WEB3FORMS_KEY } from '../config';

// Prefer env var at build-time; fallback to placeholder for convenience.
// ✅ Put your key in .env as VITE_WEB3FORMS_KEY or replace the placeholder below.
const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

const ContactPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

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

    const ACCESS_KEY = WEB3FORMS_KEY;
    if (!access_key) {
      setStatus('❌ Missing Web3Forms access key. Set VITE_WEB3FORMS_KEY or replace the placeholder in Contact.jsx.');
      return;
    }

    setSending(true);
    setStatus('');
    setCaptchaError('');

    try {
      const payload = {
        access_key,
        from_name: 'New Contact Message',
        subject: `📩 New contact from ${name}`,
        name,
        email: email.trim().toLowerCase(),
        message,
        reply_to: email.trim().toLowerCase(),
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
        setName(''); setEmail(''); setMessage('');
        setCaptchaToken('');
        navigate('/thank-you', { replace: true });
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
    <main className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact</h1>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Honeypot */}
        <input
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
          onChange={() => {}}
        />

        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
        <TextField label="Message" value={message} onChange={(e) => setMessage(e.target.value)} multiline rows={4} fullWidth required />

        <div className="flex justify-center">
          <HCaptcha
            sitekey={HCAPTCHA_SITEKEY}
            reCaptchaCompat={false}
            onVerify={(token) => { setCaptchaToken(token); setCaptchaError(''); }}
            onExpire={() => setCaptchaToken('')}
            onError={() => setCaptchaError('Captcha failed to load. Please retry.')}
          />
        </div>
        {captchaError && <p className="text-red-600 text-sm text-center">{captchaError}</p>}

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={sending}>
          {sending ? 'Sending…' : 'Send Message'}
        </Button>
      </form>

      {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
    </main>
  );
};

export default ContactPage;

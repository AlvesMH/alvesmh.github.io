import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const NewsletterCard = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      subscriber_email: email,
    };

    emailjs
      .send(
        'service_bctna4s',
        'template_sv20dnn',
        templateParams,
        'ibp7jwT-ZHpC4eW6u'
      )
      .then(
        () => {
          setStatus('✅ You have subscribed successfully!');
          setEmail('');
        },
        (error) => {
          setStatus('❌ Something went wrong. Please try again.');
          console.error('EmailJS Error:', error);
        }
      );
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
      <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
      <p className="text-blue-100 mb-4 text-sm">
        Get notified when I publish new posts about technology and academia.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Subscribe
        </button>
      </form>

      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
};

export default NewsletterCard;

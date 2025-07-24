import React, { useState } from 'react';

const NewsletterCard = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    // TODO: hook up to a mailing service
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
    </div>
  );
};

export default NewsletterCard;
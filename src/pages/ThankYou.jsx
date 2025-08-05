import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <main className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank you!</h1>
      <p className="text-gray-700 mb-8">
        Your submission was received. I’ll get back to you shortly.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ← Back to Home
      </Link>
    </main>
  );
};

export default ThankYou;

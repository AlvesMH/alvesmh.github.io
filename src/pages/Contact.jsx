import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      reply_to: email,
      message: message,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        templateParams,
        import.meta.env.VITE_EMAILJS_KEY
      )
      .then(
        () => {
          setStatus('✅ Your message has been sent!');
          setName('');
          setEmail('');
          setMessage('');
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setStatus('❌ Something went wrong. Please try again.');
        }
      );
  };

  return (
    <main className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField 
          label="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          fullWidth 
          required 
        />
        <TextField 
          label="Email" 
          type="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          fullWidth 
          required 
        />
        <TextField 
          label="Message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          multiline 
          rows={4} 
          fullWidth 
          required 
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send Message
        </Button>
      </form>

      {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
    </main>
  );
};

export default ContactPage;

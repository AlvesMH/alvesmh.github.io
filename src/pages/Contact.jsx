import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ContactPage = () => {
  // Local state for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, simply reset the form and log the input (could integrate with an API or email service)
    console.log('Contact form submitted:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
    alert('Thank you! Your message has been sent.');
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
    </main>
  );
};

export default ContactPage;

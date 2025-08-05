import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ArchivePage from './pages/Archive';
import ContactPage from './pages/Contact';
import PostPage from './pages/Post';
import ThankYou from './pages/ThankYou';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      {/* Define application routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

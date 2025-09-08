import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ArchivePage from './pages/Archive';
import ContactPage from './pages/Contact';
import PostPage from './pages/Post';
import ThankYou from './pages/ThankYou';
const TutorialsApp = React.lazy(() => import('./tutorials'));

export default function App() {
  const location = useLocation();
  const onTutorials = location.pathname.startsWith('/tutorials');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {!onTutorials && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/post/:slug" element={<PostPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route
          path="/tutorials/*"
          element={
            <React.Suspense fallback={<div className="p-8">Loading…</div>}>
              <TutorialsApp />
            </React.Suspense>
          }
        />
      </Routes>

      {!onTutorials && <Footer />}
    </div>
  );
}

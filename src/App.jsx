import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Ideas from './pages/Ideas';
import Contact from './pages/Contact';
import ThankYou from './pages/ThankYou';
import Tools from './pages/Tools';
import CV from './pages/CV';
import Work from './pages/Work';
import Profile from './pages/Profile';
import AiEducation from './pages/AiEducation';
import HumanAIWork from './pages/HumanAIWork';
import Teaching from './pages/Teaching';
import AdaptiveExpertise from './pages/AdaptiveExpertise';
import ScrollToTop from './components/ScrollToTop';

const TutorialsApp = React.lazy(() => import('./tutorials'));
const ClientPost = React.lazy(() => import('./pages/Post'));

export function SiteApp({ PostComponent = ClientPost }) {
  const location = useLocation();
  const onTutorials = location.pathname.startsWith('/tutorials');
  return <div className="min-h-screen bg-[#f7f7f5] text-[#111318]">
    {!onTutorials && <a href="#main-content" className="skip-link">Skip to main content</a>}
    <ScrollToTop />
    {!onTutorials && <Header />}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teaching" element={<Teaching />} />
      <Route path="/teaching/ai-literacy-ntu" element={<AiEducation />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/ai-in-education" element={<AiEducation />} />
      <Route path="/work/adaptive-expertise" element={<AdaptiveExpertise />} />
      <Route path="/work/human-ai-work" element={<HumanAIWork />} />
      <Route path="/ideas" element={<Ideas />} />
      <Route path="/archive" element={<Navigate to="/ideas" replace />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/cv" element={<CV />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/post/:slug" element={<React.Suspense fallback={<main id="main-content" className="article-shell">Loading essay…</main>}><PostComponent /></React.Suspense>} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/critical-thinking" element={<Navigate to="/work" replace />} />
      <Route path="/tutorials/*" element={<React.Suspense fallback={<div className="p-8">Loading…</div>}><TutorialsApp /></React.Suspense>} />
      <Route path="*" element={<main id="main-content" className="page-shell min-h-[560px]"><p className="section-kicker">Not found</p><h1 className="mt-3 text-5xl font-semibold tracking-[-.04em]">This page has moved</h1><p className="mt-6 text-lg text-[#4b5360]">The page you requested could not be found.</p><a href="/" className="button-primary mt-8">Return home</a></main>} />
    </Routes>
    {!onTutorials && <Footer />}
  </div>;
}

export default function App() {
  return <SiteApp />;
}

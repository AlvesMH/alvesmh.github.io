import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ThemeProvider from './themes';
import './index.css';

const application = (
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);

const root = document.getElementById('root');
// The static build is pre-rendered for search engines and no-JavaScript readers.
// React Router, Helmet and several client-only integrations intentionally make
// the interactive tree differ slightly from the server snapshot. Replace the
// snapshot atomically instead of attempting a mismatched hydration.
root.replaceChildren();
createRoot(root).render(application);

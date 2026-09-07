import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { SiteApp } from './App';
import Post from './pages/Post';
import ThemeProvider from './themes';

export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <ThemeProvider>
        <StaticRouter location={url}>
          <SiteApp PostComponent={Post} />
        </StaticRouter>
      </ThemeProvider>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const head = [
    helmet?.title?.toString() || '',
    helmet?.meta?.toString() || '',
    helmet?.link?.toString() || '',
    helmet?.script?.toString() || ''
  ].join('\n');

  return { html, head };
}

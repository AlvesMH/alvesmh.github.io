// src/components/Canonical.jsx
import { Helmet } from 'react-helmet-async';

export default function Canonical({ path = '' }) {
  const href = `https://hugomartins.eu${path || (typeof window !== 'undefined' ? window.location.pathname : '')}`;
  return (
    <Helmet>
      <link rel="canonical" href={href} />
    </Helmet>
  );
}


import { Helmet } from 'react-helmet-async';

export default function Canonical({ path = '/' }) {
  const url = `https://hugomartins.eu${path}`;
  return (
    <Helmet>
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

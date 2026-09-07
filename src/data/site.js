export const SITE = {
  personId: 'https://hugomartins.eu/#hugo-martins',
  name: 'Hugo Martins',
  fullName: 'Hugo Martins, PhD',
  headline: 'AI Literacy · Higher Education Curriculum & Assessment',
  location: 'Singapore',
  role: 'Lecturer',
  institution: 'Nanyang Technological University',
  summary: 'AI literacy educator and Lecturer at Nanyang Technological University specialising in higher-education curriculum, assessment and responsible human–AI work.',
  links: {
    github: 'https://github.com/AlvesMH',
    linkedin: 'https://www.linkedin.com/in/hugoalvesmartins/'
  }
};

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': SITE.personId,
  name: SITE.name,
  honorificSuffix: 'PhD',
  url: 'https://hugomartins.eu/',
  image: 'https://hugomartins.eu/profile.jpg',
  jobTitle: ['Lecturer', 'AI Literacy Educator'],
  description: SITE.summary,
  address: { '@type': 'PostalAddress', addressLocality: 'Singapore', addressCountry: 'SG' },
  worksFor: { '@type': 'CollegeOrUniversity', name: SITE.institution, url: 'https://www.ntu.edu.sg/' },
  affiliation: [{ '@type': 'CollegeOrUniversity', name: SITE.institution, url: 'https://www.ntu.edu.sg/' }],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Nanyang Technological University' },
    { '@type': 'CollegeOrUniversity', name: 'London Business School' },
    { '@type': 'CollegeOrUniversity', name: 'University of Porto' }
  ],
  knowsAbout: [
    'AI literacy', 'Higher education', 'Curriculum design', 'Assessment design',
    'Human-centred AI', 'Human-AI collaboration', 'Adaptive expertise',
    'Learning innovation', 'Organisational behaviour', 'Responsible AI'
  ],
  sameAs: [SITE.links.github, SITE.links.linkedin]
};

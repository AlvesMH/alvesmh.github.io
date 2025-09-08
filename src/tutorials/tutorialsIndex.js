// src/tutorials/tutorialsIndex.js
const tutorials = [
  {
    slug: "introduction-to-probability-distribution",
    title: "Introduction to Probability",
    summary:
      "Foundations, discrete & continuous models, CLT, and practice with quizzes and flashcards.",
    href: "/tutorials/introduction-to-probability-distribution",
    cover:
      `${import.meta.env.BASE_URL}probability/Probability-Banner.jpg`,
    // Sections listed on TutorialsHome; used only for navigation (no progress)
    sections: [
      {
        id: "foundations",
        title: "Foundations",
        href: "/tutorials/introduction-to-probability-distribution/foundations",
      },
      {
        id: "discrete",
        title: "Discrete",
        href: "/tutorials/introduction-to-probability-distribution/discrete/bernoulli",
        children: [
          { id: "bernoulli", title: "Bernoulli", href: "/tutorials/introduction-to-probability-distribution/discrete/bernoulli" },
          { id: "binomial", title: "Binomial", href: "/tutorials/introduction-to-probability-distribution/discrete/binomial" },
          { id: "geometric", title: "Geometric", href: "/tutorials/introduction-to-probability-distribution/discrete/geometric" },
          { id: "negative-binomial", title: "Negative Binomial", href: "/tutorials/introduction-to-probability-distribution/discrete/negative-binomial" },
          { id: "poisson", title: "Poisson", href: "/tutorials/introduction-to-probability-distribution/discrete/poisson" },
        ],
      },
      {
        id: "continuous",
        title: "Continuous",
        href: "/tutorials/introduction-to-probability-distribution/continuous",
        children: [
          { id: "uniform", title: "Uniform", href: "/tutorials/introduction-to-probability-distribution/continuous/uniform" },
          { id: "exponential", title: "Exponential", href: "/tutorials/introduction-to-probability-distribution/continuous/exponential" },
          { id: "gamma", title: "Gamma", href: "/tutorials/introduction-to-probability-distribution/continuous/gamma" },
          { id: "normal", title: "Normal", href: "/tutorials/introduction-to-probability-distribution/continuous/normal" },
          { id: "clt", title: "Central Limit Theorem", href: "/tutorials/introduction-to-probability-distribution/continuous/clt" },
        ],
      },
      {
        id: "practice",
        title: "Practice & Exam",
        href: "/tutorials/introduction-to-probability-distribution/practice",
      },
    ],
  },
];

export default tutorials;

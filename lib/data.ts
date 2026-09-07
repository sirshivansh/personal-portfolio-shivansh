// ─── Portfolio Data ────────────────────────────────────────────
// Edit this file to update all portfolio content in one place.
// ───────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Shivansh Mishra',
  title: 'Shivansh Mishra — Java Developer & Computer Engineering Student',
  description:
    'Portfolio of Shivansh Mishra, a Java developer and computer engineering student building dependable, thoughtful software.',
  url: 'https://shivansh-mishra.vercel.app',
  ogImage: '/shivansh-photo.jpg',
};

export const socialLinks = {
  github: 'https://github.com/sirshivansh',
  linkedin: 'https://linkedin.com/in/',
  email: 'shivanshmishraworks@gmail.com',
};

// Resume: place your resume PDF at /public/resume.pdf
// If the file doesn't exist, the download button will link to the external URL below.
export const resumeUrl = '/resume.pdf';

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const heroData = {
  badge: 'Available for opportunities',
  kicker: 'Java developer · computer engineering student',
  headline: ['Building the logic', 'behind better ideas.'],
  intro:
    "I'm Shivansh — a developer who turns complex problems into dependable, thoughtful software. I care about strong fundamentals, useful products, and code that lasts.",
  location: 'Based in India',
  status: 'Open to build',
};

export const aboutData = {
  paragraphs: [
    "I'm currently pursuing a Bachelor's degree in Computer Engineering, building my foundation across software development, problem solving, and systems thinking.",
    "My home base is Java and MySQL. I enjoy the discipline of object-oriented design, the clarity of well-structured database schemas, and building intelligent, reliable systems.",
  ],
};

export const skills = {
  Languages: ['Java', 'Python', 'SQL', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  'Frameworks & Libraries': ['Fastify', 'React', 'REST APIs', 'JDBC', 'OpenCV'],
  Databases: ['MySQL', 'PostgreSQL', 'Redis'],
  'Tools & Platforms': ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Linux', 'Vite', 'Turborepo'],
  'Core Concepts': ['OOP', 'MVC Architecture', 'DAO Pattern', 'Data Structures', 'Algorithms', 'DBMS', 'OS'],
};

// Flat list used in the About section skill cloud
export const coreSkills = [
  'Java',
  'MySQL',
  'SQL',
  'REST APIs',
  'TypeScript',
  'Python',
  'Git',
  'OOP',
  'Data Structures',
];

export const projects = [
  {
    title: 'PayRecover AI',
    type: 'AI Revenue Recovery',
    description:
      'An AI-assisted autonomous revenue recovery system for failed payment transactions, combining NVIDIA Nemotron LLM intelligence with a deterministic policy engine and Fastify backend.',
    stack: ['TypeScript', 'Fastify', 'React', 'PostgreSQL', 'Redis', 'NVIDIA AI'],
    github: 'https://github.com/sirshivansh/payrecover-ai',
    demo: 'https://github.com/sirshivansh/payrecover-ai',
  },
  {
    title: 'Smart Library System',
    type: 'Java Backend System',
    description:
      'A Java management platform engineered with strict MVC architecture, DAO patterns, MySQL database integration, SHA-256 password security, and dynamic fine computation.',
    stack: ['Java', 'MySQL', 'JDBC', 'MVC Architecture'],
    github: 'https://github.com/sirshivansh/smart_library_system',
    demo: 'https://github.com/sirshivansh/smart_library_system',
  },
];

export const education = [
  {
    degree: 'Bachelor of Computer Engineering',
    institution: '',
    location: 'India',
    period: 'In progress',
    description:
      'Focusing on software development, data structures, algorithms, and systems design.',
  },
];

export const experienceStrip = [
  {
    label: 'Education',
    title: 'Bachelor of Computer Engineering',
    subtitle: 'India · In progress',
  },
  {
    label: 'Focus',
    title: 'Backend & application development',
    subtitle: 'Java · MySQL · SQL',
  },
  {
    label: 'Approach',
    title: 'Learn. Build. Improve.',
    subtitle: 'One meaningful commit at a time',
  },
];

// Helper export aliases for Frame Scroll Milestones
export const personalInfo = {
  name: siteConfig.name,
  title: heroData.kicker,
  bio: heroData.intro,
  email: socialLinks.email,
  github: socialLinks.github,
  linkedin: socialLinks.linkedin,
  location: heroData.location,
};

export const aboutInfo = {
  paragraph1: aboutData.paragraphs[0],
  paragraph2: aboutData.paragraphs[1],
  highlights: coreSkills,
};

export const projectsData = projects.map((p, idx) => ({
  id: `project-${idx}`,
  title: p.title,
  category: p.type,
  description: p.description,
  tech: p.stack,
  githubUrl: p.github,
  liveUrl: p.demo,
}));

export const skillsData = {
  languages: skills['Languages'],
  frameworks: skills['Frameworks & Libraries'],
  databases: skills['Databases'],
  tools: skills['Tools & Platforms'],
  core: skills['Core Concepts'],
};

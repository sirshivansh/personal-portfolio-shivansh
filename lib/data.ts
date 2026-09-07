// ─── Portfolio Data ────────────────────────────────────────────
// Edit this file to update all portfolio content in one place.
// ───────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Shivansh Mishra',
  title: 'Shivansh Mishra — Java Developer & Computer Engineering Student',
  description:
    'Portfolio of Shivansh Mishra, a Java developer and computer engineering student building dependable, thoughtful software.',
  url: 'https://shivansh-mishra.vercel.app', // TODO: replace with your real deployed URL
  ogImage: '/shivansh-photo.jpg',
}

export const socialLinks = {
  github: 'https://github.com/sirshivansh', // TODO: verify this is your real GitHub profile
  linkedin: 'https://linkedin.com/in/', // TODO: add your LinkedIn username
  email: 'shivanshmishra@example.com', // TODO: replace with your real email
}

// Resume: place your resume PDF at /public/resume.pdf
// If the file doesn't exist, the download button will link to the external URL below.
export const resumeUrl = '/resume.pdf' // TODO: add resume.pdf to /public, or replace with external URL

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const heroData = {
  badge: 'Available for opportunities',
  kicker: 'Java developer · computer engineering student',
  headline: ['Building the logic', 'behind better ideas.'],
  intro:
    "I'm Shivansh — a developer who turns complex problems into dependable, thoughtful software. I care about strong fundamentals, useful products, and code that lasts.",
  location: 'Based in India',
  status: 'Open to build',
}

export const aboutData = {
  paragraphs: [
    "I'm currently pursuing a Bachelor's degree in Computer Engineering, building my foundation across software development, problem solving, and systems thinking.",
    "My home base is Java. I enjoy the discipline of object-oriented design, the clarity of well-structured APIs, and the moment an abstract idea finally becomes something useful.",
  ],
}

export const skills = {
  'Languages': ['Java', 'Python', 'SQL', 'JavaScript', 'HTML', 'CSS'],
  'Frameworks & Libraries': ['Spring Boot', 'REST APIs', 'JDBC'],
  'Databases': ['MySQL', 'PostgreSQL'],
  'Tools & Platforms': ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Linux'],
  'Core Concepts': ['OOP', 'Data Structures', 'Algorithms', 'DBMS', 'OS'],
}

// Flat list used in the About section skill cloud
export const coreSkills = ['Java', 'Spring Boot', 'SQL', 'REST APIs', 'Python', 'Git', 'OOP', 'Data Structures']

export const projects = [
  {
    title: 'Campus Connect',
    type: 'Full-stack platform',
    description:
      'A student collaboration platform for communities, events, and shared resources.',
    stack: ['Java', 'Spring Boot', 'MySQL'],
    // TODO: add real links when available
    github: '',
    demo: '',
  },
  {
    title: 'Smart Attendance System',
    type: 'Computer vision',
    description:
      'An intelligent attendance workflow designed to reduce manual effort and improve accuracy.',
    stack: ['Python', 'OpenCV', 'SQL'],
    github: '',
    demo: '',
  },
  {
    title: 'Java Utility Suite',
    type: 'Developer tools',
    description:
      'A collection of focused utilities built around clean APIs, practical automation, and readable code.',
    stack: ['Java', 'OOP', 'REST APIs'],
    github: '',
    demo: '',
  },
]

export const education = [
  {
    degree: 'Bachelor of Computer Engineering',
    institution: '', // TODO: add your university name
    location: 'India',
    period: 'In progress',
    description: 'Focusing on software development, data structures, algorithms, and systems design.',
  },
]

export const experienceStrip = [
  {
    label: 'Education',
    title: 'Bachelor of Computer Engineering',
    subtitle: 'India · In progress',
  },
  {
    label: 'Focus',
    title: 'Backend & application development',
    subtitle: 'Java · Spring · SQL',
  },
  {
    label: 'Approach',
    title: 'Learn. Build. Improve.',
    subtitle: 'One meaningful commit at a time',
  },
]

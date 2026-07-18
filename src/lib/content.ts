// Contenido del portfolio — derivado del CV, reforzado para venta.

export const PROFILE = {
  name: "Iván Gallego Vela",
  fullName: "Iván Gallego Vela",
  role: "Full Stack Developer",
  roleLong: "Full Stack Developer — Laravel · React / Next.js · TypeScript",
  location: "Terrassa, Barcelona",
  email: "ivangallegovela@gmail.com",
  phone: "637 45 44 98",
  phoneHref: "+34637454498",
  linkedin: "https://www.linkedin.com/in/ivan-gallego-vela-73824b118",
  linkedinLabel: "linkedin.com/in/ivan-gallego-vela-73824b118",
  github: "https://github.com/ivanote",
  yearsExperience: 6,
};

export const HERO_TAGLINE =
  "Construyo software de principio a fin: backend Laravel sobre microservicios, frontends React / Next.js y una IA integrada en el flujo de trabajo real.";

export const ABOUT_PARAGRAPHS = [
  "Full Stack Developer con 6 años de experiencia recorriendo el ciclo completo de desarrollo: diseño la API, modelo la base de datos, construyo el frontend y lo despliego con Docker y CI/CD. No delego capas: entiendo el sistema entero y por eso las piezas encajan.",
  "Mi terreno principal es Laravel 10 sobre arquitectura de microservicios con API gateways propios, y frontends modernos con React 19, Next.js 15 y TypeScript. También mantengo y hago evolucionar aplicaciones legacy en PHP nativo sin romper lo que ya funciona.",
  "Integro la IA en el desarrollo del día a día como una herramienta más —Claude Code, MCP, agentes— para ir más rápido sin perder control sobre el código que entrego.",
];

export const DISCIPLINE_NOTE =
  "Antes del software fui waterpolista de élite. De ahí traigo la disciplina, la constancia y el trabajo en equipo — hoy los aplico al código.";

export type Experience = {
  branch: string;
  company: string;
  role: string;
  period: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    branch: "HEAD → main",
    company: "FarmaOffice",
    role: "Full Stack Developer",
    period: "ene 2023 — actualidad",
    current: true,
    points: [
      "Desarrollo y evolución de un ecosistema de microservicios con Laravel 10, con cobertura de tests funcionales (PHPUnit).",
      "Frontends con Next.js, React, TypeScript y Tailwind CSS.",
      "API gateways propios como única vía de entrada al ecosistema de microservicios.",
      "Entorno de desarrollo dockerizado y CI/CD con Bitbucket Pipelines.",
    ],
    stack: ["Laravel 10", "Next.js", "React", "TypeScript", "Docker", "PHPUnit"],
  },
  {
    branch: "at-language",
    company: "AT Language Solutions",
    role: "Full Stack Developer",
    period: "oct 2021 — ene 2023",
    points: [
      "Nuevas funcionalidades de ERP / CRM: backend Laravel/PHP y frontend Vue.",
      "Diseño y modelado de bases de datos MySQL.",
    ],
    stack: ["Laravel", "PHP", "Vue 3", "MySQL"],
  },
  {
    branch: "metodo10",
    company: "Metodo10",
    role: "Full Stack Developer",
    period: "nov 2018 — oct 2021",
    points: [
      "Sitios web, e-commerce y CMS a medida.",
      "Backend Laravel, frontend React y modelado de bases de datos.",
    ],
    stack: ["Laravel", "React", "MySQL", "E-commerce"],
  },
  {
    branch: "bwireless",
    company: "B'wireless",
    role: "Developer",
    period: "jun 2018 — nov 2018",
    points: ["Nuevas funcionalidades sobre la aplicación Laravel de la empresa."],
    stack: ["Laravel", "PHP"],
  },
];

export type StackGroup = { key: string; label: string; items: string[] };

export const STACK: StackGroup[] = [
  {
    key: "backend",
    label: "backend",
    items: ["PHP 8", "Laravel 10", "API REST", "Sanctum", "PHPUnit", "Microservicios"],
  },
  {
    key: "frontend",
    label: "frontend",
    items: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Vue 3", "Jest", "Playwright"],
  },
  {
    key: "datos",
    label: "datos",
    items: ["MySQL 5/8", "Elasticsearch", "Meilisearch", "Strapi"],
  },
  {
    key: "devops",
    label: "devops",
    items: ["Docker", "Bitbucket Pipelines", "CI/CD", "Linux", "Git", "Apache"],
  },
  {
    key: "ia",
    label: "ia",
    items: ["Claude Code", "MCP", "Agentes", "Automatización", "Playwright MCP"],
  },
  {
    key: "gestión",
    label: "gestión",
    items: ["Jira", "Code review", "Scrum / Kanban"],
  },
];

export type Education = { year: string; title: string; school: string };

export const EDUCATION: Education[] = [
  { year: "2017", title: "Especialización en desarrollo web", school: "UOC" },
  {
    year: "2015",
    title: "Máster en Gestión y Desarrollo de Aplicaciones Multiplataforma",
    school: "SEAS",
  },
  {
    year: "2015",
    title: "Ingeniería Técnica de Telecomunicación — Sonido e Imagen",
    school: "UPC",
  },
];

export const WATERPOLO = {
  title: "Antes del código fue el deporte.",
  intro:
    "Durante años competí al máximo nivel como waterpolista de la Selección Española y logré mi meta: llegar a unos Juegos Olímpicos. El deporte de élite me enseñó lo que hoy define mi forma de programar: disciplina diaria, cabeza fría bajo presión y la certeza de que nada bueno se construye en solitario.",
  outro:
    "Colgué el gorro, pero no la mentalidad. La misma constancia que me llevó a competir con los mejores es la que pongo hoy en cada línea de código.",
  photos: [
    { src: "/waterpolo/w2.jpg", w: 545, h: 800, tag: "Disciplina" },
    { src: "/waterpolo/w6.jpg", w: 800, h: 566, tag: "Visión de juego" },
    { src: "/waterpolo/w4.jpg", w: 800, h: 509, tag: "Sacrificio" },
    { src: "/waterpolo/w7.jpg", w: 340, h: 411, tag: "Iniciativa" },
    { src: "/waterpolo/w1.jpg", w: 610, h: 405, tag: "Presión" },
    { src: "/waterpolo/w5.jpg", w: 610, h: 537, tag: "Equipo" },
  ],
} as const;

export const METRICS = [
  { value: "6", label: "años de experiencia", suffix: "+" },
  { value: "4", label: "empresas", suffix: "" },
  { value: "10", label: "tecnologías core", suffix: "+" },
  { value: "100", label: "ciclo end-to-end", suffix: "%" },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Fallback seed cache matching the CV exactly, ensures instant load and offline resilience
const FALLBACK_DATA = {
  es: {
    profile: {
      fullName: "Dr. José Daniel Narváez Flores",
      academicTitle: "Doctor en Informática | Investigador en CS e IA | Ingeniero de Sistemas",
      summary: "Doctor en Informática por la Universidad Abierta Interamericana (UAI) e Ingeniero de Sistemas. Mi trayectoria académica incluye tres maestrías finalizadas: Ingeniería de Software y Sistemas Informáticos, Inteligencia Artificial, y Ciencias Computacionales y Matemáticas Aplicadas. Mi investigación doctoral se ha centrado en la aplicación de técnicas de inteligencia artificial al ámbito de la ingeniería de software (AI4SE). Asimismo, mis intereses abarcan la matemática aplicada y la computación cuántica, abordando la resolución de problemas complejos desde una sólida perspectiva interdisciplinaria.",
      email: "jdnarvaezf@gmail.com",
      phone: "+505 5774 1987",
      location: "Rivas, Nicaragua",
      githubUrl: "https://github.com/jdanieln",
      linkedinUrl: "https://linkedin.com/in/jdanielnf",
      avatarUrl: "https://avatars.githubusercontent.com/u/53232152?v=4"
    },
    experiences: [
      {
        id: 1,
        role: "Profesor Adjunto e Investigador en CS e IA",
        institution: "Keiser University",
        period: "Ene 2026 - Presente",
        description: "Docencia e investigación de frontera en Ciencias de la Computación e Inteligencia Artificial.",
        highlights: [
          "Impartición de lecciones avanzadas y mentoría de estudiantes en desafíos técnicos complejos.",
          "Investigación activa en AI4SE (Artificial Intelligence for Software Engineering), orientada a la generación de conocimiento y su difusión en la comunidad científica internacional."
        ],
        tags: ["AI4SE", "Machine Learning", "Research", "Higher Education"]
      },
      {
        id: 2,
        role: "Consultor Interno de IA y Tecnología",
        institution: "RETECSA",
        period: "Sep 2025 - Presente",
        description: "Liderazgo tecnológico y adopción estratégica de soluciones basadas en inteligencia artificial generativa.",
        highlights: [
          "Liderazgo en la adopción estratégica de herramientas de IA generativa y automatización de procesos corporativos.",
          "Desarrollo de soluciones tecnológicas personalizadas y capacitación ejecutiva en el ecosistema de Google Workspace y AI Gems."
        ],
        tags: ["Generative AI", "Google Workspace", "AI Gems", "Process Automation"]
      },
      {
        id: 3,
        role: "Profesor de Ingeniería en Sistemas de Información",
        institution: "Universidad Nacional Hermano Juan Salvador Morales (UNHSJM)",
        period: "Oct 2022 - Presente",
        description: "Docencia universitaria de asignaturas clave en ingeniería de sistemas de información.",
        highlights: [
          "Formación de futuras generaciones de ingenieros en arquitectura de software y bases de datos.",
          "Diseño curricular y coordinación de laboratorios prácticos."
        ],
        tags: ["Software Architecture", "Database Systems", "Teaching"]
      },
      {
        id: 4,
        role: "Profesor de Ingeniería en Sistemas Computacionales",
        institution: "Universidad Nacional Multidisciplinaria Ricardo Morales Avilés (UNM-RMA)",
        period: "Sep 2022 - Presente",
        description: "Docencia universitaria en el departamento de tecnología e ingeniería computacional.",
        highlights: [
          "Cátedras especializadas en programación, estructuras de datos y métodos computacionales.",
          "Tutoría de proyectos de graduación e investigación aplicada."
        ],
        tags: ["Programming", "Algorithms", "Computer Science"]
      },
      {
        id: 5,
        role: "Analista Programador S.I.",
        institution: "Grupo LAFISE",
        period: "Ene 2022 - Mar 2024",
        description: "Análisis, diseño y mantenimiento de sistemas críticos para el sector bancario y financiero.",
        highlights: [
          "Desarrollo e integración de servicios bancarios transaccionales de alta disponibilidad.",
          "Implementación de buenas prácticas de ingeniería de software, Clean Architecture y optimización SQL Server."
        ],
        tags: ["Fintech", "C#", "SQL Server", "Clean Architecture"]
      }
    ],
    educations: [
      {
        id: 1,
        degree: "Doctorado en Informática",
        institution: "Universidad Abierta Interamericana (UAI)",
        dateText: "Feb 2026",
        honors: "Tesis: 'Descubrimiento y diseño de microservicios asistido por IA a partir de requisitos textuales'",
        verificationUrl: "https://repositorio.uai.edu.ar/collections/bec3d705-1345-44cd-84a8-c11067e04fec"
      },
      {
        id: 2,
        degree: "Maestría en Ciencias Computacionales y Matemáticas Aplicadas",
        institution: "Universidad Internacional de La Rioja (UNIR México)",
        dateText: "Abr 2025",
        honors: "Promedio General: 8.67 / 10 | 81 Créditos superados",
        verificationUrl: "https://verifirma.unir.net/MX/CSV/4506798f-6e29-4daa-acf1-9e0acbbaa379"
      },
      {
        id: 3,
        degree: "Maestría en Inteligencia Artificial",
        institution: "Universidad Internacional de La Rioja (UNIR México)",
        dateText: "Oct 2023",
        honors: "Seminario de Investigación aprobado conforme a RVOE Federal",
        verificationUrl: "https://verifirma.unir.net/MX/CSV/d31e1f2d-05c8-42e2-bf5b-a13ec26010f8"
      },
      {
        id: 4,
        degree: "Maestría en Ingeniería de Software y Sistemas Informáticos",
        institution: "Universidad Internacional de La Rioja (UNIR México)",
        dateText: "Ago 2022",
        honors: "Con Mención Honorífica por Alto Desempeño",
        verificationUrl: "https://verifirma.unir.net/MX/CSV/e02f0e2e-f447-41e3-b9a9-16a1470629f4"
      },
      {
        id: 5,
        degree: "Ingeniería de Sistemas",
        institution: "Universidad Hispanoamericana (UHISPAM)",
        dateText: "Nov 2019",
        honors: "Grado Profesional de Ingeniero de Sistemas",
        verificationUrl: null
      },
      {
        id: 6,
        degree: "Grado en Matemática Computacional",
        institution: "Universidad Internacional de La Rioja (UNIR)",
        dateText: "En curso",
        honors: "Estudios universitarios avanzados en matemática aplicada y computación",
        verificationUrl: null
      }
    ],
    publications: [
      {
        id: 1,
        title: "ArchiGenMS: A Neuro-Symbolic Evolutionary Framework for Greenfield Microservice Design",
        authors: "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Rossi",
        venue: "Congresso Ibero-Americano em Engenharia de Software (CIbSE). SBC, pp. 365–372",
        year: 2026,
        pubType: "conference",
        citation: "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Rossi (2026). “ArchiGenMS: A Neuro-Symbolic Evolutionary Framework for Greenfield Microservice Design”. In: CIbSE 2026, SBC, pp. 365–372."
      },
      {
        id: 2,
        title: "MAPE-KV: Una Arquitectura Neuro-Simbólica Verificada para la Orquestación de Enjambres Robóticos",
        authors: "Narváez, Daniel et al.",
        venue: "Congresso Ibero-Americano em Engenharia de Software (CIbSE). SBC, pp. 428–429",
        year: 2026,
        pubType: "conference",
        citation: "Narváez, Daniel et al. (2026). “MAPE-KV: Una Arquitectura Neuro-Simbólica Verificada para la Orquestación de Enjambres Robóticos”. In: CIbSE 2026, SBC, pp. 428–429."
      },
      {
        id: 3,
        title: "Descubrimiento y diseño de microservicios asistido por IA a partir de requisitos textuales",
        authors: "Narváez Flores, José Daniel",
        venue: "Tesis Doctoral. Universidad Abierta Interamericana (UAI)",
        year: 2026,
        pubType: "thesis",
        url: "https://repositorio.uai.edu.ar/collections/bec3d705-1345-44cd-84a8-c11067e04fec",
        citation: "Narváez Flores, José Daniel (Feb. 2026). “Descubrimiento y diseño de microservicios asistido por IA a partir de requisitos textuales”. Tesis Doctoral, UAI."
      },
      {
        id: 4,
        title: "Descubrimiento y diseño de microservicios asistido por IA: Resumen de Línea de Investigación",
        authors: "Narváez Flores, José Daniel",
        venue: "XXVIII Workshop de Investigadores en Ciencias de la Computación (WICC 2026). Repositorio SEDICI",
        year: 2026,
        pubType: "workshop",
        citation: "Narváez Flores, José Daniel (2026). “Descubrimiento y diseño de microservicios asistido por IA: Resumen de Línea de Investigación”. In: XXVIII WICC 2026, Repositorio SEDICI."
      },
      {
        id: 5,
        title: "Designing Microservices Using AI: A Systematic Literature Review",
        authors: "Narváez, Daniel, Nicolas Battaglia, et al.",
        venue: "Software 4.1. ISSN: 2674-113X, MDPI",
        year: 2025,
        pubType: "journal",
        doi: "10.3390/software4010006",
        url: "https://www.mdpi.com/2674-113X/4/1/6",
        citation: "Narváez, Daniel, Nicolas Battaglia, et al. (2025). “Designing Microservices Using AI: A Systematic Literature Review”. In: Software 4.1. DOI: 10.3390/software4010006."
      },
      {
        id: 6,
        title: "Explorando el Uso de Inteligencia Artificial en el Descubrimiento y Diseño de Microservicios",
        authors: "Narváez, Daniel",
        venue: "Congresso Ibero-Americano em Engenharia de Software (CIbSE 2025). SBC, pp. 224–231",
        year: 2025,
        pubType: "conference",
        citation: "Narváez, Daniel (2025). “Explorando el Uso de Inteligencia Artificial en el Descubrimiento y Diseño de Microservicios”. In: CIbSE 2025, SBC, pp. 224–231."
      },
      {
        id: 7,
        title: "Aplicación de Inteligencia Artificial Generativa y Verificación Formal en el Descubrimiento de Microservicios",
        authors: "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Rossi",
        venue: "Revista Abierta de Informática Aplicada 9.1, pp. 2–24",
        year: 2025,
        pubType: "journal",
        citation: "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Rossi (2025). “Aplicación de Inteligencia Artificial Generativa y Verificación Formal en el Descubrimiento de Microservicios”. In: RAIA 9.1, pp. 2–24."
      },
      {
        id: 8,
        title: "Descubrimiento automático de microservicios mediante modelos generativos y verificación formal",
        authors: "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Héctor Rossi",
        venue: "XXXI Congreso Argentino de Ciencias de la Computación (CACIC 2025). Viedma, Río Negro",
        year: 2025,
        pubType: "conference",
        citation: "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Héctor Rossi (2025). “Descubrimiento automático de microservicios mediante modelos generativos y verificación formal”. In: CACIC 2025."
      },
      {
        id: 9,
        title: "Aplicación de Inteligencia Artificial en el Diseño de Microservicios",
        authors: "Narváez, Daniel et al.",
        venue: "XXX Congreso Argentino de Ciencias de la Computación (CACIC 2024). La Plata, Argentina",
        year: 2024,
        pubType: "conference",
        citation: "Narváez, Daniel et al. (2024). “Aplicación de Inteligencia Artificial en el Diseño de Microservicios”. In: CACIC 2024."
      }
    ],
    skills: [
      {
        id: 1,
        category: "Investigación Científica",
        skills: ["Verificación Formal (Lean 4)", "IA Generativa (LLMs, Diffusion)", "Arquitectura de Microservicios", "Computación Cuántica", "Neuro-Symbolic Frameworks", "AI4SE"]
      },
      {
        id: 2,
        category: "Tecnologías & Lenguajes",
        skills: ["Python", "C# / .NET", "MATLAB", "Lean 4", "SQL Server & SQLite", "Clean Architecture / DDD", "RESTful APIs", "React / JavaScript"]
      },
      {
        id: 3,
        category: "Ecosistemas Cloud & DevOps",
        skills: ["AWS", "Google Cloud Platform (GCP)", "Microsoft Azure", "Docker & Containers", "Git & GitHub Workflows"]
      },
      {
        id: 4,
        category: "Idiomas",
        skills: ["Español (Nativo)", "Inglés (Técnico / Profesional)"]
      }
    ]
  },
  en: {
    profile: {
      fullName: "Dr. José Daniel Narváez Flores",
      academicTitle: "Ph.D. in Computer Science | CS & AI Researcher | Systems Engineer",
      summary: "Ph.D. in Computer Science from Universidad Abierta Interamericana (UAI) and Systems Engineer. My academic trajectory includes three completed Master's degrees: Software Engineering & Computer Systems, Artificial Intelligence, and Computational Sciences & Applied Mathematics. My doctoral research focuses on applying artificial intelligence techniques to software engineering (AI4SE). Furthermore, my interests span applied mathematics and quantum computing, addressing complex problem solving from a rigorous interdisciplinary perspective.",
      email: "jdnarvaezf@gmail.com",
      phone: "+505 5774 1987",
      location: "Rivas, Nicaragua",
      githubUrl: "https://github.com/jdanieln",
      linkedinUrl: "https://linkedin.com/in/jdanielnf",
      avatarUrl: "https://avatars.githubusercontent.com/u/53232152?v=4"
    },
    experiences: [
      {
        id: 1,
        role: "Adjunct Professor & Researcher in CS & AI",
        institution: "Keiser University",
        period: "Jan 2026 - Present",
        description: "Higher education teaching and cutting-edge research in Computer Science and Artificial Intelligence.",
        highlights: [
          "Delivery of advanced lectures and mentorship of undergraduate/graduate students in complex technical challenges.",
          "Active research in AI4SE (AI for Software Engineering), driving knowledge generation and peer-reviewed international publications."
        ],
        tags: ["AI4SE", "Machine Learning", "Research", "Higher Education"]
      },
      {
        id: 2,
        role: "Internal AI & Technology Consultant",
        institution: "RETECSA",
        period: "Sep 2025 - Present",
        description: "Technology leadership and strategic adoption of generative artificial intelligence solutions.",
        highlights: [
          "Strategic leadership in enterprise adoption of generative AI tools and corporate process automation.",
          "Development of custom technological solutions and executive training within Google Workspace and AI Gems ecosystems."
        ],
        tags: ["Generative AI", "Google Workspace", "AI Gems", "Process Automation"]
      },
      {
        id: 3,
        role: "Professor of Information Systems Engineering",
        institution: "UNHSJM",
        period: "Oct 2022 - Present",
        description: "University teaching of core subjects in Information Systems Engineering.",
        highlights: [
          "Training future generations of engineers in software architecture and database design.",
          "Curriculum design and laboratory instruction."
        ],
        tags: ["Software Architecture", "Database Systems", "Teaching"]
      },
      {
        id: 4,
        role: "Professor of Computer Systems Engineering",
        institution: "UNM-RMA",
        period: "Sep 2022 - Present",
        description: "University teaching within the department of technology and computer engineering.",
        highlights: [
          "Specialized courses in programming, data structures, and computational methods.",
          "Advising graduation thesis projects and applied student research."
        ],
        tags: ["Programming", "Algorithms", "Computer Science"]
      },
      {
        id: 5,
        role: "Information Systems Analyst & Programmer",
        institution: "Grupo LAFISE",
        period: "Jan 2022 - Mar 2024",
        description: "Analysis, design, and maintenance of mission-critical systems for the banking and financial sector.",
        highlights: [
          "Development and integration of high-availability transactional banking services.",
          "Implementation of software engineering best practices, Clean Architecture, and SQL Server performance tuning."
        ],
        tags: ["Fintech", "C#", "SQL Server", "Clean Architecture"]
      }
    ],
    educations: [
      {
        id: 1,
        degree: "Ph.D. in Computer Science",
        institution: "Universidad Abierta Interamericana (UAI)",
        dateText: "Feb 2026",
        honors: "Dissertation: 'AI-assisted microservice discovery and design from textual requirements'",
        verificationUrl: "https://repositorio.uai.edu.ar/collections/bec3d705-1345-44cd-84a8-c11067e04fec"
      },
      {
        id: 2,
        degree: "Master in Computational Sciences and Applied Mathematics",
        institution: "Universidad Internacional de La Rioja (UNIR México)",
        dateText: "Apr 2025",
        honors: "Grade Average: 8.67 / 10 | 81 Academic Credits completed",
        verificationUrl: "https://verifirma.unir.net/MX/CSV/4506798f-6e29-4daa-acf1-9e0acbbaa379"
      },
      {
        id: 3,
        degree: "Master in Artificial Intelligence",
        institution: "Universidad Internacional de La Rioja (UNIR México)",
        dateText: "Oct 2023",
        honors: "Research seminar approved under official Federal RVOE standards",
        verificationUrl: "https://verifirma.unir.net/MX/CSV/d31e1f2d-05c8-42e2-bf5b-a13ec26010f8"
      },
      {
        id: 4,
        degree: "Master in Software Engineering and Computer Systems",
        institution: "Universidad Internacional de La Rioja (UNIR México)",
        dateText: "Aug 2022",
        honors: "Graduated with Honors (Mención Honorífica) for Outstanding Academic Performance",
        verificationUrl: "https://verifirma.unir.net/MX/CSV/e02f0e2e-f447-41e3-b9a9-16a1470629f4"
      },
      {
        id: 5,
        degree: "B.S. in Systems Engineering",
        institution: "Universidad Hispanoamericana (UHISPAM)",
        dateText: "Nov 2019",
        honors: "Professional Degree in Systems Engineering",
        verificationUrl: null
      },
      {
        id: 6,
        degree: "B.S. in Computational Mathematics",
        institution: "Universidad Internacional de La Rioja (UNIR)",
        dateText: "In progress",
        honors: "Advanced university studies in applied mathematics and computing",
        verificationUrl: null
      }
    ],
    publications: [
      {
        id: 1,
        title: "ArchiGenMS: A Neuro-Symbolic Evolutionary Framework for Greenfield Microservice Design",
        authors: "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Rossi",
        venue: "Congresso Ibero-Americano em Engenharia de Software (CIbSE). SBC, pp. 365–372",
        year: 2026,
        pubType: "conference",
        citation: "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Rossi (2026). “ArchiGenMS: A Neuro-Symbolic Evolutionary Framework for Greenfield Microservice Design”. In: CIbSE 2026, SBC, pp. 365–372."
      },
      {
        id: 2,
        title: "MAPE-KV: Una Arquitectura Neuro-Simbólica Verificada para la Orquestación de Enjambres Robóticos",
        authors: "Narváez, Daniel et al.",
        venue: "Congresso Ibero-Americano em Engenharia de Software (CIbSE). SBC, pp. 428–429",
        year: 2026,
        pubType: "conference",
        citation: "Narváez, Daniel et al. (2026). “MAPE-KV: Una Arquitectura Neuro-Simbólica Verificada para la Orquestación de Enjambres Robóticos”. In: CIbSE 2026, SBC, pp. 428–429."
      },
      {
        id: 3,
        title: "Descubrimiento y diseño de microservicios asistido por IA a partir de requisitos textuales",
        authors: "Narváez Flores, José Daniel",
        venue: "Ph.D. Dissertation. Universidad Abierta Interamericana (UAI)",
        year: 2026,
        pubType: "thesis",
        url: "https://repositorio.uai.edu.ar/collections/bec3d705-1345-44cd-84a8-c11067e04fec",
        citation: "Narváez Flores, José Daniel (Feb. 2026). “Descubrimiento y diseño de microservicios asistido por IA a partir de requisitos textuales”. Ph.D. Dissertation, UAI."
      },
      {
        id: 4,
        title: "Descubrimiento y diseño de microservicios asistido por IA: Resumen de Línea de Investigación",
        authors: "Narváez Flores, José Daniel",
        venue: "XXVIII Workshop de Investigadores en Ciencias de la Computación (WICC 2026). Repositorio SEDICI",
        year: 2026,
        pubType: "workshop",
        citation: "Narváez Flores, José Daniel (2026). “Descubrimiento y diseño de microservicios asistido por IA: Resumen de Línea de Investigación”. In: XXVIII WICC 2026, Repositorio SEDICI."
      },
      {
        id: 5,
        title: "Designing Microservices Using AI: A Systematic Literature Review",
        authors: "Narváez, Daniel, Nicolas Battaglia, et al.",
        venue: "Software 4.1. ISSN: 2674-113X, MDPI",
        year: 2025,
        pubType: "journal",
        doi: "10.3390/software4010006",
        url: "https://www.mdpi.com/2674-113X/4/1/6",
        citation: "Narváez, Daniel, Nicolas Battaglia, et al. (2025). “Designing Microservices Using AI: A Systematic Literature Review”. In: Software 4.1. DOI: 10.3390/software4010006."
      },
      {
        id: 6,
        title: "Explorando el Uso de Inteligencia Artificial en el Descubrimiento y Diseño de Microservicios",
        authors: "Narváez, Daniel",
        venue: "Congresso Ibero-Americano em Engenharia de Software (CIbSE 2025). SBC, pp. 224–231",
        year: 2025,
        pubType: "conference",
        citation: "Narváez, Daniel (2025). “Explorando el Uso de Inteligencia Artificial en el Descubrimiento y Diseño de Microservicios”. In: CIbSE 2025, SBC, pp. 224–231."
      },
      {
        id: 7,
        title: "Aplicación de Inteligencia Artificial Generativa y Verificación Formal en el Descubrimiento de Microservicios",
        authors: "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Rossi",
        venue: "Revista Abierta de Informática Aplicada 9.1, pp. 2–24",
        year: 2025,
        pubType: "journal",
        citation: "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Rossi (2025). “Aplicación de Inteligencia Artificial Generativa y Verificación Formal en el Descubrimiento de Microservicios”. In: RAIA 9.1, pp. 2–24."
      },
      {
        id: 8,
        title: "Descubrimiento automático de microservicios mediante modelos generativos y verificación formal",
        authors: "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Héctor Rossi",
        venue: "XXXI Congreso Argentino de Ciencias de la Computación (CACIC 2025). Viedma, Río Negro",
        year: 2025,
        pubType: "conference",
        citation: "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Héctor Rossi (2025). “Descubrimiento automático de microservicios mediante modelos generativos y verificación formal”. In: CACIC 2025."
      },
      {
        id: 9,
        title: "Aplicación de Inteligencia Artificial en el Diseño de Microservicios",
        authors: "Narváez, Daniel et al.",
        venue: "XXX Congreso Argentino de Ciencias de la Computación (CACIC 2024). La Plata, Argentina",
        year: 2024,
        pubType: "conference",
        citation: "Narváez, Daniel et al. (2024). “Aplicación de Inteligencia Artificial en el Diseño de Microservicios”. In: CACIC 2024."
      }
    ],
    skills: [
      {
        id: 1,
        category: "Scientific Research",
        skills: ["Formal Verification (Lean 4)", "Generative AI (LLMs, Diffusion)", "Microservices Architecture", "Quantum Computing", "Neuro-Symbolic Frameworks", "AI4SE"]
      },
      {
        id: 2,
        category: "Technologies & Languages",
        skills: ["Python", "C# / .NET", "MATLAB", "Lean 4", "SQL Server & SQLite", "Clean Architecture / DDD", "RESTful APIs", "React / JavaScript"]
      },
      {
        id: 3,
        category: "Cloud Ecosystems & DevOps",
        skills: ["AWS", "Google Cloud Platform (GCP)", "Microsoft Azure", "Docker & Containers", "Git & GitHub Workflows"]
      },
      {
        id: 4,
        category: "Languages",
        skills: ["Spanish (Native)", "English (Technical / Working)"]
      }
    ]
  }
};

export async function fetchPortfolioData(lang = 'es') {
  try {
    const res = await fetch(`${API_BASE_URL}/portfolio?lang=${lang}`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return { data, isBackend: true };
  } catch (err) {
    console.warn(`[API] Backend unavailable, using cached seed data:`, err.message);
    const fallback = FALLBACK_DATA[lang] || FALLBACK_DATA.es;
    return { data: fallback, isBackend: false };
  }
}

export async function sendContactMessage(formData) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to submit contact inquiry');
    }
    return result;
  } catch (err) {
    console.error('Contact submission error:', err);
    throw err;
  }
}

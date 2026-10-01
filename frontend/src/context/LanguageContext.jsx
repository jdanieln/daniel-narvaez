import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  es: {
    nav: {
      about: "Sobre Mí",
      experience: "Experiencia",
      education: "Formación",
      publications: "Publicaciones",
      skills: "Habilidades",
      contact: "Contacto",
      resume: "Descargar CV"
    },
    hero: {
      greeting: "Hola, soy",
      title: "Doctor en Informática & Investigador en CS e IA",
      tagline: "Especialista en Verificación Formal (Lean 4), IA Generativa, Neuro-Simbólica y Arquitectura de Microservicios.",
      ctaPublications: "Ver Publicaciones Científicas",
      ctaContact: "Contactar",
      statPhD: "Doctorado en Informática",
      statMasters: "3 Maestrías Oficiales",
      statPubs: "9+ Publicaciones Científicas",
      statExperience: "Docencia & Consultoría"
    },
    about: {
      tag: "Perfil Académico",
      title: "Trayectoria e Intereses Científicos",
      desc: "Un enfoque interdisciplinario que une la inteligencia artificial, las matemáticas aplicadas y la verificación formal de software.",
      pillarsTitle: "Líneas Principales de Investigación",
      pillar1Title: "AI4SE & Arquitectura de Microservicios",
      pillar1Desc: "Descubrimiento y descomposición asistida por modelos generativos y técnicas evolutivas a partir de especificaciones y requisitos textuales.",
      pillar2Title: "Verificación Formal con Lean 4",
      pillar2Desc: "Demostración interactiva de teoremas y validación de propiedades críticas en arquitecturas autónomas y enjambres robóticos.",
      pillar3Title: "Sistemas Neuro-Simbólicos",
      pillar3Desc: "Hibridación de razonamiento simbólico deductivo con capacidades generativas de redes neuronales profundas (ArchiGenMS, MAPE-KV).",
      pillar4Title: "Matemática Computacional y Cuántica",
      pillar4Desc: "Modelado numérico avanzado, optimización continua/discreta y exploración de algoritmos de computación cuántica."
    },
    experience: {
      tag: "Trayectoria Profesional",
      title: "Experiencia Académica y de Industria",
      desc: "Liderazgo en docencia universitaria de posgrado, consultoría estratégica en IA y desarrollo de sistemas críticos.",
      current: "Presente"
    },
    education: {
      tag: "Credenciales Académicas",
      title: "Educación & Títulos Obtenidos",
      desc: "Formación de posgrado de máximo rigor con menciones de honor y certificaciones verificables con firma digital.",
      verifyBtn: "Verificar Título Oficial",
      inProgress: "En curso",
      honorsBadge: "Mención Honorífica"
    },
    publications: {
      tag: "Producción Científica",
      title: "Artículos & Tesis Publicadas",
      desc: "Investigaciones indexadas en revistas internacionales y actas de congresos (CIbSE, CACIC, WICC, MDPI Software).",
      filterAll: "Todas",
      filterJournal: "Revistas (Journals)",
      filterConference: "Congresos",
      filterThesis: "Tesis Doctoral",
      filterWorkshop: "Workshops",
      searchPlaceholder: "Buscar por título, palabra clave o año...",
      copyCitation: "Copiar Cita",
      copiedCitation: "¡Cita Copiada!",
      viewPaper: "Ver Documento",
      noResults: "No se encontraron publicaciones con ese criterio."
    },
    skills: {
      tag: "Competencias",
      title: "Habilidades, Tecnologías & Métodos",
      desc: "Dominio de herramientas para la investigación científica, la ingeniería de software moderna y ecosistemas en la nube."
    },
    contact: {
      tag: "Contacto Directo",
      title: "Iniciemos una Conversación",
      desc: "¿Interesado en colaboración académica, proyectos de investigación en IA4SE o consultoría tecnológica?",
      nameLabel: "Nombre Completo",
      namePlaceholder: "Dr. / Ing. / Lic. Su Nombre",
      emailLabel: "Correo Electrónico",
      emailPlaceholder: "ejemplo@institucion.edu",
      subjectLabel: "Asunto",
      subjectPlaceholder: "Colaboración en investigación / Consultoría",
      messageLabel: "Mensaje",
      messagePlaceholder: "Escriba aquí los detalles de su propuesta o consulta...",
      submitBtn: "Enviar Mensaje",
      sendingBtn: "Enviando...",
      successTitle: "¡Mensaje Enviado con Éxito!",
      successDesc: "Muchas gracias por contactarme. Responderé a la brevedad posible.",
      errorTitle: "Hubo un problema",
      errorDesc: "Por favor revise los campos e intente de nuevo.",
      channelsTitle: "Canales Directos",
      location: "Rivas, Nicaragua / Remoto",
      phone: "+505 5774 1987",
      email: "jdnarvaezf@gmail.com"
    },
    footer: {
      rights: "Todos los derechos reservados.",
      architectureNote: "Desarrollado con Arquitectura Limpia en Flask (Python) + SQLite + React.",
      topBtn: "Volver arriba"
    }
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      education: "Education",
      publications: "Publications",
      skills: "Skills",
      contact: "Contact",
      resume: "Download CV"
    },
    hero: {
      greeting: "Hello, I am",
      title: "Ph.D. in Computer Science | CS & AI Researcher",
      tagline: "Specialist in Formal Verification (Lean 4), Generative AI, Neuro-Symbolic Systems, and Microservice Architecture.",
      ctaPublications: "Explore Scientific Publications",
      ctaContact: "Get in Touch",
      statPhD: "Ph.D. in Computer Science",
      statMasters: "3 Accredited Master's",
      statPubs: "9+ Peer-Reviewed Papers",
      statExperience: "Teaching & Consulting"
    },
    about: {
      tag: "Academic Profile",
      title: "Research Trajectory & Interests",
      desc: "An interdisciplinary perspective bridging artificial intelligence, applied mathematics, and formal software verification.",
      pillarsTitle: "Core Research Pillars",
      pillar1Title: "AI4SE & Microservice Architecture",
      pillar1Desc: "Automated discovery and decomposition supported by generative models and evolutionary algorithms from textual software requirements.",
      pillar2Title: "Formal Verification with Lean 4",
      pillar2Desc: "Interactive theorem proving and formal validation of critical invariants in autonomous architectures and swarm robotics.",
      pillar3Title: "Neuro-Symbolic Systems",
      pillar3Desc: "Hybridization of deductive symbolic reasoning with the generative capabilities of deep neural models (ArchiGenMS, MAPE-KV).",
      pillar4Title: "Computational Mathematics & Quantum",
      pillar4Desc: "Advanced numerical modeling, discrete/continuous optimization, and exploration of quantum computing algorithms."
    },
    experience: {
      tag: "Professional Journey",
      title: "Academic & Industry Experience",
      desc: "Leadership in higher education teaching, strategic AI consulting, and mission-critical banking software engineering.",
      current: "Present"
    },
    education: {
      tag: "Academic Credentials",
      title: "Education & Official Degrees",
      desc: "High-rigor postgraduate degrees with academic honors and digitally verifiable credentials.",
      verifyBtn: "Verify Official Degree",
      inProgress: "In progress",
      honorsBadge: "Graduated with Honors"
    },
    publications: {
      tag: "Scientific Production",
      title: "Peer-Reviewed Papers & Thesis",
      desc: "Research indexed in international journals and conference proceedings (CIbSE, CACIC, WICC, MDPI Software).",
      filterAll: "All",
      filterJournal: "Journals",
      filterConference: "Conferences",
      filterThesis: "Ph.D. Thesis",
      filterWorkshop: "Workshops",
      searchPlaceholder: "Search by title, keyword or year...",
      copyCitation: "Copy Citation",
      copiedCitation: "Citation Copied!",
      viewPaper: "View Paper",
      noResults: "No publications found matching your query."
    },
    skills: {
      tag: "Competencies",
      title: "Skills, Technologies & Methods",
      desc: "Mastery of advanced scientific research frameworks, modern software engineering, and cloud platforms."
    },
    contact: {
      tag: "Direct Contact",
      title: "Let's Start a Conversation",
      desc: "Interested in academic research collaboration, AI4SE projects, or executive technology consulting?",
      nameLabel: "Full Name",
      namePlaceholder: "Dr. / Eng. / Your Name",
      emailLabel: "Email Address",
      emailPlaceholder: "example@institution.edu",
      subjectLabel: "Subject",
      subjectPlaceholder: "Research Collaboration / Consulting inquiry",
      messageLabel: "Message",
      messagePlaceholder: "Write your inquiry or proposal details here...",
      submitBtn: "Send Message",
      sendingBtn: "Sending...",
      successTitle: "Message Sent Successfully!",
      successDesc: "Thank you for reaching out. I will respond to you promptly.",
      errorTitle: "Something went wrong",
      errorDesc: "Please verify all fields and try again.",
      channelsTitle: "Direct Channels",
      location: "Rivas, Nicaragua / Remote",
      phone: "+505 5774 1987",
      email: "jdnarvaezf@gmail.com"
    },
    footer: {
      rights: "All rights reserved.",
      architectureNote: "Built with Clean Architecture in Flask (Python) + SQLite + React.",
      topBtn: "Back to top"
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('daniel_portfolio_lang') || 'es';
  });

  const setLanguage = (lang) => {
    if (lang === 'es' || lang === 'en') {
      setLanguageState(lang);
      localStorage.setItem('daniel_portfolio_lang', lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const t = (path) => {
    const keys = path.split('.');
    let current = translations[language];
    for (const key of keys) {
      if (!current || current[key] === undefined) {
        return path;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

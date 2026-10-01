import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { fetchPortfolioData } from './services/api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Publications from './components/Publications';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function PortfolioApp() {
  const { language } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchPortfolioData(language).then(({ data: portfolioData }) => {
      if (isMounted) {
        setData(portfolioData);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [language]);

  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <Hero profile={data?.profile} />
        <About />
        <Experience experiences={data?.experiences || []} />
        <Education educations={data?.educations || []} />
        <Publications publications={data?.publications || []} />
        <Skills skills={data?.skills || []} />
        <Contact profile={data?.profile} />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  );
}

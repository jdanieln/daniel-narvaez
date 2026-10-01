import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Network, CheckCircle, BrainCircuit, Binary, ArrowUpRight } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: <Network size={24} />,
      title: t('about.pillar1Title'),
      desc: t('about.pillar1Desc'),
      tags: ["AI4SE", "Microservices", "Genetic Algorithms", "NLP"]
    },
    {
      icon: <CheckCircle size={24} />,
      title: t('about.pillar2Title'),
      desc: t('about.pillar2Desc'),
      tags: ["Lean 4", "Theorem Proving", "MAPE-K", "Verification"]
    },
    {
      icon: <BrainCircuit size={24} />,
      title: t('about.pillar3Title'),
      desc: t('about.pillar3Desc'),
      tags: ["Neuro-Symbolic", "LLMs", "Knowledge Graphs", "Evolutionary"]
    },
    {
      icon: <Binary size={24} />,
      title: t('about.pillar4Title'),
      desc: t('about.pillar4Desc'),
      tags: ["Applied Math", "Optimization", "Quantum Computing", "MATLAB"]
    }
  ];

  return (
    <section className="section" id="about" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('about.tag')}</div>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-description">{t('about.desc')}</p>
        </div>

        <div className="pillars-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="glass-card pillar-card">
              <div className="pillar-icon">
                {pillar.icon}
              </div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.desc}</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.25rem' }}>
                {pillar.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

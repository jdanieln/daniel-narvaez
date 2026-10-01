import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Terminal, Cpu, Cloud, Languages } from 'lucide-react';

export default function Skills({ skills = [] }) {
  const { t } = useLanguage();

  const getCategoryIcon = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('investig') || cat.includes('research') || cat.includes('cient')) {
      return <Cpu size={20} color="var(--accent-cyan)" />;
    }
    if (cat.includes('tecno') || cat.includes('lang') || cat.includes('lengu')) {
      return <Terminal size={20} color="var(--accent-indigo)" />;
    }
    if (cat.includes('cloud') || cat.includes('ecosist') || cat.includes('devops')) {
      return <Cloud size={20} color="var(--accent-violet)" />;
    }
    return <Languages size={20} color="var(--accent-emerald)" />;
  };

  return (
    <section className="section" id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('skills.tag')}</div>
          <h2 className="section-title">{t('skills.title')}</h2>
          <p className="section-description">{t('skills.desc')}</p>
        </div>

        <div className="skills-grid">
          {skills.map((cluster) => (
            <div key={cluster.id} className="glass-card skill-cluster">
              <h3 className="cluster-title">
                {getCategoryIcon(cluster.category)}
                <span>{cluster.category}</span>
              </h3>

              <div className="cluster-items">
                {cluster.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-pill">
                    {skill}
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

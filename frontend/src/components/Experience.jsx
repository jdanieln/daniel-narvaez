import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Calendar, Building2 } from 'lucide-react';

export default function Experience({ experiences = [] }) {
  const { t } = useLanguage();

  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('experience.tag')}</div>
          <h2 className="section-title">{t('experience.title')}</h2>
          <p className="section-description">{t('experience.desc')}</p>
        </div>

        <div className="timeline">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot"></div>

              <div className="glass-card" style={{ padding: '1.6rem' }}>
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <div className="timeline-institution" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                      <Building2 size={16} />
                      <span>{exp.institution}</span>
                    </div>
                  </div>

                  <div className="timeline-period" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="timeline-desc">{exp.description}</p>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="timeline-highlights">
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="timeline-highlight-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {exp.tags && exp.tags.length > 0 && (
                  <div className="timeline-tags">
                    {exp.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="badge badge-indigo">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

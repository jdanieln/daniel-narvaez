import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Award, ExternalLink, ShieldCheck, BookOpen } from 'lucide-react';

export default function Education({ educations = [] }) {
  const { t } = useLanguage();

  return (
    <section className="section" id="education" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('education.tag')}</div>
          <h2 className="section-title">{t('education.title')}</h2>
          <p className="section-description">{t('education.desc')}</p>
        </div>

        <div className="education-grid">
          {educations.map((edu) => (
            <div key={edu.id} className="glass-card edu-card">
              <div>
                <div className="edu-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div className="stat-icon" style={{ width: '40px', height: '40px' }}>
                      {edu.degree.toLowerCase().includes('doctor') ? (
                        <GraduationCap size={22} />
                      ) : edu.degree.toLowerCase().includes('maestr') || edu.degree.toLowerCase().includes('master') ? (
                        <Award size={22} />
                      ) : (
                        <BookOpen size={20} />
                      )}
                    </div>
                  </div>

                  <span className="edu-badge-date">{edu.dateText}</span>
                </div>

                <h3 className="edu-degree">{edu.degree}</h3>
                <div className="edu-institution">{edu.institution}</div>

                {edu.honors && (
                  <div className="edu-honors">
                    <ShieldCheck size={16} color="var(--accent-amber)" />
                    <span>{edu.honors}</span>
                  </div>
                )}
              </div>

              {edu.verificationUrl && (
                <a 
                  href={edu.verificationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="edu-verify-btn"
                  title="Verificar autenticidad digital del documento oficial"
                >
                  <ShieldCheck size={15} />
                  <span>{t('education.verifyBtn')}</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

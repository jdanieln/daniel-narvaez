import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-brand">Dr. José Daniel Narváez Flores</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
              Doctor en Informática · Investigador en Inteligencia Artificial & Ingeniería de Software
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <a 
              href="https://github.com/jdanieln" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/jdanielnf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a 
              href="mailto:jdnarvaezf@gmail.com" 
              className="social-link"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Dr. José Daniel Narváez Flores. {t('footer.rights')}
          </div>

          <div style={{ fontStyle: 'italic', color: 'var(--accent-cyan)', fontSize: '0.82rem' }}>
            {t('footer.architectureNote')}
          </div>

          <button onClick={scrollToTop} className="btn-outline" style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem', borderRadius: '4px' }}>
            <ArrowUp size={14} />
            <span>{t('footer.topBtn')}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

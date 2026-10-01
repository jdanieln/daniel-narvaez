import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu, X, GraduationCap, Send } from 'lucide-react';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.education'), href: '#education' },
    { label: t('nav.publications'), href: '#publications' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <a href="#hero" className="nav-brand" id="nav-brand-logo">
          <img 
            src="https://avatars.githubusercontent.com/u/53232152?v=4" 
            alt="Dr. Daniel Narváez" 
            className="nav-brand-avatar"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="nav-brand-text">
            <span className="nav-brand-name">Dr. Daniel Narváez</span>
            <span className="nav-brand-title">Ph.D. Computer Science</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions: Language Toggle & Contact CTA */}
        <div className="nav-actions">
          <button 
            onClick={toggleLanguage} 
            className="lang-toggle-btn"
            id="lang-toggle-btn"
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            aria-label="Toggle language"
          >
            <Globe size={15} />
            <span className={language === 'es' ? 'lang-badge-active' : ''}>ES</span>
            <span>/</span>
            <span className={language === 'en' ? 'lang-badge-active' : ''}>EN</span>
          </button>

          <a href="#contact" className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
            <Send size={14} />
            <span>{t('nav.contact')}</span>
          </a>

          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="mobile-nav">
          {navItems.map((item, idx) => (
            <a 
              key={idx} 
              href={item.href} 
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

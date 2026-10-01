import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  GraduationCap, 
  BookOpen, 
  Mail, 
  Phone, 
  FileText, 
  ArrowRight, 
  Award, 
  Sparkles, 
  Cpu, 
  CheckCircle2 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Hero({ profile }) {
  const { t, language } = useLanguage();

  const fullName = profile?.fullName || "Dr. José Daniel Narváez Flores";
  const academicTitle = profile?.academicTitle || (
    language === 'es' 
      ? "Doctor en Informática | Investigador en CS e IA | Ingeniero de Sistemas" 
      : "Ph.D. in Computer Science | CS & AI Researcher | Systems Engineer"
  );
  const summary = profile?.summary || (
    language === 'es'
      ? "Doctor en Informática por la Universidad Abierta Interamericana (UAI) e Ingeniero de Sistemas. Mi trayectoria académica incluye tres maestrías finalizadas en Inteligencia Artificial, Ingeniería de Software y Ciencias Computacionales. Especialista en AI4SE, Verificación Formal con Lean 4 y Microservicios."
      : "Ph.D. in Computer Science from Universidad Abierta Interamericana (UAI) and Systems Engineer with three completed Master's degrees in AI, Software Engineering, and Computational Sciences. Specializing in AI4SE, Formal Verification with Lean 4, and Microservices."
  );

  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Main Info */}
          <div className="hero-content">
            <div className="hero-greeting">
              <Sparkles size={16} />
              <span>{t('hero.greeting')}</span>
            </div>

            <h1 className="hero-name">{fullName}</h1>

            <div className="hero-academic-title">
              <GraduationCap size={22} />
              <span>{academicTitle}</span>
            </div>

            <p className="hero-bio">{summary}</p>

            {/* Call to Actions */}
            <div className="hero-buttons">
              <a href="#publications" className="btn btn-primary" id="hero-cta-publications">
                <BookOpen size={18} />
                <span>{t('hero.ctaPublications')}</span>
                <ArrowRight size={16} />
              </a>

              <a href="#contact" className="btn btn-secondary" id="hero-cta-contact">
                <Mail size={18} />
                <span>{t('hero.ctaContact')}</span>
              </a>
            </div>

            {/* Social & Contact Direct Links */}
            <div className="hero-socials">
              <a 
                href={profile?.githubUrl || "https://github.com/jdanieln"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                title="GitHub @jdanieln"
                aria-label="GitHub profile"
              >
                <GithubIcon size={20} />
              </a>
              <a 
                href={profile?.linkedinUrl || "https://linkedin.com/in/jdanielnf"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                title="LinkedIn @jdanielnf"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon size={20} />
              </a>
              <a 
                href={`mailto:${profile?.email || 'jdnarvaezf@gmail.com'}`} 
                className="social-link"
                title="Email direct"
                aria-label="Send Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href={`tel:${profile?.phone || '+50557741987'}`} 
                className="social-link"
                title="Phone contact"
                aria-label="Call phone"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Visual Portrait / Academic Card */}
          <div className="hero-visual">
            <div className="hero-avatar-wrapper">
              <div className="hero-avatar-glow"></div>
              <div className="hero-avatar-card">
                <img 
                  src={profile?.avatarUrl || "https://avatars.githubusercontent.com/u/53232152?v=4"} 
                  alt={fullName}
                  className="hero-avatar-img"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>
              <div className="hero-badge-float">
                <CheckCircle2 size={16} color="var(--accent-cyan)" />
                <span>Keiser University Researcher</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Ribbon */}
        <div className="stats-ribbon">
          <div className="stat-item glass-card">
            <div className="stat-icon">
              <GraduationCap size={26} />
            </div>
            <div>
              <div className="stat-number">Ph.D.</div>
              <div className="stat-label">{t('hero.statPhD')} (UAI)</div>
            </div>
          </div>

          <div className="stat-item glass-card">
            <div className="stat-icon">
              <Award size={26} />
            </div>
            <div>
              <div className="stat-number">3x M.Sc.</div>
              <div className="stat-label">{t('hero.statMasters')} (UNIR)</div>
            </div>
          </div>

          <div className="stat-item glass-card">
            <div className="stat-icon">
              <BookOpen size={26} />
            </div>
            <div>
              <div className="stat-number">9+</div>
              <div className="stat-label">{t('hero.statPubs')}</div>
            </div>
          </div>

          <div className="stat-item glass-card">
            <div className="stat-icon">
              <Cpu size={26} />
            </div>
            <div>
              <div className="stat-number">Lean 4 & AI</div>
              <div className="stat-label">{t('hero.statExperience')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

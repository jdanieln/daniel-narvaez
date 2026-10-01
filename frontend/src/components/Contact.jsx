import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sendContactMessage } from '../services/api';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact({ profile }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage(t('contact.errorDesc'));
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await sendContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || t('contact.errorDesc'));
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('contact.tag')}</div>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-description">{t('contact.desc')}</p>
        </div>

        <div className="contact-grid">
          {/* Direct Channels */}
          <div className="contact-info-panel">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>
              {t('contact.channelsTitle')}
            </h3>

            <div className="contact-card-item">
              <div className="contact-card-icon">
                <Mail size={20} />
              </div>
              <div>
                <div className="contact-card-label">Email</div>
                <a href={`mailto:${profile?.email || 'jdnarvaezf@gmail.com'}`} className="contact-card-value">
                  {profile?.email || 'jdnarvaezf@gmail.com'}
                </a>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-card-icon">
                <Phone size={20} />
              </div>
              <div>
                <div className="contact-card-label">Teléfono / WhatsApp</div>
                <a href={`tel:${profile?.phone || '+50557741987'}`} className="contact-card-value">
                  {profile?.phone || '+505 5774 1987'}
                </a>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-card-icon">
                <MapPin size={20} />
              </div>
              <div>
                <div className="contact-card-label">Ubicación</div>
                <div className="contact-card-value">
                  {profile?.location || t('contact.location')}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="glass-card" style={{ padding: '2.2rem' }}>
            <form onSubmit={handleSubmit} className="contact-form" id="portfolio-contact-form">
              {status === 'success' && (
                <div className="form-alert form-alert-success">
                  <CheckCircle2 size={18} />
                  <div>
                    <strong>{t('contact.successTitle')}</strong>
                    <div>{t('contact.successDesc')}</div>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="form-alert form-alert-error">
                  <AlertCircle size={18} />
                  <div>
                    <strong>{t('contact.errorTitle')}</strong>
                    <div>{errorMessage || t('contact.errorDesc')}</div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">
                  {t('contact.nameLabel')} *
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className="form-input"
                  placeholder={t('contact.namePlaceholder')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">
                  {t('contact.emailLabel')} *
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className="form-input"
                  placeholder={t('contact.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">
                  {t('contact.subjectLabel')}
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  className="form-input"
                  placeholder={t('contact.subjectPlaceholder')}
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">
                  {t('contact.messageLabel')} *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-textarea"
                  placeholder={t('contact.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'loading'}
                style={{ width: '100%', marginTop: '0.5rem' }}
                id="contact-submit-btn"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>{t('contact.sendingBtn')}</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>{t('contact.submitBtn')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

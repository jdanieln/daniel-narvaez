import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Search, Copy, Check, ExternalLink, FileText } from 'lucide-react';

export default function Publications({ publications = [] }) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const tabs = [
    { id: 'all', label: t('publications.filterAll') },
    { id: 'journal', label: t('publications.filterJournal') },
    { id: 'conference', label: t('publications.filterConference') },
    { id: 'thesis', label: t('publications.filterThesis') },
    { id: 'workshop', label: t('publications.filterWorkshop') },
  ];

  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const matchesTab = activeTab === 'all' || pub.pubType?.toLowerCase() === activeTab;
      const q = searchQuery.toLowerCase();
      const matchesQuery = 
        !searchQuery ||
        pub.title?.toLowerCase().includes(q) ||
        pub.authors?.toLowerCase().includes(q) ||
        pub.venue?.toLowerCase().includes(q) ||
        String(pub.year).includes(q);
      
      return matchesTab && matchesQuery;
    });
  }, [publications, activeTab, searchQuery]);

  const handleCopyCitation = (pub) => {
    const textToCopy = pub.citation || `${pub.authors} (${pub.year}). "${pub.title}". In: ${pub.venue}.`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(pub.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <section className="section" id="publications">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('publications.tag')}</div>
          <h2 className="section-title">{t('publications.title')}</h2>
          <p className="section-description">{t('publications.desc')}</p>
        </div>

        {/* Filters and Search Bar */}
        <div className="pub-controls">
          <div className="pub-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`pub-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pub-search-box">
            <Search size={16} className="pub-search-icon" />
            <input
              type="text"
              className="pub-search-input"
              placeholder={t('publications.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Publication Cards */}
        {filteredPublications.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <p>{t('publications.noResults')}</p>
          </div>
        ) : (
          <div className="publications-list">
            {filteredPublications.map((pub) => (
              <article key={pub.id} className="glass-card pub-card">
                <div className="pub-header">
                  <span className="pub-type-badge">{pub.pubType}</span>
                  <span className="pub-year">{pub.year}</span>
                </div>

                <h3 className="pub-title">{pub.title}</h3>

                <p className="pub-authors">
                  {pub.authors.split(/(Narv[aá]ez(?:[ ,]Daniel)?)/gi).map((part, pIdx) => {
                    if (/Narv[aá]ez/i.test(part)) {
                      return <strong key={pIdx} style={{ color: '#ffffff', textDecoration: 'underline decoration-indigo-400' }}>{part}</strong>;
                    }
                    return <span key={pIdx}>{part}</span>;
                  })}
                </p>

                <p className="pub-venue">{pub.venue}</p>

                <div className="pub-actions">
                  <button 
                    onClick={() => handleCopyCitation(pub)}
                    className="pub-btn"
                    title="Copiar cita bibliográfica"
                  >
                    {copiedId === pub.id ? (
                      <>
                        <Check size={14} color="var(--accent-emerald)" />
                        <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                          {t('publications.copiedCitation')}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>{t('publications.copyCitation')}</span>
                      </>
                    )}
                  </button>

                  {pub.doi && (
                    <a 
                      href={`https://doi.org/${pub.doi}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="pub-btn"
                    >
                      <ExternalLink size={14} />
                      <span>DOI: {pub.doi}</span>
                    </a>
                  )}

                  {pub.url && (
                    <a 
                      href={pub.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="pub-btn"
                    >
                      <FileText size={14} />
                      <span>{t('publications.viewPaper')}</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

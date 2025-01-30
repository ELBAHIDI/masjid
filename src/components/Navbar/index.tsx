import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const languages = [
  { code: 'en', label: 'En' },
  { code: 'fr', label: 'Fr' },
  { code: 'ar', label: 'عربي' }
];

export default function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setIsLangMenuOpen(false);
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <i className="fas fa-phone"></i>
            <span>Contact: +1 (514) 446-3344</span>
          </div>
          <div className={styles.langSelector}>
            <button 
              className={styles.langButton}
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <i className="fas fa-globe"></i>
              <span>{languages.find(l => l.code === currentLang)?.label}</span>
            </button>
            {isLangMenuOpen && (
              <div className={styles.langDropdown}>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    className={`${styles.langOption} ${currentLang === lang.code ? styles.active : ''}`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.separator}></div>

      <nav className={styles.mainNav}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
              <Link to="/" className={styles.navLink}>
                Home
              </Link>
              <Link to="/blog/introduction-to-islam" className={styles.navLink}>
                About Islam
              </Link>
              <Link to="/blog/center-activities" className={styles.navLink}>
                Activities
              </Link>
              <Link to="/prayer-times" className={styles.navLink}>
                Prayer Times
              </Link>
            </div>

            <button 
              className={styles.searchBtn} 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <i className="fas fa-search"></i>
            </button>

            <button 
              className={styles.mobileMenuBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className={styles.searchOverlay}>
            <div className={styles.searchContainer}>
              <input 
                type="text" 
                placeholder="Search..."
                className={styles.searchInput}
                autoFocus
              />
              <button 
                className={styles.closeSearchBtn}
                onClick={() => setIsSearchOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' }
];

export default function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');

  return (
    <div className={styles.navWrapper}>
      {/* Top Contact Bar */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <i className="fas fa-phone"></i>
            <span>Contact Us: +1 (514) 446-3344</span>
          </div>
          <div className={styles.langSelector}>
            <select 
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className={styles.langSelect}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className={styles.separator}></div>

      {/* Main Navigation */}
      <nav className={styles.mainNav}>
        <div className={styles.container}>
          {/* Navigation Links */}
          <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/blog/introduction-to-islam" className={styles.navLink}>About Islam</Link>
            <Link to="/blog/center-activities" className={styles.navLink}>Activities & Programs</Link>
            <Link to="/prayer-times" className={styles.navLink}>Prayer Times</Link>
          </div>

          {/* Search and Mobile Menu */}
          <div className={styles.navRight}>
            {/* Search Icon */}
            <button 
              className={styles.searchBtn} 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <i className="fas fa-search"></i>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className={styles.mobileMenuBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {/* Search Overlay */}
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
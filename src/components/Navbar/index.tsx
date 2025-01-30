import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className={styles.navWrapper}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <i className="fas fa-phone"></i>
            <span>Contact: +1 (514) 446-3344</span>
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
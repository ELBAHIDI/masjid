import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.navWrapper}>
      {/* Top Contact Bar */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <i className="fas fa-phone"></i>
            <span>Contact Us: +1 (514) 446-3344</span>
          </div>
        </div>
      </div>

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

          {/* Right Side Items */}
          <div className={styles.navRight}>
            <button className={styles.searchBtn}>
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>
    </div>
  );
} 
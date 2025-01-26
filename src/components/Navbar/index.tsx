import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Navbar(): JSX.Element {
  return (
    <nav className={styles.mainNav}>
      <div className={styles.container}>
        <div className={styles.navLinks}>
          <Link to="/about" className={styles.navLink}>À Propos de Nusuk</Link>
          <Link to="/blog/introduction-to-islam" className={styles.navLink}>About Islam</Link>
          <Link to="/blog/center-activities" className={styles.navLink}>Activities & Programs</Link>
          <Link to="/hajj" className={styles.navLink}>Hajj</Link>
          <Link to="/makkah" className={styles.navLink}>La Mecque</Link>
          <Link to="/medine" className={styles.navLink}>Médine</Link>
          <Link to="/forfaits" className={styles.navLink}>Forfaits</Link>
        </div>
        <div className={styles.navRight}>
          <button className={styles.searchBtn}>
            <i className="fas fa-search"></i>
          </button>
          <Link to="/visa" className={styles.visaBtn}>
            Demande de Visa
          </Link>
        </div>
      </div>
    </nav>
  );
} 
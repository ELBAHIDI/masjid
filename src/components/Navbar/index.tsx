import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Navbar(): JSX.Element {
  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <span>Nous contacter</span>
            <span>En dehors de l'Arabie saoudite: +966920002814</span>
            <span>Arabie saoudite: 1966</span>
          </div>
          <div className={styles.languageSelector}>
            <span>Fr</span>
          </div>
        </div>
      </div>
      <nav className={styles.mainNav}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link to="/">
              <img src="/nusuk-logo.png" alt="Nusuk" />
            </Link>
          </div>
          <div className={styles.navLinks}>
            <Link to="/about" className={styles.navLink}>À Propos de Nusuk</Link>
            <Link to="/omra" className={styles.navLink}>Omra et Ziyarah</Link>
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
    </>
  );
} 
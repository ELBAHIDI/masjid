import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Navbar(): JSX.Element {
  return (
    <>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <span>Nous contacter</span>
            <span>En dehors de l'Arabie saoudite: +966920002814</span>
            <span>Arabie saoudite: 1966</span>
          </div>
          <div className={styles.languageSelector}>
            <span>Fr</span>
            <span>عربي</span>
            <i className="fas fa-globe"></i>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={styles.mainNav}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link to="/">
              <img src="/img/logo.png" alt="Logo" />
            </Link>
          </div>
          <div className={styles.navLinks}>
            <Link to="/about">À Propos de Nusuk</Link>
            <Link to="/omra">Omra et Ziyarah</Link>
            <Link to="/hajj">Hajj</Link>
            <Link to="/makkah">La Mecque</Link>
            <Link to="/madinah">Médine</Link>
            <Link to="/packages">Forfaits</Link>
          </div>
          <div className={styles.navButtons}>
            <button className={styles.searchBtn}>
              <i className="fas fa-search"></i>
            </button>
            <button className={styles.visaBtn}>Demande de Visa</button>
          </div>
        </div>
      </nav>
    </>
  );
} 
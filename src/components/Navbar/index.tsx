import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Navbar(): JSX.Element {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/blog/introduction-to-islam" className={styles.navLink}>About Islam</Link>
        <Link to="/blog/center-activities" className={styles.navLink}>Activities</Link>
      </div>
    </nav>
  );
} 
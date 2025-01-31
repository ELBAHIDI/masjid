import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function ArabicHome(): JSX.Element {
  return (
    <Layout
      title="مسجد رضوان"
      description="المركز الاجتماعي دارلينغتون"
    >
      <main>
        <section className={styles.heroSection}>
          <div className={styles.videoBackground}>
            <video autoPlay muted loop playsInline className={styles.video}>
              <source src="/masjid2.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={styles.videoOverlay}></div>
          <div className={styles.heroContent}>
            <h1>مسجد رضوان</h1>
            <p>المركز الاجتماعي دارلينغتون</p>
            
            <div className={styles.pageLinks}>
              <Link to="/ar-main/about-islam" className={styles.pageLink}>
                <h2>عن الإسلام</h2>
                <p>تعرف على أساسيات الإسلام وتعاليمه</p>
              </Link>
              
              <Link to="/ar-main/activities" className={styles.pageLink}>
                <h2>الأنشطة والبرامج</h2>
                <p>اكتشف فعالياتنا وخدماتنا المجتمعية</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
} 
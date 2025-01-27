import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

export default function BlogLayout({children}) {
  return (
    <Layout>
      <div className={styles.blogContainer}>
        {/* Video Background */}
        <div className={styles.videoBackground}>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className={styles.video}
            onError={(e) => console.error('Video error:', e)}
          >
            <source src="/mecque1.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay}></div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.blogContent}>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
} 
import React from 'react';
import Layout from '@theme/Layout';
import Navbar from '@site/src/components/Navbar';
import styles from './styles.module.css';

export default function BlogLayout({children}) {
  return (
    <Layout>
      <Navbar />
      <main className={styles.blogLayout}>
        <div className={styles.blogContent}>
          {children}
        </div>
      </main>
    </Layout>
  );
} 
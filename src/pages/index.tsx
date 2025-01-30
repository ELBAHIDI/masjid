import React from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Islam Gate"
      description="Your Gateway to Islamic Knowledge and Spirituality">
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
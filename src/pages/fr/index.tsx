import React from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Portail Islamique"
      description="Votre portail vers la connaissance islamique"
    >
      <main>
        <HomepageFeatures 
          translations={{
            title: "MOSQUÉE RIDWAN",
            subtitle: "CENTRE COMMUNAUTAIRE DE DARLINGTON",
            aboutIslam: {
              title: "À propos de l'Islam",
              description: "Découvrez les fondements de l'Islam et ses enseignements"
            },
            activities: {
              title: "Activités et Programmes",
              description: "Découvrez nos événements et services communautaires"
            }
          }}
        />
      </main>
    </Layout>
  );
} 
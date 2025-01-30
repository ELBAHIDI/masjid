import React from 'react';
import Layout from '@theme/Layout';
import PrayerTimes from '@site/src/components/PrayerTimes';

export default function PrayerTimesPage(): JSX.Element {
  return (
    <Layout
      title="Horaires de Prière"
      description="Horaires de prière quotidiens"
    >
      <PrayerTimes 
        translations={{
          title: "Horaires de Prière d'Aujourd'hui",
          nextPrayer: "Prochaine Prière",
          timeRemaining: "Temps Restant",
          loading: "Chargement des horaires...",
          error: "Les horaires ne sont pas disponibles. Veuillez réessayer plus tard.",
          selectCity: "Sélectionnez une ville"
        }}
      />
    </Layout>
  );
} 
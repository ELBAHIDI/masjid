import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface PrayerTimesProps {
  translations: {
    title: string;
    nextPrayer: string;
    timeRemaining: string;
    loading: string;
    error: string;
    selectCity: string;
  };
}

interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
}

interface City {
  name: string;
  latitude: number;
  longitude: number;
}

const CITIES: City[] = [
  { name: 'Montreal', latitude: 45.5017, longitude: -73.5673 },
  { name: 'Toronto', latitude: 43.6532, longitude: -79.3832 },
  { name: 'Vancouver', latitude: 49.2827, longitude: -123.1207 },
  { name: 'Ottawa', latitude: 45.4215, longitude: -75.6972 },
];

export default function PrayerTimes({ translations }: PrayerTimesProps): JSX.Element {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [countdown, setCountdown] = useState<string>('');
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        const date = new Date().toISOString().split('T')[0];
        
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${date}?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&method=2`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }

        const data = await response.json();
        const timings = data.data.timings;

        setPrayerTimes({
          fajr: timings.Fajr,
          dhuhr: timings.Dhuhr,
          asr: timings.Asr,
          maghrib: timings.Maghrib,
          isha: timings.Isha,
          date: date,
        });

        calculateNextPrayer(timings);
      } catch (err) {
        setError(translations.error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
    const interval = setInterval(fetchPrayerTimes, 3600000);
    return () => clearInterval(interval);
  }, [selectedCity.latitude, selectedCity.longitude, translations.error]);

  // ... rest of your prayer times logic ...

  return (
    <div className={styles.prayerTimesContainer}>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop playsInline className={styles.video}>
          <source src="/masjid_prayer.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1>{translations.title}</h1>
          <div className={styles.citySelector}>
            <select 
              value={selectedCity.name}
              onChange={(e) => {
                const city = CITIES.find(c => c.name === e.target.value);
                if (city) setSelectedCity(city);
              }}
            >
              {CITIES.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>
          <p className={styles.date}>
            {prayerTimes?.date && new Date(prayerTimes.date).toLocaleDateString()}
          </p>
        </div>

        {loading && <div className={styles.loading}>{translations.loading}</div>}
        {error && <div className={styles.error}>{error}</div>}

        {/* ... rest of your prayer times UI ... */}
      </div>
    </div>
  );
} 
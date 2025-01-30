import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './prayer-times.module.css';

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

interface PrayerInfo {
  name: string;
  arabic: string;
  time: string;
}

const CITIES: City[] = [
  { name: 'Montreal', latitude: 45.5017, longitude: -73.5673 },
  { name: 'Toronto', latitude: 43.6532, longitude: -79.3832 },
  { name: 'Vancouver', latitude: 49.2827, longitude: -123.1207 },
  { name: 'Ottawa', latitude: 45.4215, longitude: -75.6972 },
];

export default function PrayerTimesPage(): JSX.Element {
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
        setError('Prayer times are currently unavailable. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
    const interval = setInterval(fetchPrayerTimes, 3600000);
    return () => clearInterval(interval);
  }, [selectedCity.latitude, selectedCity.longitude]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (nextPrayer && prayerTimes) {
        const now = new Date();
        const nextPrayerTime = getPrayerTime(nextPrayer, prayerTimes);
        const timeLeft = getTimeLeft(now, nextPrayerTime);
        setCountdown(timeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextPrayer, prayerTimes]);

  const calculateNextPrayer = (timings: any) => {
    const prayers = [
      { name: 'Fajr', time: timings.Fajr },
      { name: 'Dhuhr', time: timings.Dhuhr },
      { name: 'Asr', time: timings.Asr },
      { name: 'Maghrib', time: timings.Maghrib },
      { name: 'Isha', time: timings.Isha },
    ];

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      
      if (prayerTime > currentTime) {
        setNextPrayer(prayer.name);
        break;
      }
    }
  };

  const getPrayerTime = (prayerName: string, times: PrayerTimes): Date => {
    const timeStr = times[prayerName.toLowerCase() as keyof PrayerTimes];
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return date;
  };

  const getTimeLeft = (now: Date, prayerTime: Date): string => {
    const diff = prayerTime.getTime() - now.getTime();
    if (diff < 0) return '';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <Layout title="Prayer Times">
      <div className={styles.prayerTimesContainer}>
        <div className={styles.videoBackground}>
          <video autoPlay muted loop playsInline className={styles.video}>
            <source src="/masjid_prayer.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay}></div>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h1>Today's Prayer Times</h1>
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

          {loading && <div className={styles.loading}>Loading prayer times...</div>}
          {error && <div className={styles.error}>{error}</div>}

          {prayerTimes && !loading && !error && (
            <>
              <div className={styles.prayerTimesGrid}>
                <div className={`${styles.prayerCard} ${nextPrayer === 'Fajr' ? styles.nextPrayer : ''}`}>
                  <h3>Fajr</h3>
                  <p>{prayerTimes.fajr}</p>
                </div>
                <div className={`${styles.prayerCard} ${nextPrayer === 'Dhuhr' ? styles.nextPrayer : ''}`}>
                  <h3>Dhuhr</h3>
                  <p>{prayerTimes.dhuhr}</p>
                </div>
                <div className={`${styles.prayerCard} ${nextPrayer === 'Asr' ? styles.nextPrayer : ''}`}>
                  <h3>Asr</h3>
                  <p>{prayerTimes.asr}</p>
                </div>
                <div className={`${styles.prayerCard} ${nextPrayer === 'Maghrib' ? styles.nextPrayer : ''}`}>
                  <h3>Maghrib</h3>
                  <p>{prayerTimes.maghrib}</p>
                </div>
                <div className={`${styles.prayerCard} ${nextPrayer === 'Isha' ? styles.nextPrayer : ''}`}>
                  <h3>Isha</h3>
                  <p>{prayerTimes.isha}</p>
                </div>
              </div>

              {nextPrayer && countdown && (
                <div className={styles.countdownInfo}>
                  <div className={styles.nextPrayerInfo}>
                    Next Prayer: <span>{nextPrayer}</span>
                  </div>
                  <div className={styles.countdown}>
                    Time Remaining: <span>{countdown}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
} 
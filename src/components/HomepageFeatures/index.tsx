import React, { useEffect, useState, useRef } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

interface Translations {
  title: string;
  subtitle: string;
  aboutIslam: {
    title: string;
    description: string;
  };
  activities: {
    title: string;
    description: string;
  };
}

const defaultTranslations: Translations = {
  title: "MASJID RIDWAN",
  subtitle: "DARLINGTON COMMUNITY CENTER",
  aboutIslam: {
    title: "About Islam",
    description: "Learn about the fundamentals of Islam and its teachings"
  },
  activities: {
    title: "Activities & Programs",
    description: "Discover our community events and services"
  }
};

export default function HomepageFeatures({ translations = defaultTranslations }): JSX.Element {
  const [currentVideo, setCurrentVideo] = useState('');
  const [nextVideo, setNextVideo] = useState('');
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    '/masjid2.mp4',
    '/masjid3.mp4'
  ];

  useEffect(() => {
    // Initial setup
    const initialVideo = videos[0];
    const nextVideo = videos[1];
    setCurrentVideo(initialVideo);
    setNextVideo(nextVideo);

    const rotateVideos = () => {
      // Start fading out current video
      if (currentVideoRef.current) {
        currentVideoRef.current.classList.add(styles.fadeOut);
      }
      
      // Start fading in next video
      if (nextVideoRef.current) {
        nextVideoRef.current.classList.remove(styles.hidden);
      }

      // After transition completes, swap videos
      setTimeout(() => {
        // Toggle between the two videos
        setCurrentVideo(prev => prev === videos[0] ? videos[1] : videos[0]);
        setNextVideo(prev => prev === videos[0] ? videos[1] : videos[0]);
      }, 1000);
    };

    // Set up the interval for rotation
    const intervalId = setInterval(rotateVideos, 5000);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array since we don't need to re-run this effect

  return (
    <section className={styles.heroSection}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/logo3.jpg" alt="Masjid Ridwan" />
        </Link>
      </div>
      <div className={styles.videoBackground}>
        {currentVideo && (
          <video
            ref={currentVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className={styles.video}
            onLoadedData={(e) => {
              e.currentTarget.play();
            }}
          >
            <source src={currentVideo} type="video/mp4" />
          </video>
        )}
        {nextVideo && (
          <video
            ref={nextVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className={clsx(styles.video, styles.hidden)}
            onLoadedData={(e) => {
              e.currentTarget.play();
            }}
          >
            <source src={nextVideo} type="video/mp4" />
          </video>
        )}
      </div>
      <div className={styles.videoOverlay}></div>
      <div className={styles.heroContent}>
        <h1>{translations.title}</h1>
        <p>{translations.subtitle}</p>
        
        <div className={styles.pageLinks}>
          <Link to="/blog/introduction-to-islam" className={styles.pageLink}>
            <h2>{translations.aboutIslam.title}</h2>
            <p>{translations.aboutIslam.description}</p>
          </Link>
          
          <Link to="/blog/center-activities" className={styles.pageLink}>
            <h2>{translations.activities.title}</h2>
            <p>{translations.activities.description}</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

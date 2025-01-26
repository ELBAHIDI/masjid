import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function HomepageFeatures(): JSX.Element {
  const [currentVideo, setCurrentVideo] = useState('');
  const [nextVideo, setNextVideo] = useState('');
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    '/masjid2.mp4',
    '/masjid3.mp4'
  ];

  useEffect(() => {
    // Initial setup - simplified for two videos
    const initialVideo = Math.random() < 0.5 ? videos[0] : videos[1];
    setCurrentVideo(initialVideo);
    setNextVideo(initialVideo === videos[0] ? videos[1] : videos[0]);

    const rotateVideos = () => {
      // Simple toggle between two videos
      if (currentVideoRef.current) {
        currentVideoRef.current.classList.add(styles.fadeOut);
      }
      if (nextVideoRef.current) {
        nextVideoRef.current.classList.remove(styles.hidden);
        nextVideoRef.current.classList.remove(styles.fadeOut);
      }

      // After transition, swap videos
      setTimeout(() => {
        setCurrentVideo(nextVideo);
        setNextVideo(currentVideo);
      }, 500);
    };

    const intervalId = setInterval(rotateVideos, 5000);
    return () => clearInterval(intervalId);
  }, [currentVideo, nextVideo]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.videoBackground}>
        {currentVideo && (
          <video
            ref={currentVideoRef}
            autoPlay
            muted
            loop
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
        <h1>Welcome to Islam Gate</h1>
        <p>Your Gateway to Islamic Knowledge and Spirituality</p>
      </div>
    </section>
  );
}

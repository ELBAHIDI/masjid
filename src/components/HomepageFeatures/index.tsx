import React, { useEffect, useState, useRef } from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

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

    const intervalId = setInterval(rotateVideos, 10000);
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
        <h1>Welcome to Your Spiritual Home</h1>
        <p>Join us in worship, learning, and community</p>
        {/* Add other content here */}
      </div>
    </section>
  );
}

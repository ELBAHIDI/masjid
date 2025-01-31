import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { useLanguage } from '@site/src/contexts/LanguageContext';

const languages = [
  { code: 'en', label: 'En' },
  { code: 'fr', label: 'Fr' },
  { code: 'ar-main', label: 'Ar' }
];

const menuTranslations = {
  en: {
    home: 'Home',
    aboutIslam: 'About Islam',
    activities: 'Activities',
    prayerTimes: 'Prayer Times',
    contact: 'Contact: +1 (514) 446-3344',
    search: 'Search...'
  },
  fr: {
    home: 'Accueil',
    aboutIslam: "L'Islam",
    activities: 'Activités',
    prayerTimes: 'Horaires de Prière',
    contact: 'Contact: +1 (514) 446-3344',
    search: 'Rechercher...'
  },
  ar: {
    home: 'الرئيسية',
    aboutIslam: 'عن الإسلام',
    activities: 'الأنشطة',
    prayerTimes: 'مواقيت الصلاة',
    contact: 'اتصل بنا: ٣٣٤٤-٤٤٦-٥١٤-١+',
    search: 'بحث...'
  }
};

export default function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { currentLang, setLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = menuTranslations[currentLang];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: 'en' | 'fr' | 'ar-main') => {
    if (langCode === 'ar-main') {
      window.location.href = '/ar-main';
      setIsLangMenuOpen(false);
      return;
    }
    
    // Get current path without language prefix
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    const basePath = pathParts.length > 2 ? pathParts.slice(2).join('/') : '';
    
    // Construct new URL
    const newPath = langCode === 'en' ? `/${basePath}` : `/${langCode}/${basePath}`;
    window.location.href = newPath || '/';
    setIsLangMenuOpen(false);
  };

  // Add this helper function
  const getNavigationPath = (path: string) => {
    if (currentLang === 'ar-main') {
      return `/ar-main${path}`; // Use ar-main prefix for Arabic version
    }
    return currentLang === 'en' ? path : `/${currentLang}${path}`;
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <i className="fas fa-phone"></i>
            <span>{t.contact}</span>
          </div>
          <div className={styles.langSelector} ref={dropdownRef}>
            <button 
              className={`${styles.langButton} ${isLangMenuOpen ? styles.active : ''}`}
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              aria-label="Select Language"
            >
              <svg 
                className={styles.globeIcon} 
                width="16" 
                height="16" 
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
              </svg>
              <span>{languages.find(l => l.code === currentLang)?.label}</span>
            </button>
            {isLangMenuOpen && (
              <div className={styles.langDropdown}>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    className={`${styles.langOption} ${currentLang === lang.code ? styles.active : ''}`}
                    onClick={() => handleLanguageChange(lang.code as 'en' | 'fr' | 'ar-main')}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.separator}></div>

      <nav className={styles.mainNav}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
              <Link 
                to={getNavigationPath('/')} 
                className={styles.navLink}
              >
                {t.home}
              </Link>
              <Link 
                to={getNavigationPath('/blog/introduction-to-islam')} 
                className={styles.navLink}
              >
                {t.aboutIslam}
              </Link>
              <Link 
                to={getNavigationPath('/blog/center-activities')} 
                className={styles.navLink}
              >
                {t.activities}
              </Link>
              <Link 
                to={getNavigationPath('/prayer-times')} 
                className={styles.navLink}
              >
                {t.prayerTimes}
              </Link>
            </div>

            <button 
              className={styles.searchBtn} 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <i className="fas fa-search"></i>
            </button>

            <button 
              className={styles.mobileMenuBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className={styles.searchOverlay}>
            <div className={styles.searchContainer}>
              <input 
                type="text" 
                placeholder={t.search}
                className={styles.searchInput}
                autoFocus
              />
              <button 
                className={styles.closeSearchBtn}
                onClick={() => setIsSearchOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
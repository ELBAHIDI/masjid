module.exports = {
  title: 'Islam Gate',
  tagline: 'Your Gateway to Islamic Knowledge',
  // ... other config
  themeConfig: {
    navbar: {
      // Completely disable default navbar
      hideOnScroll: true,
      style: 'dark',
      items: [],
      // Explicitly remove logo
      logo: null,
      title: null,
    },
    // Disable footer if you don't want it
    footer: {
      style: 'dark',
      links: [],
      copyright: 'Copyright © Islam Gate',
    },
    docs: {
      // ... docs config
    },
    blog: {
      // Use custom blog layout for specific routes
      blogLayoutComponent: ({children, ...props}) => {
        const path = props.location?.pathname;
        if (path?.includes('/blog/center-activities')) {
          const ActivitiesLayout = require('@site/src/theme/ActivitiesLayout').default;
          return <ActivitiesLayout {...props}>{children}</ActivitiesLayout>;
        }
        const BlogLayout = require('@site/src/theme/BlogLayout').default;
        return <BlogLayout {...props}>{children}</BlogLayout>;
      },
      // ... other blog config
    },
  },
  // Disable default pages
  plugins: [
    [
      '@docusaurus/plugin-content-pages',
      {
        path: 'src/pages',
        routeBasePath: '/',
      },
    ],
  ],
  themes: ['@docusaurus/theme-classic'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  staticDirectories: ['static'],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ar'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      },
      fr: {
        label: 'Français',
        direction: 'ltr',
      },
      ar: {
        label: 'العربية',
        direction: 'rtl',
      },
    },
  },
  stylesheets: [
    {
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
      type: 'text/css',
    },
  ],
};
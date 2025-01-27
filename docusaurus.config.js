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
  plugins: [],
  themes: [],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        blog: false, // Disable default blog
        docs: false, // Disable default docs
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  staticDirectories: ['static'],
}; 
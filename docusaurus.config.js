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
}; 
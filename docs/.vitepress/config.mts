import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jalutils",
  description: "A collection of utility functions for JavaScript and TypeScript. Lightweight, tree-shakeable, and fully typed.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API Reference', link: '/api/array' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Usage', link: '/guide/usage' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Array Utilities', link: '/api/array' },
          { text: 'Function Utilities', link: '/api/function' },
          { text: 'Type Utilities', link: '/api/type' },
          { text: 'Date Utilities', link: '/api/date' },
          { text: 'String Utilities', link: '/api/string' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jarooda/jalutils' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Jalu Wibowo Aji'
    },

    search: {
      provider: 'local'
    }
  }
})

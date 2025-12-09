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
      { text: 'API Reference', link: '/api/' }
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
          { text: 'Overview', link: '/api/' },
          {
            text: 'Array',
            link: '/api/array',
            items: [
              { text: 'flatten', link: '/api/array#flatten' },
              { text: 'intersection', link: '/api/array#intersection' },
              { text: 'sample', link: '/api/array#sample' },
              { text: 'union', link: '/api/array#union' }
            ]
          },
          {
            text: 'Date',
            link: '/api/date',
            items: [
              { text: 'unix', link: '/api/date#unix' }
            ]
          },
          {
            text: 'Function',
            link: '/api/function',
            items: [
              { text: 'compose', link: '/api/function#compose' },
              { text: 'curry', link: '/api/function#curry' },
              { text: 'debounce', link: '/api/function#debounce' },
              { text: 'flow', link: '/api/function#flow' },
              { text: 'memoize', link: '/api/function#memoize' },
              { text: 'once', link: '/api/function#once' },
              { text: 'partial', link: '/api/function#partial' },
              { text: 'pipe', link: '/api/function#pipe' },
              { text: 'throttle', link: '/api/function#throttle' }
            ]
          },
          {
            text: 'String',
            link: '/api/string',
            items: [
              { text: 'camelCase', link: '/api/string#camelcase' },
              { text: 'capitalize', link: '/api/string#capitalize' },
              { text: 'kebabCase', link: '/api/string#kebabcase' },
              { text: 'randomString', link: '/api/string#randomstring' },
              { text: 'reverse', link: '/api/string#reverse' },
              { text: 'snakeCase', link: '/api/string#snakecase' },
              { text: 'stripTags', link: '/api/string#striptags' },
              { text: 'truncate', link: '/api/string#truncate' }
            ]
          },
          {
            text: 'Type',
            link: '/api/type',
            items: [
              { text: 'isBoolean', link: '/api/type#isboolean' },
              { text: 'isFunction', link: '/api/type#isfunction' },
              { text: 'isIterable', link: '/api/type#isiterable' },
              { text: 'isNil', link: '/api/type#isnil' },
              { text: 'isNull', link: '/api/type#isnull' },
              { text: 'isNumber', link: '/api/type#isnumber' },
              { text: 'isPlainObject', link: '/api/type#isplainobject' },
              { text: 'isPromise', link: '/api/type#ispromise' },
              { text: 'isString', link: '/api/type#isstring' },
              { text: 'isUndefined', link: '/api/type#isundefined' }
            ]
          }
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

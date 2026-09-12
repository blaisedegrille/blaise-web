// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// Site/base configuration.
// Defaults suit GitHub Pages project sites; override via env vars.
// For a custom domain: set PUBLIC_BASE_PATH=/ and add public/CNAME.
const siteUrl =
  process.env.PUBLIC_SITE_URL ??
  import.meta.env.PUBLIC_SITE_URL ??
  'https://blaisedegrille.github.io'
const basePath = process.env.PUBLIC_BASE_PATH ?? import.meta.env.PUBLIC_BASE_PATH ?? '/blaise-web'

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})

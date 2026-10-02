import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sirpulpo.github.io',
  base: '/autonexus-landingpage',
  integrations: [sitemap()],
  compressHTML: true,
});

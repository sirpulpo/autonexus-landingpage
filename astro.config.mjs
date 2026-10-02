import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://autonexus.mx',
  integrations: [sitemap()],
  compressHTML: true,
});

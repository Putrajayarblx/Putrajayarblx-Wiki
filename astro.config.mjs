import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://putrajayarblx-wiki.vercel.app',
  integrations: [
    starlight({
      title: 'Putrajaya.rblx Wiki',
      description:
        'A practical, community-maintained reference library for Putrajaya of Roblox.',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        ms: { label: 'Bahasa Melayu', lang: 'ms' },
      },
      sidebar: [
        {
          label: 'Guides',
          translations: { ms: 'Panduan' },
          items: [
            {
              label: 'Getting started',
              translations: { ms: 'Mula di sini' },
              slug: 'getting-started',
            },
            {
              label: 'Roles and departments',
              translations: { ms: 'Peranan dan jabatan' },
              slug: 'city-roles',
            },
          ],
        },
      ],
      logo: {
        light: './src/assets/logo-mark.png',
        dark: './src/assets/logo-mark-dark.png',
        alt: 'Putrajaya.rblx Wiki',
      },
      favicon: '/favicon.png',
      lastUpdated: true,
      components: {
        Head: './src/components/Head.astro',
        Header: './src/components/Header.astro',
        Footer: './src/components/Footer.astro',
        SocialIcons: './src/components/SocialIcons.astro',
        MobileMenuFooter: './src/components/MobileMenuFooter.astro',
      },
      editLink: {
        baseUrl:
          'https://github.com/Putrajayarblx/Putrajayarblx-Wiki/edit/main/',
      },
      head: [
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: true,
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300..800;1,300..800&display=swap',
          },
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});

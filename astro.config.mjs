import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://putrajayarblx-wiki.vercel.app',
  integrations: [
    starlight({
      title: 'Putrajaya.rblx Wiki',
      description:
        'A practical, community-maintained reference library for Putrajaya of Roblox.',
      logo: {
        src: './src/assets/logo-mark.png',
        alt: 'Putrajaya.rblx Wiki',
      },
      favicon: '/favicon.png',
      components: {
        SocialIcons: './src/components/SocialIcons.astro',
        Header: './src/components/Header.astro',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Putrajayarblx/Putrajayarblx-Wiki',
        },
      ],
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
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1/font/bootstrap-icons.min.css',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/css/all.min.css',
          },
        },
        {
          // Header is solid at the top, transparent once the page scrolls.
          tag: 'script',
          content:
            "(()=>{const r=document.documentElement;const s=()=>{r.classList.toggle('pw-scrolled',window.scrollY>6)};s();window.addEventListener('scroll',s,{passive:true})})();",
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});

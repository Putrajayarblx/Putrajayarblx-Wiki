import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://putrajayarblx-wiki.vercel.app',
  integrations: [
    starlight({
      title: 'Putrajaya Wiki',
      description:
        'A practical, community-maintained reference library for Putrajaya of Roblox.',
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
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});

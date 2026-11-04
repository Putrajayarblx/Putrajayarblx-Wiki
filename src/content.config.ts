import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { articleSlug, categorySlug } from './data/slugs.mjs';

export const collections = {
  docs: defineCollection({
    loader: docsLoader({
      generateId: ({ entry, data }) => {
        const normalized = entry.replace(/\\/g, '/');
        const base = normalized.replace(/\.(md|mdx)$/i, '');

        // The localized home must use the locale root ID (`ms`) so Starlight
        // resolves it as the Malay homepage instead of falling back to English.
        if (base === 'ms/index') return 'ms';

        const category =
          typeof data.category === 'string' ? data.category.trim() : '';

        // Home, 404, privacy and other global pages keep their flat IDs.
        if (!category) return base;

        const isMs = base === 'ms' || base.startsWith('ms/');
        const relative = isMs ? base.slice(3) : base;
        const fileBase = relative.split('/').pop() ?? relative;
        const route = `${categorySlug(category)}/${articleSlug(fileBase, data)}`;

        return isMs ? `ms/${route}` : route;
      },
    }),
    schema: docsSchema({
      extend: z.object({
        section: z.string().optional(),
        category: z.string().optional(),
        landing: z.boolean().optional(),
        slug: z.string().optional(),
        image: z.string().optional(),
        infobox: z
          .object({
            title: z.string().optional(),
            image: z.string().optional(),
            imageAlt: z.string().optional(),
            rows: z
              .array(
                z.object({
                  label: z.string(),
                  value: z.string(),
                  href: z.string().optional(),
                })
              )
              .default([]),
          })
          .optional(),
      }),
    }),
  }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};

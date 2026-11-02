import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        section: z.string().optional(),
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

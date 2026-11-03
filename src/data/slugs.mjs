/**
 * Turn a label into a URL-safe slug.
 * Keeps acronym-ish names readable: "SarawakRBLX" → "sarawak-rblx".
 */
export function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** The second URL segment for a page. */
export function articleSlug(fileBase, data = {}) {
  if (data.slug) return slugify(data.slug);
  const landing = data.landing === true || data.landing === 'true';
  return landing ? 'getting-started' : slugify(fileBase);
}

/** The first URL segment for a page. */
export function categorySlug(category) {
  return slugify(category);
}

/** Build the docs route ID for a category page. */
export function routeId(fileBase, data = {}) {
  if (!data.category) return slugify(fileBase);
  return `${categorySlug(data.category)}/${articleSlug(fileBase, data)}`;
}

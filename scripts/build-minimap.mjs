import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { slugify } from '../src/data/slugs.mjs';

const root = process.cwd();
const dataPath = join(root, 'src', 'data', 'minimap.json');
const svgPath = join(root, 'public', 'minimap.svg');

const raw = JSON.parse(readFileSync(dataPath, 'utf8'));
if (!Array.isArray(raw.parts) || raw.parts.length === 0) {
  throw new Error('minimap.json has no parts. Re-export the map first.');
}

const typeMeta = {
  GovtMarker: { label: 'Government', cat: 'government', glyph: '🏛️' },
  SecurityMarker: { label: 'Police', cat: 'emergency', glyph: '🚓' },
  FireDeptMarker: { label: 'Fire & rescue', cat: 'emergency', glyph: '🚒' },
  HospitalMarker: { label: 'Health', cat: 'emergency', glyph: '🏥' },
  ShopMarker: { label: 'Shop', cat: 'services', glyph: '🛍️' },
  DealershipMarker: { label: 'Dealership', cat: 'services', glyph: '🚗' },
  MailOfficeMarker: { label: 'Post office', cat: 'services', glyph: '✉️' },
  BusStopMarker: { label: 'Bus stop', cat: 'transport', glyph: '🚌' },
  BoatStopMarker: { label: 'Boat stop', cat: 'transport', glyph: '⛴️' },
  ParkingMarker: { label: 'Parking', cat: 'transport', glyph: '🅿️' },
  BridgeMarker: { label: 'Bridge', cat: 'landmarks', glyph: '🌉' },
  MosqueMarker: { label: 'Mosque', cat: 'landmarks', glyph: '🕌' },
  TouristMarker: { label: 'Landmark', cat: 'landmarks', glyph: '📸' },
  ParkMarker: { label: 'Park', cat: 'parks', glyph: '🌳' },
  VenueMarker: { label: 'Venue', cat: 'landmarks', glyph: '🎟️' },
  Marker: { label: 'Point of interest', cat: 'other', glyph: '📍' },
};

const usedIds = new Set();
const typeCounts = {};
const pois = raw.pois.map((poi) => {
  const meta = typeMeta[poi.t] ?? { label: 'Point of interest', cat: 'other', glyph: '📍' };
  typeCounts[poi.t] = (typeCounts[poi.t] ?? 0) + 1;
  const fallback = `${meta.label} ${typeCounts[poi.t]}`;
  const label = poi.n?.trim() || fallback;

  let id = slugify(label);
  if (!id) id = slugify(meta.label);
  let n = 2;
  const base = id;
  while (usedIds.has(id)) id = `${base}-${n++}`;
  usedIds.add(id);

  return {
    ...poi,
    label,
    cat: meta.cat,
    catLabel: meta.label,
    glyph: meta.glyph,
    id,
  };
});

let minX = Infinity;
let maxX = -Infinity;
let minZ = Infinity;
let maxZ = -Infinity;
for (const part of raw.parts) {
  for (const [x, z] of part.p) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (z < minZ) minZ = z;
    if (z > maxZ) maxZ = z;
  }
}
const pad = 80;
minX -= pad;
maxX += pad;
minZ -= pad;
maxZ += pad;
const width = maxX - minX;
const height = maxZ - minZ;

const out = {
  placeId: raw.placeId,
  exportedAt: raw.exportedAt,
  bounds: { minX, maxX, minZ, maxZ },
  parts: raw.parts,
  pois,
};
writeFileSync(dataPath, JSON.stringify(out), 'utf8');

const layers = {
  'Urban Area': { order: 0, fill: '#CDCDCD' },
  WaterRender: { order: 1, fill: '#0C99D5' },
  Road: { order: 2, fill: '#E7E7EC' },
  Highway: { order: 3, fill: '#FFB000' },
};

const polygon = (points) =>
  points.map(([x, z]) => `${x},${z}`).join(' ');

const svgParts = [...raw.parts]
  .sort((a, b) => {
    const la = layers[a.n]?.order ?? 9;
    const lb = layers[b.n]?.order ?? 9;
    return la - lb;
  })
  .map((part) => {
    const style = layers[part.n] ?? { fill: '#CDCDCD' };
    return `<polygon points="${polygon(part.p)}" fill="${style.fill}" stroke="${style.fill}" stroke-width="1.5" stroke-linejoin="round"/>`;
  })
  .join('');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minZ} ${width} ${height}" width="2400" height="${Math.round((2400 * height) / width)}" role="img" aria-labelledby="map-title map-desc">
<title id="map-title">Putrajaya interactive map</title>
<desc id="map-desc">Vector map of Putrajaya with grass, water, urban areas, roads and highways.</desc>
<rect x="${minX}" y="${minZ}" width="${width}" height="${height}" fill="#A4CE8D"/>
${svgParts}
</svg>
`;

mkdirSync(join(root, 'public'), { recursive: true });
writeFileSync(svgPath, svg, 'utf8');
console.log(
  `minimap: ${raw.parts.length} parts, ${pois.length} POIs, bounds ${Math.round(width)} x ${Math.round(height)}, SVG ${Math.round(svg.length / 1024)} KB`
);

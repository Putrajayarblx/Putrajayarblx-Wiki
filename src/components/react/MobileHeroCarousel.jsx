import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import CircularCarousel from './CircularCarousel';
import ColorBends from './ColorBends';

const shuffle = items => {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [next[index], next[target]] = [next[target], next[index]];
  }
  return next;
};

const BENDS_COLORS = ['#123a8f', '#3fa9a0', '#f0a878'];
const PANEL_FADE = 'color-mix(in srgb, var(--sl-color-bg) 86%, var(--pw-teal) 14%)';

const MOBILE = {
  preset: 'panorama',
  intro: 'assemble',
  cardWidth: 200,
  aspectRatio: 1.333,
  gap: 25,
  curve: 1,
  tilt: 0,
  perspective: 1800,
  captions: false,
  autoplay: 'drift',
  interval: 3,
  direction: 'left',
  momentum: 0.6,
  speed: 10,
  snap: true,
  pauseOnHover: true,
  focusOnClick: true,
  draggable: true,
  parallax: 0.3,
  stretch: 0.5,
  fadeColor: PANEL_FADE,
  depthFade: 0.55,
  innerShade: 0.6,
  cornerRadius: 19,
};

const DESKTOP = {
  preset: 'cylinder',
  intro: 'assemble',
  cardWidth: 320,
  aspectRatio: 1.333,
  gap: 20,
  curve: 0.65,
  tilt: -10,
  perspective: 2500,
  captions: false,
  autoplay: 'drift',
  interval: 3,
  direction: 'left',
  momentum: 0.6,
  speed: 10,
  snap: true,
  pauseOnHover: true,
  focusOnClick: true,
  draggable: true,
  parallax: 0.3,
  stretch: 0.3,
  fadeColor: PANEL_FADE,
  depthFade: 0.9,
  innerShade: 0.6,
  cornerRadius: 19,
};

export default function MobileHeroCarousel({
  pool = [],
  categoryLabel = 'Wiki category',
  variant = 'mobile',
}) {
  const [target, setTarget] = useState(null);
  const [reduced, setReduced] = useState(false);
  const desktop = variant === 'desktop';
  const items = useMemo(
    () =>
      shuffle(pool).map(category => ({
        src: category.image,
        alt: `${category.name} â€” ${categoryLabel.toLowerCase()}`,
        title: category.name,
        subtitle: categoryLabel,
      })),
    [pool, categoryLabel]
  );

  // A ring needs more than one card per quadrant to read as a strip.
  // Repeat the shuffled set so every category still appears, with copies
  // placed opposite each other so they are never on screen at the same time.
  const ring = useMemo(() => {
    if (items.length === 0) return items;
    const minimum = desktop ? 12 : 8;
    const repeats = Math.max(1, Math.ceil(minimum / items.length));
    return Array.from({ length: repeats }, () => items).flat();
  }, [items, desktop]);

  useEffect(() => {
    const selector = desktop
      ? '[data-pw-desktop-carousel]'
      : '[data-pw-mobile-carousel]';
    const slot = document.querySelector(selector);
    if (slot) setTarget(slot);
  }, [desktop]);

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) return undefined;
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  if (!target || ring.length === 0) return null;

  return createPortal(
    <div className="pw-carousel-shell">
      <div className="pw-carousel-bends" aria-hidden="true">
        <ColorBends
          colors={BENDS_COLORS}
          rotation={desktop ? 68 : 88}
          speed={reduced ? 0 : desktop ? 0.06 : 0.08}
          autoRotate={0}
          scale={desktop ? 1.2 : 1.35}
          frequency={1}
          warpStrength={0.85}
          mouseInfluence={0}
          parallax={0}
          noise={0.04}
          iterations={2}
          intensity={0.9}
          bandWidth={5.5}
          transparent
        />
      </div>
      <CircularCarousel items={ring} {...(desktop ? DESKTOP : MOBILE)} />
    </div>,
    target
  );
}


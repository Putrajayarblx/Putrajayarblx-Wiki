import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import CircularCarousel from './CircularCarousel';

const shuffle = items => {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [next[index], next[target]] = [next[target], next[index]];
  }
  return next;
};

export default function MobileHeroCarousel({ pool = [] }) {
  const [target, setTarget] = useState(null);
  const items = useMemo(
    () =>
      shuffle(pool)
        .slice(0, 3)
        .map(category => ({
          src: category.image,
          alt: `${category.name} — wiki category`,
          title: category.name,
        })),
    [pool]
  );

  useEffect(() => {
    const slot = document.querySelector('[data-pw-mobile-carousel]');
    if (slot) setTarget(slot);
  }, []);

  if (!target || items.length === 0) return null;

  return createPortal(
    <CircularCarousel
      items={items}
      preset="orbit"
      intro="assemble"
      cardWidth={170}
      aspectRatio={1.333}
      gap={18}
      speed={5}
      cornerRadius={16}
      captions={false}
      overlayTitle
      fadeColor="var(--sl-color-bg)"
      autoplay="drift"
      draggable
      pauseOnHover
      parallax={0.2}
      stretch={0.4}
    />,
    target
  );
}

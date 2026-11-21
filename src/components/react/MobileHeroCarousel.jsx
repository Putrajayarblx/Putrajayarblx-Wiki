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

export default function MobileHeroCarousel({ pool = [], categoryLabel = 'Wiki category' }) {
  const [target, setTarget] = useState(null);
  const items = useMemo(
    () =>
      shuffle(pool).map(category => ({
        src: category.image,
        alt: `${category.name} — ${categoryLabel.toLowerCase()}`,
        title: category.name,
        subtitle: categoryLabel,
      })),
    [pool, categoryLabel]
  );

  useEffect(() => {
    const slot = document.querySelector('[data-pw-mobile-carousel]');
    if (slot) setTarget(slot);
  }, []);

  if (!target || items.length === 0) return null;

  return createPortal(
    <CircularCarousel
      items={items}
      preset="panorama"
      intro="assemble"
      cardWidth={300}
      aspectRatio={1.333}
      speed={10}
      captions={false}
      gap={25}
      tilt={0}
      curve={1}
      perspective={1800}
      autoplay="drift"
      interval={3}
      direction="left"
      momentum={0.6}
      snap
      pauseOnHover
      focusOnClick
      draggable
      parallax={0.3}
      stretch={0.5}
      fadeColor="#120f17"
      depthFade={0.55}
      innerShade={0.6}
      cornerRadius={19}
    />,
    target
  );
}

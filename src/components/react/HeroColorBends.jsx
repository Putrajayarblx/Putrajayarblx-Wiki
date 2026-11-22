import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ColorBends from './ColorBends';

const COLORS = ['#123a8f', '#3fa9a0', '#f0a878'];

export default function HeroColorBends() {
  const [target, setTarget] = useState(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    hero.classList.add('pw-hero-bends-host');
    setTarget(hero);
  }, []);

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) return undefined;
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  if (!target) return null;

  return createPortal(
    <div className="pw-hero-bends" aria-hidden="true">
      <ColorBends
        colors={COLORS}
        rotation={78}
        speed={reduced ? 0 : 0.06}
        autoRotate={0}
        scale={1.25}
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
    </div>,
    target
  );
}

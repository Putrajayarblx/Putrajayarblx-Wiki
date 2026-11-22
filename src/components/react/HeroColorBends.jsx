import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ColorBends from './ColorBends';

const COLORS = ['#ff5c7a', '#8a5cff', '#00ffd1'];

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
        speed={reduced ? 0 : 0.08}
        scale={1.1}
        frequency={1}
        warpStrength={0.9}
        mouseInfluence={1}
        parallax={2}
        noise={0.37}
        iterations={1}
        intensity={1.5}
        bandWidth={6}
        transparent
        autoRotate={0}
        color="#d4cadc"
      />
    </div>,
    target
  );
}

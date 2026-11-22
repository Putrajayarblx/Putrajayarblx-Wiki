import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import DotGrid from './DotGrid';

export default function HeroDotGrid() {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    hero.classList.add('pw-hero-dots-host');
    setTarget(hero);
  }, []);

  if (!target) return null;

  return createPortal(
    <div className="pw-hero-dots" aria-hidden="true">
      <DotGrid
        baseColor="#a9c2d9"
        activeColor="#185a9d"
        shape="circle"
        dotSize={4}
        gap={20}
        proximity={150}
        strength={1}
        bounce={0.6}
        tension={0.4}
        returnDuration={0.8}
        shockRadius={320}
        shockStrength={5}
        swell={0.8}
        stretch={0.5}
        glow={0.5}
        fade={0.18}
        opacity={0.6}
        intro
        mouseInteraction
        clickShock
      />
    </div>,
    target
  );
}

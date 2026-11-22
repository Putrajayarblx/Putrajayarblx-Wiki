import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import GradientText from './GradientText';

export default function HeroTitleGradient() {
  const [target, setTarget] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const h1 = document.querySelector('.hero h1');
    if (!h1) return;
    const original = h1.dataset.pwHeroTitle || h1.textContent?.trim() || '';
    if (!original) return;
    h1.dataset.pwHeroTitle = original;
    h1.textContent = '';
    h1.classList.add('pw-gradient-host');
    setText(original);
    setTarget(h1);
  }, []);

  if (!target || !text) return null;

  return createPortal(
    <GradientText
      colors={['var(--pw-hero-a)', 'var(--pw-hero-b)', 'var(--pw-hero-c)']}
      animationSpeed={14}
      variant="flow"
      angle={110}
      scale={3.4}
      yoyo
      glow={0.18}
    >
      {text}
    </GradientText>,
    target
  );
}

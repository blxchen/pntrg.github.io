'use client';

import { useEffect, useState } from 'react';

type IntroPhase = 'loading' | 'leaving' | 'hidden';

export default function SiteIntro() {
  const [phase, setPhase] = useState<IntroPhase>('loading');

  useEffect(() => {
    document.body.classList.add('intro-active');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const leaveTimer = window.setTimeout(() => setPhase('leaving'), reducedMotion ? 40 : 1500);
    const hideTimer = window.setTimeout(() => {
      setPhase('hidden');
      document.body.classList.remove('intro-active');
    }, reducedMotion ? 120 : 2250);
    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' && event.key !== 'Enter') return;
      setPhase('hidden');
      document.body.classList.remove('intro-active');
    };
    window.addEventListener('keydown', dismiss);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener('keydown', dismiss);
      document.body.classList.remove('intro-active');
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <button
      aria-label="Skip website introduction"
      className={`site-intro ${phase === 'leaving' ? 'is-leaving' : ''}`}
      onClick={() => {
        setPhase('hidden');
        document.body.classList.remove('intro-active');
      }}
      type="button"
    >
      <span className="site-intro-wordmark">PNT RESEARCH GROUP</span>
      <span className="site-intro-bar"><i /></span>
      <span className="site-intro-status">Establishing position</span>
    </button>
  );
}

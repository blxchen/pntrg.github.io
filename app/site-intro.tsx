'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { assetPath } from './components';

type IntroPhase = 'loading' | 'leaving' | 'hidden';

export default function SiteIntro() {
  const [phase, setPhase] = useState<IntroPhase>('loading');

  useEffect(() => {
    document.body.classList.add('intro-active');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const leaveTimer = window.setTimeout(() => setPhase('leaving'), reducedMotion ? 40 : 2300);
    const hideTimer = window.setTimeout(() => {
      setPhase('hidden');
      document.body.classList.remove('intro-active');
    }, reducedMotion ? 120 : 3000);
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
      <span className="site-intro-wordmark">PNT RESEARCH GROUP <i>· NSSLGlobal</i></span>
      <span className="site-intro-lockup">
        <span className="site-intro-orbit"><i /><i /></span>
        <span className="site-intro-logo"><Image src={assetPath('/pntl-emblem-stacked.svg')} alt="" width={194} height={176} priority /></span>
        <span className="site-intro-name"><b>PNTL</b><small>Positioning, Navigation<br />and Timing Laboratory</small></span>
        <span className="site-intro-trace" />
      </span>
      <span className="site-intro-progress"><i /></span>
      <span className="site-intro-status"><b>Establishing position</b><i>25.0330° N · 121.5654° E</i></span>
    </button>
  );
}

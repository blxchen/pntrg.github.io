'use client';

import { useEffect } from 'react';

export default function Motion() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-revealed'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
        const index = Math.max(0, siblings.indexOf(element));
        element.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
        element.classList.add('is-revealed');
        observer.unobserve(element);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}

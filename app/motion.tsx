'use client';

import { useEffect } from 'react';

export default function Motion() {
  useEffect(() => {
    const elements = new WeakSet<HTMLElement>();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const revealNow = (root: ParentNode) => root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => element.classList.add('is-revealed'));
      revealNow(document);
      const mutationObserver = new MutationObserver(() => revealNow(document));
      mutationObserver.observe(document.body, { childList: true, subtree: true });
      return () => mutationObserver.disconnect();
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
    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        if (elements.has(element)) return;
        elements.add(element);
        observer.observe(element);
      });
    };
    observe(document);
    const mutationObserver = new MutationObserver(() => observe(document));
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}

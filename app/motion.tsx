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
    const cardSelector = '.reference-person-card,.theme-card,.preview-card,.project-list article,.resource-grid article,.output-grid article,.contact-lanes article,.recruitment-card,.about-value-card,.about-founder-list a,.pure-topic-card,.pure-similar-card';
    const cardListeners = new Map<HTMLElement, { move: (event: PointerEvent) => void; leave: () => void }>();
    const bindDirectionalCards = () => {
      document.querySelectorAll<HTMLElement>(cardSelector).forEach((card) => {
        if (cardListeners.has(card)) return;
        const move = (event: PointerEvent) => {
          if (event.pointerType === 'touch') return;
          const rect = card.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
          card.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`);
          card.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
          card.style.setProperty('--shift-x', `${(x * 5).toFixed(2)}px`);
          card.style.setProperty('--shift-y', `${(y * 5 - 5).toFixed(2)}px`);
          card.style.setProperty('--shine-x', `${((x + 1) * 50).toFixed(1)}%`);
          card.style.setProperty('--shine-y', `${((y + 1) * 50).toFixed(1)}%`);
          card.classList.add('is-pointer-card');
        };
        const leave = () => {
          card.classList.remove('is-pointer-card');
          ['--tilt-x', '--tilt-y', '--shift-x', '--shift-y', '--shine-x', '--shine-y'].forEach((property) => card.style.removeProperty(property));
        };
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', leave);
        cardListeners.set(card, { move, leave });
      });
    };
    observe(document);
    bindDirectionalCards();
    const mutationObserver = new MutationObserver(() => {
      observe(document);
      bindDirectionalCards();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      cardListeners.forEach(({ move, leave }, card) => {
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerleave', leave);
      });
    };
  }, []);

  return null;
}

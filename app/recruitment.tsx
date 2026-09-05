'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { positions, type Position } from './recruitment-data';

export default function RecruitmentDirectory() {
  const [selected, setSelected] = useState<Position | null>(null);

  useEffect(() => {
    const readLocation = () => {
      const slug = new URLSearchParams(window.location.search).get('position');
      setSelected(positions.find((position) => position.slug === slug) ?? null);
    };
    const timer = window.setTimeout(readLocation, 0);
    window.addEventListener('popstate', readLocation);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('popstate', readLocation);
    };
  }, []);

  function openPosition(position: Position) {
    setSelected(position);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('position', position.slug);
    window.history.pushState({}, '', nextUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closePosition() {
    setSelected(null);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete('position');
    window.history.pushState({}, '', nextUrl);
  }

  if (selected) return <PositionDetail position={selected} onBack={closePosition} />;

  return (
    <section className="recruitment-directory">
      <header data-reveal><div><span>Current opportunities</span><strong>{String(positions.length).padStart(2, '0')} cards</strong></div><p>Every opportunity starts with a clear scope, an honest description of the working arrangement, and explicit expectations around credit.</p></header>
      <div className="recruitment-grid">
        {positions.map((position, index) => <button className={`recruitment-card ${index % 2 ? 'is-alt' : ''}`} data-reveal key={position.slug} onClick={() => openPosition(position)} type="button"><span className="recruitment-card-graphic" aria-hidden="true"><i /><i /><i /><b>0{index + 1}</b></span><span className="recruitment-card-meta"><b>{position.status}</b><i>{position.mode}</i></span><h2>{position.title}</h2><p>{position.summary}</p><span className="recruitment-tags">{position.tags.map((tag) => <em key={tag}>{tag}</em>)}</span><strong>View opportunity <i>↗</i></strong></button>)}
      </div>
      <aside className="recruitment-principle" data-reveal><span>Recruitment principle</span><p>No vague promises. Scope, expectations, practical terms, attribution, and ownership should be understood before a collaboration begins.</p></aside>
    </section>
  );
}

function PositionDetail({ position, onBack }: { position: Position; onBack: () => void }) {
  return <section className="position-detail"><header><button onClick={onBack} type="button">← All opportunities</button><span>{position.status}</span><h1>{position.title}</h1><p>{position.summary}</p><div>{position.tags.map((tag) => <em key={tag}>{tag}</em>)}</div></header><div className="position-layout"><aside><span>Working mode</span><strong>{position.mode}</strong><span>Commitment</span><strong>{position.commitment}</strong><Link href="/contact">Start a conversation ↗</Link></aside><article><section><h2>About the opportunity</h2>{position.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section><section><h2>What you could do</h2><ul>{position.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>You might be a fit if</h2><ul>{position.fit.map((item) => <li key={item}>{item}</li>)}</ul></section><div className="position-apply"><span>Interested?</span><h2>Start with context, not a formal cover letter.</h2><p>Tell us what you want to explore, what you already know, and what a useful contribution could look like.</p><Link href="/contact">Discuss this opportunity →</Link></div></article></div></section>;
}

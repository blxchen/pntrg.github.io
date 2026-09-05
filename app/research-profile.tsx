'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type ProfileId = 'brandon' | 'naveed';
type Profile = {
  id: ProfileId;
  initials: string;
  name: string;
  role: string;
  summary: string;
  interests: string[];
  themes: string[][];
};

const profiles: Record<ProfileId, Profile> = {
  brandon: {
    id: 'brandon',
    initials: 'BC',
    name: 'Brandon Chen',
    role: 'Co-founder · Systems & research',
    summary: 'Works across the architecture of positioning systems—from signal behavior and estimation to how evidence becomes a dependable product decision.',
    interests: ['Resilient GNSS', 'Sensor fusion', 'Integrity monitoring', 'Urban positioning'],
    themes: [
      ['Signal behavior', 'Core', 'Models how obstruction, interference, and multipath change what a receiver can know.'],
      ['State estimation', 'Core', 'Combines imperfect observations while keeping uncertainty visible.'],
      ['System integrity', 'Active', 'Connects confidence measures to safe and useful system decisions.'],
      ['Field instrumentation', 'Active', 'Builds repeatable evidence from difficult operating environments.'],
    ],
  },
  naveed: {
    id: 'naveed',
    initials: 'NA',
    name: 'Naveed Ahmed',
    role: 'Co-founder · Strategy & applications',
    summary: 'Connects research direction to real operational needs, shaping programs around adoption, deployment, and measurable outcomes.',
    interests: ['Cooperative positioning', 'Field validation', 'Systems strategy', 'Autonomous deployment'],
    themes: [
      ['Cooperative systems', 'Core', 'Frames shared positioning methods around the needs of connected devices and fleets.'],
      ['Research translation', 'Core', 'Turns technical evidence into programs, partnerships, and deployable decisions.'],
      ['Field validation', 'Active', 'Designs evaluation around operating constraints rather than nominal conditions.'],
      ['Autonomous deployment', 'Active', 'Explores how navigation assurance supports machines working in the real world.'],
    ],
  },
};

export default function ResearchProfile() {
  const [selected, setSelected] = useState<ProfileId | null>(null);

  useEffect(() => {
    const readLocation = () => {
      const person = new URLSearchParams(window.location.search).get('person');
      setSelected(person === 'brandon' || person === 'naveed' ? person : null);
    };
    const timer = window.setTimeout(readLocation, 0);
    window.addEventListener('popstate', readLocation);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('popstate', readLocation);
    };
  }, []);

  function selectProfile(id: ProfileId) {
    setSelected(id);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('person', id);
    window.history.pushState({}, '', nextUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showDirectory() {
    setSelected(null);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete('person');
    window.history.pushState({}, '', nextUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!selected) return <ProfileDirectory onSelect={selectProfile} />;

  const profile = profiles[selected];
  const partner = profile.id === 'brandon' ? profiles.naveed : profiles.brandon;

  return (
    <section className="pure-profile-page">
      <header className="pure-directory-bar">
        <div><span>Research profiles</span><strong>2 researchers</strong></div>
        <nav aria-label="Research profile actions"><button onClick={showDirectory} type="button">Return to profiles</button><Link href="/people">View team</Link></nav>
      </header>

      <div className="pure-profile-switcher" role="tablist" aria-label="Researcher profiles">
        {Object.values(profiles).map((person) => <button aria-selected={profile.id === person.id} className={profile.id === person.id ? 'is-active' : ''} key={person.id} onClick={() => selectProfile(person.id)} role="tab" type="button"><ProfilePortrait person={person} compact /><span>{person.name}<small>{person.role}</small></span></button>)}
      </div>

      <section className="pure-profile-hero">
        <ProfilePortrait person={profile} />
        <div className="pure-profile-identity">
          <h1>{profile.name}</h1>
          <ul><li>{profile.role}</li><li>Positioning, Navigation and Timing Laboratory</li><li>NSSLGlobal</li></ul>
          <div className="pure-profile-contact"><span><b>Group</b>PNT Research Group</span><Link href="/contact"><b>Contact</b>Start a research conversation</Link></div>
        </div>
        <aside className="pure-profile-metrics">
          <div><strong>04</strong><span>Research areas</span><small>Curated from profile interests</small></div>
          <div><strong>00</strong><span>Public outputs</span><small>Record in preparation</small></div>
          <div className="pure-profile-record"><span>Public research record</span><b>Building openly</b></div>
        </aside>
      </section>

      <nav className="pure-profile-nav" aria-label={`${profile.name} profile sections`}>
        {[
          ['profile-overview', 'Overview'],
          ['profile-fingerprint', 'Fingerprint'],
          ['profile-similar', 'Similar profiles'],
          ['profile-network', 'Network'],
          ['profile-outputs', 'Research output'],
        ].map(([id, label]) => <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })} type="button">{label}</button>)}
      </nav>

      <section className="pure-profile-section" id="profile-overview">
        <SectionHeading icon="person" title="Personal profile" />
        <div className="pure-personal-grid"><article><h3>Biography</h3><p>{profile.summary}</p><p>PNTL connects physical models, algorithms, field evidence, and deployment constraints so navigation systems can show not only where they are, but how much that answer deserves to be trusted.</p></article><aside><h3>Research interests</h3><div className="pure-keywords">{profile.interests.map((interest) => <span key={interest}>{interest}</span>)}</div></aside></div>
      </section>

      <section className="pure-profile-section pure-fingerprint" id="profile-fingerprint">
        <SectionHeading icon="fingerprint" title="Fingerprint" description={`Dive into the research topics where ${profile.name} is active. These qualitative labels come from the profile's stated interests; they are not citation-derived metrics.`} aside={<div className="pure-similar-badge"><strong>01</strong><span>Similar profile</span></div>} />
        <div className="pure-fingerprint-list">{profile.themes.map(([title, level, description], index) => <article key={title}><div className={`pure-topic-ring topic-${index + 1}`}><i /><span>{index + 1}</span></div><div><small>{level} focus</small><h3>{title}</h3><p>{description}</p></div></article>)}</div>
      </section>

      <section className="pure-profile-section" id="profile-similar">
        <SectionHeading icon="similar" title="Similar profiles" description="Researchers with closely related interests, methods, and program responsibilities." />
        <button className="pure-similar-card" onClick={() => selectProfile(partner.id)} type="button"><ProfilePortrait person={partner} compact /><div><small>Founding collaborator</small><h3>{partner.name}</h3><p>{partner.role}</p><span>{partner.interests.slice(0, 3).join(' · ')}</span></div><b>→</b></button>
      </section>

      <section className="pure-profile-section" id="profile-network">
        <SectionHeading icon="network" title="Research network and connected programs" description="The public map shows PNTL's current working structure. Named external collaborators will be added when joint work becomes public." />
        <div className="pure-network-map"><span className="network-connector connector-one" /><span className="network-connector connector-two" /><span className="network-connector connector-three" /><div className="pure-network-node node-current"><b>{profile.initials}</b><span>{profile.name}</span></div><div className="pure-network-node node-center"><b>PNTL</b><span>NSSLGlobal</span></div><button className="pure-network-node node-collaborator" onClick={() => selectProfile(partner.id)} type="button"><b>{partner.initials}</b><span>{partner.name}</span></button><div className="pure-network-node node-program"><b>FIELD</b><span>Research programs</span></div></div>
      </section>

      <section className="pure-profile-section" id="profile-outputs">
        <SectionHeading icon="output" title="Research output" description="Papers, technical notes, datasets, and code will appear here as the PNTL public record is released." aside={<span className="pure-section-total">0 total outputs</span>} />
        <div className="pure-output-empty"><span>Record in preparation</span><h3>No unverified publications are shown.</h3><p>The first public entries will include their source, status, associated code or data, and a plain-language summary.</p><Link href="/publications">View publication index →</Link></div>
      </section>

      <footer className="pure-profile-note">This profile is a curated PNTL record. Research topics are qualitative and publication metrics remain blank until verified outputs are released.</footer>
    </section>
  );
}

function ProfileDirectory({ onSelect }: { onSelect: (id: ProfileId) => void }) {
  return <section className="profile-directory-page"><header className="profile-directory-hero"><p>Research profiles</p><h1>Explore researcher profiles.</h1><span>Choose a researcher to view their complete record, research activity, network, and curated fingerprint.</span></header><div className="profile-card-directory" aria-label="Researcher profile directory">{Object.values(profiles).map((person, index) => <button className={`reference-person-card ${index === 1 ? 'is-alt' : ''}`} key={person.id} onClick={() => onSelect(person.id)} type="button"><ProfilePortrait person={person} /><span className="reference-person-body"><small>Research profile</small><h2>{person.name}</h2><p>{person.role}</p></span><span className="reference-person-action">View full profile</span></button>)}</div><div className="profile-directory-foot"><p>Profiles connect people, expertise, collaboration, and public output in one research record.</p><Link href="/people">Meet the team →</Link></div></section>;
}

function ProfilePortrait({ person, compact = false }: { person: Profile; compact?: boolean }) {
  return <span className={`reference-portrait portrait-${person.id} ${compact ? 'is-compact' : ''}`} aria-hidden="true"><i /><i /><b>{person.initials}</b><small>PNTL</small></span>;
}

function SectionHeading({ icon, title, description, aside }: { icon: string; title: string; description?: string; aside?: React.ReactNode }) {
  return <header className="pure-section-heading"><div><h2><i className={`pure-section-icon ${icon}`} aria-hidden="true" />{title}</h2>{description && <p>{description}</p>}</div>{aside}</header>;
}

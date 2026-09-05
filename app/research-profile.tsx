'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type ProfileId = 'brandon' | 'naveed';
type TabId = 'overview' | 'fingerprint' | 'network' | 'outputs';
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
    id: 'brandon' as ProfileId,
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
    id: 'naveed' as ProfileId,
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

const tabs: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'fingerprint', label: 'Fingerprint' },
  { id: 'network', label: 'Network' },
  { id: 'outputs', label: 'Research output' },
];

export default function ResearchProfile() {
  const [selected, setSelected] = useState<ProfileId>('brandon');
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const profile = profiles[selected];

  useEffect(() => {
    const person = new URLSearchParams(window.location.search).get('person');
    if (person !== 'brandon' && person !== 'naveed') return;
    const timer = window.setTimeout(() => setSelected(person), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function selectProfile(id: ProfileId) {
    setSelected(id);
    setActiveTab('overview');
    const url = new URL(window.location.href);
    url.searchParams.set('person', id);
    window.history.replaceState({}, '', url);
  }

  return (
    <section className="profile-portal">
      <div className="profile-portal-bar">
        <span>PNTL research portal</span>
        <p>People · expertise · output</p>
      </div>

      <div className="profile-selector" aria-label="Choose a research profile">
        <span>Research profiles</span>
        {(Object.values(profiles)).map((person) => (
          <button
            className={selected === person.id ? 'is-selected' : ''}
            key={person.id}
            onClick={() => selectProfile(person.id)}
            type="button"
          >
            <b>{person.initials}</b>
            <span>{person.name}<small>{person.role}</small></span>
          </button>
        ))}
      </div>

      <div className="profile-shell">
        <header className="profile-hero">
          <div className={`profile-photo profile-photo-${profile.id}`} aria-hidden="true">
            <span>{profile.initials}</span><i /><i />
          </div>
          <div className="profile-identity">
            <p>{profile.role}</p>
            <h1>{profile.name}</h1>
            <Link href="/people">PNTL · NSSLGlobal</Link>
            <p className="profile-summary">{profile.summary}</p>
            <div className="profile-tags">{profile.interests.map((interest) => <span key={interest}>{interest}</span>)}</div>
          </div>
          <dl className="profile-metrics">
            <div><dt>Research themes</dt><dd>04</dd></div>
            <div><dt>Active directions</dt><dd>03</dd></div>
            <div><dt>Public outputs</dt><dd>—</dd></div>
            <small>Public record in preparation</small>
          </dl>
        </header>

        <nav className="profile-tabs" aria-label={`${profile.name} profile sections`} role="tablist">
          {tabs.map((tab) => (
            <button
              aria-controls={`panel-${tab.id}`}
              aria-selected={activeTab === tab.id}
              className={activeTab === tab.id ? 'is-active' : ''}
              id={`tab-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              type="button"
            >{tab.label}</button>
          ))}
        </nav>

        <div className="profile-panel" id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
          {activeTab === 'overview' && <Overview profile={profile} />}
          {activeTab === 'fingerprint' && <Fingerprint profile={profile} />}
          {activeTab === 'network' && <Network profile={profile} onSelect={selectProfile} />}
          {activeTab === 'outputs' && <Outputs profile={profile} />}
        </div>
      </div>
    </section>
  );
}

function Overview({ profile }: { profile: Profile }) {
  return <div className="profile-overview">
    <article><p className="profile-kicker">About</p><h2>Research built around dependable decisions.</h2><p>{profile.summary}</p><p>PNTL connects physical models, algorithms, field evidence, and deployment constraints so navigation systems can show not only where they are, but how much that answer deserves to be trusted.</p></article>
    <aside><p className="profile-kicker">Current focus</p>{profile.interests.map((item, index) => <div key={item}><span>0{index + 1}</span><b>{item}</b></div>)}</aside>
  </div>;
}

function Fingerprint({ profile }: { profile: Profile }) {
  return <div><div className="panel-heading"><p className="profile-kicker">Research fingerprint</p><h2>Concepts that define the work.</h2><p>A qualitative map of current PNTL focus—not a citation-derived or automated bibliometric score.</p></div><div className="fingerprint-grid">{profile.themes.map(([title, level, description], index) => <article key={title}><div className={`fingerprint-orbit orbit-weight-${index + 1}`}><span>{index + 1}</span><i /></div><p>{level} focus</p><h3>{title}</h3><div>{description}</div></article>)}</div></div>;
}

function Network({ profile, onSelect }: { profile: Profile; onSelect: (id: ProfileId) => void }) {
  const partner = profile.id === 'brandon' ? profiles.naveed : profiles.brandon;
  return <div><div className="panel-heading"><p className="profile-kicker">Collaboration network</p><h2>One laboratory, connected outward.</h2><p>This map shows the working structure of the lab. Named external collaborators will be added as joint work becomes public.</p></div><div className="network-map"><span className="network-line line-one" /><span className="network-line line-two" /><span className="network-line line-three" /><div className="network-node node-person"><b>{profile.initials}</b><span>{profile.name}</span></div><div className="network-node node-lab"><b>PNTL</b><span>NSSLGlobal</span></div><button className="network-node node-partner" onClick={() => onSelect(partner.id)} type="button"><b>{partner.initials}</b><span>{partner.name}</span></button><div className="network-node node-field"><b>FIELD</b><span>Research partners</span></div></div></div>;
}

function Outputs({ profile }: { profile: Profile }) {
  return <div className="outputs-empty"><span>Research output</span><h2>{profile.name}&apos;s public record is being assembled.</h2><p>Future entries will link papers, technical notes, datasets, code, and plain-language summaries. No placeholder citations or unverified metrics are shown.</p><Link className="arrow-link" href="/publications">Visit the publication index <span>↗</span></Link></div>;
}

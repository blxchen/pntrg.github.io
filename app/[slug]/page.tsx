import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLink, Footer, Header, PageHero } from '../components';
import ResearchProfile from '../research-profile';

const pageMeta: Record<string, { title: string; description: string }> = {
  research: { title: 'Research', description: 'PNTL research across resilient positioning, sensing, navigation, and timing.' },
  'research-profile': { title: 'Research Profiles', description: 'Explore the people, expertise, collaboration network, and public research record behind PNTL.' },
  projects: { title: 'Projects', description: 'PNTL research programs connecting theory, field experiments, and deployable navigation.' },
  people: { title: 'People', description: 'Meet the founders and collaborators behind PNTL at NSSLGlobal.' },
  publications: { title: 'Publications', description: 'Research outputs and publication themes from PNTL.' },
  resources: { title: 'Open Lab', description: 'Open tools, datasets, protocols, and field notes from PNTL.' },
  contact: { title: 'Connect', description: 'Start a research, industry, or talent conversation with PNTL.' },
};

export function generateStaticParams() { return Object.keys(pageMeta).map((slug) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = pageMeta[slug];
  return meta ? { title: `${meta.title} — PNTL`, description: meta.description } : {};
}

const themes = [
  { n: '01', title: 'Resilient GNSS', text: 'Detect, understand, and work through signal blockage, interference, and multipath in difficult environments.', tag: 'Signal layer' },
  { n: '02', title: 'Multi-sensor navigation', text: 'Fuse satellite, inertial, visual, radio, and map information into one dependable navigation state.', tag: 'State layer' },
  { n: '03', title: 'Cooperative positioning', text: 'Turn fleets and connected devices into shared navigation infrastructure without losing sight of trust.', tag: 'Network layer' },
  { n: '04', title: 'Precise timing', text: 'Study timing integrity and distribution for systems that depend on coordination down to the smallest interval.', tag: 'Time layer' },
];

function ResearchPage() {
  return <><PageHero index="01 / Research" eyebrow="Our research" title="Trustworthy navigation, from signal to decision." intro="We study the full positioning stack: how signals behave, how sensors disagree, how uncertainty travels, and how a system should respond." />
    <section className="content-section"><div className="section-heading" data-reveal><p>Research architecture</p><h2>Four layers. One reliable state.</h2></div><div className="theme-grid">{themes.map((t) => <article className="theme-card" data-reveal key={t.n}><div className="theme-visual"><span>{t.n}</span><i /><i /><i /></div><p>{t.tag}</p><h3>{t.title}</h3><div>{t.text}</div></article>)}</div></section>
    <section className="split-statement"><div data-reveal><p className="eyebrow"><span /> How we work</p><h2>Physics first.<br /><em>Evidence always.</em></h2></div><div className="method-list">{[['Model','Start with the signal, motion, and uncertainty that shape the real system.'],['Build','Translate the model into algorithms, instruments, and repeatable software.'],['Stress','Test beyond nominal conditions—in motion, under obstruction, and at the edge.'],['Share','Turn findings into papers, tools, datasets, and clearer engineering decisions.']].map(([a,b], i) => <div data-reveal key={a}><span>0{i+1}</span><h3>{a}</h3><p>{b}</p></div>)}</div></section><Footer /></>;
}

function ProjectsPage() {
  const projects = [
    ['Urban signal intelligence','A field-driven program for understanding and mitigating reflections, occlusion, and non-line-of-sight satellite signals.','GNSS · Cities'],
    ['Cooperative localization','Shared positioning methods for connected robots and vehicles operating with incomplete local information.','Networks · Autonomy'],
    ['Resilient timing fabric','Monitoring and recovery concepts for distributed systems that cannot treat time as an invisible dependency.','Timing · Integrity'],
    ['Navigation evaluation kit','Repeatable protocols for comparing positioning systems across environments, failure modes, and operating constraints.','Tools · Benchmarking'],
  ];
  return <><PageHero index="02 / Projects" eyebrow="Programs & fieldwork" title="Research that leaves the whiteboard." intro="Our programs are framed around difficult operating conditions and the decisions real systems must make when confidence changes." />
    <section className="content-section"><div className="section-heading" data-reveal><p>Program portfolio</p><h2>Built around hard conditions.</h2></div><div className="project-list">{projects.map((p,i) => <article data-reveal key={p[0]}><div className="project-num">0{i+1}</div><div><p>{p[2]}</p><h3>{p[0]}</h3><div>{p[1]}</div></div><span className="project-arrow">↗</span></article>)}</div></section>
    <section className="field-band"><div data-reveal><p>Partnership model</p><h2>A clear path from research question to field evidence.</h2></div><div className="field-steps">{['Frame the operating problem','Instrument the environment','Prototype and evaluate','Transfer what works'].map((x,i)=><span data-reveal key={x}><b>0{i+1}</b>{x}</span>)}</div><ArrowLink href="/contact">Discuss a program</ArrowLink></section><Footer /></>;
}

function PeoplePage() {
  const people = [
    { id: 'brandon', initials: 'BC', role: 'Co-founder · Systems & research', name: 'Brandon Chen', text: 'Works across the architecture of positioning systems—from signal behavior and estimation to how evidence becomes a dependable product decision.', interests: ['Resilient GNSS', 'Sensor fusion', 'Integrity monitoring'] },
    { id: 'naveed', initials: 'NA', role: 'Co-founder · Strategy & applications', name: 'Naveed Ahmed', text: 'Connects research direction to real operational needs, shaping programs around adoption, deployment, and measurable outcomes.', interests: ['Cooperative positioning', 'Field validation', 'Systems strategy'] },
  ];
  return <><PageHero index="03 / Team" eyebrow="The lab" title="Small team. Wide field of view." intro="PNTL was founded by Brandon Chen and Naveed Ahmed to connect rigorous navigation research with the systems and environments that need it." />
    <section className="reference-team-section"><header data-reveal><div><span>Team directory</span><strong>02 members</strong></div><p>Meet the people shaping PNTL&apos;s research systems, field programs, and path to application.</p></header><div className="reference-team-grid">{people.map((person, index) => <Link className={`reference-person-card ${index === 1 ? 'is-alt' : ''}`} data-reveal href={`/research-profile?person=${person.id}`} key={person.id}><span className={`reference-portrait portrait-${person.id}`} aria-hidden="true"><i /><i /><b>{person.initials}</b><small>PNTL</small></span><span className="reference-person-body"><small>Team member</small><h2>{person.name}</h2><p>{person.role}</p><em>{person.interests.join(' · ')}</em></span><span className="reference-person-action">View research profile</span></Link>)}</div></section>
    <section className="join-band"><div data-reveal><p className="eyebrow eyebrow-light"><span /> Work with us</p><h2>Navigation is a team sport.</h2></div><div data-reveal><p>We welcome conversations with researchers, engineers, students, and operators tackling problems in uncertain environments.</p><ArrowLink href="/contact">Start a conversation</ArrowLink></div></section><Footer /></>;
}

function ResearchProfilePage() {
  return <><ResearchProfile /><Footer /></>;
}

function PublicationsPage() {
  return <><PageHero index="04 / Publications" eyebrow="Research record" title="Ideas made inspectable." intro="Our publication record is organized around reproducible methods, explicit uncertainty, and lessons that survive contact with the field." />
    <section className="content-section"><div className="section-heading" data-reveal><p>Output map</p><h2>Follow the work by theme.</h2></div><div className="output-grid">{themes.slice(0,3).map((t,i)=><article data-reveal key={t.title}><span>0{i+1}</span><p>{t.tag}</p><h3>{t.title}</h3><div>Methods, evaluation protocols, and research notes in this area will appear here as the PNTL record is released.</div><b>Index in preparation</b></article>)}</div></section>
    <section className="publication-note"><div data-reveal><p>Publication index</p><h2>The first PNTL papers and technical notes are being assembled.</h2></div><p data-reveal>This page is intentionally honest about the current record. As outputs are released, each entry will link to the paper, code, data, and a plain-language summary.</p></section><Footer /></>;
}

function ResourcesPage() {
  const resources = [['Field protocols','Repeatable ways to collect, label, and compare navigation data.','Protocol'],['Evaluation notebooks','Readable analyses that expose assumptions, metrics, and failure modes.','Code'],['Reference datasets','Curated scenarios for urban, cooperative, and timing research.','Data'],['Research notes','Concise explanations of methods, experiments, and engineering tradeoffs.','Notes']];
  return <><PageHero index="05 / Open lab" eyebrow="Resources" title="Open by design." intro="Good navigation research should be testable. We are building a public layer around our work so others can inspect, reproduce, and extend it." />
    <section className="content-section"><div className="section-heading" data-reveal><p>Release tracks</p><h2>Tools for the work around the paper.</h2></div><div className="resource-grid">{resources.map((r,i)=><article data-reveal key={r[0]}><div><span>{r[2]}</span><b>0{i+1}</b></div><h3>{r[0]}</h3><p>{r[1]}</p><small>Release plan in preparation</small></article>)}</div></section>
    <section className="open-principle"><p data-reveal>“A result becomes more useful when someone else can understand how it was made.”</p><span data-reveal>PNTL open research principle</span></section><Footer /></>;
}

function ContactPage() {
  const lanes = [['Research collaboration','Frame a joint question, experiment, or technical study.'],['Industry program','Evaluate a navigation challenge against real operating constraints.'],['Join the lab','Discuss student, research, or engineering contributions.']];
  return <><PageHero index="06 / Connect" eyebrow="Start here" title="Bring us the difficult environment." intro="Tell us what moves, what fails, what evidence you already have, and what a useful answer would change." />
    <section className="contact-section"><div className="contact-intro" data-reveal><p>Ways to connect</p><h2>Choose the conversation that fits.</h2><p>PNTL is currently establishing its public contact channel. In the meantime, reach the founders through your existing NSSLGlobal relationship.</p></div><div className="contact-lanes">{lanes.map((l,i)=><article data-reveal key={l[0]}><span>0{i+1}</span><h3>{l[0]}</h3><p>{l[1]}</p><b>Prepare a short brief ↗</b></article>)}</div></section>
    <section className="contact-prompt"><div data-reveal><p>A useful first note includes</p><h2>Context. Constraint. Decision.</h2></div><ol data-reveal><li><span>01</span>Where must the system operate?</li><li><span>02</span>What makes positioning or timing difficult there?</li><li><span>03</span>What decision will the work support?</li></ol></section><Footer /></>;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!pageMeta[slug]) notFound();
  const content = slug === 'research' ? <ResearchPage /> : slug === 'research-profile' ? <ResearchProfilePage /> : slug === 'projects' ? <ProjectsPage /> : slug === 'people' ? <PeoplePage /> : slug === 'publications' ? <PublicationsPage /> : slug === 'resources' ? <ResourcesPage /> : <ContactPage />;
  return <main><Header current={slug} />{content}</main>;
}

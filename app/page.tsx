import Link from 'next/link';
import Image from 'next/image';
import { ArrowLink, assetPath, Footer, Header } from './components';

const research = [
  { n: '01', title: 'Signal intelligence', text: 'Understand what the receiver sees before deciding what the system should believe.', mode: 'signal' },
  { n: '02', title: 'Sensor fusion', text: 'Combine independent evidence into a state that knows both its answer and its uncertainty.', mode: 'fusion' },
  { n: '03', title: 'Resilient timing', text: 'Protect coordination when time sources drift, disappear, or disagree.', mode: 'timing' },
];

export default function Home() {
  return (
    <main>
      <Header />
      <section className="arrival-hero" aria-labelledby="arrival-title">
        <div className="arrival-grid" />
        <div className="arrival-system" aria-hidden="true"><i /><i /><i /><span>PNT</span></div>
        <div className="arrival-topline"><span>Positioning · Navigation · Timing</span><span>25.0330° N · 121.5654° E</span></div>
        <div className="arrival-copy">
          <p>PNT Research Group</p>
          <h1 id="arrival-title">Navigate the unknown.<br /><em>Never stop moving.</em></h1>
        </div>
        <a className="arrival-explore" href="#home-main"><span>Explore</span><i>↓</i></a>
      </section>
      <section className="hero" id="home-main">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Positioning · Navigation · Timing</p>
          <h1>Certainty for a<br /><em>world in motion.</em></h1>
          <p className="hero-dek">We build resilient navigation systems that help machines understand where they are, where they&apos;re going, and when they arrive.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/research">Explore our research <span>↗</span></Link>
            <Link className="button button-quiet" href="/people">Meet the lab <span>→</span></Link>
          </div>
        </div>

        <div className="orbit-stage" aria-label="Animated representation of satellite positioning signals">
          <div className="orbit-grid" />
          <div className="orbit orbit-one"><i /></div><div className="orbit orbit-two"><i /></div><div className="orbit orbit-three"><i /></div>
          <div className="orbit-core"><Image src={assetPath('/pntl-emblem-stacked.svg')} alt="PNTL emblem" width={86} height={86} /></div>
          <div className="signal-card signal-a"><span>01</span> GNSS</div><div className="signal-card signal-b"><span>02</span> Sensing</div><div className="signal-card signal-c"><span>03</span> Timing</div>
        </div>
      </section>

      <section className="hero-rail" aria-label="Lab summary">
        <div><span>Founded by</span><strong>Brandon Chen<br />Naveed Ahmed</strong></div>
        <div><span>Working across</span><strong>Signals → Systems<br />Theory → Field</strong></div>
        <p>At NSSLGlobal, PNTL connects fundamental research to deployable navigation—across cities, autonomy, and environments where satellite signals alone are not enough.</p>
      </section>

      <div className="ticker" aria-hidden="true"><div>Resilient GNSS <i /> Multi-sensor navigation <i /> Cooperative positioning <i /> Precise timing <i /> Integrity monitoring <i /> Field validation <i /> Resilient GNSS <i /> Multi-sensor navigation <i /></div></div>

      <section className="home-research">
        <div className="section-heading" data-reveal><p>Research focus</p><h2>From noisy signals<br />to confident decisions.</h2><ArrowLink href="/research">See the research architecture</ArrowLink></div>
        <div className="research-stack">{research.map((item) => <article data-reveal key={item.n}>
          <div className={`micro-viz ${item.mode}`}><span /><span /><span /><i /></div>
          <div className="research-copy"><p>{item.n} / Research layer</p><h3>{item.title}</h3><div>{item.text}</div></div><span className="card-arrow">↗</span>
        </article>)}</div>
      </section>

      <section className="mission-band">
        <div className="mission-mark" data-reveal><Image src={assetPath('/pntl-emblem-stacked.svg')} alt="" width={180} height={180} /></div>
        <div data-reveal><p className="eyebrow eyebrow-light"><span /> The PNTL premise</p><h2>Navigation should fail<br /><em>gracefully, visibly,</em><br />and rarely.</h2></div>
        <div className="mission-copy" data-reveal><p>Position is never just a coordinate. It is a claim assembled from incomplete signals, imperfect models, and an environment that keeps changing.</p><p>We make that claim more useful by studying the full chain—from the physics of observation to the decision a system makes next.</p></div>
      </section>

      <section className="home-projects">
        <div className="section-heading horizontal" data-reveal><div><p>Program directions</p><h2>Test where it matters.</h2></div><ArrowLink href="/projects">View all projects</ArrowLink></div>
        <div className="project-preview-grid">
          <Link href="/projects" className="preview-card preview-large" data-reveal><div className="city-field"><i /><i /><i /><i /><span /></div><p>01 · Urban environments</p><h3>When the city becomes part of the sensor.</h3><span>Signal intelligence ↗</span></Link>
          <Link href="/projects" className="preview-card" data-reveal><div className="network-field"><i /><i /><i /><i /><span /><span /></div><p>02 · Connected systems</p><h3>Localize together.</h3><span>Cooperative methods ↗</span></Link>
          <Link href="/projects" className="preview-card preview-red" data-reveal><div className="time-field"><b>00:00:01</b><i /></div><p>03 · Timing integrity</p><h3>Make time observable.</h3><span>Resilient timing ↗</span></Link>
        </div>
      </section>

      <section className="founders-strip">
        <div data-reveal><p>Founded at NSSLGlobal</p><h2>Two founders.<br />One precise question:</h2></div>
        <blockquote data-reveal>How can navigation systems remain trustworthy when the world stops being convenient?</blockquote>
        <div className="founder-names" data-reveal><span><b>BC</b>Brandon Chen</span><span><b>NA</b>Naveed Ahmed</span><ArrowLink href="/people">Meet the lab</ArrowLink></div>
      </section>

      <section className="home-contact"><div className="contact-orbit"><i /><i /><i /><Image src={assetPath('/pntl-emblem-stacked.svg')} alt="" width={100} height={100} /></div><div data-reveal><p className="eyebrow eyebrow-light"><span /> Open for collaboration</p><h2>Bring us the<br />difficult environment.</h2><p>Research, deployment, or a system that does not yet know when it is wrong.</p><Link className="button contact-button" href="/contact">Start a conversation <span>↗</span></Link></div></section>
      <Footer />
    </main>
  );
}

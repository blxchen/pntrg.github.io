import Link from 'next/link';
import Image from 'next/image';

export const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

const nav = [
  { label: 'About', href: '/about', key: 'about' },
  { label: 'Research', href: '/research', key: 'research' },
  { label: 'Profiles', href: '/research-profile', key: 'research-profile' },
  { label: 'Projects', href: '/projects', key: 'projects' },
  { label: 'Team', href: '/people', key: 'people' },
  { label: 'Publications', href: '/publications', key: 'publications' },
  { label: 'Open lab', href: '/resources', key: 'resources' },
  { label: 'Join', href: '/recruitment', key: 'recruitment' },
];

export function Header({ current = 'home' }: { current?: string }) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="PNTL home">
        <Image src={assetPath('/pntl-emblem-stacked.svg')} alt="" width={38} height={38} />
        <span><b>PNTL</b><small>Independent research group</small></span>
      </Link>
      <nav aria-label="Primary navigation">
        {nav.map((item) => <Link className={current === item.key ? 'is-active' : ''} href={item.href} key={item.href}>{item.label}</Link>)}
      </nav>
      <Link className="header-cta" href="/contact">Connect <span>↗</span></Link>
      <details className="mobile-nav">
        <summary aria-label="Open navigation"><span /><span /></summary>
        <div>{nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}<Link href="/contact">Connect</Link></div>
      </details>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Image src={assetPath('/PNTL_LOGO.svg')} alt="Positioning, Navigation and Timing Laboratory" width={900} height={190} />
        <p>Building navigation systems that remain useful when the easy signals disappear.</p>
      </div>
      <div className="footer-grid">
        <div><span>Explore</span><Link href="/research">Research</Link><Link href="/research-profile">Research profiles</Link><Link href="/projects">Projects</Link><Link href="/publications">Publications</Link></div>
        <div><span>Lab</span><Link href="/about">About</Link><Link href="/people">Team</Link><Link href="/resources">Open resources</Link><Link href="/recruitment">Recruitment</Link><Link href="/contact">Connect</Link></div>
        <div className="footer-note"><span>Independent · PNTL</span><p>Founded by Brandon Chen and Naveed Ahmed.</p></div>
      </div>
      <div className="footer-base"><span>© 2026 PNTL</span><span>Positioning · Navigation · Timing</span></div>
    </footer>
  );
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="arrow-link" href={href}>{children}<span>↗</span></Link>;
}

export function PageHero({ eyebrow, title, intro, index }: { eyebrow: string; title: string; intro: string; index: string }) {
  return (
    <section className="page-hero">
      <div className="page-hero-grid" />
      <p className="eyebrow eyebrow-light"><span /> {eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-intro">{intro}</p>
      <div className="page-index">{index}</div>
    </section>
  );
}

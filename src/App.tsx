import './App.css'
import {
  Bot,
  Coins,
  Radar,
  ScanSearch,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import { useState } from 'react'

/** Alleen voor mailto op de contact-CTA (niet als losse tekst op de pagina). */
const CONTACT_EMAIL = 'mdirks@dirkscloud.nl'

type Language = 'nl' | 'en'

const translations = {
  nl: {
    nav: ['Home', 'Diensten', 'Over DCE', 'Contact'],
    heroLabel: 'Veiligheid · Kosten · Automatisering',
    heroTitle: 'Uw Azure Cloud: Veilig, Betaalbaar en Zorgeloos.',
    heroCopy:
      'Dirks Cloud Engineering helpt MKB en partners met Microsoft Azure: minder risico op datalekken, grip op maandkosten en minder handwerk in uw IT-beheer. Wij praten mee op uw niveau en leveren concrete vervolgstappen.',
    ctaPrimary: 'Vraag een kosteloze Cloud Check aan',
    ctaSecondary: 'Plan een kennismaking',
    servicesLabel: 'Veiligheid, kosten en automatisering',
    servicesTitle: 'Drie aandachtsgebieden waar uw organisatie direct profijt van heeft',
    agenticLabel: 'Hoe wij samenwerken',
    agenticTitle: 'Helder advies, zonder onnodig jargon',
    contactTitle: 'Klaar voor een cloudomgeving die voor u werkt?',
    contactCopy:
      'Geen ingewikkelde verhalen, maar direct inzicht in uw verbeterpunten. Laten we in 15 minuten kijken waar uw winst ligt.',
    contactCta: 'Vraag een kennismaking aan',
    footer: 'Persoonlijk Azure-advies voor MKB en partners.',
    footerSub: 'Heldere afspraken, duidelijke communicatie.',
    switchTo: 'Schakel naar Engels',
    switchIcon: '🇬🇧',
    switchText: 'English',
  },
  en: {
    nav: ['Home', 'Services', 'About DCE', 'Contact'],
    heroLabel: 'Security · Cost control · Automation',
    heroTitle: 'Your Azure Cloud: Safe, Affordable, and Worry-Free.',
    heroCopy:
      'Dirks Cloud Engineering helps SMBs and partners with Microsoft Azure: lower risk of data leaks, clearer monthly spend, and less manual IT work. We speak your language and leave you with practical next steps.',
    ctaPrimary: 'Request a free Cloud Check',
    ctaSecondary: 'Book an introductory call',
    servicesLabel: 'Security, cost control, and automation',
    servicesTitle: 'Three areas where your organization gains quickly',
    agenticLabel: 'How we work with you',
    agenticTitle: 'Clear guidance without unnecessary jargon',
    contactTitle: 'Ready for a cloud environment that works for you?',
    contactCopy:
      'No complicated stories—just clear insight into where you can improve. In 15 minutes, we can explore where your upside is.',
    contactCta: 'Request an introductory call',
    footer: 'Hands-on Azure guidance for SMBs and partners.',
    footerSub: 'Straightforward agreements and plain communication.',
    switchTo: 'Switch to Dutch',
    switchIcon: '🇳🇱',
    switchText: 'Nederlands',
  },
}

const servicePillars = [
  {
    id: '01',
    title: {
      nl: 'Beveiliging & continuïteit',
      en: 'Security & continuity',
    },
    subtitle: {
      nl: 'Bedrijfscontinuïteit: Uw bedrijfsdata is altijd veilig en beschikbaar.',
      en: 'Business continuity: your company data stays safe and available.',
    },
    description: {
      nl: 'Wij dichten de lekken voordat ze een probleem worden.',
      en: 'We close gaps before they become incidents.',
    },
    tags: {
      nl: ['Data veilig', 'Proactief', 'Helder advies'],
      en: ['Data safety', 'Proactive', 'Clear advice'],
    },
    cta: {
      nl: 'Meer over beveiliging',
      en: 'Learn more about security',
    },
    accent: 'cyan',
    Icon: ShieldCheck,
  },
  {
    id: '02',
    title: {
      nl: 'Kosten en licenties',
      en: 'Costs and licensing',
    },
    subtitle: {
      nl: 'Kostenbeheersing: Stop de verspilling van uw IT-budget.',
      en: 'Cost control: stop wasting your IT budget.',
    },
    description: {
      nl: 'Wij optimaliseren uw licenties en resources voor een lagere maandfactuur.',
      en: 'We tune licenses and resources so your monthly bill reflects what you really need.',
    },
    tags: {
      nl: ['Lagere factuur', 'Overzicht', 'Slimmer inkopen'],
      en: ['Lower bill', 'Transparency', 'Smarter buying'],
    },
    cta: {
      nl: 'Meer over kosten',
      en: 'Learn more about costs',
    },
    accent: 'emerald',
    Icon: Coins,
  },
  {
    id: '03',
    title: {
      nl: 'Automatisering',
      en: 'Automation',
    },
    subtitle: {
      nl: 'Efficiëntie: Wij automatiseren repetitieve IT-taken.',
      en: 'Efficiency: we automate repetitive IT tasks.',
    },
    description: {
      nl: 'Dat bespaart tijd, voorkomt menselijke fouten en verhoogt de snelheid.',
      en: 'That saves time, reduces human error, and speeds up delivery.',
    },
    tags: {
      nl: ['Tijdwinst', 'Minder fouten', 'Sneller schakelen'],
      en: ['Time saved', 'Fewer mistakes', 'Faster turnaround'],
    },
    cta: {
      nl: 'Meer over automatisering',
      en: 'Learn more about automation',
    },
    accent: 'cyan',
    Icon: Bot,
  },
]

const agenticLayer = [
  {
    title: {
      nl: 'Grip op uw cloudkosten',
      en: 'Control over cloud spend',
    },
    description: {
      nl: 'We brengen in kaart waar geld blijft hangen en helpen u keuzes maken die u op de factuur terugziet.',
      en: 'We map where money is left on the table and help you make choices you can see on the invoice.',
    },
    Icon: ScanSearch,
  },
  {
    title: {
      nl: 'Veiligheid die past bij uw bedrijf',
      en: 'Security that fits your business',
    },
    description: {
      nl: 'Concreet advies en verbeteringen, zodat risico’s voor u begrijpelijk worden en aanpakbaar.',
      en: 'Practical guidance and fixes so risks become understandable and actionable.',
    },
    Icon: Radar,
  },
  {
    title: {
      nl: 'Minder handwerk, meer rust',
      en: 'Less manual work, more calm',
    },
    description: {
      nl: 'Waar het kan, nemen vaste routines repetitieve taken over, zodat uw team tijd houdt voor groei.',
      en: 'Where it makes sense, repeatable routines take over repetitive work so your team can focus on growth.',
    },
    Icon: UserCheck,
  },
]

function App() {
  const [language, setLanguage] = useState<Language>('nl')
  const t = translations[language]
  const isDutch = language === 'nl'

  return (
    <div className="page-shell">
      <div className="bg-grid" aria-hidden="true" />
      <header className="header container">
        <a href="#home" className="logo">
          <span className="logo-mark mono" aria-hidden="true">
            DCE
          </span>
          Dirks Cloud Engineering
        </a>
        <div className="header-controls">
          <a href="#diensten" className="header-cta">
            {t.ctaPrimary}
          </a>
          <button
            type="button"
            className="lang-toggle mono"
            onClick={() => setLanguage(isDutch ? 'en' : 'nl')}
            aria-label={t.switchTo}
            title={t.switchTo}
          >
            <span aria-hidden="true">{t.switchIcon}</span>
            <span>{t.switchText}</span>
          </button>
          <nav className="nav">
            <a href="#home">{t.nav[0]}</a>
            <a href="#diensten">{t.nav[1]}</a>
            <a href="#over">{t.nav[2]}</a>
            <a href="#contact">{t.nav[3]}</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section id="home" className="hero">
          <p className="mono section-label">{t.heroLabel}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-copy">{t.heroCopy}</p>
          <div className="hero-cta-group">
            <a href="#diensten" className="primary-button">
              {t.ctaPrimary}
            </a>
            <a href="#contact" className="secondary-button">
              {t.ctaSecondary}
            </a>
          </div>
        </section>

        <section id="diensten" className="services">
          <p className="mono section-label">{t.servicesLabel}</p>
          <h2 className="section-title-tight">{t.servicesTitle}</h2>
          <div className="service-grid">
            {servicePillars.map((pillar) => (
              <article key={pillar.id} className="service-card">
                <div className="service-top">
                  <span className="mono muted">{pillar.id}</span>
                  <pillar.Icon size={16} className={`service-icon ${pillar.accent}`} />
                  <span className={`accent-dot ${pillar.accent}`} />
                </div>
                <h3>{pillar.title[language]}</h3>
                <p className="service-subtitle">{pillar.subtitle[language]}</p>
                <p className="service-description">{pillar.description[language]}</p>
                <div className="tag-row">
                  {pillar.tags[language].map((tag) => (
                    <span key={tag} className={`tag ${pillar.accent}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#contact" className="terminal-cta">
                  {pillar.cta[language]}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="over" className="method">
          <p className="mono section-label">{t.agenticLabel}</p>
          <h2 className="section-title-tight">{t.agenticTitle}</h2>
          <div className="method-grid">
            {agenticLayer.map((item) => (
              <article key={item.title.nl} className="method-step">
                <item.Icon size={18} className="method-icon" />
                <h3>{item.title[language]}</h3>
                <p>{item.description[language]}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <h2 className="section-title-tight">{t.contactTitle}</h2>
          <p>{t.contactCopy}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="primary-button">
            {t.contactCta}
          </a>
        </section>
      </main>

      <footer className="footer container">
        <p>
          &copy; {new Date().getFullYear()} Dirks Cloud Engineering. {t.footer}
        </p>
        <p className="footer-sub">{t.footerSub}</p>
      </footer>
    </div>
  )
}

export default App

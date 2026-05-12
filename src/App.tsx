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
    heroLabel: 'Cloud Sovereignty / Agentic Operations',
    heroTitle: 'Azure Architectuur. Security-First. AI-Driven Automation.',
    heroCopy:
      "Dirks Cloud Engineering (DCE) ontwerpt en automatiseert Azure-funderingen. Wij implementeren Zero-Trust security, voeren rendabele FinOps-scans uit, en elimineren repetitief beheer via custom Python-agents. Gebouwd voor engineers en MSP's die controle eisen.",
    ctaPrimary: '> [Execute] Architectuur & Security Baseline',
    ctaSecondary: '> [Request] Strategic Cloud Intake',
    servicesLabel: 'Security / FinOps / Automatisering',
    servicesTitle: 'Gebouwd voor engineers die aantoonbare controle nodig hebben.',
    agenticLabel: 'The Agentic Layer',
    agenticTitle: 'AI-agents die cloud-soevereiniteit borgen na go-live.',
    contactTitle: 'Klaar om van cloud-gebruik naar cloud-regie te gaan?',
    contactCopy:
      'Een gerichte verkenning van uw infrastructuur-uitdagingen. Geen sales-pitch, maar directe architecturale feedback.',
    contactCta: '> [Request] Strategic Cloud Intake',
    footer: 'Architecturale Constanten. Resilient Operations. Industrial-grade Automation.',
    switchTo: 'Schakel naar Engels',
    switchIcon: '🇬🇧',
    switchText: 'English',
  },
  en: {
    nav: ['Home', 'Services', 'About DCE', 'Contact'],
    heroLabel: 'Cloud Sovereignty / Agentic Operations',
    heroTitle: 'Azure Architecture. Security-First. AI-Driven Automation.',
    heroCopy:
      "Dirks Cloud Engineering (DCE) designs and automates Azure foundations. We implement Zero-Trust security, run ROI-positive FinOps scans, and eliminate repetitive management via custom Python agents. Built for engineers and MSPs that require control.",
    ctaPrimary: '> [Execute] Architecture & Security Baseline',
    ctaSecondary: '> [Request] Strategic Cloud Intake',
    servicesLabel: 'Security / FinOps / Automation',
    servicesTitle: 'Built for engineers who need provable control.',
    agenticLabel: 'The Agentic Layer',
    agenticTitle: 'AI agents that maintain sovereignty after go-live.',
    contactTitle: 'Ready to move from cloud usage to cloud command?',
    contactCopy:
      'A focused exploration of your infrastructure challenges. No sales pitch, just direct architectural feedback.',
    contactCta: '> [Request] Strategic Cloud Intake',
    footer: 'Built engineer-first.',
    switchTo: 'Switch to Dutch',
    switchIcon: '🇳🇱',
    switchText: 'Nederlands',
  },
}

const servicePillars = [
  {
    id: '01',
    title: 'Azure Security & Governance',
    subtitle: {
      nl: 'Immutable Governance & Blast Radius Reductie',
      en: 'Immutable Governance & Blast Radius Reduction',
    },
    description: {
      nl: 'Zero Trust, RBAC, NSG-hardening en Entra ID Conditional Access als fundament. Dit reduceert blast radius en audit-risico structureel.',
      en: 'Zero Trust, RBAC, NSG hardening, and Entra ID Conditional Access as the foundation. This structurally reduces blast radius and audit risk.',
    },
    tags: {
      nl: ['Zero Trust', 'Entra ID', 'Hardened Blueprints'],
      en: ['Zero Trust', 'Entra ID', 'Hardened Blueprints'],
    },
    cta: {
      nl: '> [Audit] Entra ID & RBAC Assessment',
      en: '> [Audit] Entra ID & RBAC Assessment',
    },
    accent: 'cyan',
    Icon: ShieldCheck,
  },
  {
    id: '02',
    title: 'FinOps Scans',
    subtitle: {
      nl: 'Capital Efficiency & Algoritmische Kostenbeheersing',
      en: 'Capital Efficiency & Algorithmic Cost Control',
    },
    description: {
      nl: 'Directe ROI door eliminatie van idle compute en licentie-waste. We corrigeren SKU-keuzes en optimaliseren commit-strategieën zodat kosten de business-waarde volgen.',
      en: 'Direct ROI by eliminating idle compute and license waste. We correct SKU choices and optimize commit strategies so cost tracks business value.',
    },
    tags: {
      nl: ['Waste Elimination', 'Right-sizing', 'Commit Strategy'],
      en: ['Waste Elimination', 'Right-sizing', 'Commit Strategy'],
    },
    cta: {
      nl: '> [Scan] Azure Cost-Recovery Run',
      en: '> [Scan] Azure Cost-Recovery Run',
    },
    accent: 'emerald',
    Icon: Coins,
  },
  {
    id: '03',
    title: 'AI-Automation (AaaS)',
    subtitle: {
      nl: 'Eliminatie van Menselijke Latentie',
      en: 'Elimination of Human Latency',
    },
    description: {
      nl: 'Industrial-grade Automation met Python, FastAPI en Bicep voor het automatiseren van MSP-operaties. Van onboarding tot remediation in herhaalbare runbooks.',
      en: 'Industrial-grade automation with Python, FastAPI, and Bicep for automating MSP operations. From onboarding to remediation in repeatable runbooks.',
    },
    tags: {
      nl: ['Python', 'FastAPI', 'Bicep IaC'],
      en: ['Python', 'FastAPI', 'Bicep IaC'],
    },
    cta: {
      nl: '> [Deploy] Custom Python Runbook',
      en: '> [Deploy] Custom Python Runbook',
    },
    accent: 'cyan',
    Icon: Bot,
  },
]

const agenticLayer = [
  {
    title: 'RUN FinOps_Agents',
    description: {
      nl: '24/7 Anomaly detection.',
      en: '24/7 Anomaly detection.',
    },
    Icon: ScanSearch,
  },
  {
    title: 'RUN Security_Sentinels',
    description: {
      nl: 'Instant Policy-drift remediation.',
      en: 'Instant Policy-drift remediation.',
    },
    Icon: Radar,
  },
  {
    title: 'RUN Governance_Bots',
    description: {
      nl: 'Auto-tagging & Lifecycle enforcement.',
      en: 'Auto-tagging & Lifecycle enforcement.',
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
          <a href="#diensten" className="header-cta mono">
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
            <a href="#diensten" className="primary-button mono">
              {t.ctaPrimary}
            </a>
            <a href="#contact" className="secondary-button mono">
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
                  <span className="mono muted">[{pillar.id}]</span>
                  <pillar.Icon size={16} className={`service-icon ${pillar.accent}`} />
                  <span className={`accent-dot ${pillar.accent}`} />
                </div>
                <h3>{pillar.title}</h3>
                <p className="service-subtitle">{pillar.subtitle[language]}</p>
                <p className="service-description">{pillar.description[language]}</p>
                <div className="tag-row">
                  {pillar.tags[language].map((tag) => (
                    <span key={tag} className={`tag ${pillar.accent}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#contact" className="terminal-cta mono">
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
              <article key={item.title} className="method-step">
                <item.Icon size={18} className="method-icon" />
                <h3 className="mono">&gt; {item.title}</h3>
                <p>{item.description[language]}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <h2 className="section-title-tight">{t.contactTitle}</h2>
          <p>{t.contactCopy}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="primary-button mono">
            {t.contactCta}
          </a>
        </section>
      </main>

      <footer className="footer container">
        <p>
          &copy; {new Date().getFullYear()} Dirks Cloud Engineering. {t.footer}
        </p>
        <p className="mono terminal-prompt">DCE.System: Operational | Logic: AI-Agentic</p>
      </footer>
    </div>
  )
}

export default App

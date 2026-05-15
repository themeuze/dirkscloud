'use client'

import Link from 'next/link'
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { CONTACT_EMAIL, KVK } from '@/lib/constants'
import { homeContent } from '@/lib/i18n/content'

const TECH_TERMS = new Set([
  'VNETs',
  'VPN-gateways',
  'VPN gateways',
  'Entra ID',
  'RBAC',
  "VM's",
  'VMs',
  'App Services',
  'Storage Accounts',
  'Recovery Services Vaults',
  'Azure Monitor',
  'M4 Firewall',
])

const TECH_SPLIT =
  /(VNETs|VPN-gateways|VPN gateways|Entra ID|RBAC|VM's|VMs|App Services|Storage Accounts|Recovery Services Vaults|Azure Monitor|M4 Firewall)/g

export function HomePage() {
  const { language } = useLanguage()
  const t = homeContent[language]
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.mailSubject)}`
  const terminalBanner =
    language === 'nl'
      ? '[ M4 FIREWALL // SENIOR AZURE ARCHITECTUUR ]'
      : '[ M4 FIREWALL // SENIOR AZURE ARCHITECTURE ]'

  return (
    <div className="terminal-shell min-h-screen">
      <header className="brutal-header sticky top-0 z-50">
        <div className="site-container flex flex-wrap items-center justify-between gap-4 py-4">
          <Link
            href="/"
            className="font-mono-tech text-xs font-bold uppercase tracking-widest text-white sm:text-sm"
          >
            {t.headerLogo}
          </Link>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <a href="#contact" className="btn-cta shrink-0 text-xs sm:text-sm">
              {t.headerCta}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="brutal-section py-16 sm:py-24">
          <div className="site-container">
            <p className="label-terminal">{terminalBanner}</p>
            <h1 className="heading-brutal mt-4 max-w-4xl text-4xl leading-[1.05] sm:text-5xl lg:text-7xl">
              {t.heroH1}
            </h1>
            <p className="prose-muted mt-8 max-w-3xl text-lg sm:text-xl">{t.heroSubtitle}</p>
            <a href="#contact" className="btn-cta mt-10 inline-block">
              {t.heroCta}
            </a>
          </div>
        </section>

        <section className="brutal-section py-14 sm:py-20">
          <div className="site-container">
            <p className="label-terminal mb-3">{'// AZ-104_SCOPE'}</p>
            <h2 className="heading-brutal mb-10 text-2xl sm:text-4xl">{t.gridTitle}</h2>
            <ul className="grid grid-cols-1 border-2 border-white/20 sm:grid-cols-2">
              {t.gridBlocks.map((block, index) => (
                <li
                  key={block.title}
                  className={`bg-black p-6 sm:p-8 ${
                    index % 2 === 1 ? 'border-l-2 border-white/20 sm:border-l-2' : ''
                  } ${index >= 2 ? 'border-t-2 border-white/20' : ''} ${
                    index === 1 ? 'sm:border-t-0' : ''
                  }`}
                >
                  <h3 className="heading-brutal text-lg sm:text-xl">{block.title}</h3>
                  <p className="prose-muted mt-3 text-base">
                    <TechText text={block.body} />
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex justify-center">
              <a href="#contact" className="btn-cta">
                {t.gridCta}
              </a>
            </div>
          </div>
        </section>

        <section className="brutal-section py-14 sm:py-20">
          <div className="site-container">
            <p className="label-terminal mb-3">{'// WERKWIJZE'}</p>
            <h2 className="heading-brutal mb-10 text-2xl sm:text-4xl">{t.approachTitle}</h2>
            <ul className="grid grid-cols-1 border-2 border-white/20 lg:grid-cols-3">
              {t.approachItems.map((item, index) => (
                <li
                  key={item.title}
                  className={`brutal-card p-6 sm:p-8 ${
                    index > 0 ? 'border-t-2 border-white/20 lg:border-t-0 lg:border-l-2 lg:border-white/20' : ''
                  }`}
                >
                  <h3 className="heading-brutal text-lg">{item.title}</h3>
                  <p className="prose-muted mt-3 text-base">
                    <TechText text={item.body} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="brutal-section py-14 sm:py-20">
          <div className="site-container">
            <p className="label-terminal">{t.contactSectionLabel}</p>
            <h2 className="heading-brutal mt-3 text-2xl sm:text-4xl">{t.contactTitle}</h2>
            <a href={mailto} className="btn-cta mt-8 inline-block font-mono-tech text-sm sm:text-base">
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-white/20 py-10">
        <div className="site-container flex flex-col gap-4 font-mono-tech text-xs uppercase tracking-wider sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 sm:text-sm">
          <p className="text-white normal-case tracking-normal">{t.footerLine}</p>
          <p className="text-[var(--color-muted)]">
            {t.footerRegistryLabel}: <span className="text-white">{KVK}</span>
          </p>
          <Link href="/voorwaarden/" className="brutal-link normal-case">
            {t.footerTermsLink}
          </Link>
        </div>
      </footer>
    </div>
  )
}

function TechText({ text }: { text: string }) {
  const parts = text.split(TECH_SPLIT)
  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null
        if (TECH_TERMS.has(part)) {
          return (
            <span key={`${part}-${index}`} className="font-mono-tech text-white">
              {part}
            </span>
          )
        }
        return <span key={`${part}-${index}`}>{part}</span>
      })}
    </>
  )
}

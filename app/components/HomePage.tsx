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

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="site-container flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/" className="text-sm font-bold tracking-tight sm:text-base">
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
        <section className="border-b border-[var(--color-border)] py-16 sm:py-24">
          <div className="site-container">
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {t.heroH1}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed sm:text-xl">{t.heroSubtitle}</p>
            <a href="#contact" className="btn-cta mt-10 inline-block">
              {t.heroCta}
            </a>
          </div>
        </section>

        <section className="border-b border-[var(--color-border)] py-14 sm:py-20">
          <div className="site-container">
            <h2 className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">{t.gridTitle}</h2>
            <ul className="grid grid-cols-1 border border-[var(--color-border)] sm:grid-cols-2">
              {t.gridBlocks.map((block, index) => (
                <li
                  key={block.title}
                  className={`border-[var(--color-border)] p-6 sm:p-8 ${
                    index % 2 === 1 ? 'sm:border-l' : ''
                  } ${index >= 2 ? 'border-t' : ''} ${index === 1 ? 'sm:border-t-0' : ''}`}
                >
                  <h3 className="text-lg font-bold">{block.title}</h3>
                  <p className="mt-3 text-base leading-relaxed">
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

        <section className="border-b border-[var(--color-border)] py-14 sm:py-20">
          <div className="site-container">
            <h2 className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">{t.approachTitle}</h2>
            <ul className="grid grid-cols-1 gap-0 border border-[var(--color-border)] lg:grid-cols-3">
              {t.approachItems.map((item, index) => (
                <li
                  key={item.title}
                  className={`p-6 sm:p-8 ${index > 0 ? 'border-t border-[var(--color-border)] lg:border-t-0 lg:border-l' : ''}`}
                >
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed">
                    <TechText text={item.body} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="border-b border-[var(--color-border)] py-14 sm:py-20">
          <div className="site-container">
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-border)]">
              {t.contactSectionLabel}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{t.contactTitle}</h2>
            <a href={mailto} className="btn-cta mt-8 inline-block text-base sm:text-lg">
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </main>

      <footer className="py-10">
        <div className="site-container flex flex-col gap-4 text-sm leading-relaxed sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
          <p className="text-[var(--color-fg)]">{t.footerLine}</p>
          <p className="text-[var(--color-border)]">
            {t.footerRegistryLabel}: <span className="text-[var(--color-fg)]">{KVK}</span>
          </p>
          <Link
            href="/voorwaarden/"
            className="font-semibold text-[var(--color-fg)] underline decoration-[var(--color-border)] underline-offset-4"
          >
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
            <span key={`${part}-${index}`} className="font-mono-tech">
              {part}
            </span>
          )
        }
        return <span key={`${part}-${index}`}>{part}</span>
      })}
    </>
  )
}

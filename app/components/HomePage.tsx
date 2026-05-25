'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { ContactForm } from '@/app/components/ContactForm'
import { homeContent } from '@/lib/i18n/content'

export function HomePage() {
  const { language } = useLanguage()
  const t = homeContent[language]
  const [contactSent, setContactSent] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="site-container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center text-base font-semibold text-slate-900 sm:text-lg">
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-[#0078d4] text-xs font-bold text-white">
              DCE
            </span>
            {t.headerLogo}
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#diensten" className="hover:text-slate-900">
              {t.navServices}
            </a>
            <a href="#werkwijze" className="hover:text-slate-900">
              {t.navApproach}
            </a>
            <a href="#contact" className="hover:text-slate-900">
              {t.navContact}
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a href="#contact" className="btn-primary hidden text-sm sm:inline-flex">
              {t.headerCta}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="site-container py-16 sm:py-24">
            <p className="text-sm font-semibold text-[#0078d4]">{t.heroEyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {t.heroH1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">{t.heroSubtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary">
                {t.heroCta}
              </a>
              <a href="#diensten" className="btn-secondary">
                {t.navServices}
              </a>
            </div>
          </div>
        </section>

        <section id="diensten" className="py-16 sm:py-20">
          <div className="site-container">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.skillsTitle}</h2>
            <div className="mt-10">
              {t.skills.map((skill) => (
                <article key={skill.title} className="card">
                  <h3 className="text-xl font-semibold text-slate-900">{skill.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{skill.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <li key={tag}>
                        <span className="tag">{tag}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-16 max-w-3xl">
              <h3 className="text-lg font-semibold text-slate-900">{t.azureTitle}</h3>
              <ul className="mt-6 space-y-5">
                {t.azureItems.map((item) => (
                  <li key={item.title} className="border-l-2 border-[#0078d4] pl-4">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="werkwijze" className="border-y border-slate-200 bg-white py-16 sm:py-20">
          <div className="site-container">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.approachTitle}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {t.approachItems.map((item) => (
                <article key={item.title} className="card">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 sm:py-20">
          <div className="site-container">
            <div className="card ring-1 ring-[#0078d4]/10">
              {!contactSent && (
                <>
                  <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.contactTitle}</h2>
                  <p className="mt-4 text-slate-600">{t.contactSubtitle}</p>
                </>
              )}
              <div className={contactSent ? '' : 'mt-8 border-t border-slate-200 pt-8'}>
                <ContactForm
                  language={language}
                  onSuccess={() => setContactSent(true)}
                  onReset={() => setContactSent(false)}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="site-container flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-slate-700">{t.footerLine}</p>
          <p>
            {t.footerRegistryLabel}: <span className="font-medium text-slate-700">{t.footerRegistryValue}</span>
          </p>
          <Link href="/voorwaarden/" className="font-medium text-[#0078d4] hover:underline">
            {t.footerTermsLink}
          </Link>
        </div>
      </footer>
    </div>
  )
}

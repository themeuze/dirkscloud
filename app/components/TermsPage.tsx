'use client'

import Link from 'next/link'
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { termsContent } from '@/lib/i18n/terms'
import { homeContent } from '@/lib/i18n/content'

export function TermsPage() {
  const { language } = useLanguage()
  const terms = termsContent[language]
  const home = homeContent[language]
  const terminalBanner =
    language === 'nl' ? '[ LEGAL · ALGEMENE VOORWAARDEN ]' : '[ LEGAL · TERMS AND CONDITIONS ]'

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="site-container flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/" className="font-mono-tech text-xs font-bold uppercase tracking-widest text-white sm:text-sm">
            {home.termsBack}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="site-container py-14 sm:py-16">
        <p className="label-terminal mb-6">{terminalBanner}</p>
        <article className="legal-panel">
          <h1 className="heading-brutal text-2xl sm:text-3xl">{terms.documentTitle}</h1>
          {terms.articles.map((article) => (
            <section key={article.title} className="legal-article">
              <h2 className="heading-brutal mb-3 font-mono-tech text-base">{article.title}</h2>
              <div className="space-y-3">
                {article.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="prose-muted text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </main>
    </div>
  )
}

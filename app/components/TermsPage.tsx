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
    language === 'nl' ? '[ LEGAL // ALGEMENE VOORWAARDEN ]' : '[ LEGAL // TERMS AND CONDITIONS ]'

  return (
    <div className="terminal-shell min-h-screen">
      <header className="brutal-header sticky top-0 z-50">
        <div className="site-container flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/" className="font-mono-tech text-xs font-bold uppercase tracking-widest text-white sm:text-sm">
            {home.termsBack}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="site-container py-14 sm:py-20">
        <p className="label-terminal mb-6">{terminalBanner}</p>
        <article className="brutal-card max-w-3xl border-2 border-white/20 p-6 shadow-[4px_4px_0_#0078D4] sm:p-10">
          <h1 className="heading-brutal border-b-2 border-white/20 pb-6 text-2xl sm:text-3xl">
            {terms.documentTitle}
          </h1>
          {terms.articles.map((article) => (
            <section
              key={article.title}
              className="border-b-2 border-white/20 py-8 last:border-b-0 last:pb-0"
            >
              <h2 className="heading-brutal mb-4 font-mono-tech text-base sm:text-lg">{article.title}</h2>
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

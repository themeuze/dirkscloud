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

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="site-container flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/" className="text-sm font-bold tracking-tight sm:text-base">
            {home.termsBack}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="site-container py-14 sm:py-20">
        <article className="max-w-3xl border border-[var(--color-border)] p-6 sm:p-10">
          <h1 className="border-b border-[var(--color-border)] pb-6 text-2xl font-bold sm:text-3xl">
            {terms.documentTitle}
          </h1>
          {terms.articles.map((article) => (
            <section
              key={article.title}
              className="border-b border-[var(--color-border)] py-8 last:border-b-0 last:pb-0"
            >
              <h2 className="mb-4 text-lg font-bold">{article.title}</h2>
              <div className="space-y-3">
                {article.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed">
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

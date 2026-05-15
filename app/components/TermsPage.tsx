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
  const eyebrow =
    language === 'nl' ? 'Algemene Voorwaarden' : 'Terms and Conditions'

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="site-container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="text-sm font-medium text-[#0078d4] hover:underline sm:text-base">
            ← {home.termsBack}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="site-container py-12 sm:py-16">
        <p className="text-sm font-semibold text-[#0078d4]">{eyebrow}</p>
        <article className="card mt-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {terms.documentTitle}
          </h1>
          <div className="mt-10 space-y-10">
            {terms.articles.map((article) => (
              <section key={article.title}>
                <h2 className="text-lg font-semibold text-slate-900">{article.title}</h2>
                <div className="mt-3 space-y-3">
                  {article.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
    </div>
  )
}

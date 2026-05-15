'use client'

import { useLanguage } from '@/app/providers/LanguageProvider'
import type { Language } from '@/lib/i18n/types'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className="flex border border-[var(--color-border)] text-xs font-bold uppercase tracking-widest sm:text-sm"
      role="group"
      aria-label="Taal / Language"
    >
      {(['nl', 'en'] as Language[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className={`min-w-[2.75rem] px-3 py-2 ${
            language === code
              ? 'bg-[var(--color-accent)] text-[var(--color-fg)]'
              : 'bg-transparent text-[var(--color-fg)]'
          }`}
          aria-pressed={language === code}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

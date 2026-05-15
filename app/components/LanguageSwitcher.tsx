'use client'

import { useLanguage } from '@/app/providers/LanguageProvider'
import type { Language } from '@/lib/i18n/types'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {(['nl', 'en'] as Language[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

'use client'

import { useState, type FormEvent } from 'react'
import { contactFormContent } from '@/lib/i18n/contact-form'
import type { Language } from '@/lib/i18n/types'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

type FormData = {
  name: string
  email: string
  company: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  message: '',
}

const inputClassName =
  'w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
const labelClassName = 'mb-1.5 block text-sm font-medium text-slate-300'

type ContactFormProps = {
  language: Language
}

export function ContactForm({ language }: ContactFormProps) {
  const t = contactFormContent[language]
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Contact request failed')
      }

      setStatus('success')
      setFormData(initialFormData)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p
        role="status"
        className="rounded-lg border border-emerald-500 bg-emerald-900/50 p-4 text-center text-emerald-200"
      >
        {t.success}
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-6"
      noValidate
    >
      <div>
        <label htmlFor="contact-name" className={labelClassName}>
          {t.nameLabel}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={formData.name}
          onChange={handleChange('name')}
          placeholder={t.namePlaceholder}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClassName}>
          {t.emailLabel}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder={t.emailPlaceholder}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="contact-company" className={labelClassName}>
          {t.companyLabel}
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={formData.company}
          onChange={handleChange('company')}
          placeholder={t.companyPlaceholder}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClassName}>
          {t.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange('message')}
          placeholder={t.messagePlaceholder}
          className={inputClassName}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'loading' && (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            aria-hidden
          />
        )}
        {status === 'loading' ? t.submitting : t.submit}
      </button>

      {status === 'error' && (
        <p role="alert" className="text-center text-sm text-red-400">
          {t.error}
        </p>
      )}
    </form>
  )
}

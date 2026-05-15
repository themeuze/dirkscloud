'use client'

import { useState, type FormEvent, type FocusEvent } from 'react'
import { contactFormContent } from '@/lib/i18n/contact-form'
import type { Language } from '@/lib/i18n/types'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

type FormData = {
  name: string
  email: string
  company: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  message: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(field: keyof FormData, value: string, t: (typeof contactFormContent)['nl']): string | undefined {
  const trimmed = value.trim()

  switch (field) {
    case 'name':
      if (!trimmed) return t.nameRequired
      if (trimmed.length < 2) return t.nameMin
      return undefined
    case 'email':
      if (!trimmed) return t.emailRequired
      if (!EMAIL_PATTERN.test(trimmed)) return t.emailInvalid
      return undefined
    case 'message':
      if (!trimmed) return t.messageRequired
      if (trimmed.length < 10) return t.messageMin
      return undefined
    case 'company':
      return undefined
  }
}

function validateForm(data: FormData, t: (typeof contactFormContent)['nl']): FormErrors {
  const errors: FormErrors = {}
  const fields: (keyof FormData)[] = ['name', 'email', 'message']

  for (const field of fields) {
    const error = validateField(field, data[field], t)
    if (error) errors[field] = error
  }

  return errors
}

type ContactFormProps = {
  language: Language
}

export function ContactForm({ language }: ContactFormProps) {
  const t = contactFormContent[language]
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const showError = (field: keyof FormData) => Boolean(touched[field] && errors[field])

  const inputClass = (field: keyof FormData) =>
    [
      'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400',
      'focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4]/20',
      showError(field) ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300',
    ].join(' ')

  const handleChange =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (touched[field]) {
        setErrors((prev) => ({ ...prev, [field]: validateField(field, value, t) }))
      }
    }

  const handleBlur = (field: keyof FormData) => (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, event.target.value, t) }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateForm(formData, t)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, message: true })

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setStatus('loading')

    try {
      const company = formData.company.trim()
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: company ? `Contactaanvraag — ${company}` : `Contactaanvraag — ${formData.name.trim()}`,
          message: formData.message.trim(),
          ...(company ? { company } : {}),
        }),
      })

      if (!response.ok) {
        throw new Error('Contact request failed')
      }

      setStatus('success')
      setFormData(initialFormData)
      setErrors({})
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p
        role="status"
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-800"
      >
        {t.success}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          label={t.nameLabel}
          optionalLabel={t.optionalLabel}
          error={showError('name') ? errors.name : undefined}
        >
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            placeholder={t.namePlaceholder}
            className={inputClass('name')}
            aria-invalid={showError('name')}
            aria-describedby={showError('name') ? 'contact-name-error' : undefined}
          />
        </Field>

        <Field
          id="contact-email"
          label={t.emailLabel}
          optionalLabel={t.optionalLabel}
          error={showError('email') ? errors.email : undefined}
        >
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder={t.emailPlaceholder}
            className={inputClass('email')}
            aria-invalid={showError('email')}
            aria-describedby={showError('email') ? 'contact-email-error' : undefined}
          />
        </Field>
      </div>

      <Field id="contact-company" label={t.companyLabel} optional optionalLabel={t.optionalLabel}>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={formData.company}
          onChange={handleChange('company')}
          onBlur={handleBlur('company')}
          placeholder={t.companyPlaceholder}
          className={inputClass('company')}
        />
      </Field>

      <Field
        id="contact-message"
        label={t.messageLabel}
        optionalLabel={t.optionalLabel}
        error={showError('message') ? errors.message : undefined}
      >
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange('message')}
          onBlur={handleBlur('message')}
          placeholder={t.messagePlaceholder}
          className={inputClass('message')}
          aria-invalid={showError('message')}
          aria-describedby={showError('message') ? 'contact-message-error' : undefined}
        />
      </Field>

      {status === 'error' && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          {t.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full gap-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'loading' && (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            aria-hidden
          />
        )}
        {status === 'loading' ? t.submitting : t.submit}
      </button>
    </form>
  )
}

type FieldProps = {
  id: string
  label: string
  optional?: boolean
  optionalLabel: string
  error?: string
  children: React.ReactNode
}

function Field({ id, label, optional, optionalLabel, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {optional && <span className="ml-1 font-normal text-slate-400">({optionalLabel})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

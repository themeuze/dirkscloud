'use client'

import Link from 'next/link'
import { useState, type FormEvent, type FocusEvent } from 'react'
import { REQUEST_TYPE_VALUES, requestTypeLabels } from '@/lib/contact-request-types'
import { contactFormContent } from '@/lib/i18n/contact-form'
import type { Language } from '@/lib/i18n/types'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

type FormData = {
  name: string
  email: string
  company: string
  phone: string
  requestType: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  requestType: '',
  message: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+]?[\d\s().-]{6,20}$/

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
    case 'requestType':
      if (!trimmed) return t.requestTypeRequired
      return undefined
    case 'message':
      if (!trimmed) return t.messageRequired
      if (trimmed.length < 10) return t.messageMin
      return undefined
    case 'phone':
      if (trimmed && !PHONE_PATTERN.test(trimmed)) return t.phoneInvalid
      return undefined
    case 'company':
      return undefined
  }
}

function validateForm(data: FormData, t: (typeof contactFormContent)['nl']): FormErrors {
  const errors: FormErrors = {}
  const fields: (keyof FormData)[] = ['name', 'email', 'phone', 'requestType', 'message']

  for (const field of fields) {
    const error = validateField(field, data[field], t)
    if (error) errors[field] = error
  }

  return errors
}

type ContactFormProps = {
  language: Language
  onSuccess?: () => void
  onReset?: () => void
}

export function ContactForm({ language, onSuccess, onReset }: ContactFormProps) {
  const t = contactFormContent[language]
  const typeLabels = requestTypeLabels[language]
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [submittedEmail, setSubmittedEmail] = useState('')

  const showError = (field: keyof FormData) => Boolean(touched[field] && errors[field])

  const inputClass = (field: keyof FormData) =>
    [
      'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400',
      'focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4]/20',
      showError(field) ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300',
    ].join(' ')

  const handleChange =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (touched[field]) {
        setErrors((prev) => ({ ...prev, [field]: validateField(field, value, t) }))
      }
    }

  const handleBlur =
    (field: keyof FormData) =>
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setTouched((prev) => ({ ...prev, [field]: true }))
      setErrors((prev) => ({ ...prev, [field]: validateField(field, event.target.value, t) }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateForm(formData, t)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, phone: true, requestType: true, message: true })

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          phone: formData.phone.trim(),
          requestType: formData.requestType,
          message: formData.message.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Contact request failed')
      }

      setSubmittedEmail(formData.email.trim())
      setStatus('success')
      setFormData(initialFormData)
      setErrors({})
      setTouched({})
      onSuccess?.()
    } catch {
      setStatus('error')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setSubmittedEmail('')
    setFormData(initialFormData)
    setErrors({})
    setTouched({})
    onReset?.()
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-xl border border-[#0078d4]/15 bg-slate-50 px-6 py-10 text-center sm:px-8"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-7 w-7 text-emerald-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">{t.successTitle}</h3>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          {t.successEmailSent.replace('{email}', submittedEmail)}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{t.successPromise}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-primary text-sm">
            {t.successBackHome}
          </Link>
          <button type="button" onClick={handleReset} className="btn-secondary text-sm">
            {t.successNewRequest}
          </button>
        </div>
      </div>
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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-company" label={t.companyLabel} optionalLabel={t.optionalLabel}>
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
          id="contact-phone"
          label={t.phoneLabel}
          optionalLabel={t.optionalLabel}
          error={showError('phone') ? errors.phone : undefined}
        >
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange('phone')}
            onBlur={handleBlur('phone')}
            placeholder={t.phonePlaceholder}
            className={inputClass('phone')}
            aria-invalid={showError('phone')}
            aria-describedby={showError('phone') ? 'contact-phone-error' : undefined}
          />
        </Field>
      </div>

      <Field
        id="contact-request-type"
        label={t.requestTypeLabel}
        optionalLabel={t.optionalLabel}
        error={showError('requestType') ? errors.requestType : undefined}
      >
        <select
          id="contact-request-type"
          name="requestType"
          value={formData.requestType}
          onChange={handleChange('requestType')}
          onBlur={handleBlur('requestType')}
          className={inputClass('requestType')}
          aria-invalid={showError('requestType')}
          aria-describedby={showError('requestType') ? 'contact-request-type-error' : undefined}
        >
          <option value="">{t.requestTypePlaceholder}</option>
          {REQUEST_TYPE_VALUES.map((value) => (
            <option key={value} value={value}>
              {typeLabels[value]}
            </option>
          ))}
        </select>
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

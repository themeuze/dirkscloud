import type { Language } from './types'

export type ContactFormContent = {
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  companyLabel: string
  companyPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  submit: string
  submitting: string
  success: string
  error: string
}

export const contactFormContent: Record<Language, ContactFormContent> = {
  nl: {
    nameLabel: 'Naam',
    namePlaceholder: 'Uw naam',
    emailLabel: 'E-mailadres',
    emailPlaceholder: 'naam@bedrijf.nl',
    companyLabel: 'Bedrijfsnaam',
    companyPlaceholder: 'Optioneel',
    messageLabel: 'Bericht',
    messagePlaceholder: 'Waar kan ik u mee helpen?',
    submit: 'Verstuur Aanvraag',
    submitting: 'Verzenden...',
    success: 'Bedankt, ik neem zo snel mogelijk contact op.',
    error: 'Verzenden mislukt. Probeer het opnieuw of mail direct naar mdirks@dirkscloud.nl.',
  },
  en: {
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email address',
    emailPlaceholder: 'name@company.com',
    companyLabel: 'Company name',
    companyPlaceholder: 'Optional',
    messageLabel: 'Message',
    messagePlaceholder: 'How can I help?',
    submit: 'Send Request',
    submitting: 'Sending...',
    success: 'Thank you — I will get back to you as soon as possible.',
    error: 'Could not send your message. Please try again or email mdirks@dirkscloud.nl directly.',
  },
}

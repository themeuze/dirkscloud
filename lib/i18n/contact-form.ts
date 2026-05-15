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
  nameRequired: string
  nameMin: string
  emailRequired: string
  emailInvalid: string
  messageRequired: string
  messageMin: string
  optionalLabel: string
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
    submit: 'Verstuur aanvraag',
    submitting: 'Verzenden...',
    success: 'Bedankt, ik neem zo snel mogelijk contact op.',
    error: 'Verzenden mislukt. Probeer het opnieuw of mail direct naar mdirks@dirkscloud.nl.',
    nameRequired: 'Vul uw naam in.',
    nameMin: 'Naam moet minimaal 2 tekens bevatten.',
    emailRequired: 'Vul uw e-mailadres in.',
    emailInvalid: 'Vul een geldig e-mailadres in.',
    messageRequired: 'Vul een bericht in.',
    messageMin: 'Bericht moet minimaal 10 tekens bevatten.',
    optionalLabel: 'optioneel',
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
    submit: 'Send request',
    submitting: 'Sending...',
    success: 'Thank you — I will get back to you as soon as possible.',
    error: 'Could not send your message. Please try again or email mdirks@dirkscloud.nl directly.',
    nameRequired: 'Please enter your name.',
    nameMin: 'Name must be at least 2 characters.',
    emailRequired: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address.',
    messageRequired: 'Please enter a message.',
    messageMin: 'Message must be at least 10 characters.',
    optionalLabel: 'optional',
  },
}

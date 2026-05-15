import type { Language } from './types'

export type ContactFormContent = {
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  companyLabel: string
  companyPlaceholder: string
  phoneLabel: string
  phonePlaceholder: string
  requestTypeLabel: string
  requestTypePlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  submit: string
  submitting: string
  successTitle: string
  successEmailSent: string
  successPromise: string
  successBackHome: string
  successNewRequest: string
  error: string
  nameRequired: string
  nameMin: string
  emailRequired: string
  emailInvalid: string
  requestTypeRequired: string
  messageRequired: string
  messageMin: string
  phoneInvalid: string
  optionalLabel: string
}

export const contactFormContent: Record<Language, ContactFormContent> = {
  nl: {
    nameLabel: 'Naam',
    namePlaceholder: 'Uw naam',
    emailLabel: 'E-mailadres',
    emailPlaceholder: 'naam@bedrijf.nl',
    companyLabel: 'Bedrijfsnaam (optioneel)',
    companyPlaceholder: 'Uw organisatie',
    phoneLabel: 'Telefoonnummer (optioneel)',
    phonePlaceholder: '06 12345678',
    requestTypeLabel: 'Type aanvraag',
    requestTypePlaceholder: 'Selecteer een type',
    messageLabel: 'Bericht',
    messagePlaceholder: 'Waar kan ik u mee helpen?',
    submit: 'Verstuur aanvraag',
    submitting: 'Verzenden...',
    successTitle: 'Bedankt voor je aanvraag!',
    successEmailSent: 'Er is een bevestiging gestuurd naar {email}.',
    successPromise:
      'Ik heb je bericht ontvangen en neem binnen één werkdag persoonlijk contact met je op.',
    successBackHome: 'Terug naar home',
    successNewRequest: 'Nog een aanvraag',
    error: 'Verzenden mislukt. Probeer het opnieuw of mail direct naar mdirks@dirkscloud.nl.',
    nameRequired: 'Vul uw naam in.',
    nameMin: 'Naam moet minimaal 2 tekens bevatten.',
    emailRequired: 'Vul uw e-mailadres in.',
    emailInvalid: 'Vul een geldig e-mailadres in.',
    requestTypeRequired: 'Selecteer een type aanvraag.',
    messageRequired: 'Vul een bericht in.',
    messageMin: 'Bericht moet minimaal 10 tekens bevatten.',
    phoneInvalid: 'Vul een geldig telefoonnummer in.',
    optionalLabel: 'optioneel',
  },
  en: {
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email address',
    emailPlaceholder: 'name@company.com',
    companyLabel: 'Company name (optional)',
    companyPlaceholder: 'Your organization',
    phoneLabel: 'Phone number (optional)',
    phonePlaceholder: '+31 6 12345678',
    requestTypeLabel: 'Request type',
    requestTypePlaceholder: 'Select a type',
    messageLabel: 'Message',
    messagePlaceholder: 'How can I help?',
    submit: 'Send request',
    submitting: 'Sending...',
    successTitle: 'Thank you for your request!',
    successEmailSent: 'A confirmation has been sent to {email}.',
    successPromise:
      'I have received your message and will contact you personally within one business day.',
    successBackHome: 'Back to home',
    successNewRequest: 'Send another request',
    error: 'Could not send your message. Please try again or email mdirks@dirkscloud.nl directly.',
    nameRequired: 'Please enter your name.',
    nameMin: 'Name must be at least 2 characters.',
    emailRequired: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address.',
    requestTypeRequired: 'Please select a request type.',
    messageRequired: 'Please enter a message.',
    messageMin: 'Message must be at least 10 characters.',
    phoneInvalid: 'Please enter a valid phone number.',
    optionalLabel: 'optional',
  },
}

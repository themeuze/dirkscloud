export const REQUEST_TYPE_VALUES = [
  'Cloud Migratie',
  'Security Audit',
  'Azure Advies / Consultancy',
  'Infrastructure as Code',
  'Algemene Vraag',
] as const

export type RequestType = (typeof REQUEST_TYPE_VALUES)[number]

export const requestTypeLabels: Record<
  'nl' | 'en',
  Record<RequestType, string>
> = {
  nl: {
    'Cloud Migratie': 'Cloud Migratie',
    'Security Audit': 'Security Audit',
    'Azure Advies / Consultancy': 'Azure Advies / Consultancy',
    'Infrastructure as Code': 'Infrastructure as Code',
    'Algemene Vraag': 'Algemene Vraag',
  },
  en: {
    'Cloud Migratie': 'Cloud Migration',
    'Security Audit': 'Security Audit',
    'Azure Advies / Consultancy': 'Azure Advisory / Consultancy',
    'Infrastructure as Code': 'Infrastructure as Code',
    'Algemene Vraag': 'General Inquiry',
  },
}

export function isValidRequestType(value: string): value is RequestType {
  return REQUEST_TYPE_VALUES.includes(value as RequestType)
}

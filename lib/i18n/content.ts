import type { Language } from './types'

export type SkillBlock = {
  title: string
  description: string
  tags: string[]
}

export type ServiceItem = {
  title: string
  body: string
}

export type HomeContent = {
  headerLogo: string
  navServices: string
  navApproach: string
  navContact: string
  headerCta: string
  heroEyebrow: string
  heroH1: string
  heroSubtitle: string
  heroCta: string
  skillsTitle: string
  skills: SkillBlock[]
  azureTitle: string
  azureItems: ServiceItem[]
  approachTitle: string
  approachItems: ServiceItem[]
  contactTitle: string
  contactSubtitle: string
  contactCta: string
  footerLine: string
  footerRegistryLabel: string
  footerRegistryValue: string
  footerTermsLink: string
  mailSubject: string
  termsBack: string
}

export const homeContent: Record<Language, HomeContent> = {
  nl: {
    headerLogo: 'Dirks Cloud Engineering',
    navServices: 'Diensten',
    navApproach: 'Werkwijze',
    navContact: 'Contact',
    headerCta: 'Neem contact op',
    heroEyebrow: 'ZZP · Azure Cloud Engineering & Beheer',
    heroH1: 'Flexibele Azure Cloud Engineer - Direct Beschikbaar.',
    heroSubtitle:
      'Ruime ervaring met IT-infrastructuur, direct inzetbaar als flexibele schil voor jouw IT-organisatie of MSP. Zoek je extra capaciteit voor Azure-beheer, migraties, het wegwerken van tickets of het oplossen van storingen? Ik spring flexibel bij waar het nodig is.',
    heroCta: 'Extra handjes nodig op Azure?',
    skillsTitle: 'Wat ik doe',
    skills: [
      {
        title: 'Azure Cloud Engineering & Support',
        description:
          'Hands-on ondersteuning bij de dagelijkse operatie, het inrichten van resources, netwerken (VNETs), storage en Entra ID.',
        tags: ['Landing Zones', 'FinOps', 'Entra ID', 'IaC', 'Security', 'Troubleshooting'],
      },
    ],
    azureTitle: 'Kernproposities',
    azureItems: [
      {
        title: 'Azure Cloud Engineering & Beheer',
        body: 'Hands-on ondersteuning bij de dagelijkse operatie, het inrichten van resources, netwerken (VNETs), storage en Entra ID.',
      },
      {
        title: 'Tickets & Migraties Wegwerken',
        body: 'Geen ingewikkelde adviestrajecten, maar gewoon meters maken en de werkdruk binnen jouw team verlagen.',
      },
      {
        title: 'Flexibele Capaciteit',
        body: 'Beschikbaar voor een vaste dag in de week, op projectbasis of op afroep bij escalaties (ook buiten standaard kantoortijden).',
      },
    ],
    approachTitle: 'Werkwijze',
    approachItems: [
      {
        title: 'Flexibel inzetbaar',
        body: 'Beschikbaar voor een vaste dag per week, flexibel tussendoor of op afroep wanneer jouw team extra capaciteit nodig heeft.',
      },
      {
        title: 'Nuchter en resultaatgericht',
        body: 'Duidelijke afspraken, heldere communicatie en oplevering waar u direct mee verder kunt.',
      },
      {
        title: 'Veilig werken',
        body: 'Werk op een geïsoleerde, beveiligde werkplek. Uw data en omgeving staan voorop.',
      },
    ],
    contactTitle: 'Laten we kennismaken',
    contactSubtitle: 'Extra handjes nodig op Azure? Neem direct contact op voor de mogelijkheden.',
    contactCta: 'mdirks@dirkscloud.nl',
    footerLine: '© 2026 Dirks Cloud Engineering · ZZP Azure Cloud Engineering & Beheer',
    footerRegistryLabel: 'KvK',
    footerRegistryValue: 'Inschrijving gepland per 1 juli 2026',
    footerTermsLink: 'Algemene Voorwaarden',
    mailSubject: 'Kennismaking Dirks Cloud Engineering',
    termsBack: 'Terug naar home',
  },
  en: {
    headerLogo: 'Dirks Cloud Engineering',
    navServices: 'Services',
    navApproach: 'Approach',
    navContact: 'Contact',
    headerCta: 'Get in touch',
    heroEyebrow: 'Freelance · Azure Cloud Engineering & Management',
    heroH1: 'Flexible Azure Cloud Engineer - Available Immediately.',
    heroSubtitle:
      'Extensive experience in IT infrastructure, ready to support your IT organization or MSP. Looking for extra capacity for Azure administration, migrations, tackling tickets, or troubleshooting? I offer flexible support whenever and wherever you need it.',
    heroCta: 'Need an extra pair of hands on Azure?',
    skillsTitle: 'What I do',
    skills: [
      {
        title: 'Azure Cloud Engineering & Support',
        description:
          'Hands-on daily operational support, resource deployment, networking (VNETs), storage, and Entra ID.',
        tags: ['Landing Zones', 'FinOps', 'Entra ID', 'IaC', 'Security', 'Troubleshooting'],
      },
    ],
    azureTitle: 'Core propositions',
    azureItems: [
      {
        title: 'Azure Cloud Engineering & Administration',
        body: 'Hands-on daily operational support, resource deployment, networking (VNETs), storage, and Entra ID.',
      },
      {
        title: 'Resolving Backlogs & Migrations',
        body: "Pragmatic execution to reduce your team's workload and get things done.",
      },
      {
        title: 'Flexible Capacity',
        body: 'Available for a fixed day per week, on a project basis, or on-demand for escalations (including off-hours support).',
      },
    ],
    approachTitle: 'How I work',
    approachItems: [
      {
        title: 'Flexible engagement',
        body: 'Available for a fixed day per week, flexible in-between, or on-demand when your team needs extra capacity.',
      },
      {
        title: 'Clear and outcome-focused',
        body: 'Straightforward agreements, plain communication, and deliverables you can act on immediately.',
      },
      {
        title: 'Secure by design',
        body: 'Work from an isolated, secured workspace. Your data and environment come first.',
      },
    ],
    contactTitle: "Let's connect",
    contactSubtitle: 'Need an extra pair of hands on Azure? Get in touch today to discuss how I can help.',
    contactCta: 'mdirks@dirkscloud.nl',
    footerLine: '© 2026 Dirks Cloud Engineering · Freelance Azure Cloud Engineering & Management',
    footerRegistryLabel: 'CoC',
    footerRegistryValue: 'Registration planned from 1 July 2026',
    footerTermsLink: 'Terms and Conditions',
    mailSubject: 'Introduction Dirks Cloud Engineering',
    termsBack: 'Back to home',
  },
}

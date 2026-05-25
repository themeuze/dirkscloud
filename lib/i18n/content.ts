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
    heroH1: 'Hands-on Azure capaciteit vanaf 1 juli 2026',
    heroSubtitle:
      'Als zelfstandig specialist help ik organisaties met het beheer, de beveiliging en de inrichting van Microsoft Azure. Met een sterke achtergrond in enterprise-IT lever ik concrete resultaten — helder, betrouwbaar en zonder onnodige overhead.',
    heroCta: 'Plan een kennismaking',
    skillsTitle: 'Azure Cloud Engineering & Support',
    skills: [
      {
        title: 'Azure Cloud Engineering & Support',
        description:
          'Ontwerp, implementatie en beheer van veilige, schaalbare Azure-omgevingen. Van netwerk en identiteit tot kostenbeheersing, monitoring en troubleshooting.',
        tags: ['Landing Zones', 'FinOps', 'Entra ID', 'IaC', 'Security', 'Troubleshooting'],
      },
    ],
    azureTitle: 'Azure Cloud Engineering & Support',
    azureItems: [
      {
        title: 'Architectuur & implementatie',
        body: 'Landing zones, netwerk (VNET, peering, VPN), compute en opslag — ingericht volgens best practices.',
      },
      {
        title: 'Security & governance',
        body: 'Entra ID, RBAC, beleid en compliance-kaders (o.a. CIS, Zero Trust) praktisch toepasbaar maken.',
      },
      {
        title: 'FinOps & optimalisatie',
        body: 'Inzicht in verbruik en licenties, met advies dat u terugziet op de factuur.',
      },
      {
        title: 'Operations & troubleshooting',
        body: 'Monitoring, incidenten en escalaties in de derde lijn — snel en doelgericht opgelost.',
      },
    ],
    approachTitle: 'Werkwijze',
    approachItems: [
      {
        title: 'Flexibel inzetbaar',
        body: 'Inzet op basis van nacalculatie of projectmatig. Als verlengstuk van uw team, wanneer u extra capaciteit nodig heeft.',
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
    contactSubtitle:
      'Vertel kort waar u tegenaan loopt. Ik reageer binnen één werkdag met een voorstel voor vervolgstappen.',
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
    heroH1: 'Hands-on Azure capacity from 1 July 2026',
    heroSubtitle:
      'As an independent specialist, I help organizations manage, secure, and configure Microsoft Azure. With a strong enterprise IT background, I deliver practical results — clear, reliable, and without unnecessary overhead.',
    heroCta: 'Book an introductory call',
    skillsTitle: 'Azure Cloud Engineering & Support',
    skills: [
      {
        title: 'Azure Cloud Engineering & Support',
        description:
          'Design, implementation, and management of secure, scalable Azure environments. From networking and identity to cost control, monitoring, and troubleshooting.',
        tags: ['Landing Zones', 'FinOps', 'Entra ID', 'IaC', 'Security', 'Troubleshooting'],
      },
    ],
    azureTitle: 'Azure Cloud Engineering & Support',
    azureItems: [
      {
        title: 'Architecture & implementation',
        body: 'Landing zones, networking (VNET, peering, VPN), compute, and storage — built to best practices.',
      },
      {
        title: 'Security & governance',
        body: 'Entra ID, RBAC, policy, and compliance frameworks (e.g. CIS, Zero Trust) applied in practice.',
      },
      {
        title: 'FinOps & optimization',
        body: 'Visibility into usage and licensing, with advice you can see on your invoice.',
      },
      {
        title: 'Operations & troubleshooting',
        body: 'Monitoring, incidents, and third-line escalations — resolved quickly and effectively.',
      },
    ],
    approachTitle: 'How I work',
    approachItems: [
      {
        title: 'Flexible engagement',
        body: 'Time-and-materials or project-based. An extension of your team when you need extra capacity.',
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
    contactSubtitle:
      "Briefly describe your challenge. I'll respond within one business day with suggested next steps.",
    contactCta: 'mdirks@dirkscloud.nl',
    footerLine: '© 2026 Dirks Cloud Engineering · Freelance Azure Cloud Engineering & Management',
    footerRegistryLabel: 'CoC',
    footerRegistryValue: 'Registration planned from 1 July 2026',
    footerTermsLink: 'Terms and Conditions',
    mailSubject: 'Introduction Dirks Cloud Engineering',
    termsBack: 'Back to home',
  },
}

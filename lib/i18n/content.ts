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
  aiTitle: string
  aiItems: ServiceItem[]
  approachTitle: string
  approachItems: ServiceItem[]
  contactTitle: string
  contactSubtitle: string
  contactCta: string
  footerLine: string
  footerRegistryLabel: string
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
    heroEyebrow: 'ZZP · Azure Cloud Engineering & Python AI',
    heroH1: 'Senior ICT-expertise, direct inzetbaar',
    heroSubtitle:
      'Als zelfstandig specialist help ik organisaties met Microsoft Azure en intelligente automatisering met Python en AI. Met 28 jaar ervaring in de IT lever ik concrete resultaten — helder, betrouwbaar en zonder onnodige overhead.',
    heroCta: 'Plan een kennismaking',
    skillsTitle: 'Kernexpertise',
    skills: [
      {
        title: 'Azure Cloud Engineering',
        description:
          'Ontwerp, implementatie en beheer van veilige, schaalbare Azure-omgevingen. Van netwerk en identiteit tot kostenbeheersing en monitoring.',
        tags: ['Landing Zones', 'FinOps', 'Entra ID', 'IaC', 'Security'],
      },
      {
        title: 'Python & AI',
        description:
          'Automatisering en slimme oplossingen met Python. Integratie van Azure OpenAI en AI-workflows die repetitief werk verminderen.',
        tags: ['Python', 'Azure OpenAI', 'Automatisering', 'API-integratie', 'Data pipelines'],
      },
    ],
    azureTitle: 'Azure Cloud Engineering',
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
    aiTitle: 'Python & AI',
    aiItems: [
      {
        title: 'Procesautomatisering',
        body: 'Scripts en workflows die handmatige Azure- en beheertaken overnemen.',
      },
      {
        title: 'Azure OpenAI & AI-integratie',
        body: 'Veilige inzet van AI-modellen binnen uw Azure-omgeving, met aandacht voor privacy en governance.',
      },
      {
        title: 'Data & integratie',
        body: 'Koppelingen tussen systemen, API\'s en cloudservices voor betrouwbare datastromen.',
      },
    ],
    approachTitle: 'Werkwijze',
    approachItems: [
      {
        title: 'Flexibel inzetbaar',
        body: 'Uurtje-factuurtje of projectmatig. Als verlengstuk van uw team, wanneer u extra capaciteit nodig heeft.',
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
    footerLine: '© 2026 Dirks Cloud Engineering · ZZP Azure & Python AI',
    footerRegistryLabel: 'KvK',
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
    heroEyebrow: 'Freelance · Azure Cloud Engineering & Python AI',
    heroH1: 'Senior IT expertise, ready when you are',
    heroSubtitle:
      'As an independent specialist, I help organizations with Microsoft Azure and intelligent automation using Python and AI. With 28 years of IT experience, I deliver practical results — clear, reliable, and without unnecessary overhead.',
    heroCta: 'Book an introductory call',
    skillsTitle: 'Core expertise',
    skills: [
      {
        title: 'Azure Cloud Engineering',
        description:
          'Design, implementation, and management of secure, scalable Azure environments. From networking and identity to cost control and monitoring.',
        tags: ['Landing Zones', 'FinOps', 'Entra ID', 'IaC', 'Security'],
      },
      {
        title: 'Python & AI',
        description:
          'Automation and smart solutions with Python. Integration of Azure OpenAI and AI workflows that reduce repetitive work.',
        tags: ['Python', 'Azure OpenAI', 'Automation', 'API integration', 'Data pipelines'],
      },
    ],
    azureTitle: 'Azure Cloud Engineering',
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
    aiTitle: 'Python & AI',
    aiItems: [
      {
        title: 'Process automation',
        body: 'Scripts and workflows that take over manual Azure and operations tasks.',
      },
      {
        title: 'Azure OpenAI & AI integration',
        body: 'Secure use of AI models within your Azure environment, with attention to privacy and governance.',
      },
      {
        title: 'Data & integration',
        body: 'Connections between systems, APIs, and cloud services for reliable data flows.',
      },
    ],
    approachTitle: 'How I work',
    approachItems: [
      {
        title: 'Flexible engagement',
        body: 'Hourly or project-based. An extension of your team when you need extra capacity.',
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
    footerLine: '© 2026 Dirks Cloud Engineering · Freelance Azure & Python AI',
    footerRegistryLabel: 'CoC',
    footerTermsLink: 'Terms and Conditions',
    mailSubject: 'Introduction Dirks Cloud Engineering',
    termsBack: 'Back to home',
  },
}

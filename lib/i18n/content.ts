import type { Language } from './types'

export type HomeContent = {
  headerLogo: string
  headerCta: string
  heroH1: string
  heroSubtitle: string
  heroCta: string
  gridTitle: string
  gridBlocks: { title: string; body: string }[]
  gridCta: string
  approachTitle: string
  approachItems: { title: string; body: string }[]
  contactTitle: string
  contactSectionLabel: string
  footerLine: string
  footerRegistryLabel: string
  footerTermsLink: string
  mailSubject: string
  termsBack: string
}

export const homeContent: Record<Language, HomeContent> = {
  nl: {
    headerLogo: 'DCE | Dirks Cloud Engineering',
    headerCta: 'Direct Inzetbaar',
    heroH1: 'Hands-on Azure Beheer & Implementatie',
    heroSubtitle:
      'Extra capaciteit in uw Azure Cloud nodig? Blijft er werk liggen of mist u tijdelijk de mankracht? Dirks Cloud Engineering levert direct inzetbare, nuchtere Azure-expertise. Met 28 jaar ervaring in de IT pas ik me direct aan uw omgeving aan.',
    heroCta: 'Bespreek uw Azure-casus',
    gridTitle: 'Wat ik vandaag voor u kan oppakken',
    gridBlocks: [
      {
        title: 'Netwerk & Connectiviteit',
        body: 'VNETs, peering, VPN-gateways, on-prem koppelingen.',
      },
      {
        title: 'Identiteit & Toegangsbeheer',
        body: 'Entra ID, RBAC strak trekken, Identity Governance.',
      },
      {
        title: 'Infrastructuur & Compute',
        body: "VM's uitrollen, App Services configureren en schalen.",
      },
      {
        title: 'Opslag, Back-up & Monitoring',
        body: 'Storage Accounts, Recovery Services Vaults, Azure Monitor alerts.',
      },
    ],
    gridCta: 'Capaciteit nodig? Schakel mij in.',
    approachTitle: 'Hoe we werken',
    approachItems: [
      {
        title: 'Flexibel & Breed Inzetbaar',
        body: 'Uurtje-factuurtje. Voor losse klussen, migraties of als vaste uitbreiding van uw team.',
      },
      {
        title: 'No-nonsense',
        body: 'U vertelt wat er moet gebeuren, ik voer het uit.',
      },
      {
        title: 'Veilig',
        body: 'Ik werk altijd vanaf een 100% geïsoleerde, hardwarematige werkplek (M4 Firewall) om uw data te beschermen.',
      },
    ],
    contactTitle: 'Laten we schakelen.',
    contactSectionLabel: 'Contact',
    footerLine: '© 2026 Dirks Cloud Engineering | Azure capaciteit wanneer u het nodig heeft.',
    footerRegistryLabel: 'KVK',
    footerTermsLink: 'Algemene Voorwaarden',
    mailSubject: 'Azure-casus Dirks Cloud Engineering',
    termsBack: '← Terug naar home',
  },
  en: {
    headerLogo: 'DCE | Dirks Cloud Engineering',
    headerCta: 'Available Immediately',
    heroH1: 'Hands-on Azure Management & Implementation',
    heroSubtitle:
      'Need extra capacity in your Azure Cloud? Is work piling up, or are you temporarily short on manpower? Dirks Cloud Engineering provides immediate, no-nonsense Azure expertise. With 28 years of IT experience, I seamlessly adapt to your environment.',
    heroCta: 'Discuss your Azure case',
    gridTitle: 'What I can resolve for you today',
    gridBlocks: [
      {
        title: 'Network & Connectivity',
        body: 'VNETs, peering, VPN gateways, secure on-prem connections.',
      },
      {
        title: 'Identity & Access Management',
        body: 'Entra ID, enforcing RBAC, Identity Governance.',
      },
      {
        title: 'Infrastructure & Compute',
        body: 'Deploying, configuring, and scaling VMs and App Services.',
      },
      {
        title: 'Storage, Backup & Monitoring',
        body: 'Storage Accounts, Recovery Services Vaults, Azure Monitor alerts.',
      },
    ],
    gridCta: "Need capacity? Let's connect.",
    approachTitle: 'How I work',
    approachItems: [
      {
        title: 'Flexible & Broadly Deployable',
        body: 'Hourly rate. Available for specific tasks, migrations, or as a steady extension of your team.',
      },
      {
        title: 'No-nonsense',
        body: 'You tell me what needs to be done, I execute.',
      },
      {
        title: 'Secure',
        body: 'I always work from a 100% isolated, hardware-level secure workspace (M4 Firewall) to protect your data.',
      },
    ],
    contactTitle: "Let's connect.",
    contactSectionLabel: 'Contact',
    footerLine: '© 2026 Dirks Cloud Engineering | Azure capacity when you need it.',
    footerRegistryLabel: 'CoC',
    footerTermsLink: 'Terms and Conditions',
    mailSubject: 'Azure case Dirks Cloud Engineering',
    termsBack: '← Back to home',
  },
}

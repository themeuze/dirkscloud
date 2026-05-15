const CONTACT_EMAIL = 'mdirks@dirkscloud.nl'

const capabilities = [
  {
    title: 'Netwerk & Connectiviteit:',
    body: (
      <>
        Aanleggen en troubleshooten van virtuele netwerken (<Mono>VNETs</Mono>), peering,{' '}
        <Mono>VPN-gateways</Mono> en veilige on-premises koppelingen.
      </>
    ),
  },
  {
    title: 'Identiteit & Toegangsbeheer:',
    body: (
      <>
        Strak trekken van <Mono>Entra ID</Mono> (voorheen <Mono>Azure AD</Mono>). Rollen en rechten (
        <Mono>RBAC</Mono>) correct instellen en de basis van uw identity &amp; access management
        borgen.
      </>
    ),
  },
  {
    title: 'Infrastructuur & Compute:',
    body: (
      <>
        Uitrollen, configureren en schalen van Virtuele Machines (<Mono>VM&apos;s</Mono>) en{' '}
        <Mono>App Services</Mono>.
      </>
    ),
  },
  {
    title: 'Opslag, Back-up & Monitoring:',
    body: (
      <>
        Inrichten van <Mono>Storage Accounts</Mono>, zorgen dat de Azure Back-ups (
        <Mono>Recovery Services Vaults</Mono>) waterdicht draaien en het instellen van de juiste
        alerts in <Mono>Azure Monitor</Mono>.
      </>
    ),
  },
]

const workingPrinciples = [
  {
    title: 'Flexibel & Breed Inzetbaar:',
    body: 'Uurtje-factuurtje. Beschikbaar voor losse klussen, migraties of als vaste uitbreiding van uw team (standaard beschikbaar op maandag).',
  },
  {
    title: 'No-nonsense:',
    body: 'U vertelt wat er moet gebeuren, ik voer het uit.',
  },
  {
    title: 'Veilig:',
    body: (
      <>
        Ik werk altijd vanaf een 100% geïsoleerde, hardwarematige werkplek (
        <Mono>M4 Firewall</Mono>) om uw data en omgeving maximaal te beschermen.
      </>
    ),
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-0 px-6 sm:px-10 lg:px-16">
        <header className="border-b border-[var(--color-border)] py-16 sm:py-24">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Dirks Cloud Engineering (DCE)
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-snug sm:text-2xl">
            Hands-on Azure Beheer &amp; Implementatie – Direct Inzetbaar
          </p>
        </header>

        <Section title="Extra capaciteit in uw Azure Cloud nodig?">
          <p className="max-w-3xl text-lg leading-relaxed sm:text-xl">
            Blijft er werk liggen? Vertraging in uw cloud-migraties of mist u tijdelijk de mankracht
            om uw omgeving strak in te richten en te onderhouden? Dirks Cloud Engineering levert
            direct inzetbare, nuchtere Azure-expertise voor elke organisatie. Geen lange
            adviestrajecten of bureaucratie, maar gewoon inloggen, bouwen en beheren. Met 28 jaar
            brede IT-ervaring pas ik me direct aan uw omgeving en processen aan.
          </p>
        </Section>

        <Section title="Wat ik vandaag nog voor u kan oppakken:">
          <ul className="grid gap-0 border border-[var(--color-border)]">
            {capabilities.map((item, index) => (
              <li
                key={item.title}
                className={`grid gap-3 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8 sm:p-8 ${
                  index > 0 ? 'border-t border-[var(--color-border)]' : ''
                }`}
              >
                <p className="text-base font-bold leading-snug sm:text-lg">{item.title}</p>
                <p className="text-base leading-relaxed sm:text-lg">{item.body}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Hoe we werken">
          <ul className="grid gap-0 border border-[var(--color-border)]">
            {workingPrinciples.map((item, index) => (
              <li
                key={item.title}
                className={`grid gap-3 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8 sm:p-8 ${
                  index > 0 ? 'border-t border-[var(--color-border)]' : ''
                }`}
              >
                <p className="text-base font-bold leading-snug sm:text-lg">{item.title}</p>
                <p className="text-base leading-relaxed sm:text-lg">{item.body}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Contact" id="contact">
          <div className="grid gap-10">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Contact%20Dirks%20Cloud%20Engineering`}
              className="inline-block w-fit max-w-full border-2 border-[var(--color-accent)] bg-[var(--color-accent)] px-8 py-4 text-center text-base font-bold uppercase tracking-widest text-[var(--color-fg)] sm:px-10 sm:text-lg"
            >
              Neem direct contact op
            </a>
            <p className="max-w-3xl text-base leading-relaxed sm:text-lg">
              Dirks Cloud Engineering | Azure capaciteit wanneer u het nodig heeft.
            </p>
          </div>
        </Section>
      </div>
    </div>
  )
}

function Section({
  title,
  children,
  id,
}: {
  title: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <section id={id} className="border-b border-[var(--color-border)] py-14 sm:py-20">
      <h2 className="mb-8 max-w-3xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Mono({ children }: { children: React.ReactNode }) {
  return <span className="font-mono-tech">{children}</span>
}

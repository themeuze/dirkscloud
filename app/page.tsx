import Link from 'next/link'

const CONTACT_EMAIL = 'mdirks@dirkscloud.nl'
const KVK = '—'

const expertiseBlocks = [
  {
    title: 'Netwerk & Connectiviteit',
    body: (
      <>
        <Mono>VNETs</Mono>, peering, <Mono>VPN-gateways</Mono>, on-prem koppelingen.
      </>
    ),
  },
  {
    title: 'Identiteit & Toegangsbeheer',
    body: (
      <>
        <Mono>Entra ID</Mono>, <Mono>RBAC</Mono> strak trekken, Identity Governance.
      </>
    ),
  },
  {
    title: 'Infrastructuur & Compute',
    body: (
      <>
        <Mono>VM&apos;s</Mono> uitrollen, <Mono>App Services</Mono> configureren en schalen.
      </>
    ),
  },
  {
    title: 'Opslag, Back-up & Monitoring',
    body: (
      <>
        <Mono>Storage Accounts</Mono>, <Mono>Recovery Services Vaults</Mono>,{' '}
        <Mono>Azure Monitor</Mono> alerts.
      </>
    ),
  },
]

const workingPrinciples = [
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
    body: (
      <>
        Ik werk altijd vanaf een 100% geïsoleerde, hardwarematige werkplek (
        <Mono>M4 Firewall</Mono>) om uw data te beschermen.
      </>
    ),
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="site-container flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/" className="text-sm font-bold tracking-tight sm:text-base">
            DCE | Dirks Cloud Engineering
          </Link>
          <a href="#contact" className="btn-cta shrink-0 text-xs sm:text-sm">
            Direct Inzetbaar
          </a>
        </div>
      </header>

      <main>
        <section className="border-b border-[var(--color-border)] py-16 sm:py-24">
          <div className="site-container">
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Hands-on Azure Beheer &amp; Implementatie
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed sm:text-xl">
              Extra capaciteit in uw Azure Cloud nodig? Blijft er werk liggen of mist u tijdelijk de
              mankracht? Dirks Cloud Engineering levert direct inzetbare, nuchtere Azure-expertise.
              Met 28 jaar ervaring pas ik me direct aan uw omgeving aan.
            </p>
            <a href="#contact" className="btn-cta mt-10 inline-block">
              Bespreek uw Azure-casus
            </a>
          </div>
        </section>

        <section className="border-b border-[var(--color-border)] py-14 sm:py-20">
          <div className="site-container">
            <h2 className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">
              Wat ik vandaag voor u kan oppakken
            </h2>
            <ul className="grid grid-cols-1 border border-[var(--color-border)] sm:grid-cols-2">
              {expertiseBlocks.map((block, index) => (
                <li
                  key={block.title}
                  className={`border-[var(--color-border)] p-6 sm:p-8 ${
                    index % 2 === 1 ? 'sm:border-l' : ''
                  } ${index >= 2 ? 'border-t' : ''} ${index === 1 ? 'sm:border-t-0' : ''}`}
                >
                  <h3 className="text-lg font-bold">{block.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-[var(--color-fg)]">
                    {block.body}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex justify-center">
              <a href="#contact" className="btn-cta">
                Capaciteit nodig? Schakel mij in.
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--color-border)] py-14 sm:py-20">
          <div className="site-container">
            <h2 className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">Hoe we werken</h2>
            <ul className="grid grid-cols-1 gap-0 border border-[var(--color-border)] lg:grid-cols-3">
              {workingPrinciples.map((item, index) => (
                <li
                  key={item.title}
                  className={`p-6 sm:p-8 ${index > 0 ? 'border-t border-[var(--color-border)] lg:border-t-0 lg:border-l' : ''}`}
                >
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="border-b border-[var(--color-border)] py-14 sm:py-20">
          <div className="site-container">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Contact</h2>
            <p className="mt-6 text-xl font-semibold sm:text-2xl">Laten we schakelen.</p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Azure-casus%20Dirks%20Cloud%20Engineering`}
              className="btn-cta mt-8 inline-block text-base sm:text-lg"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </main>

      <footer className="py-10">
        <div className="site-container flex flex-col gap-4 text-sm leading-relaxed text-[var(--color-border)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
          <p className="text-[var(--color-fg)]">
            Copyright &copy; 2026 Dirks Cloud Engineering | Azure capaciteit wanneer u het nodig
            heeft.
          </p>
          <p>
            KvK: <span className="text-[var(--color-fg)]">{KVK}</span>
          </p>
          <Link
            href="/voorwaarden/"
            className="font-semibold text-[var(--color-fg)] underline decoration-[var(--color-border)] underline-offset-4"
          >
            Algemene Voorwaarden
          </Link>
        </div>
      </footer>
    </div>
  )
}

function Mono({ children }: { children: React.ReactNode }) {
  return <span className="font-mono-tech">{children}</span>
}

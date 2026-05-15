const CONTACT_EMAIL = 'mdirks@dirkscloud.nl'
const KVK = '—' // Vul uw KvK-nummer in

const challenge = {
  title: 'De uitdaging',
  body: 'Azure-omgevingen groeien sneller dan de capaciteit om ze te beheren. Escalaties in de derde lijn, security-compliance (CIS, Zero Trust) en onverwachte cloudkosten raken MSP\'s en MKB waar de interne expertise tekortschiet.',
}

const solution = {
  title: 'De oplossing',
  paragraphs: [
    '28 jaar diepgaande ICT-ervaring, vertaald naar flexibele, hoogwaardige Azure-expertise op uurbasis — zonder de overhead van een groot consultancykantoor.',
    'Vaste beschikbaarheid voor synchroon overleg en afstemming: elke maandag. Overige dagen worden werkzaamheden efficiënt en asynchroon uitgevoerd.',
  ],
}

const expertise = [
  {
    title: 'Azure Security & Governance',
    description:
      'Zero Trust, CIS-benchmarks en beleid dat past bij uw organisatie — praktisch en controleerbaar.',
  },
  {
    title: 'Azure FinOps & Optimalisatie',
    description:
      'Inzicht in verbruik, licenties en kostenstructuren. Advies dat u terugziet op de factuur.',
  },
  {
    title: 'Derdelijns Troubleshooting & Escalatie',
    description:
      'Diepgaande analyse van complexe incidenten wanneer de eerste en tweede lijn vastlopen.',
  },
]

const approach = [
  {
    title: 'Helder & transparant',
    description:
      'Vaste tarieven, duidelijke scope en rapportage zonder jargon waar het niet nodig is.',
  },
  {
    title: 'Onafhankelijk & veilig',
    description:
      'Werk op eigen, geïsoleerde hardware. Scheiding van klantdata en integriteit staan voorop.',
  },
  {
    title: 'Direct resultaat',
    description:
      'Concrete vervolgstappen na elke interventie — geen eindeloze rapporten zonder actie.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-10 sm:py-14">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
            Dirks Cloud Engineering (DCE)
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Senior Azure Capaciteit &amp; Architectuur
            <span className="mt-2 block text-xl font-normal text-slate-300 sm:text-2xl">
              Direct inzetbaar
            </span>
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-16">
        <Section title={challenge.title}>
          <p className="leading-relaxed text-slate-300">{challenge.body}</p>
        </Section>

        <Section title={solution.title}>
          {solution.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-slate-300">
              {paragraph}
            </p>
          ))}
        </Section>

        <Section title="Kernexpertises">
          <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {expertise.map((item) => (
              <li key={item.title} className="py-5 first:pt-0 last:pb-0">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-300">{item.description}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Werkwijze">
          <div className="grid gap-6 sm:grid-cols-3">
            {approach.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5"
              >
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Contact" id="contact">
          <p className="leading-relaxed text-slate-300">
            Beschikbaar voor MSP&apos;s en MKB die tijdelijk senior Azure-capaciteit nodig hebben.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Kennismaking%20Dirks%20Cloud%20Engineering`}
            className="mt-6 inline-flex items-center justify-center rounded-md border border-[var(--color-accent)]/50 bg-slate-900 px-5 py-3 text-sm font-semibold text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-slate-800"
          >
            {CONTACT_EMAIL}
          </a>
        </Section>
      </main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
        <div className="mx-auto max-w-3xl px-6 py-8 text-center text-sm text-[var(--color-muted)]">
          <p>
            &copy; {new Date().getFullYear()} Dirks Cloud Engineering · KvK {KVK}
          </p>
          <p className="mt-2">Zoetermeer · Nederland</p>
        </div>
      </footer>
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
    <section
      id={id}
      className="border-b border-[var(--color-border)] py-10 last:border-b-0"
    >
      <h2 className="mb-5 text-xl font-semibold text-white">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

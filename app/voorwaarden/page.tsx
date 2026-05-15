import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | Dirks Cloud Engineering',
  description: 'Algemene voorwaarden van Dirks Cloud Engineering (DCE).',
  robots: { index: true, follow: true },
}

const articles = [
  {
    title: '1. Definities & Toepasselijkheid',
    paragraphs: [
      'DCE: Dirks Cloud Engineering, gevestigd te Zoetermeer.',
      'Opdrachtgever: De zakelijke partij die DCE inschakelt voor IT-expertise.',
      'Diensten: Strategisch Azure advies, FinOps scans, cloud-automatisering en architectuur-interventies.',
    ],
  },
  {
    title: '2. Uitvoering van de Overeenkomst',
    paragraphs: [
      'DCE voert de overeengekomen werkzaamheden uit naar beste inzicht en vermogen, op basis van een inspanningsverbintenis.',
      'Werkzaamheden, communicatie en oplevermomenten worden in onderling overleg afgestemd.',
      'Spoedinterventies buiten de overeengekomen reguliere kaders zijn alleen mogelijk na uitdrukkelijke bevestiging van DCE en kunnen onderhevig zijn aan een verhoogd spoedtarief.',
    ],
  },
  {
    title: '3. Intellectueel Eigendom & Databeveiliging',
    paragraphs: [
      'Alle scripts, (Bicep/ARM) templates en automatisering-configuraties die door DCE zijn ontwikkeld en ingebracht, blijven intellectueel eigendom van DCE.',
      'De Opdrachtgever verkrijgt na volledige betaling een niet-exclusief en onoverdraagbaar gebruiksrecht voor de specifiek voor hen geconfigureerde oplossingen.',
      'Om de integriteit van klantdata te waarborgen en belangenverstrengeling te voorkomen, garandeert DCE dat werkzaamheden uitsluitend worden uitgevoerd op eigen, cryptografisch afgeschermde en geïsoleerde hardware.',
    ],
  },
  {
    title: '4. Azure FinOps & Cloudkosten',
    paragraphs: [
      'Adviezen en prognoses omtrent kostenoptimalisatie (FinOps) zijn momentopnames, gebaseerd op de Azure-omgeving ten tijde van de analyse.',
      'DCE is nimmer aansprakelijk voor gewijzigde facturatietarieven vanuit Microsoft, noch voor onvoorziene verbruikspieken ontstaan door handelen van de Opdrachtgever of derde partijen na oplevering.',
    ],
  },
  {
    title: '5. Automatisering & Privacy (AVG)',
    paragraphs: [
      'Indien DCE bij de uitvoering van de werkzaamheden structureel toegang krijgt tot persoonsgegevens van de Opdrachtgever, fungeert DCE als Verwerker. Partijen zullen in dat geval een separate verwerkersovereenkomst sluiten.',
      "DCE is niet aansprakelijk voor onjuiste of ongewenste output gegenereerd door externe AI-modellen of API's (zoals Azure OpenAI), mits de overeengekomen technische kaders en beveiligingsfilters door DCE naar behoren zijn ingericht.",
    ],
  },
  {
    title: '6. Aansprakelijkheid',
    paragraphs: [
      'De totale aansprakelijkheid van DCE wegens toerekenbare tekortkoming in de nakoming van de opdracht is te allen tijde beperkt tot maximaal het bedrag dat in het desbetreffende geval door de beroepsaansprakelijkheidsverzekering (BAV) van DCE wordt uitgekeerd.',
      'Aansprakelijkheid voor indirecte schade, waaronder begrepen gevolgschade, gederfde winst, gemiste besparingen, verlies van data en schade door bedrijfsstagnatie (zoals cloud-outages), is uitdrukkelijk uitgesloten.',
    ],
  },
  {
    title: '7. Betaling & Opschorting',
    paragraphs: [
      'Facturatie geschiedt digitaal. De standaard betalingstermijn bedraagt 14 dagen na factuurdatum.',
      'Indien de Opdrachtgever in verzuim is, behoudt DCE zich het recht voor om de uitvoering van lopende werkzaamheden en toegang tot geconfigureerde diensten op te schorten tot de betalingsverplichting is voldaan.',
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="site-container py-4">
          <Link href="/" className="text-sm font-bold tracking-tight sm:text-base">
            ← Terug naar home
          </Link>
        </div>
      </header>

      <main className="site-container py-14 sm:py-20">
        <article className="max-w-3xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 sm:p-10">
          <h1 className="border-b border-[var(--color-border)] pb-6 text-2xl font-bold sm:text-3xl">
            Algemene Voorwaarden Dirks Cloud Engineering (DCE)
          </h1>
          {articles.map((article) => (
            <section
              key={article.title}
              className="border-b border-[var(--color-border)] py-8 last:border-b-0 last:pb-0"
            >
              <h2 className="mb-4 text-lg font-bold">{article.title}</h2>
              <div className="space-y-3">
                {article.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </main>
    </div>
  )
}

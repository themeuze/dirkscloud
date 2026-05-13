import './TermsAndConditions.css'

type TermsLanguage = 'nl' | 'en'

type TermsAndConditionsProps = {
  backLabel: string
  language: TermsLanguage
}

type DefItem = { term: string; text: string }

type ArticleBlock =
  | { type: 'defs'; items: DefItem[] }
  | { type: 'paragraphs'; items: string[] }

type Article = {
  id: string
  title: string
  blocks: ArticleBlock[]
}

const termsByLanguage: Record<TermsLanguage, { documentTitle: string; articles: Article[] }> = {
  nl: {
    documentTitle: 'Algemene Voorwaarden Dirks Cloud Engineering (DCE)',
    articles: [
      {
        id: 'a1',
        title: '1. Definities & Toepasselijkheid',
        blocks: [
          {
            type: 'defs',
            items: [
              { term: 'DCE', text: 'Dirks Cloud Engineering, gevestigd te Zoetermeer.' },
              {
                term: 'Opdrachtgever',
                text: 'De zakelijke partij die DCE inschakelt voor IT-expertise.',
              },
              {
                term: 'Diensten',
                text: 'Strategisch Azure advies, FinOps scans, cloud-automatisering en architectuur-interventies.',
              },
            ],
          },
        ],
      },
      {
        id: 'a2',
        title: '2. Uitvoering van de Overeenkomst',
        blocks: [
          {
            type: 'paragraphs',
            items: [
              'DCE voert de overeengekomen werkzaamheden uit naar beste inzicht en vermogen, op basis van een inspanningsverbintenis.',
              'Werkzaamheden, communicatie en oplevermomenten worden in onderling overleg afgestemd.',
              'Spoedinterventies buiten de overeengekomen reguliere kaders zijn alleen mogelijk na uitdrukkelijke bevestiging van DCE en kunnen onderhevig zijn aan een verhoogd spoedtarief.',
            ],
          },
        ],
      },
      {
        id: 'a3',
        title: '3. Intellectueel Eigendom & Databeveiliging',
        blocks: [
          {
            type: 'paragraphs',
            items: [
              'Alle scripts, (Bicep/ARM) templates en automatisering-configuraties die door DCE zijn ontwikkeld en ingebracht, blijven intellectueel eigendom van DCE.',
              'De Opdrachtgever verkrijgt na volledige betaling een niet-exclusief en onoverdraagbaar gebruiksrecht voor de specifiek voor hen geconfigureerde oplossingen.',
              'Om de integriteit van klantdata te waarborgen en belangenverstrengeling te voorkomen, garandeert DCE dat werkzaamheden uitsluitend worden uitgevoerd op eigen, cryptografisch afgeschermde en geïsoleerde hardware.',
            ],
          },
        ],
      },
      {
        id: 'a4',
        title: '4. Azure FinOps & Cloudkosten',
        blocks: [
          {
            type: 'paragraphs',
            items: [
              'Adviezen en prognoses omtrent kostenoptimalisatie (FinOps) zijn momentopnames, gebaseerd op de Azure-omgeving ten tijde van de analyse.',
              'DCE is nimmer aansprakelijk voor gewijzigde facturatietarieven vanuit Microsoft, noch voor onvoorziene verbruikspieken ontstaan door handelen van de Opdrachtgever of derde partijen na oplevering.',
            ],
          },
        ],
      },
      {
        id: 'a5',
        title: '5. Automatisering & Privacy (AVG)',
        blocks: [
          {
            type: 'paragraphs',
            items: [
              'Indien DCE bij de uitvoering van de werkzaamheden structureel toegang krijgt tot persoonsgegevens van de Opdrachtgever, fungeert DCE als Verwerker. Partijen zullen in dat geval een separate verwerkersovereenkomst sluiten.',
              "DCE is niet aansprakelijk voor onjuiste of ongewenste output gegenereerd door externe AI-modellen of API's (zoals Azure OpenAI), mits de overeengekomen technische kaders en beveiligingsfilters door DCE naar behoren zijn ingericht.",
            ],
          },
        ],
      },
      {
        id: 'a6',
        title: '6. Aansprakelijkheid',
        blocks: [
          {
            type: 'paragraphs',
            items: [
              'De totale aansprakelijkheid van DCE wegens toerekenbare tekortkoming in de nakoming van de opdracht is te allen tijde beperkt tot maximaal het bedrag dat in het desbetreffende geval door de beroepsaansprakelijkheidsverzekering (BAV) van DCE wordt uitgekeerd.',
              'Aansprakelijkheid voor indirecte schade, waaronder begrepen gevolgschade, gederfde winst, gemiste besparingen, verlies van data en schade door bedrijfsstagnatie (zoals cloud-outages), is uitdrukkelijk uitgesloten.',
            ],
          },
        ],
      },
      {
        id: 'a7',
        title: '7. Betaling & Opschorting',
        blocks: [
          {
            type: 'paragraphs',
            items: [
              'Facturatie geschiedt digitaal. De standaard betalingstermijn bedraagt 14 dagen na factuurdatum.',
              'Indien de Opdrachtgever in verzuim is, behoudt DCE zich het recht voor om de uitvoering van lopende werkzaamheden en toegang tot geconfigureerde diensten op te schorten tot de betalingsverplichting is voldaan.',
            ],
          },
        ],
      },
    ],
  },
  en: {
    documentTitle: 'General Terms and Conditions — Dirks Cloud Engineering (DCE)',
    articles: [
      {
        id: 'a1',
        title: '1. Definitions & Applicability',
        blocks: [
          {
            type: 'defs',
            items: [
              { term: 'DCE', text: 'Dirks Cloud Engineering, based in Zoetermeer, the Netherlands.' },
              {
                term: 'Client',
                text: 'The business party that engages DCE for IT expertise.',
              },
              {
                term: 'Services',
                text: 'Strategic Azure advice, FinOps reviews, cloud automation, and architecture interventions.',
              },
            ],
          },
        ],
      },
      {
        id: 'a2',
        title: '2. Performance of the Agreement',
        blocks: [
          {
            type: 'paragraphs',
            items: [
              'DCE shall perform the agreed work to the best of its knowledge and ability, on the basis of an obligation of best efforts.',
              'Work, communication, and delivery milestones shall be coordinated in mutual consultation.',
              'Emergency interventions outside the agreed regular framework are only possible after express confirmation by DCE and may be subject to an increased emergency rate.',
            ],
          },
        ],
      },
      {
        id: 'a3',
        title: '3. Intellectual Property & Data Security',
        blocks: [
          {
            type: 'paragraphs',
            items: [
              'All scripts, (Bicep/ARM) templates, and automation configurations developed and supplied by DCE remain the intellectual property of DCE.',
              'Upon full payment, the Client acquires a non-exclusive, non-transferable right to use the solutions configured specifically for them.',
              'To safeguard the integrity of customer data and prevent conflicts of interest, DCE guarantees that work is performed exclusively on its own cryptographically segregated and isolated hardware.',
            ],
          },
        ],
      },
      {
        id: 'a4',
        title: '4. Azure FinOps & Cloud Costs',
        blocks: [
          {
            type: 'paragraphs',
            items: [
              'Advice and forecasts regarding cost optimisation (FinOps) are point-in-time snapshots, based on the Azure environment at the time of analysis.',
              'DCE shall never be liable for changed billing rates from Microsoft, nor for unforeseen consumption spikes arising from actions by the Client or third parties after delivery.',
            ],
          },
        ],
      },
      {
        id: 'a5',
        title: '5. Automation & Privacy (GDPR)',
        blocks: [
          {
            type: 'paragraphs',
            items: [
              'If, in performing the work, DCE structurally accesses personal data of the Client, DCE acts as Processor. In that case, the parties shall conclude a separate data processing agreement.',
              'DCE is not liable for incorrect or unwanted output generated by external AI models or APIs (such as Azure OpenAI), provided the agreed technical parameters and security filters have been properly implemented by DCE.',
            ],
          },
        ],
      },
      {
        id: 'a6',
        title: '6. Liability',
        blocks: [
          {
            type: 'paragraphs',
            items: [
              "DCE's total liability for attributable failure to perform the engagement shall at all times be limited to the maximum amount paid out in the relevant case under DCE's professional indemnity insurance (PII).",
              'Liability for indirect damage, including consequential loss, lost profit, missed savings, data loss, and damage from business interruption (such as cloud outages), is expressly excluded.',
            ],
          },
        ],
      },
      {
        id: 'a7',
        title: '7. Payment & Suspension',
        blocks: [
          {
            type: 'paragraphs',
            items: [
              'Invoicing is conducted electronically. The standard payment term is 14 days from the invoice date.',
              'If the Client is in default, DCE reserves the right to suspend ongoing work and access to configured services until the payment obligation has been met.',
            ],
          },
        ],
      },
    ],
  },
}

export function TermsAndConditions({ backLabel, language }: TermsAndConditionsProps) {
  const { documentTitle, articles } = termsByLanguage[language]

  return (
    <article className="terms-document" lang={language} aria-labelledby="terms-title">
      <header className="terms-document-header">
        <a href="#home" className="terms-back">
          {backLabel}
        </a>
        <h1 id="terms-title" className="terms-title">
          {documentTitle}
        </h1>
      </header>

      {articles.map((article, index) => (
        <section
          key={article.id}
          className={
            index === articles.length - 1 ? 'terms-article terms-article-last' : 'terms-article'
          }
          aria-labelledby={`terms-${article.id}`}
        >
          <h2 id={`terms-${article.id}`}>{article.title}</h2>
          {article.blocks.map((block, bi) => {
            if (block.type === 'defs') {
              return (
                <ul key={bi} className="terms-list">
                  {block.items.map((row) => (
                    <li key={row.term}>
                      <strong>{row.term}:</strong> {row.text}
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <div key={bi}>
                {block.items.map((text, pi) => (
                  <p key={`${article.id}-p-${bi}-${pi}`}>{text}</p>
                ))}
              </div>
            )
          })}
        </section>
      ))}
    </article>
  )
}

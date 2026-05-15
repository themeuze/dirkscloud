import type { Language } from './types'

export type TermsArticle = {
  title: string
  paragraphs: string[]
}

export type TermsContent = {
  pageTitle: string
  documentTitle: string
  articles: TermsArticle[]
}

export const termsContent: Record<Language, TermsContent> = {
  nl: {
    pageTitle: 'Algemene Voorwaarden | Dirks Cloud Engineering',
    documentTitle: 'Algemene Voorwaarden Dirks Cloud Engineering (DCE)',
    articles: [
      {
        title: 'Artikel 1 — Definities',
        paragraphs: [
          'DCE: Dirks Cloud Engineering, gevestigd te Zoetermeer, Nederland, handelend onder de naam Dirks Cloud Engineering.',
          'Opdrachtgever: De natuurlijke persoon of rechtspersoon die een overeenkomst met DCE aangaat.',
          'Werkzaamheden: Alle door DCE uit te voeren IT- en Azure-gerelateerde diensten, waaronder beheer, implementatie, troubleshooting en advies.',
        ],
      },
      {
        title: 'Artikel 2 — Toepasselijkheid',
        paragraphs: [
          'Deze algemene voorwaarden zijn van toepassing op alle offertes, opdrachten en overeenkomsten tussen DCE en Opdrachtgever.',
          'Afwijkingen zijn alleen geldig indien schriftelijk overeengekomen. Algemene voorwaarden van de Opdrachtgever worden uitdrukkelijk van de hand gewezen.',
        ],
      },
      {
        title: 'Artikel 3 — Uitvoering van de werkzaamheden (De M4 Firewall)',
        paragraphs: [
          'DCE voert werkzaamheden uit naar beste inzicht en vermogen, op basis van een inspanningsverbintenis, tenzij schriftelijk anders overeengekomen.',
          'Om de integriteit van klantdata te waarborgen en belangenverstrengeling te voorkomen, voert DCE werkzaamheden uitsluitend uit op eigen, geïsoleerde hardware: een MacBook Air M4 (M4 Firewall). Klantdata wordt niet op gedeelde of onbeveiligde systemen verwerkt.',
          'Werkzaamheden, communicatie en oplevermomenten worden in onderling overleg afgestemd.',
        ],
      },
      {
        title: 'Artikel 4 — Tarieven en Betaling',
        paragraphs: [
          'DCE werkt op uurbasis (uurtje-factuurtje), tenzij vooraf een vaste prijs of projectomvang schriftelijk is overeengekomen.',
          'Facturatie geschiedt digitaal. De betalingstermijn bedraagt 14 dagen na factuurdatum, tenzij anders vermeld.',
          'Bij niet-tijdige betaling is de Opdrachtgever van rechtswege in verzuim. DCE mag werkzaamheden opschorten tot volledige betaling is ontvangen.',
        ],
      },
      {
        title: 'Artikel 5 — Geheimhouding en Privacy',
        paragraphs: [
          'DCE behandelt alle vertrouwelijke informatie van de Opdrachtgever strikt vertrouwelijk en gebruikt deze uitsluitend voor de uitvoering van de opdracht.',
          'Indien DCE bij de uitvoering structureel toegang krijgt tot persoonsgegevens, fungeert DCE als verwerker in de zin van de AVG. Partijen sluiten in dat geval een verwerkersovereenkomst.',
          'De geheimhoudingsplicht blijft van kracht na beëindiging van de overeenkomst.',
        ],
      },
      {
        title: 'Artikel 6 — Aansprakelijkheid',
        paragraphs: [
          'De totale aansprakelijkheid van DCE is beperkt tot het bedrag dat in het desbetreffende geval door de beroepsaansprakelijkheidsverzekering (BAV) van DCE wordt uitgekeerd.',
          'DCE is niet aansprakelijk voor indirecte schade, gevolgschade, gederfde winst, gemiste besparingen, verlies van data of schade door bedrijfsstagnatie.',
          'De Opdrachtgever vrijwaart DCE voor aanspraken van derden die voortvloeien uit door de Opdrachtgever verstrekte onjuiste of onvolledige informatie.',
        ],
      },
      {
        title: 'Artikel 7 — Intellectueel Eigendom',
        paragraphs: [
          'Alle door DCE ontwikkelde scripts, templates, automatiseringen en documentatie blijven eigendom van DCE, tenzij schriftelijk anders overeengekomen.',
          'Na volledige betaling verkrijgt de Opdrachtgever een niet-exclusief en niet-overdraagbaar gebruiksrecht op specifiek voor hen geconfigureerde oplossingen.',
          'De Opdrachtgever garandeert dat materialen die aan DCE worden verstrekt geen inbreuk maken op rechten van derden.',
        ],
      },
      {
        title: 'Artikel 8 — Duur en Opzegging',
        paragraphs: [
          'Opdrachten op uurbasis kunnen door beide partijen worden beëindigd met inachtneming van een redelijke opzegtermijn, tenzij anders overeengekomen.',
          'Bij ernstige tekortkoming of faillissement kan de andere partij de overeenkomst met onmiddellijke ingang beëindigen.',
          'Bij beëindiging worden reeds verrichte werkzaamheden naar rato gefactureerd.',
        ],
      },
      {
        title: 'Artikel 9 — Toepasselijk recht',
        paragraphs: [
          'Op alle overeenkomsten tussen DCE en Opdrachtgever is uitsluitend Nederlands recht van toepassing.',
          'Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waar DCE is gevestigd, tenzij dwingend recht anders voorschrijft.',
        ],
      },
    ],
  },
  en: {
    pageTitle: 'Terms and Conditions | Dirks Cloud Engineering',
    documentTitle: 'Terms and Conditions Dirks Cloud Engineering (DCE)',
    articles: [
      {
        title: 'Article 1 — Definitions',
        paragraphs: [
          'DCE: Dirks Cloud Engineering, based in Zoetermeer, the Netherlands, trading as Dirks Cloud Engineering.',
          'Client: The natural person or legal entity entering into an agreement with DCE.',
          'Services: All IT and Azure-related services performed by DCE, including management, implementation, troubleshooting, and advisory work.',
        ],
      },
      {
        title: 'Article 2 — Applicability',
        paragraphs: [
          'These general terms and conditions apply to all quotations, engagements, and agreements between DCE and the Client.',
          'Deviations are valid only if agreed in writing. The Client’s general terms and conditions are expressly rejected.',
        ],
      },
      {
        title: 'Article 3 — Execution of work (The M4 Firewall)',
        paragraphs: [
          'DCE performs work to the best of its knowledge and ability on a best-efforts basis, unless otherwise agreed in writing.',
          'To safeguard data integrity and prevent conflicts of interest, DCE performs work exclusively on its own isolated hardware: a MacBook Air M4 (M4 Firewall). Client data is not processed on shared or unsecured systems.',
          'Work, communication, and delivery milestones are coordinated in mutual consultation.',
        ],
      },
      {
        title: 'Article 4 — Rates and Payment',
        paragraphs: [
          'DCE works on an hourly basis unless a fixed price or project scope has been agreed in writing in advance.',
          'Invoicing is conducted electronically. The payment term is 14 days from the invoice date unless stated otherwise.',
          'If payment is late, the Client is in default by operation of law. DCE may suspend work until full payment is received.',
        ],
      },
      {
        title: 'Article 5 — Confidentiality and Privacy',
        paragraphs: [
          'DCE treats all confidential information of the Client strictly confidentially and uses it solely to perform the engagement.',
          'If DCE structurally accesses personal data during performance, DCE acts as a processor under the GDPR. The parties will conclude a data processing agreement in that case.',
          'The confidentiality obligation remains in force after termination of the agreement.',
        ],
      },
      {
        title: 'Article 6 — Liability',
        paragraphs: [
          "DCE's total liability is limited to the amount paid out under DCE's professional indemnity insurance (PII) in the relevant case.",
          'DCE is not liable for indirect damage, consequential loss, lost profit, missed savings, data loss, or damage from business interruption.',
          'The Client indemnifies DCE against third-party claims arising from incorrect or incomplete information provided by the Client.',
        ],
      },
      {
        title: 'Article 7 — Intellectual Property',
        paragraphs: [
          'All scripts, templates, automations, and documentation developed by DCE remain the property of DCE unless otherwise agreed in writing.',
          'Upon full payment, the Client acquires a non-exclusive, non-transferable right to use solutions configured specifically for them.',
          'The Client warrants that materials provided to DCE do not infringe third-party rights.',
        ],
      },
      {
        title: 'Article 8 — Duration and Termination',
        paragraphs: [
          'Hourly engagements may be terminated by either party with reasonable notice unless otherwise agreed.',
          'In case of material breach or bankruptcy, the other party may terminate the agreement with immediate effect.',
          'Upon termination, work already performed will be invoiced on a pro-rata basis.',
        ],
      },
      {
        title: 'Article 9 — Applicable Law',
        paragraphs: [
          'Dutch law applies exclusively to all agreements between DCE and the Client.',
          'Disputes shall be submitted to the competent court in the district where DCE is established, unless mandatory law provides otherwise.',
        ],
      },
    ],
  },
}

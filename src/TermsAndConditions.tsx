import './TermsAndConditions.css'

type TermsAndConditionsProps = {
  backLabel: string
}

export function TermsAndConditions({ backLabel }: TermsAndConditionsProps) {
  return (
    <article className="terms-document" aria-labelledby="terms-title">
      <header className="terms-document-header">
        <a href="#home" className="terms-back">
          {backLabel}
        </a>
        <h1 id="terms-title" className="terms-title">
          Algemene Voorwaarden Dirks Cloud Engineering (DCE)
        </h1>
      </header>

      <section className="terms-article" aria-labelledby="terms-a1">
        <h2 id="terms-a1">1. Definities &amp; Toepasselijkheid</h2>
        <ul className="terms-list">
          <li>
            <strong>DCE:</strong> Dirks Cloud Engineering, gevestigd te Zoetermeer.
          </li>
          <li>
            <strong>Opdrachtgever:</strong> De partij (MKB of MSP) die DCE inschakelt voor expertise.
          </li>
          <li>
            <strong>Diensten:</strong> Strategisch Azure advies, FinOps scans, automatisering en interim
            architectuur-interventies.
          </li>
        </ul>
      </section>

      <section className="terms-article" aria-labelledby="terms-a2">
        <h2 id="terms-a2">2. Uitvoering &amp; Asynchrone Interventies</h2>
        <p>DCE voert werkzaamheden uit op basis van een inspanningsverbintenis.</p>
        <p>
          De hoofddag voor synchrone communicatie en overleg is maandag. Op overige dagen worden
          werkzaamheden asynchroon uitgevoerd.
        </p>
        <p>
          Spoedinterventies buiten de maandag zijn alleen mogelijk na uitdrukkelijke schriftelijke
          bevestiging en kunnen onderhevig zijn aan een aangepast tarief.
        </p>
      </section>

      <section className="terms-article" aria-labelledby="terms-a3">
        <h2 id="terms-a3">3. Intellectueel Eigendom &amp; De M4 Firewall</h2>
        <p>
          Alle scripts, templates en AI-configuraties die door DCE zijn ontwikkeld vóór de opdracht,
          blijven eigendom van DCE.
        </p>
        <p>
          De Opdrachtgever verkrijgt een niet-exclusief gebruiksrecht voor de specifiek voor hen
          geconfigureerde oplossingen.
        </p>
        <p>
          DCE garandeert dat alle werkzaamheden worden uitgevoerd op eigen, streng beveiligde
          hardware (M4-architectuur) om volledige scheiding van klantdata en integriteit te
          waarborgen.
        </p>
      </section>

      <section className="terms-article" aria-labelledby="terms-a4">
        <h2 id="terms-a4">4. Azure FinOps &amp; Resultaat</h2>
        <p>Adviezen over kostenoptimalisatie zijn gebaseerd op de Azure-status ten tijde van de analyse.</p>
        <p>
          DCE is niet verantwoordelijk voor tariefwijzigingen van Microsoft of onvoorziene
          verbruikspieken door toedoen van de Opdrachtgever of derden na oplevering.
        </p>
      </section>

      <section className="terms-article" aria-labelledby="terms-a5">
        <h2 id="terms-a5">5. Automatisering &amp; Data (AVG)</h2>
        <p>
          Bij de inzet van automatisering die klantdata raakt, fungeert DCE als Verwerker. Een
          verwerkersovereenkomst maakt in dat geval integraal onderdeel uit van de opdracht.
        </p>
        <p>
          DCE is niet aansprakelijk voor onjuiste output van externe AI-modellen (zoals Azure
          OpenAI), mits DCE de overeengekomen filters en kaders naar behoren heeft ingericht.
        </p>
      </section>

      <section className="terms-article" aria-labelledby="terms-a6">
        <h2 id="terms-a6">6. Aansprakelijkheid</h2>
        <p>
          De aansprakelijkheid van DCE is beperkt tot het bedrag dat in het desbetreffende jaar door
          de beroepsaansprakelijkheidsverzekering (BAV) van DCE wordt uitgekeerd.
        </p>
        <p>Indirecte schade, gevolgschade of gemiste besparingen zijn uitdrukkelijk uitgesloten.</p>
      </section>

      <section className="terms-article terms-article-last" aria-labelledby="terms-a7">
        <h2 id="terms-a7">7. Betaling &amp; Tarieven</h2>
        <p>Facturatie geschiedt maandelijks. De standaard betalingstermijn is 14 dagen.</p>
        <p>
          DCE behoudt zich het recht voor om werkzaamheden op te schorten bij het overschrijden van
          de betalingstermijn.
        </p>
      </section>
    </article>
  )
}

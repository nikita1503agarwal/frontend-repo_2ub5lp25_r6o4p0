export default function Legal({ type }){
  const isImprint = type === 'impressum'
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-slate-300 hover:text-white">← Zurück</a>
        <h1 className="mt-6 text-3xl font-bold">{isImprint ? 'Impressum' : 'Datenschutzerklärung'}</h1>
        {isImprint ? (
          <div className="prose prose-invert mt-6">
            <p>KMU‑Freight (in Gründung)</p>
            <p>Verantwortlich: Max Salterberg</p>
            <p>E‑Mail: kontakt@kmu-freight.com</p>
            <p>Hinweis: Vorläufige Angaben. Vollständige Unternehmensdaten werden nachgereicht.</p>
          </div>
        ) : (
          <div className="prose prose-invert mt-6">
            <h2>Allgemeines</h2>
            <p>Wir verarbeiten personenbezogene Daten ausschließlich zur Kontaktaufnahme und Information über KMU‑Freight. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Double‑Opt‑In ist aktiviert.</p>
            <h2>Verarbeitung</h2>
            <ul>
              <li>Daten: Name, Unternehmen, E‑Mail, Interesse, Nachricht, Zweck, Einwilligung.</li>
              <li>Zweck: Warteliste, Terminvereinbarung, Produktinformationen.</li>
              <li>Speicherdauer: bis Widerruf oder Wegfall des Zwecks.</li>
            </ul>
            <h2>Ihre Rechte</h2>
            <p>Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit. Kontakt siehe Impressum.</p>
            <h2>Auftragsverarbeitung</h2>
            <p>Hosting und E‑Mail‑Versand erfolgen über beauftragte Dienstleister innerhalb der EU, soweit möglich.</p>
          </div>
        )}
      </div>
    </div>
  )
}

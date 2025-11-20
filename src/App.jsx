import HealthBadge from './components/HealthBadge'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-bold tracking-tight">KMU‑Freight</h1>
        <p className="mt-3 text-blue-200/80">Sicherheit, Kontrolle, Transparenz – wir bauen noch. Trag dich in die Warteliste ein und erhalte frühen Zugang.</p>

        <div className="mt-8 rounded-xl border border-white/10 p-6">
          <p>Warteliste kommt hier – UI wird gleich ergänzt.</p>
        </div>
      </div>
      <HealthBadge />
    </div>
  )
}

export default App

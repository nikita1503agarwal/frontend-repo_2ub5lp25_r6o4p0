import { useState } from 'react'
import HealthBadge from './components/HealthBadge'

function Field({ label, children }){
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-300 mb-1">{label}</span>
      {children}
    </label>
  )
}

export default function App() {
  const backend = import.meta.env.VITE_BACKEND_URL
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    interest: 'Warteliste',
    message: '',
    purpose: 'Warteliste',
    consent: false,
  })
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function update(k, v){ setForm((f) => ({ ...f, [k]: v })) }

  async function submit(e){
    e.preventDefault()
    setError('')
    if(!backend){ setError('Backend nicht konfiguriert.'); return }
    if(!form.consent){ setError('Bitte willige in die Datenverarbeitung ein.'); return }
    if(!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){
      setError('Bitte eine gültige E‑Mail-Adresse angeben.')
      return
    }
    setPending(true)
    try{
      const res = await fetch(`${backend}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if(!res.ok){
        const t = await res.text()
        throw new Error(t || 'Fehler beim Senden')
      }
      setDone(true)
      setForm({ name: '', company: '', email: '', interest: 'Warteliste', message: '', purpose: 'Warteliste', consent: false })
    }catch(err){
      setError(err.message || 'Es ist ein Fehler aufgetreten')
    }finally{
      setPending(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-sky-400" />
            <span className="text-lg font-semibold tracking-tight">KMU‑Freight</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white">Funktionen</a>
            <a href="#form" className="hover:text-white">Warteliste</a>
            <a href="/test" className="hover:text-white">Systemtest</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-900/40 to-slate-950" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Transparenz und Kontrolle für Ihren Mittelstands‑Transport
            </h1>
            <p className="mt-4 text-slate-300 text-lg">
              Behalten Sie Frachten, Kosten und Servicelevel endlich im Griff. KMU‑Freight vereint Angebote, Aufträge und KPIs in einer Oberfläche – sicher, DSGVO‑konform, made in Germany.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#form" className="inline-flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 font-semibold shadow-lg shadow-blue-500/20">
                Auf Warteliste setzen
              </a>
              <a href="#features" className="inline-flex items-center justify-center rounded-lg border border-white/20 hover:border-white/40 text-white px-5 py-3 font-semibold">
                Mehr erfahren
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-400">Double‑Opt‑In: Sie erhalten eine E‑Mail zur Bestätigung.</p>
          </div>

          {/* Form Card */}
          <div id="form" className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 md:p-8">
            {done ? (
              <div className="text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-2xl">✓</div>
                <h3 className="mt-4 text-xl font-semibold">Fast geschafft!</h3>
                <p className="mt-2 text-slate-300">Bitte prüfen Sie Ihre E‑Mails und bestätigen Sie Ihre Anmeldung. Erst dann tragen wir Sie verbindlich ein.</p>
                <button onClick={()=>setDone(false)} className="mt-6 inline-flex items-center justify-center rounded-lg border border-white/20 hover:border-white/40 px-4 py-2">
                  Weitere Person eintragen
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 px-3 py-2 text-sm">{error}</div>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Name">
                    <input value={form.name} onChange={(e)=>update('name', e.target.value)} className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Max Mustermann" />
                  </Field>
                  <Field label="Unternehmen">
                    <input value={form.company} onChange={(e)=>update('company', e.target.value)} className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Muster GmbH" />
                  </Field>
                </div>

                <Field label="E‑Mail">
                  <input type="email" required value={form.email} onChange={(e)=>update('email', e.target.value)} className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="name@firma.de" />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Interesse">
                    <select value={form.interest} onChange={(e)=>update('interest', e.target.value)} className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Warteliste</option>
                      <option>Demo</option>
                      <option>Pilotkunde</option>
                      <option>Partnerschaft</option>
                      <option>Kostenlos testen</option>
                    </select>
                  </Field>
                  <Field label="Zweck (Purpose)">
                    <select value={form.purpose} onChange={(e)=>update('purpose', e.target.value)} className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Warteliste</option>
                      <option>Demo</option>
                      <option>Pilotkunde</option>
                      <option>Partnerschaft</option>
                      <option>Kostenlos testen</option>
                    </select>
                  </Field>
                </div>

                <Field label="Nachricht (optional)">
                  <textarea rows={3} value={form.message} onChange={(e)=>update('message', e.target.value)} className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Womit kämpfen Sie aktuell?" />
                </Field>

                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <input id="consent" type="checkbox" checked={form.consent} onChange={(e)=>update('consent', e.target.checked)} className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900/60" />
                  <label htmlFor="consent" className="leading-relaxed">
                    Ich willige ein, dass meine Daten zum Zweck der Kontaktaufnahme und Bereitstellung von Informationen zu KMU‑Freight verarbeitet werden. Ich kann diese Einwilligung jederzeit widerrufen. Hinweise in der <a href="/datenschutz" className="underline hover:text-white">Datenschutzerklärung</a> und im <a href="/impressum" className="underline hover:text-white">Impressum</a>.
                  </label>
                </div>

                <button disabled={pending} className="w-full inline-flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white px-5 py-3 font-semibold shadow-lg shadow-blue-500/20">
                  {pending ? 'Wird gesendet…' : 'Auf Warteliste setzen'}
                </button>

                <p className="text-xs text-slate-400">Wir verwenden Double‑Opt‑In. Es erfolgt keine Weitergabe an Dritte.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Warum KMU‑Freight?</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {t:'Volle Transparenz', d:'Echtzeit‑Überblick über Angebote, Aufträge und KPIs.'},
              {t:'Kosten im Griff', d:'Monitoring von Frachtraten und Zuschlägen – ohne Excel‑Chaos.'},
              {t:'Nahtlose Zusammenarbeit', d:'Alle Beteiligten auf einer Plattform – weniger Mails, mehr Klarheit.'},
              {t:'DSGVO‑konform', d:'Hosting in der EU, minimaler Datensatz, Double‑Opt‑In.'},
              {t:'Schneller Start', d:'Onboarding in Tagen statt Monaten. Starten, testen, skalieren.'},
              {t:'Für den Mittelstand', d:'Fokus auf Praktikabilität statt Enterprise‑Overkill.'},
            ].map((f,i)=> (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold">{f.t}</h3>
                <p className="mt-1 text-slate-300 text-sm">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} KMU‑Freight – Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <a href="/impressum" className="hover:text-white">Impressum</a>
            <a href="/datenschutz" className="hover:text-white">Datenschutz</a>
            <a href="/test" className="hover:text-white">Systemtest</a>
          </div>
        </div>
      </footer>

      <HealthBadge />
    </div>
  )
}

import { useEffect, useState } from 'react'

export default function Confirm(){
  const backend = import.meta.env.VITE_BACKEND_URL
  const [status, setStatus] = useState('Bitte warten…')

  useEffect(()=>{
    const url = new URL(window.location.href)
    const token = url.searchParams.get('token')
    async function run(){
      if(!token){ setStatus('Ungültiger Link.'); return }
      try{
        const r = await fetch(`${backend}/api/confirm?token=${encodeURIComponent(token)}`)
        if(r.ok){
          const data = await r.json().catch(()=>({}))
          setStatus(data?.message || 'Danke! Ihre Anmeldung wurde bestätigt.')
        }else{
          setStatus('Bestätigung fehlgeschlagen. Bitte wenden Sie sich an den Support.')
        }
      }catch(e){
        setStatus('Server nicht erreichbar. Bitte später erneut versuchen.')
      }
    }
    if(backend) run(); else setStatus('Backend nicht konfiguriert.')
  }, [backend])

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-3xl">✉️</div>
        <h1 className="mt-6 text-2xl font-semibold">Bestätigung</h1>
        <p className="mt-3 text-slate-300">{status}</p>
        <a href="/" className="mt-8 inline-flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 px-5 py-2 font-semibold">Zur Startseite</a>
      </div>
    </div>
  )
}

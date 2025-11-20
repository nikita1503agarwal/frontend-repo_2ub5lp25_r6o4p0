import { useEffect, useState } from 'react'

export default function HealthBadge(){
  const [ok, setOk] = useState(null)
  const [loading, setLoading] = useState(true)
  const base = import.meta.env.VITE_BACKEND_URL

  useEffect(()=>{
    let active = true
    async function ping(){
      try{
        const r = await fetch(`${base}/test`, { cache: 'no-store' })
        if(!active) return
        setOk(r.ok)
      }catch(e){
        if(!active) return
        setOk(false)
      }finally{
        if(active) setLoading(false)
      }
    }
    if(base) ping()
    else { setOk(false); setLoading(false) }
    const id = setInterval(ping, 15000)
    return ()=>{ active = false; clearInterval(id) }
  }, [base])

  const cls = ok ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
  const label = loading ? 'Prüfe Verbindung...' : ok ? 'Backend OK' : 'Backend unreachable'

  return (
    <div className={`fixed bottom-4 right-4 px-3 py-2 rounded-lg text-xs shadow-lg ${cls}`}>
      {label}
    </div>
  )
}

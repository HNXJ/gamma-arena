import React, { useState, useEffect } from 'react'
import { ArenaClient } from '../api/client'
import { Persistence as PersistenceType } from '../types/contract'
import { Database, RotateCcw, Save, ShieldAlert } from 'lucide-react'

export default function Persistence() {
  const [persistence, setPersistence] = useState<PersistenceType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ArenaClient.getPersistence()
        setPersistence(data)
      } catch (err) {
        console.error('Persistence Fetch Error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 15000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="p-12 space-y-12 max-w-7xl mx-auto animate-pulse">
        <div className="h-20 bg-[#141414] rounded-xl w-1/3 border border-white/5" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-64 bg-[#141414] rounded-xl border border-white/5" />
          <div className="h-64 bg-[#141414] rounded-xl border border-white/5" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-12 space-y-12 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="space-y-2 border-l-4 border-blue-500 pl-6 py-2">
        <h1 className="text-3xl font-bold tracking-tight text-white uppercase italic">Persistence Registry</h1>
        <p className="text-gray-400 text-sm tracking-wide">Arena World-State & Recovery Manifests</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Persistence Card */}
        <div className="lg:col-span-2 bg-[#141414] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
            <div className="flex items-center space-x-3 text-blue-400">
              <Database size={20} />
              <h2 className="font-bold uppercase tracking-tight text-sm italic">Active World State</h2>
            </div>
            <div className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${
              persistence?.freshness === 'GROUNDED' 
                ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                : 'bg-red-500/10 text-red-500 border-red-500/20'
            }`}>
              {persistence?.freshness || 'DEGRADED'}
            </div>
          </div>
          
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 flex items-center space-x-2 font-bold">
                  <RotateCcw size={12} className="text-blue-500" />
                  <span>Boot Type</span>
                </h4>
                <div className="text-3xl font-bold font-mono tracking-tighter text-gray-200">
                  {persistence?.boot_type || 'UNKNOWN'}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 flex items-center space-x-2 font-bold">
                  <Save size={12} className="text-amber-500" />
                  <span>Resume Count</span>
                </h4>
                <div className="text-3xl font-bold font-mono tracking-tighter text-amber-500">
                  {persistence?.resume_count ?? '0'}
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-bold">Last Checkpoint</h4>
                <div className="text-3xl font-bold font-mono tracking-tighter text-gray-200">
                  {persistence?.last_checkpoint || 'NEVER'}
                </div>
              </div>
              <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tight font-medium">
                  World manifest is written atomically to <code className="text-blue-400/80 bg-blue-500/5 px-1 rounded">local/game001/arena_runtime_state.json</code>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Advisory Panel */}
        <div className="bg-red-500/[0.02] border border-red-500/10 rounded-xl p-10 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldAlert size={80} />
          </div>
          <div className="flex items-center space-x-3 text-red-500 relative z-10">
            <ShieldAlert size={28} />
            <h2 className="font-bold uppercase tracking-tight text-sm italic">Integrity Shield</h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed relative z-10 font-medium">
            Automatic checkpointing is active every 300 seconds. In the event of a crash, the Arena will attempt a namespaced resume using the latest grounded manifest to preserve scientific progress.
          </p>
          <div className="space-y-6 relative z-10">
            <div className="flex items-center space-x-3 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <span>Atomic Writes: OK</span>
            </div>
            <div className="flex items-center space-x-3 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span>Namespace: game001</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

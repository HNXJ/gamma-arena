import React, { useState, useEffect } from 'react'
import { ArenaClient } from '../api/client'
import { Agent } from '../types/contract'
import { Shield, Monitor, Zap, FileSearch, UserCheck } from 'lucide-react'

const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => {
  const isActive = agent.status === 'ACTIVE'
  const isGrounded = agent.truth_class === 'GROUNDED'
  
  return (
    <div className={`bg-[#141414] border rounded-xl p-6 transition-all duration-300 ${isActive ? 'border-amber-500/30' : 'border-white/5 opacity-80'}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-lg ${isActive ? 'bg-amber-500/10 text-amber-500' : 'bg-white/5 text-gray-500'}`}>
          {agent.role === 'Monitor' && <Monitor size={24} />}
          {agent.role === 'Optimizer' && <Zap size={24} />}
          {agent.role === 'Analyst' && <FileSearch size={24} />}
          {agent.role === 'Manager' && <UserCheck size={24} />}
        </div>
        <div className="text-right">
          <div className="text-xl font-bold font-mono tracking-tighter">{agent.id}</div>
          <div className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-amber-500' : 'text-gray-600'}`}>
            {agent.status}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-semibold">Identity/Role</h4>
          <div className="text-sm font-semibold text-gray-200">{agent.role}</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-semibold">Truth Class</h4>
            <div className={`text-[10px] font-bold font-mono ${isGrounded ? 'text-green-500' : 'text-gray-600'}`}>
              {agent.truth_class}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-semibold">Evidence</h4>
            <div className="text-[10px] font-mono text-gray-400 truncate">
              {agent.grounded_evidence ? 'LOGGED' : 'NONE'}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-semibold">Last Heartbeat</h4>
          <div className="text-[10px] font-mono text-gray-400 truncate">
            {agent.last_active || 'NEVER'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ArenaClient.getAgents()
        setAgents(data)
      } catch (err) {
        console.error('Agents Fetch Error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-12 space-y-12 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="space-y-2 border-l-4 border-amber-500 pl-6 py-2">
        <h1 className="text-3xl font-bold tracking-tight text-white uppercase italic">Council Roster</h1>
        <p className="text-gray-400 text-sm tracking-wide">Grounded Agent Activity & Observability Evidence</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {!loading ? (
          agents.map(agent => <AgentCard key={agent.id} agent={agent} />)
        ) : (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 bg-[#141414] border border-white/5 rounded-xl animate-pulse" />
          ))
        )}
      </div>
      
      <div className="bg-amber-500/[0.02] border border-amber-500/10 p-8 rounded-xl flex items-start space-x-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Shield className="text-amber-500 shrink-0 mt-1" size={24} />
        <div className="relative z-10">
          <h3 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-2">Security Verification Protocol</h3>
          <p className="text-xs text-amber-500/70 leading-relaxed uppercase tracking-tight font-medium max-w-3xl">
            Terminal-driven agent mutation is disabled in this console. This roster provides read-only scientific grounding of active host processes only. Every agent status displayed is verified against live research logs on the Office Mac.
          </p>
        </div>
      </div>
    </div>
  )
}

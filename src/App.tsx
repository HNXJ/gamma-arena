import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Overview from './pages/Overview';
import Arena from './pages/Arena';
import Agents from './pages/Agents';
import Persistence from './pages/Persistence';
import Logs from './pages/Logs';
import { LayoutDashboard, Activity, Users, Database, FileText, Shield, Terminal } from 'lucide-react';

const SidebarItem: React.FC<{ to: string, icon: any, label: string }> = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-4 px-6 py-4 transition-all duration-300 group border-r-2 ${
        isActive 
          ? 'bg-amber-500/5 text-amber-500 border-amber-500 shadow-[inset_-10px_0_20px_-10px_rgba(245,158,11,0.2)]' 
          : 'text-gray-500 border-transparent hover:bg-white/5 hover:text-gray-200'
      }`
    }
  >
    <Icon size={20} className="shrink-0 transition-transform group-hover:scale-110" />
    <span className="text-xs font-black uppercase tracking-[0.2em]">{label}</span>
  </NavLink>
)

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-[#0a0a0a] text-gray-200 overflow-hidden selection:bg-amber-500/30">
        {/* Sidebar */}
        <aside className="w-80 bg-[#0d0d0d] border-r border-white/5 flex flex-col shrink-0 shadow-2xl relative z-10">
          <div className="p-10 border-b border-white/5 flex flex-col space-y-2">
            <div className="flex items-center space-x-3 text-amber-500">
              <Shield size={32} strokeWidth={2.5} />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none italic uppercase">Gamma</span>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.4em] leading-none ml-1">Arena</span>
              </div>
            </div>
            <div className="pt-4 flex items-center space-x-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
               <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest italic">Link: Grounded</span>
            </div>
          </div>
          
          <nav className="flex-1 py-8 flex flex-col">
            <SidebarItem to="/" icon={LayoutDashboard} label="Mission Overview" />
            <SidebarItem to="/arena" icon={Activity} label="Scientific Arena" />
            <SidebarItem to="/agents" icon={Users} label="Council Roster" />
            <SidebarItem to="/persistence" icon={Database} label="World Registry" />
            <SidebarItem to="/logs" icon={FileText} label="Provenance Rail" />
          </nav>

          <div className="p-8 border-t border-white/5 space-y-4">
            <div className="flex items-center space-x-3 text-gray-600 group hover:text-gray-400 transition-colors cursor-help">
              <Terminal size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Operator Console v1.6</span>
            </div>
            <p className="text-[9px] text-gray-700 uppercase leading-relaxed font-medium">
              Read-only scientific interface. Grounded world-state enforced by BASTOS LAB.
            </p>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 overflow-auto relative bg-black scientific-grid">
           {/* Global Background Grid logic from index.css */}
           <div className="relative z-10 min-h-full flex flex-col">
             <div className="flex-1">
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/arena" element={<Arena />} />
                    <Route path="/agents" element={<Agents />} />
                    <Route path="/persistence" element={<Persistence />} />
                    <Route path="/logs" element={<Logs />} />
                </Routes>
             </div>

             <footer className="shrink-0 p-8 pt-0 mt-auto opacity-40 hover:opacity-100 transition-opacity duration-500">
               <div className="flex justify-between items-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] border-t border-white/5 pt-6">
                 <div className="flex items-center space-x-4">
                    <span>BASTOS LAB / VANDERBILT</span>
                    <span className="text-gray-800">|</span>
                    <span>© 2026</span>
                 </div>
                 <div className="flex items-center space-x-4">
                    <span className="italic">Grounded: {new Date().toLocaleDateString()}</span>
                    <span className="text-amber-500/50">Contract: Hardened</span>
                 </div>
               </div>
             </footer>
           </div>
        </main>
      </div>
    </Router>
  );
}

export default App;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useArena } from '../context/ArenaContext';
import { registry } from '../registry/core';
import type { UISlot } from '../types/ui';
import { SlotRenderer } from '../registry/index';
import * as LucideIcons from 'lucide-react';

export const ExtendedBase: React.FC = () => {
  const { viewModels } = useArena();
  const tabs = registry.getTabs();
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || 'lobby');

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <div className="flex h-screen bg-black text-[#c8d0d8] overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-20 bg-[#0d0d0d] border-r border-white/5 flex flex-col items-center py-8 space-y-8 shrink-0">
        <div className="text-[#D4AF37] font-black text-2xl italic">Γ</div>
        <nav className="flex-1 flex flex-col space-y-4">
          {tabs.map(tab => {
            const Icon = (LucideIcons as any)[tab.icon] || LucideIcons.HelpCircle;
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`p-4 rounded-xl transition-all group relative ${
                  isActive ? 'text-[#D4AF37] bg-[#D4AF37]/10' : 'text-gray-500 hover:text-gray-300'
                }`}
                title={tab.label}
              >
                <Icon size={20} />
                {isActive && (
                  <div className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-[#D4AF37] rounded-l-full shadow-[0_0_10px_#D4AF37]" />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative bg-[#0a0a0a] scientific-grid">
        {/* Tab Header */}
        <header className="h-20 border-b border-white/5 px-10 flex items-center justify-between shrink-0 bg-black/40 backdrop-blur-md relative z-10">
          <div className="space-y-1">
            <h1 className="text-xl font-black uppercase tracking-tighter italic text-gray-100">
              {activeTab?.label || 'Scientific Console'}
            </h1>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Grounded Observation Mode</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Neurons</div>
              <div className="text-sm font-black text-amber-500 font-mono tracking-tighter">
                {viewModels.research.neuronCount} / {viewModels.research.targetCount}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Surface */}
        <div className="flex-1 overflow-auto p-10 relative z-10">
          <div className="max-w-6xl mx-auto space-y-12">
             {/* We use a slot named after the tab ID to render its content */}
             <SlotRenderer 
               slot={(activeTabId.toUpperCase() as any) as UISlot} 
               data={viewModels} 
               state={viewModels} 
             />
          </div>
        </div>

        {/* Right Rail / Overlay Slot */}
        <div className="absolute right-0 top-20 bottom-0 w-80 border-l border-white/5 bg-black/40 backdrop-blur-md p-6 overflow-auto">
          <SlotRenderer slot="RIGHT_RAIL" data={viewModels} state={viewModels} />
        </div>
      </main>
    </div>
  );
};

import { useState } from 'react'
import { ArenaProvider } from './context/ArenaContext';
import { SafeBase } from './components/SafeBase';
import { ExtendedBase } from './components/ExtendedBase';
import { initializeRegistry } from './registry/setup';
import { Terminal, Layout } from 'lucide-react';

// Initialize the UI registry fragments
initializeRegistry();

function App() {
  const [mode, setMode] = useState<'SAFE' | 'EXTENDED'>('EXTENDED');

  return (
    <ArenaProvider>
      <div className="relative">
        {/* Universal Mode Toggle (Operator Only) */}
        <div className="fixed bottom-6 right-6 z-[9999] flex items-center bg-black/80 backdrop-blur border border-white/10 rounded-full p-1 shadow-2xl">
          <button 
            onClick={() => setMode('SAFE')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
              mode === 'SAFE' ? 'bg-emerald-500 text-black font-black' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Terminal size={14} />
            <span className="text-[10px] uppercase tracking-widest">Safe Base</span>
          </button>
          <button 
            onClick={() => setMode('EXTENDED')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
              mode === 'EXTENDED' ? 'bg-[#D4AF37] text-black font-black' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Layout size={14} />
            <span className="text-[10px] uppercase tracking-widest">Extended</span>
          </button>
        </div>

        {/* Content Layer */}
        {mode === 'SAFE' ? <SafeBase /> : <ExtendedBase />}
      </div>
    </ArenaProvider>
  );
}

export default App;

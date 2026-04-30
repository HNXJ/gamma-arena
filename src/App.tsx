import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Overview from './pages/Overview';
import Arena from './pages/Arena';
import Agents from './pages/Agents';
import Persistence from './pages/Persistence';
import Logs from './pages/Logs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-amber-500 font-mono">
        <nav className="border-b border-amber-900/50 p-4 bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tighter text-amber-400">
              GAMMA<span className="text-amber-600">ARENA</span>
            </h1>
            <div className="flex gap-6 text-sm">
              <Link to="/" className="hover:text-amber-300 transition-colors">OVERVIEW</Link>
              <Link to="/arena" className="hover:text-amber-300 transition-colors">ARENA</Link>
              <Link to="/agents" className="hover:text-amber-300 transition-colors">AGENTS</Link>
              <Link to="/persistence" className="hover:text-amber-300 transition-colors">PERSISTENCE</Link>
              <Link to="/logs" className="hover:text-amber-300 transition-colors">LOGS</Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-green-500/80">LIVE</span>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/arena" element={<Arena />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/persistence" element={<Persistence />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
        </main>
        
        <footer className="border-t border-amber-900/30 p-4 mt-auto">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] text-amber-700 uppercase tracking-widest">
            <span>Source: Gamma Runtime</span>
            <span>Truth Class: Grounded</span>
            <span>Refreshed: {new Date().toLocaleTimeString()}</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

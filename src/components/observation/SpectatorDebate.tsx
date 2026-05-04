import React, { useEffect, useState } from 'react';

interface SpectatorMessage {
  participant: string;
  status?: string;
  timestamp: string;
  message?: string;
  response?: string;
  msg?: string;
  model_id?: string;
  source_path?: string;
}

interface SpectatorLatest {
  status: string;
  row_count: number;
  latest: SpectatorMessage | null;
}

export const SpectatorDebate: React.FC = () => {
  const [data, setData] = useState<SpectatorLatest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchLatest = async () => {
      try {
        let response = await fetch(`${import.meta.env.VITE_GAMMA_OBSERVATION_URL}/api/world/spectator/active-loop/latest`);
        
        if (!response.ok) {
          response = await fetch(`${import.meta.env.VITE_GAMMA_OBSERVATION_URL}/api/world/spectator/latest`);
        }
        
        if (!response.ok) throw new Error(`Bridge error: ${response.statusText}`);
        const json = await response.json();
        
        if (isMounted) {
          setData(json);
          setError(null);
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          setError(e instanceof Error ? e.message : 'Bridge Unreachable');
          setData(null);
          setLoading(false);
        }
      }
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 5000);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-black/40 border border-purple-500/30 rounded-lg p-4 font-mono text-xs text-purple-300 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-purple-400 font-bold uppercase tracking-widest">
          Spectator Debate — Observation Only
        </h3>
        <div className={`px-2 py-0.5 rounded-full text-[10px] ${error ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
          {error ? 'UNREACHABLE' : 'CONNECTED'}
        </div>
      </div>
      
      <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">
        This is runtime observation only. It is not scientific truth and does not create receipts.
      </p>

      {loading && !data && <p className="animate-pulse">Connecting to bridge...</p>}
      
      {error && (
        <div className="bg-red-900/20 border border-red-900/50 p-2 rounded text-red-400 mb-2">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-[10px] opacity-70">
            <div>Bridge Status: <span className="text-purple-200">{data.status}</span></div>
            <div>Row Count: <span className="text-purple-200">{data.row_count}</span></div>
          </div>
          
          {data.latest ? (
            <div className="bg-black/60 p-2 rounded border border-white/5">
              <div className="flex justify-between mb-1">
                <span className="text-purple-400">{data.latest.participant}</span>
                <span className="opacity-50">{data.latest.timestamp}</span>
              </div>
              {data.latest.model_id && (
                <div className="text-[9px] text-purple-400/50 mb-1">
                  Model: {data.latest.model_id}
                </div>
              )}
              {data.latest.status && (
                <div className="text-gray-400 mb-1 italic">
                  Status: {data.latest.status}
                </div>
              )}
              <div className="text-white/90 line-clamp-3 whitespace-pre-wrap">
                {data.latest.msg || data.latest.message || data.latest.response || 'No content excerpt available'}
              </div>
              {data.latest.source_path && (
                <div className="mt-1 text-[9px] opacity-30 truncate">
                  Source: {data.latest.source_path}
                </div>
              )}
            </div>
          ) : (
            <p className="opacity-50">No recent messages recorded in bridge.</p>
          )}
        </div>
      )}
      
      {!data && !error && !loading && (
        <p className="opacity-50">Waiting for telemetry stream...</p>
      )}
    </div>
  );
};


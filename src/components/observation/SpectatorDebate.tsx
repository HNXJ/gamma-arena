import React, { useEffect, useState } from 'react';

export const SpectatorDebate: React.FC = () => {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_GAMMA_OBSERVATION_URL}/api/world/spectator/latest`);
        if (!response.ok) throw new Error('Failed to fetch');
        setData(await response.json());
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      }
    };
    fetchLatest();
    const interval = setInterval(fetchLatest, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
      <h3>Spectator Debate — Observation Only</h3>
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : <p>Loading...</p>}
    </div>
  );
};

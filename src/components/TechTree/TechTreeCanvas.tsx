import React, { useState, useRef, useMemo } from 'react';
import type { TechTreeGraph } from '../../types/techTree';
import { TechTreeNodeCard } from './TechTreeNodeCard';
import { TechTreeToolbar } from './TechTreeToolbar';
import { TechTreeInspector } from './TechTreeInspector';

interface TechTreeCanvasProps {
  graph: TechTreeGraph;
}

export const TechTreeCanvas: React.FC<TechTreeCanvasProps> = ({ graph }) => {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Simple layered layout logic
  const positionedNodes = useMemo(() => {
    // Assign levels based on connectivity
    const levels: Record<string, number> = {};
    const visited = new Set<string>();

    const assignLevel = (nodeId: string, level: number) => {
      if (visited.has(nodeId)) {
        levels[nodeId] = Math.max(levels[nodeId] || 0, level);
        return;
      }
      visited.add(nodeId);
      levels[nodeId] = level;
      
      graph.edges
        .filter(e => e.source === nodeId)
        .forEach(e => assignLevel(e.target, level + 1));
    };

    // Find roots (nodes with no incoming edges)
    const targets = new Set(graph.edges.map(e => e.target));
    const roots = graph.nodes.filter(n => !targets.has(n.id));
    
    roots.forEach(root => assignLevel(root.id, 0));

    // For nodes still not visited (cycles or isolated)
    graph.nodes.forEach(n => {
      if (!visited.has(n.id)) assignLevel(n.id, 0);
    });

    // Group by level
    const levelGroups: Record<number, string[]> = {};
    Object.entries(levels).forEach(([id, level]) => {
      if (!levelGroups[level]) levelGroups[level] = [];
      levelGroups[level].push(id);
    });

    // Calculate positions
    const X_SPACING = 300;
    const Y_SPACING = 150;
    
    const positions: Record<string, { x: number, y: number }> = {};
    Object.entries(levelGroups).forEach(([levelStr, ids]) => {
      const level = parseInt(levelStr);
      const totalHeight = (ids.length - 1) * Y_SPACING;
      ids.forEach((id, index) => {
        positions[id] = {
          x: level * X_SPACING + 100,
          y: (index * Y_SPACING) - (totalHeight / 2) + 400
        };
      });
    });

    return graph.nodes.map(node => ({
      ...node,
      position: positions[node.id] || { x: 0, y: 0 }
    }));
  }, [graph]);

  const filteredNodes = useMemo(() => {
    if (!searchTerm) return positionedNodes;
    const term = searchTerm.toLowerCase();
    return positionedNodes.filter(n => 
      n.label.toLowerCase().includes(term) || 
      n.kind.toLowerCase().includes(term) ||
      n.repo?.toLowerCase().includes(term) ||
      n.description?.toLowerCase().includes(term)
    );
  }, [positionedNodes, searchTerm]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleWheel = (e: React.WheelEvent) => {
    const delta = -e.deltaY * 0.001;
    setZoom(prev => Math.min(Math.max(prev + delta, 0.2), 3));
  };

  const selectedNode = positionedNodes.find(n => n.id === selectedNodeId) || null;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-[#050505] overflow-hidden cursor-grab active:cursor-grabbing scientific-grid"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <TechTreeToolbar 
        onZoomIn={() => setZoom(prev => Math.min(prev + 0.1, 3))}
        onZoomOut={() => setZoom(prev => Math.max(prev - 0.1, 0.2))}
        onReset={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}
        onSearch={setSearchTerm}
      />

      {/* SVG Layer for Edges */}
      <svg 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#444" />
          </marker>
        </defs>
        {graph.edges.map(edge => {
          const sourceNode = positionedNodes.find(n => n.id === edge.source);
          const targetNode = positionedNodes.find(n => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const x1 = sourceNode.position.x + 192; // Node width
          const y1 = sourceNode.position.y + 40;  // Half height approx
          const x2 = targetNode.position.x;
          const y2 = targetNode.position.y + 40;

          return (
            <g key={edge.id}>
              <path 
                d={`M ${x1} ${y1} C ${x1 + 50} ${y1}, ${x2 - 50} ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke={edge.truthStatus === 'receipt_backed' ? '#10b981' : '#444'}
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
                className="transition-all duration-300"
              />
              {/* Optional Edge Label */}
              <text 
                x={(x1 + x2) / 2} 
                y={(y1 + y2) / 2 - 10} 
                fill="#666" 
                fontSize="8" 
                className="font-bold uppercase tracking-widest text-center"
              >
                {edge.kind}
              </text>
            </g>
          );
        })}
      </svg>

      {/* HTML Layer for Nodes */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {filteredNodes.map(node => (
          <TechTreeNodeCard 
            key={node.id}
            node={node}
            isSelected={selectedNodeId === node.id}
            onClick={() => setSelectedNodeId(node.id === selectedNodeId ? null : node.id)}
            style={{ 
              left: node.position.x, 
              top: node.position.y,
              pointerEvents: 'auto'
            }}
          />
        ))}
      </div>

      <TechTreeInspector 
        node={selectedNode}
        edges={graph.edges}
        onClose={() => setSelectedNodeId(null)}
      />

      {/* Global Disclaimer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="px-8 py-3 bg-black/40 backdrop-blur-md border border-white/5 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 shadow-2xl">
          Observation Surface derived from local inventory manifest :: Truth Mode: truth_safe_unverified
        </div>
      </div>
    </div>
  );
};

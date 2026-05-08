export type TechTreeNodeKind = 
  | 'repo'
  | 'directory'
  | 'file'
  | 'function'
  | 'class'
  | 'script'
  | 'equation'
  | 'dataset'
  | 'tool'
  | 'paradigm'
  | 'runtime'
  | 'compiler'
  | 'artifact'
  | 'manifest';

export type TechTreeEdgeKind = 
  | 'contains'
  | 'uses'
  | 'calls'
  | 'imports'
  | 'generates'
  | 'compiled_by'
  | 'depends_on'
  | 'implements'
  | 'documents'
  | 'located_at'
  | 'derived_from'
  | 'validates'
  | 'observes';

export type TechTreeTruthStatus = 
  | 'observation_only'
  | 'truth_safe_unverified'
  | 'manifest_derived'
  | 'receipt_backed'
  | 'unknown';

export interface TechTreeNode {
  id: string;
  label: string;
  kind: TechTreeNodeKind;
  repo?: string;
  path?: string;
  lineStart?: number;
  lineEnd?: number;
  url?: string;
  description?: string;
  truthStatus: TechTreeTruthStatus;
  tags?: string[];
  expandable?: boolean;
  childrenLoaded?: boolean;
}

export interface TechTreeEdge {
  id: string;
  source: string;
  target: string;
  kind: TechTreeEdgeKind;
  label?: string;
  evidence?: string;
  truthStatus: TechTreeTruthStatus;
}

export interface TechTreeGraph {
  nodes: TechTreeNode[];
  edges: TechTreeEdge[];
}

import type { TechTreeGraph } from '../types/techTree';

export const techTreeSeed: TechTreeGraph = {
  nodes: [
    {
      id: 'root-labyrinth',
      label: 'Gamma Labyrinth',
      kind: 'repo',
      description: 'The top-level scientific discovery world.',
      truthStatus: 'observation_only'
    },
    {
      id: 'repo-science-source',
      label: 'science-source-repo',
      kind: 'repo',
      repo: 'science-source',
      url: 'https://github.com/HNXJ/jbiophysic',
      description: 'Demo science-source repository (placeholder).',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'dir-models',
      label: 'models/',
      kind: 'directory',
      repo: 'science-source',
      path: 'models/',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'file-model-core',
      label: 'model_core.py',
      kind: 'file',
      repo: 'science-source',
      path: 'models/model_core.py',
      description: 'Core simulation logic (demo placeholder).',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'func-step',
      label: 'step_function()',
      kind: 'function',
      repo: 'science-source',
      path: 'models/model_core.py',
      description: 'Iterative integration step (demo placeholder).',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'eq-placeholder',
      label: 'f(x, t) = [MODEL_EQUATION_PLACEHOLDER]',
      kind: 'equation',
      description: 'Example scientific equation (manifest pending).',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'tool-gamma-arena',
      label: 'Gamma Arena',
      kind: 'tool',
      repo: 'gamma-arena',
      description: 'Observation-plane UI for the Labyrinth.',
      truthStatus: 'observation_only'
    }
  ],
  edges: [
    {
      id: 'e1',
      source: 'root-labyrinth',
      target: 'repo-science-source',
      kind: 'contains',
      truthStatus: 'observation_only'
    },
    {
      id: 'e2',
      source: 'repo-science-source',
      target: 'dir-models',
      kind: 'contains',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'e3',
      source: 'dir-models',
      target: 'file-model-core',
      kind: 'contains',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'e4',
      source: 'file-model-core',
      target: 'func-step',
      kind: 'contains',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'e5',
      source: 'func-step',
      target: 'eq-placeholder',
      kind: 'implements',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'e6',
      source: 'tool-gamma-arena',
      target: 'root-labyrinth',
      kind: 'observes',
      truthStatus: 'observation_only'
    }
  ]
};

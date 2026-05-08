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
      id: 'repo-jbiophysic',
      label: 'jbiophysic',
      kind: 'repo',
      repo: 'jbiophysic',
      url: 'https://github.com/HNXJ/jbiophysic',
      description: 'Primary science-source for Izhikevich neural modeling.',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'dir-jbiophysic-models',
      label: 'models/',
      kind: 'directory',
      repo: 'jbiophysic',
      path: 'models/',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'file-izhikevich-core',
      label: 'izhikevich_core.py',
      kind: 'file',
      repo: 'jbiophysic',
      path: 'models/izhikevich_core.py',
      description: 'Core spiking neuron implementation.',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'func-izh-step',
      label: 'step()',
      kind: 'function',
      repo: 'jbiophysic',
      path: 'models/izhikevich_core.py',
      description: 'Single timestep integration of membrane potential.',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'eq-izh-v',
      label: 'dv/dt = 0.04v² + 5v + 140 - u + I',
      kind: 'equation',
      description: 'The membrane potential recovery equation.',
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
      target: 'repo-jbiophysic',
      kind: 'contains',
      truthStatus: 'observation_only'
    },
    {
      id: 'e2',
      source: 'repo-jbiophysic',
      target: 'dir-jbiophysic-models',
      kind: 'contains',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'e3',
      source: 'dir-jbiophysic-models',
      target: 'file-izhikevich-core',
      kind: 'contains',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'e4',
      source: 'file-izhikevich-core',
      target: 'func-izh-step',
      kind: 'contains',
      truthStatus: 'truth_safe_unverified'
    },
    {
      id: 'e5',
      source: 'func-izh-step',
      target: 'eq-izh-v',
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

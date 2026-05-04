import { registry } from '../core';
import { BookOpen, AlertTriangle, Shield, CheckCircle, Beaker, List, Zap } from 'lucide-react';

export const registerWikiItems = () => {
  registry.registerTab({
    id: 'wiki',
    label: 'Science Wiki',
    icon: 'BookOpen',
    priority: 5,
    domain: 'WIKI'
  });

  registry.register({
    key: 'wiki-article-scientific-game',
    slot: 'WIKI',
    label: 'Deep Research: Gamma Arena as Scientific Discovery Game',
    priority: 100,
    render: () => (
      <div className="space-y-12 pb-20">
        {/* Article Header */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-amber-500 font-black uppercase tracking-[0.3em] text-xs italic">
            <Beaker size={16} />
            <span>Deep Research Synthesis // AI-Generated</span>
          </div>
          <h1 className="text-5xl font-black text-gray-100 tracking-tighter italic uppercase leading-none">
            Gamma Arena as a <span className="text-amber-500 underline decoration-amber-500/20 underline-offset-8">Scientific Discovery Game</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-4xl italic">
            "Gamma Arena’s defensible novelty is not that it is the first autonomous scientist. Its novelty is that it turns scientific discovery into a protocolized, receipt-backed game where AI agents perform bounded, verifiable actions under explicit epistemological rules."
          </p>
        </div>

        {/* Observation Disclaimer */}
        <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start space-x-4">
          <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={24} />
          <div className="space-y-1">
            <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest">Observation Surface Only</h3>
            <p className="text-xs text-amber-500/80 font-bold uppercase leading-relaxed">
              Gamma Arena is an observation surface. Scientific and game-state claims must be backed by committed backend truth and receipts. 
              This article is research synthesis and design guidance, not a truth-plane commit.
            </p>
          </div>
        </div>

        {/* 1. Summary */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
            <div className="w-1.5 h-6 bg-purple-500" />
            <h2 className="text-xl font-black text-gray-100 uppercase tracking-tighter">1. Summary</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>
                Modern LLM agents can assist scientific discovery but often blur hypothesis generation, execution, and validation. 
                Without a strict separation of concerns, the "hallucination gap" becomes a catastrophic risk to scientific integrity.
              </p>
              <p>
                Gamma Arena addresses this by implementing a four-plane architecture that isolates intent from observation and execution from truth.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Control', desc: 'Missions, proposals, validation gates' },
                { label: 'Execution', desc: 'Simulations, harnesses, adapter runs' },
                { label: 'Truth', desc: 'Committed persistent state, receipts' },
                { label: 'Observation', desc: 'Dashboards, wiki pages, views' }
              ].map((plane) => (
                <div key={plane.label} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest">{plane.label}</div>
                  <div className="text-[11px] font-bold text-gray-300 leading-tight">{plane.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Why Scientific Discovery as a Game? */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
            <div className="w-1.5 h-6 bg-cyan-500" />
            <h2 className="text-xl font-black text-gray-100 uppercase tracking-tighter">2. Why Scientific Discovery as a Game?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Bounded Action Spaces', desc: 'Games define explicit moves and constraints, preventing unbounded drift in agent reasoning.' },
              { title: 'Agent Permissions', desc: 'Agents become players with constrained permissions, preventing unauthorized mutation of truth.' },
              { title: 'Capability Contracts', desc: 'Harnesses become formal contracts that agents must fulfill to earn state updates.' },
              { title: 'Evidence Tournaments', desc: 'Tournaments allow evidence comparison without pretending the UI itself is truth.' },
              { title: 'Provenance Backing', desc: 'Scoring and debate are only useful if backed by verifiable execution provenance.' }
            ].map((item) => (
              <div key={item.title} className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-3">
                <h3 className="text-sm font-black text-cyan-400 uppercase tracking-widest leading-tight">{item.title}</h3>
                <p className="text-[11px] font-bold text-gray-400 uppercase leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Adjacent Systems */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
            <div className="w-1.5 h-6 bg-gray-500" />
            <h2 className="text-xl font-black text-gray-100 uppercase tracking-tighter">3. Adjacent Systems</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-400 leading-relaxed">
            <div className="space-y-4">
              <p><strong className="text-gray-200">The AI Scientist:</strong> A useful foil for end-to-end autonomous science, but monolithic loops can blur the boundary between execution and validation.</p>
              <p><strong className="text-gray-200">Agent Laboratory:</strong> Validates role-specialized research-assistant workflows, providing a blueprint for agentic collaboration.</p>
              <p><strong className="text-gray-200">Tool-MAD / Debate:</strong> Supports multi-agent fact verification but requires careful judge calibration and provenance.</p>
            </div>
            <div className="space-y-4">
              <p><strong className="text-gray-200">Discovery Engine:</strong> Supports structured literature cartography and conceptual tensor work.</p>
              <p><strong className="text-gray-200">Jaxley / Brian2:</strong> Industry-standard computational neuroscience engines for biophysical simulation.</p>
              <p><strong className="text-gray-200">Foldit / OSWorld:</strong> Precedents for complex game and simulation environments for scientific/interface research.</p>
            </div>
          </div>
        </section>

        {/* 4. What Gamma Adds */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
            <div className="w-1.5 h-6 bg-amber-500" />
            <h2 className="text-xl font-black text-gray-100 uppercase tracking-tighter">4. What Gamma Adds</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              'Strict Player/Harness Separation',
              'Four-Plane Doctrine',
              'Receipt-Backed Truth Commits',
              'Ontology Tournament Evaluation',
              'Explicit Null-vs-Zero Distinction',
              'Literature-to-Simulation Bridge'
            ].map((bullet) => (
              <div key={bullet} className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-center space-x-3">
                <CheckCircle size={14} className="text-amber-500 shrink-0" />
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-tight">{bullet}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Claim Discipline */}
        <div className="p-10 bg-purple-500/5 border-2 border-purple-500/20 rounded-3xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Shield size={120} className="text-purple-500" />
          </div>
          <div className="flex items-center space-x-3 text-purple-500">
            <Shield size={20} />
            <h2 className="text-sm font-black uppercase tracking-[0.4em]">Claim Discipline</h2>
          </div>
          <p className="text-xl font-black text-gray-100 italic uppercase leading-relaxed relative z-10">
            "Gamma should not claim to be the first autonomous scientist, the first literature-synthesis agent, or a source of biological truth. Gamma is a protocolized environment for bounded scientific agents and receipt-backed evidence workflows."
          </p>
        </div>

        {/* 6. Red Flags and Mitigations */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
            <div className="w-1.5 h-6 bg-rose-500" />
            <h2 className="text-xl font-black text-gray-100 uppercase tracking-tighter">6. Red Flags and Mitigations</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/10">Risk</th>
                  <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/10">Why it matters</th>
                  <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/10">Gamma Mitigation</th>
                </tr>
              </thead>
              <tbody className="text-[11px] font-bold uppercase text-gray-400">
                {[
                  ['Agent Collusion', 'Subversion of mission goals', 'Multi-judge verification + adversarial players'],
                  ['Hallucinated Citations', 'Corruption of the evidence map', 'DOI/OpenAlex validation receipts'],
                  ['LLM Judge Bias', 'Non-objective progress tracking', 'Ontology-constrained scoring functions'],
                  ['Lossy Summaries', 'Important details lost in context', 'Traceability to raw literature snippets'],
                  ['Ontology Drift', 'Inconsistent semantic mapping', 'Versioned schemas and strict validators'],
                  ['Truth Leakage', 'UI claims treated as ground truth', 'Observation-plane disclaimers + receipt gating']
                ].map(([risk, why, mitigation], i) => (
                  <tr key={i} className="hover:bg-white/[0.02] border-b border-white/5 last:border-0">
                    <td className="p-4 text-rose-500">{risk}</td>
                    <td className="p-4">{why}</td>
                    <td className="p-4 text-emerald-500">{mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Tooling Roadmap */}
        <section className="space-y-8">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
            <div className="w-1.5 h-6 bg-emerald-500" />
            <h2 className="text-xl font-black text-gray-100 uppercase tracking-tighter">7. Tooling Roadmap</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Use Now',
                color: 'text-emerald-500',
                items: ['Pydantic / PydanticAI', 'Pandera', 'PyNWB', 'OpenAlex / Scholar', 'Jaxley (Simulation)']
              },
              {
                title: 'Pilot',
                color: 'text-amber-500',
                items: ['DSPy', 'LlamaIndex', 'DuckDB', 'PyMuPDF / Unstructured', 'SpikeInterface']
              },
              {
                title: 'Defer',
                color: 'text-gray-500',
                items: ['LangGraph', 'AutoGen', 'Prefect / Dagster', 'MLflow / DVC', 'DataLad']
              }
            ].map((col) => (
              <div key={col.title} className="space-y-4">
                <div className={`text-xs font-black uppercase tracking-[0.4em] ${col.color}`}>{col.title}</div>
                <div className="space-y-2">
                  {col.items.map(item => (
                    <div key={item} className="p-3 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. HPC Harness Lessons */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
            <div className="w-1.5 h-6 bg-blue-500" />
            <h2 className="text-xl font-black text-gray-100 uppercase tracking-tighter">8. HPC Harness Lessons</h2>
          </div>
          <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[11px] font-bold text-gray-400 uppercase leading-relaxed">
              <ul className="space-y-2 list-disc pl-4">
                <li>Use ontology-constrained extraction</li>
                <li>Distinguish null from zero evidence</li>
                <li>Tag modality and paradigm context</li>
              </ul>
              <ul className="space-y-2 list-disc pl-4">
                <li>Represent model-rated evidence map</li>
                <li>No biological truth commits without simulation</li>
                <li>Require citation receipts for all nodes</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-blue-500/20 text-xs font-black text-blue-500 uppercase tracking-widest italic">
              Outputs are model-rated evidence; not biological truth commits.
            </div>
          </div>
        </section>

        {/* 9. Citation QA Status */}
        <div className="p-6 bg-black/60 border border-white/10 rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
              <List size={20} />
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Citation QA Status</div>
              <p className="text-[11px] font-bold text-gray-400 uppercase leading-relaxed">
                Citation status: candidate bibliography. Sources require validation against DOI, OpenAlex, Semantic Scholar, or primary publisher records.
              </p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-full border border-amber-500/20 text-[10px] font-black text-amber-500 uppercase tracking-widest">
            Pending Validation
          </div>
        </div>

        {/* Back Navigation */}
        <div className="flex justify-center pt-10">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-3 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-black text-gray-400 hover:text-gray-200 uppercase tracking-[0.3em] transition-all"
          >
            <Zap size={14} className="text-amber-500" />
            <span>Return to Top</span>
          </button>
        </div>
      </div>
    )
  });

  // Wiki Index Item
  registry.register({
    key: 'wiki-index-deep-research',
    slot: 'WIKI',
    label: 'Wiki Index',
    priority: 1000,
    render: () => (
      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
        <div className="flex items-center space-x-3 text-gray-500 uppercase tracking-[0.4em] font-black text-[10px]">
          <BookOpen size={14} />
          <span>Gamma Arena Knowledge Base</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl hover:bg-amber-500/10 transition-all cursor-default group">
            <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-2">Deep Research: Gamma Arena as Scientific Discovery Game</h3>
            <p className="text-[11px] font-bold text-gray-500 uppercase leading-relaxed mb-4">
              A strategic synthesis exploring the protocolized discovery architecture and the four-plane doctrine.
            </p>
            <div className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest group-hover:text-amber-500">
              ACTIVE ARTICLE :: SCROLL TO VIEW
            </div>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl opacity-40 cursor-not-allowed">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Biophysical Harness Protocols</h3>
            <p className="text-[11px] font-bold text-gray-500 uppercase leading-relaxed mb-4">
              Documentation for L4+ Apical/Basal dendritic integration and laminar predictive routing.
            </p>
            <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
              CONTENT PENDING
            </div>
          </div>
        </div>
      </div>
    )
  });
};

import { agents } from '@/lib/agents';

export default function AgentsPage() {
    return (
        <main className="px-4 py-10">
            <h1 className="text-2xl font-bold mb-6 border-b border-white/20 pb-4">Agents Marketplace</h1>
            <div className="grid gap-4">
                {agents.map((agent) => (
                    <div key={agent.name} className="bg-slate-900 text-white p-4 rounded shadow hover:scale-105 transition-transform mb-4">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-semibold">{agent.name}</h2>
                            <span className="text-xs bg-white text-black px-2 py-0.5 rounded">{agent.access}</span>
                        </div>
                        <p className="text-sm opacity-80 mt-1">{agent.description}</p>
                        <button className="bg-white text-black px-4 py-2 mt-3 rounded font-semibold hover:bg-gray-200">
                            {agent.cta}
                        </button>
                        <p className="text-xs mt-2 text-gray-400 italic">Requires Blockbreif subscription.</p>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default function AgentsPage() {
    const agents = [
        { name: "News Aggregator", type: "FREE", desc: "Filters crypto Twitter for verified breaking news." },
        { name: "Sentiment Bot", type: "BETA", desc: "Analyzes social volume vs price action." },
        { name: "Whale Watcher", type: "PRO", desc: "Tracks wallets >$10M movement on-chain." },
    ];

    return (
        <main className="px-4 py-10">
            <h1 className="text-2xl font-bold mb-6 border-b border-white/20 pb-4">Agents Marketplace</h1>
            <div className="grid gap-4">
                {agents.map((agent) => (
                    <div key={agent.name} className="bg-gray-900 border border-gray-800 p-4 rounded">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{agent.name}</h3>
                            <span className="text-xs bg-white text-black px-2 py-0.5 rounded font-bold">{agent.type}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{agent.desc}</p>
                        <button className="mt-4 w-full border border-white/20 py-2 rounded text-sm hover:bg-white text-white hover:text-black transition-colors font-semibold">
                            {agent.type === 'PRO' ? 'Unlock Access' : 'Activate'}
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}

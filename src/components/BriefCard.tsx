export default function BriefCard({ symbol, price, change }: { symbol: string, price: number, change: number }) {
    const isPositive = change >= 0;
    return (
        <div className="bg-white text-black p-4 rounded shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-bold uppercase">{symbol}</h2>
                <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{change.toFixed(2)}% / 24h
                </span>
            </div>
            <p className="text-sm font-medium opacity-80">Price: ${price.toLocaleString()}</p>
        </div>
    );
}

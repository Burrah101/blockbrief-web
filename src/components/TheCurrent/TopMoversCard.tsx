interface TopMover {
  symbol: string;
  price: number;
  change24h: number;
}

interface TopMoversCardProps {
  gainers: TopMover[];
  losers: TopMover[];
}

export default function TopMoversCard({
  gainers,
  losers,
}: TopMoversCardProps) {
  const renderRow = (coin: TopMover, positive: boolean) => (
    <div
      key={coin.symbol}
      className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0"
    >
      <div className="font-medium">{coin.symbol}</div>

      <div className="text-right">
        <div>${coin.price.toLocaleString()}</div>

        <div
          className={
            positive
              ? "text-green-400 text-sm"
              : "text-red-400 text-sm"
          }
        >
          {positive ? "+" : ""}
          {coin.change24h.toFixed(2)}%
        </div>
      </div>
    </div>
  );

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold mb-6">
        📈 Top Movers
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-green-400 mb-4">
            Top Gainers
          </h3>

          {gainers.length ? (
            gainers.map(g => renderRow(g, true))
          ) : (
            <p className="text-gray-500">
              No gainers available.
            </p>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-red-400 mb-4">
            Top Losers
          </h3>

          {losers.length ? (
            losers.map(l => renderRow(l, false))
          ) : (
            <p className="text-gray-500">
              No losers available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
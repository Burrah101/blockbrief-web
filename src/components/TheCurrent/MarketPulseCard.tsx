interface MarketPulseProps {
  score: number;
  sentiment: "Bullish" | "Neutral" | "Bearish";
  summary: string;
}

export default function MarketPulseCard({
  score,
  sentiment,
  summary,
}: MarketPulseProps) {
  const color =
    sentiment === "Bullish"
      ? "text-green-400"
      : sentiment === "Bearish"
      ? "text-red-400"
      : "text-yellow-400";

  const bg =
    sentiment === "Bullish"
      ? "border-green-500/30"
      : sentiment === "Bearish"
      ? "border-red-500/30"
      : "border-yellow-500/30";

  return (
    <section
      className={`rounded-xl border ${bg} bg-white/5 p-6 mb-8`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-widest">
            Market Pulse
          </p>

          <h2 className={`text-3xl font-bold ${color}`}>
            {sentiment}
          </h2>
        </div>

        <div className="text-right">
          <div className="text-5xl font-bold">
            {score}
          </div>

          <div className="text-gray-500 text-sm">
            /100
          </div>
        </div>
      </div>

      <p className="mt-6 text-gray-300 leading-7">
        {summary}
      </p>
    </section>
  );
}
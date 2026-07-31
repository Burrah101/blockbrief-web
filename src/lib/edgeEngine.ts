export function generateEdge({ ecosystems, opportunities, macro }) {
  let signals = [];

  // Ecosystem scoring logic
  const top = ecosystems.sort((a, b) => b.score - a.score);

  const leader = top[0]?.ecosystem;
  const runner = top[1]?.ecosystem;

  if (leader) {
    signals.push(`${leader} is currently leading builder momentum.`);
  }

  if (runner) {
    signals.push(`${runner} is following closely with strong activity.`);
  }

  // Early-stage detection
  const early = ecosystems.find(
    (e) => e.ecosystem.toLowerCase() === "monad"
  );

  if (early && early.score > 80) {
    signals.push(
      "Monad is entering early ecosystem expansion phase — high upside for early builders."
    );
  }

  // Opportunities signal
  if (opportunities?.length) {
    signals.push(
      "Multiple active grant and hackathon opportunities are available across ecosystems."
    );
  }

  // Macro influence
  if (macro?.length) {
    signals.push(
      "Macro conditions remain stable with neutral pressure on crypto markets."
    );
  }

  return {
    title: "Today’s Edge",
    signals,
    positioning:
      "Position early in emerging ecosystems while maintaining exposure to dominant chains.",
  };
}
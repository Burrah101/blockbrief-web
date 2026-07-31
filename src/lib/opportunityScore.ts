export function scoreOpportunities(ecosystems: any[]) {
  if (!ecosystems || ecosystems.length === 0) return [];

  return ecosystems.map((eco) => {
    const score = eco.score || 0;

    let label = "Neutral";
    let color = "text-gray-400";
    let description = "No strong signal yet";

    if (score >= 90) {
      label = "High Upside";
      color = "text-green-400";
      description = "Early momentum — explore immediately";
    } else if (score >= 75) {
      label = "Growth";
      color = "text-blue-400";
      description = "Strong activity — competitive space";
    } else if (score >= 60) {
      label = "Structured";
      color = "text-amber-400";
      description = "Stable ecosystem — funding & governance";
    } else {
      label = "Low Activity";
      color = "text-gray-500";
      description = "Limited signals right now";
    }

    return {
      name: eco.ecosystem,
      score,
      label,
      color,
      description,
    };
  });
}
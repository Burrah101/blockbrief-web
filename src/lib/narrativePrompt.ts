import { DailyBrief } from "./briefComposer";
import { MarketPulse } from "./marketPulse";

interface PromptInput {
  pulse: MarketPulse;
  brief: DailyBrief;
}

export function buildNarrativePrompt({
  pulse,
  brief,
}: PromptInput): string {

  return `
You are a professional crypto market editor.

Write a premium executive briefing.

Requirements:

• Maximum 250 words.

• Professional.

• No hype.

• No emojis.

• No bullet lists.

• Explain WHY today's market matters.

Market Sentiment:

${pulse.sentiment}

Market Score:

${pulse.score}/100

Summary:

${brief.summary}

Headline:

${brief.headline}

Key Points:

${brief.keyPoints.join("\n")}

Return ONLY the article.
`;
}
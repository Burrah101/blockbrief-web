import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateArticle(
  prompt: string
): Promise<string> {
  try {
    const response = await client.responses.create({
      model: "gpt-5",
      input: prompt,
      temperature: 0.4,
      max_output_tokens: 500,
    });

    return response.output_text.trim();
  } catch (error) {
    console.error("AI generation failed:", error);

    return "Unable to generate today's executive briefing.";
  }
}
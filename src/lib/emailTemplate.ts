export function buildNewsletterEmail(newsletter: {
  title: string;
  summary: string;
  market_pulse: string;
  headlines: string[];
}) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto">

      <h1>${newsletter.title}</h1>

      <p>
        <strong>Market Pulse:</strong>
        ${newsletter.market_pulse}
      </p>

      <p>${newsletter.summary}</p>

      <h2>Top Headlines</h2>

      <ul>
        ${newsletter.headlines
          .map((h) => `<li>${h}</li>`)
          .join("")}
      </ul>

      <hr>

      <p>
        BlockBrief • Signal Driven Crypto Intelligence
      </p>

    </div>
  `;
}
'use client';

import { useState } from "react";

interface Newsletter {
  id: number;
  status: string;

  title: string;
  date: string;
  marketPulse: string;
  summary: string;
  headlines: string[];
}

export default function NewsletterPreview() {
  const [newsletter, setNewsletter] = useState<Newsletter>({
    id: 0,
    status: "draft",

    title: "BlockBrief Daily",
    date: new Date().toLocaleDateString(),

    marketPulse: "Neutral",

    summary:
      "Markets continue consolidating while builder activity remains healthy. Bitcoin is holding support while capital rotates into infrastructure projects.",

    headlines: [
      "Bitcoin remains range bound",
      "Ethereum builder activity continues",
      "Capital rotates into infrastructure",
      "Stablecoin adoption increases",
      "Layer-2 usage remains strong",
    ],
  });

  const [publishing, setPublishing] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function generateNewsletterPreview() {
    setStatus("");

    try {
      const res = await fetch("/api/newsletter/generate");

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to generate newsletter");
      }

      setNewsletter(data);

      setStatus("✅ Daily brief generated successfully!");
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    }
  }

  async function publishNewsletter() {
    setPublishing(true);
    setStatus("");

    try {
      const res = await fetch("/api/newsletter/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newsletter.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Publish failed");
      }

      setStatus("✅ Newsletter published successfully!");
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setPublishing(false);
    }
  }

  async function sendNewsletter() {
    setSending(true);
    setStatus("");

    try {
      const res = await fetch("/api/newsletter/send", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to send newsletter");
      }

      setStatus(`✅ Newsletter sent to ${data.sent} subscriber(s)!`);
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-10">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Daily Brief Preview
        </h1>

        <p className="text-gray-400 mt-2">
          Internal publishing dashboard
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900 p-8 space-y-8">

        <div>
          <h2 className="text-3xl font-bold">
            {newsletter.title}
          </h2>

          <p className="text-gray-500">
            {newsletter.date}
          </p>

          <div className="mt-2 flex gap-2 text-sm">
            <span className="rounded bg-yellow-500/20 px-2 py-1">
              Draft ID: {newsletter.id}
            </span>

            <span className="rounded bg-blue-500/20 px-2 py-1 capitalize">
              {newsletter.status}
            </span>
          </div>
        </div>

        <section>
          <h3 className="text-xl font-bold mb-3">
            Market Pulse
          </h3>

          <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4">
            {newsletter.marketPulse}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">
            Executive Summary
          </h3>

          <p className="leading-8">
            {newsletter.summary}
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">
            Top Headlines
          </h3>

          <ul className="space-y-3 list-disc pl-6">
            {newsletter.headlines.map((headline) => (
              <li key={headline}>{headline}</li>
            ))}
          </ul>
        </section>

      </div>

      <div className="mt-10 flex flex-wrap gap-4">

        <button
          onClick={generateNewsletterPreview}
          className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400"
        >
          Generate Today's Brief
        </button>

        <button
          onClick={publishNewsletter}
          disabled={publishing || newsletter.id === 0}
          className="rounded-lg bg-green-600 px-6 py-3 font-semibold hover:bg-green-500 disabled:opacity-50"
        >
          {publishing ? "Publishing..." : "Publish"}
        </button>

        <button
          onClick={sendNewsletter}
          disabled={sending}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send Newsletter"}
        </button>

      </div>

      {status && (
        <div className="mt-6 rounded-lg border border-white/10 bg-black/40 p-4">
          {status}
        </div>
      )}

      <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-6">

        <h3 className="text-lg font-bold mb-3">
          Publishing Pipeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">

          <div className="rounded-lg bg-green-500/20 border border-green-500/30 p-4">
            Generate
          </div>

          <div className="rounded-lg bg-green-500/20 border border-green-500/30 p-4">
            Preview
          </div>

          <div className="rounded-lg bg-green-500/20 border border-green-500/30 p-4">
            Publish
          </div>

          <div className="rounded-lg bg-green-500/20 border border-green-500/30 p-4">
            Archive
          </div>

          <div className="rounded-lg bg-blue-500/20 border border-blue-500/30 p-4">
            Email
          </div>

        </div>

      </div>

    </main>
  );
}
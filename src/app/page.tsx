import { CurrentDashboard } from "@/components/TheCurrent";
import { EmailCapture, SocialProof } from "@/components/Subscribe";
import { getDailyBrief } from "@/lib/getDailyBrief";
import Link from "next/link";

export const revalidate = 300;

export default async function HomePage() {

  const { dailyBrief } = await getDailyBrief();

  return (
    <main className="px-4 py-8">

      {/* Hero */}

      <section className="text-center mb-12">

        <h1 className="text-4xl font-bold mb-3">
          BlockBrief
        </h1>

        <p className="text-lg text-gray-400 mb-6">
          Signal-driven crypto intelligence.
          Stay oriented, not addicted.
        </p>

        <SocialProof variant="compact" />

      </section>

      {/* Dashboard */}

      <section className="mb-12">

        <CurrentDashboard
          initialInsights={dailyBrief}
        />

      </section>

      <section className="mb-12">
        <EmailCapture variant="hero" />
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">

        <Link
          href="/brief"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center"
        >
          📊
          <div>Live Brief</div>
        </Link>

        <Link
          href="/alerts"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center"
        >
          🚨
          <div>Alerts</div>
        </Link>

        <Link
          href="/agents"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center"
        >
          🤖
          <div>Agents</div>
        </Link>

        <Link
          href="/sponsored"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center"
        >
          💼
          <div>Sponsored</div>
        </Link>

      </section>

    </main>
  );

}
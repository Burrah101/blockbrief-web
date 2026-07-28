import Link from "next/link";
import { getBuilderActivity } from "@/lib/fetchData";

export const revalidate = 300;

export default async function BuilderWatchPage() {
  const builders = await getBuilderActivity();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold">
            🛠 Builder Watch
          </h1>

          <p className="text-gray-400 mt-2">
            Follow builders instead of headlines. Track real ecosystem progress.
          </p>
        </div>

        <Link
          href="/"
          className="rounded-lg border border-white/10 px-4 py-2 hover:bg-white/5 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="text-3xl font-bold">{builders.length}</div>
          <div className="text-sm text-gray-400 mt-1">
            Builder Updates
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="text-3xl font-bold">24h</div>
          <div className="text-sm text-gray-400 mt-1">
            Activity Window
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="text-3xl font-bold">Live</div>
          <div className="text-sm text-gray-400 mt-1">
            Data Status
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="text-3xl font-bold">AI</div>
          <div className="text-sm text-gray-400 mt-1">
            Insight Ready
          </div>
        </div>
      </div>

      {!builders.length ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
          <h2 className="text-2xl font-semibold">
            No Builder Activity
          </h2>

          <p className="text-gray-400 mt-3">
            Builder updates will automatically appear as new ecosystem activity is detected.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {builders.map((builder: any, index: number) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">
                    {builder.title ??
                      builder.project ??
                      builder.name ??
                      "Builder Update"}
                  </h2>

                  {(builder.network || builder.source) && (
                    <div className="text-sm text-gray-500 mt-1">
                      {builder.network ?? builder.source}
                    </div>
                  )}
                </div>

                {builder.date && (
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {builder.date}
                  </div>
                )}
              </div>

              {(builder.summary ||
                builder.description ||
                builder.content) && (
                <p className="mt-5 leading-7 text-gray-300">
                  {builder.summary ??
                    builder.description ??
                    builder.content}
                </p>
              )}

              {builder.url && (
                <div className="mt-6">
                  <a
                    href={builder.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    View Original Source →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
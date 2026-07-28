import Link from "next/link";
import { getBuilderActivity } from "@/lib/fetchData";

export const revalidate = 300;

export default async function BuilderWatchPage() {
  const builders = await getBuilderActivity();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            🛠 Builder Watch
          </h1>

          <p className="text-gray-400 mt-2">
            Follow ecosystem development instead of market noise.
          </p>
        </div>

        <Link
          href="/"
          className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5"
        >
          ← Dashboard
        </Link>
      </div>

      {!builders || builders.length === 0 ? (
        <div className="rounded-xl border border-white/10 p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Builder Activity
          </h2>

          <p className="text-gray-400 mt-2">
            No development updates were found during this refresh.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {builders.map((builder: any, index: number) => (
            <article
              key={index}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {builder.title ??
                      builder.project ??
                      builder.name ??
                      "Untitled Update"}
                  </h2>

                  {(builder.source || builder.network) && (
                    <p className="text-sm text-gray-500 mt-1">
                      {builder.network ?? builder.source}
                    </p>
                  )}
                </div>

                {builder.date && (
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {builder.date}
                  </span>
                )}
              </div>

              {(builder.summary ||
                builder.description ||
                builder.content) && (
                <p className="mt-4 text-gray-300 leading-7">
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
                    View Original →
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
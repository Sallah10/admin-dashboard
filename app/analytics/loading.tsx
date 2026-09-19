// app/analytics/loading.tsx
export default function AnalyticsLoading() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl animate-pulse">
      <div className="mb-8">
        <div className="h-7 w-48 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-2 h-4 w-72 rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6"
          >
            <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-4 h-8 w-24 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-6 space-y-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="flex items-center justify-between gap-4">
                  <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
        <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-6 flex h-56 items-end gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gray-200 dark:bg-gray-700"
              style={{ height: `${30 + ((i * 17) % 60)}%` }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
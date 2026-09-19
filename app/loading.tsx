// app/loading.tsx
export default function Loading() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl animate-pulse">
      <div className="h-7 w-32 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mt-2 h-4 w-64 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="relative mt-5 max-w-md">
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="space-y-3 p-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
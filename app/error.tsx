// app/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white dark:bg-gray-900 dark:border-gray-700 p-10 rounded-xl shadow-sm border border-gray-200 text-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          An unexpected error occurred while rendering this page.
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
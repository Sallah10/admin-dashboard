import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <p className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">404</p>
        <h1 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
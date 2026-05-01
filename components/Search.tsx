// components/Search.tsx
"use client";

import { RotateCwIcon, SearchIcon, XIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce"; // NEW IMPORT

type Props = {
  query?: string;
};

export default function Search({ query }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // SENIOR FIX: Wrap the handler in useDebouncedCallback
  // This waits 300ms after the user stops typing before executing
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  // Reset button handler
  const handleReset = () => {
    startTransition(() => {
      router.replace(pathname);
    });
  };

  return (
    <div className="relative mt-5 max-w-md">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="mr-3 h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          name="search"
          autoComplete="off"
          id="search"
          className="h-10 block w-full rounded-md border border-gray-200 pl-9 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
          placeholder="Search by name or email..."
          onChange={(event) => handleSearch(event.target.value)}
          defaultValue={query}
        />
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center gap-2 pr-3">
          {isPending && (
            <RotateCwIcon className="animate-spin h-4 w-4 text-indigo-600" />
          )}
          {query && (
            <button
              onClick={handleReset}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Clear search"
              disabled={isPending}
            >
              <XIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
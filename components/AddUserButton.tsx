// components/AddUserButton.tsx
"use client";

import { createUser } from "@/app/actions/user";
import { Dialog, Transition } from "@headlessui/react";
import { Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { Fragment, useRef, useState, useTransition } from "react";

export default function AddUserButton() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const close = () => {
    setError(null);
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await createUser(formData);
      if (result?.error) {
        setError(result.error);
        return;
      }
      formRef.current?.reset();
      close();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <PlusIcon className="h-4 w-4" />
        Add user
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 p-6 shadow-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Add user
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={close}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md transition-colors"
                      title="Close"
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <Dialog.Description className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    A new user can still sign in later with the same email via GitHub OAuth.
                  </Dialog.Description>

                  <form ref={formRef} onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                      <label
                        htmlFor="new-user-name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Name
                      </label>
                      <input
                        id="new-user-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="off"
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Ada Lovelace"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="new-user-email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </label>
                      <input
                        id="new-user-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="off"
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="ada@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="new-user-role"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Role
                      </label>
                      <select
                        id="new-user-role"
                        name="role"
                        defaultValue="USER"
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={close}
                        className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isPending}
                        className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
                      >
                        {isPending && <Loader2Icon className="h-4 w-4 animate-spin" />}
                        Add user
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
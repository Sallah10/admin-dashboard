// components/PromoteUserButton.tsx
"use client";

import { updateUserRole } from "@/app/actions/user";
import type { Role } from "@prisma/client";
import { Loader2Icon, ShieldMinusIcon, ShieldPlusIcon } from "lucide-react";
import { useState, useTransition } from "react";

type Props = {
  userId: string;
  role: Role;
};

export default function PromoteUserButton({ userId, role }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isAdmin = role === "ADMIN";

  const handleToggle = () => {
    startTransition(async () => {
      const target: Role = isAdmin ? "USER" : "ADMIN";
      const result = await updateUserRole(userId, target);
      if (result?.error) {
        setError(result.error);
        setTimeout(() => setError(null), 3000);
      }
    });
  };

  if (error) {
    return <span className="text-xs text-red-500 font-medium">{error}</span>;
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      title={isAdmin ? "Demote to user" : "Promote to admin"}
      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors disabled:opacity-50"
    >
      {isPending ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : isAdmin ? (
        <ShieldMinusIcon className="h-4 w-4" />
      ) : (
        <ShieldPlusIcon className="h-4 w-4" />
      )}
    </button>
  );
}
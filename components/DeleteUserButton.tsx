// components/DeleteUserButton.tsx
"use client";

import { useState, useTransition } from "react";
import { deleteUser } from "@/app/actions/user";
import { Trash2Icon, Loader2Icon, XIcon, CheckIcon } from "lucide-react";

export default function DeleteUserButton({ userId }: { userId: string }) {
    const [isPending, startTransition] = useTransition();
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConfirm = () => {
        startTransition(async () => {
            const result = await deleteUser(userId);
            if (result?.error) {
                // Catch the error gracefully instead of crashing the app
                setError(result.error);
                setIsConfirming(false);
                // Clear error toast after 3 seconds
                setTimeout(() => setError(null), 3000);
            }
        });
    };

    // If there's an error, show a temporary error toast inline
    if (error) {
        return <span className="text-sm text-red-500 font-medium px-2">{error}</span>;
    }

    // The confirmation state UI
    if (isConfirming) {
        return (
            <div className="flex items-center justify-end space-x-2">
                <span className="text-xs text-red-600 font-medium mr-1">Sure?</span>
                <button
                    onClick={handleConfirm}
                    disabled={isPending}
                    className="p-1.5 bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors disabled:opacity-50"
                    title="Confirm Delete"
                >
                    {isPending ? <Loader2Icon className="w-4 h-4 animate-spin" /> : <CheckIcon className="w-4 h-4" />}
                </button>
                <button
                    onClick={() => setIsConfirming(false)}
                    disabled={isPending}
                    className="p-1.5 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md transition-colors disabled:opacity-50"
                    title="Cancel"
                >
                    <XIcon className="w-4 h-4" />
                </button>
            </div>
        );
    }

    // The default state UI
    return (
        <button
            onClick={() => setIsConfirming(true)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
            title="Delete User"
        >
            <Trash2Icon className="w-4 h-4" />
        </button>
    );
}
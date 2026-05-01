// app/actions/user.ts
"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { revalidatePath } from "next/cache";

export async function deleteUser(userId: string) {
  const session = await getServerSession(authOptions);

  // 1. Authentication & Authorization Check
  // @ts-ignore
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can perform this action.");
  }

  // 2. Prevent self-deletion
  // @ts-ignore
  if (session.user.id === userId) {
    throw new Error("You cannot delete your own admin account.");
  }

  try {
    // 3. Database Mutation
    await prisma.user.delete({
      where: { id: userId },
    });

    // 4. Revalidate the cache so the table updates instantly without a hard refresh
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { error: "Failed to delete user." };
  }
}

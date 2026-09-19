// app/actions/user.ts
"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { revalidatePath } from "next/cache";

export async function deleteUser(userId: string) {
  const session = await getServerSession(authOptions);

  // 1. Authentication check
  if (!session?.user) {
    return { error: "You must be signed in to perform this action." };
  }

  // 2. Authorization check
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized: Only admins can perform this action." };
  }

  // 3. Prevent self-deletion
  if (session.user.id === userId) {
    return { error: "You cannot delete your own admin account." };
  }

  try {
    // 4. Database Mutation
    await prisma.user.delete({
      where: { id: userId },
    });

    // 5. Revalidate the cache so the table updates instantly without a hard refresh
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { error: "Failed to delete user." };
  }
}
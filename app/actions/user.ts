// app/actions/user.ts
"use server";

import { Prisma, Role } from "@prisma/client";
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

export async function createUser(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return { error: "You must be signed in to perform this action." };
  }

  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized: Only admins can perform this action." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = formData.get("role") === "ADMIN" ? Role.ADMIN : Role.USER;

  if (!name) {
    return { error: "Name is required." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "A valid email is required." };
  }

  try {
    await prisma.user.create({
      data: { name, email, role },
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "A user with that email already exists." };
    }
    console.error("Failed to create user:", error);
    return { error: "Failed to create user." };
  }
}

export async function updateUserRole(userId: string, role: Role) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return { error: "You must be signed in to perform this action." };
  }

  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized: Only admins can perform this action." };
  }

  if (session.user.id === userId && role !== "ADMIN") {
    return { error: "You cannot demote your own admin account." };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return { error: "Failed to update user role." };
  }
}
// app/page.tsx
import { Card, Text, Title } from "@tremor/react";
import Search from "@/components/Search";
import UsersTable from "@/components/UsersTable";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const session = await getServerSession(authOptions);

  // 1. ROUTE PROTECTION: If no session, show a friendly empty state
  if (!session) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center">
          <Title className="text-2xl mb-2">Welcome to AdMean</Title>
          <Text>Please sign in with GitHub to view and manage users.</Text>
        </div>
      </main>
    );
  }

  const query = searchParams.q;
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      email: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A table of users retrieved from our database.</Text>
      <Search query={searchParams.q} />
      <Card className="mt-6">
        {/* Pass the current user's role to the table */}
        {/* @ts-ignore */}
        <UsersTable users={users} currentUserRole={session.user.role} />
      </Card>
    </main>
  );
}
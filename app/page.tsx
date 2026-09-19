// app/page.tsx
import { Card, Text, Title } from "@tremor/react";
import { Prisma } from "@prisma/client";
import AddUserButton from "@/components/AddUserButton";
import Search from "@/components/Search";
import UsersTable from "@/components/UsersTable";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import { authOptions } from "@/lib/auth";

const PAGE_SIZE = 8;

type Props = {
  searchParams: {
    q?: string;
    page?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const session = await getServerSession(authOptions);

  // 1. ROUTE PROTECTION: If no session, show a friendly empty state
  if (!session) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white dark:bg-gray-900 dark:border-gray-700 p-10 rounded-xl shadow-sm border border-gray-200 text-center">
          <Title className="text-2xl mb-2">Welcome to AdMean</Title>
          <Text>Please sign in with GitHub to view and manage users.</Text>
        </div>
      </main>
    );
  }

  const query = searchParams.q?.trim() ?? "";
  const requestedPage = Math.max(1, Number(searchParams.page) || 1);

  // 2. BUILD FILTER: "name OR email" so a partial match on either field shows up
  const where: Prisma.UserWhereInput = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      }
    : {};

  // 3. Count first so the requested page never exceeds the last page
  const totalCount = await prisma.user.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);

  // 4. Fetch only the current page of results
  const users = await prisma.user.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Title>Users</Title>
          <Text>A table of users retrieved from our database.</Text>
        </div>
        {session.user.role === "ADMIN" && <AddUserButton />}
      </div>
      <Search query={searchParams.q} />
      <Card className="mt-6">
        {/* Pass the current user's role to the table */}
        <UsersTable
          users={users}
          currentUserRole={session.user.role}
          viewerId={session.user.id}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={PAGE_SIZE}
          query={query}
        />
      </Card>
    </main>
  );
}
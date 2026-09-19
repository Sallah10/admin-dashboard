// components/UsersTable.tsx
import Link from "next/link";
import { Role, User } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Badge,
  Text,
} from "@tremor/react";
import DeleteUserButton from "./DeleteUserButton";
import PromoteUserButton from "./PromoteUserButton";

type Props = {
  users: User[];
  currentUserRole?: Role;
  viewerId?: string;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  query: string;
};

const roleBadgeColor: Record<Role, "indigo" | "slate"> = {
  ADMIN: "indigo",
  USER: "slate",
};

function pageHref(page: number, query: string) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}

export default function UsersTable({
  users,
  currentUserRole,
  viewerId,
  totalCount,
  currentPage,
  totalPages,
  pageSize,
  query,
}: Props) {
  const isAdmin = currentUserRole === "ADMIN";
  const prevHref = currentPage > 1 ? pageHref(currentPage - 1, query) : undefined;
  const nextHref = currentPage < totalPages ? pageHref(currentPage + 1, query) : undefined;
  const from = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalCount);

  // Show "no users found" message if the array is empty
  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <Text className="text-gray-500 dark:text-gray-400">No users found</Text>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Created At</TableHeaderCell>
            {isAdmin && <TableHeaderCell className="text-right">Actions</TableHeaderCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium text-gray-900 dark:text-gray-100">{user.name}</TableCell>
              <TableCell className="text-gray-600 dark:text-gray-300">{user.email}</TableCell>
              <TableCell>
                <Badge color={roleBadgeColor[user.role]}>{user.role}</Badge>
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-300">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium"
                }).format(user.createdAt)}
              </TableCell>
              {isAdmin && (
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {user.id !== viewerId && <PromoteUserButton userId={user.id} role={user.role} />}
                    <DeleteUserButton userId={user.id} />
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalCount > pageSize && (
        <div className="flex items-center justify-between mt-4 px-1">
          <Text className="text-gray-500 dark:text-gray-400">
            Showing {from}–{to} of {totalCount}
          </Text>
          <div className="flex items-center gap-2">
            <Link
              href={prevHref ?? "/"}
              aria-disabled={!prevHref}
              className={
                prevHref
                  ? "inline-flex items-center rounded-md border border-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                  : "pointer-events-none inline-flex items-center rounded-md border border-gray-200 px-3 py-1 text-sm font-medium text-gray-300 dark:border-gray-800 dark:text-gray-600"
              }
            >
              Previous
            </Link>
            <Text className="text-gray-500 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </Text>
            <Link
              href={nextHref ?? "/"}
              aria-disabled={!nextHref}
              className={
                nextHref
                  ? "inline-flex items-center rounded-md border border-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                  : "pointer-events-none inline-flex items-center rounded-md border border-gray-200 px-3 py-1 text-sm font-medium text-gray-300 dark:border-gray-800 dark:text-gray-600"
              }
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
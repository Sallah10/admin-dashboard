// components/UsersTable.tsx
import { User } from "@prisma/client";
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

type Props = {
  users: User[];
  currentUserRole?: string; // NEW PROP
};

export default function UsersTable({ users, currentUserRole }: Props) {
  const isAdmin = currentUserRole === "ADMIN";

  // Show "no users found" message if the array is empty
  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <Text className="text-gray-500">No users found</Text>
      </div>
    );
  }

  return (
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
            <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {/* @ts-ignore */}
              <Badge color={user.role === "ADMIN" ? "indigo" : "slate"}>
                {/* @ts-ignore */}
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium"
              }).format(user.createdAt)}
            </TableCell>
            {isAdmin && (
              <TableCell className="text-right">
                <DeleteUserButton userId={user.id} />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
import { getAllUsersForDashboard } from "@/app/api/interfaces/users/users.api";
import {
  TableHeadCell,
  TableBody,
  TableHead,
  Table,
  Spinner,
} from "flowbite-react";
import { Suspense } from "react";
import { UserList } from "./components/users-list";

// Very nextjs staff don't touch
export const revalidate = 0;

export default async function Users() {
  const users = await getAllUsersForDashboard();

  return (
    <section className="max-h-[90dvh]">
      <a href="/admin/dashboard/users/new" className="dashboard__button mb-4">
        Add new user
      </a>
      <Table>
        <TableHead>
          <TableHeadCell>id</TableHeadCell>
          <TableHeadCell>name</TableHeadCell>
          <TableHeadCell>email</TableHeadCell>
          <TableHeadCell>Edit/Delete</TableHeadCell>
        </TableHead>
        <TableBody>
          <Suspense fallback={<Spinner />}>
            <UserList users={users} />
          </Suspense>
        </TableBody>
      </Table>
    </section>
  );
}

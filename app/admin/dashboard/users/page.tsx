import { getAllUsersForDashboard } from "@/app/api/interfaces/users/users.api";
import { Suspense } from "react";
import { UserList } from "./components/users-list";
import { SpinnerDiamond } from "spinners-react";

// Very nextjs staff don't touch
export const revalidate = 0;

export default async function Users() {
  const users = await getAllUsersForDashboard();

  return (
    <section className="max-h-[90dvh] min-w-max">
      <a href="/admin/dashboard/users/new" className="dashboard__button mb-4">
        Add new user
      </a>
      <table className="w-full rounded-t-lg">
        <thead>
          <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
            <th className="px-5 py-3">ID</th>
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">Edit/delete</th>
          </tr>
        </thead>
        <tbody className="text-zinc-500">
          <Suspense
            fallback={
              <SpinnerDiamond
                color="black"
                className="absolute inset-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              />
            }
          >
            <UserList users={users} />
          </Suspense>
        </tbody>
      </table>
    </section>
  );
}

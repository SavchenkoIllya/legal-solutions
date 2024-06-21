import Login from "../components/login";
import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/auth";
import { isExistUsers } from "@/app/api/interfaces/users/users.api";

// Very nextjs staff don't touch
export const revalidate = 0;

export default async function SignIn() {
  const session = await auth();
  const isUsers = await isExistUsers();
  if (session) return redirect("/admin/dashboard");
  if (!isUsers) return redirect("/admin");

  return (
    <section className="flex flex-center h-[100dvh]">
      <Login />
    </section>
  );
}

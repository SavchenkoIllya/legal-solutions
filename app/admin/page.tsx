import { redirect } from "next/navigation";
import { isExistUsers } from "../api/interfaces/users/users.api";
import FirstRegistration from "./components/first-registration";
import { auth } from "../api/auth/auth";

// Very nextjs staff don't touch
export const revalidate = 0;

export default async function Registration() {
  const isUsers = await isExistUsers();
  const session = await auth();
  if (session) return redirect("/admin/dashboard");
  if (isUsers) return redirect("/admin/signin");

  return (
    <section className="flex flex-center h-[100dvh]">
      <FirstRegistration />
    </section>
  );
}

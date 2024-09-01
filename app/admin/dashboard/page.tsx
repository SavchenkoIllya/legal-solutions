import { redirect } from "next/navigation";

export default async function Dashboard() {
  redirect("/admin/dashboard/users");
  return <section className="min-h-[90dvh]">Hi dashboard</section>;
}

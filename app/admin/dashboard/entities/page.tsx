import { getContacts } from "@/app/api/interfaces/contacts.ts/contacts.api";
import Entities from "./components/entities";

export const revalidate = 0;

export default async function EntitiesPage() {
  const contacts = await getContacts();
  const data = { contacts };

  return (
    <section className="min-h-[90dvh]">
      <Entities data={data} />
    </section>
  );
}

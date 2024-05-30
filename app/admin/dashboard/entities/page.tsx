import { getContacts } from "@/app/api/interfaces/contacts/contacts.api";
import Entities from "./components/entities";
import { Suspense } from "react";
import { Spinner } from "flowbite-react";

export const revalidate = 0;

export default async function EntitiesPage() {
  const contacts = await getContacts();
  const data = { contacts };


  // FIXME: suspense 
  return (
    <section className="min-h-[90dvh]">
      <Suspense fallback={<Spinner className="m-4" />}>
        <Entities data={data} />
      </Suspense>
    </section>
  );
}

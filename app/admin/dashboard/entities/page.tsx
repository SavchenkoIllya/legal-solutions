import { getContacts } from "@/app/api/interfaces/contacts/contacts.api";
import Entities from "./components/entities";
import { Suspense } from "react";
import { SpinnerDiamond } from "spinners-react";
import { getCarousels } from "@/app/api/interfaces/carousel/carousel.api";
import { getPosts } from "@/app/api/interfaces/posts/posts.api";
import { getAllGroups } from "@/app/api/interfaces/groups/groups.api";

export const revalidate = 0;

export default async function EntitiesPage() {
  const contacts = await getContacts();
  const carousel = await getCarousels();
  const posts = await getPosts();
  const groups = await getAllGroups();
  const data = { contacts, carousel, posts, groups };

  return (
    <section className="min-h-[90dvh]">
      <Suspense fallback={<SpinnerDiamond color="black" />}>
        <Entities data={data} />
      </Suspense>
    </section>
  );
}

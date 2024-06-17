import { Groups } from "@/app/api/interfaces/groups/types";
import Card from "./card/card";
import CategoryToggler from "./card/category-toggler";
import Link from "next/link";

export default async function Cards({
  groups,
  lang,
}: {
  groups: Groups[];
  lang?: string;
}) {
  return (
    <section className="my-16">
      <div id="wrapper" className="flex-center container mx-auto">
        <div id="content" className="w-[100%] px-8">
          <CategoryToggler />
          {!groups.length && (
            <h1 className="accent-font text-center my-[40px] grid grid-cols-1 gap-6 w-[100%]">
              No groups at this moment
            </h1>
          )}
          <div id="cards" className="my-[40px] grid grid-cols-5 gap-6 w-[100%]">
            {groups.map((group) => (
              <Card
                key={group.id}
                title={String(group[`title_${lang}` as keyof Groups])}
                description={String(
                  group[`description_${lang}` as keyof Groups]
                )}
                price={group.price_range}
              />
            ))}
          </div>
          <Link
            href="/group"
            className="text-button underline flex flex-center"
          >
            Get to see all
          </Link>
        </div>
      </div>
    </section>
  );
}

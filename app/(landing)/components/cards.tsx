import { Groups } from "@/app/api/interfaces/groups/types";
import Card from "./card/card";

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
          <div
            id="tabs"
            className="flex flex-center flex-wrap p-8 sm:gap-12 gap-4"
          >
            <div className="space-x-8 bg-red p-4 rounded-full text-white">
              <button data-active className="bg-dark py-4 px-4 rounded-full">
                Private
              </button>
              <button className="py-4 px-4">Business</button>
            </div>
          </div>
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
        </div>
      </div>
    </section>
  );
}

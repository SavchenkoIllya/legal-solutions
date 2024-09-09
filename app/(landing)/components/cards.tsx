import { Groups } from '@/app/api/interfaces/groups/types';
import Card from './card/card';
import CategoryToggler from './card/category-toggler';

export default async function Cards({
  groups,
  lang,
}: {
  groups: Groups[];
  lang?: string;
}) {
  return (
    <section id="cards" className="my-16">
      <div id="wrapper" className="container mx-auto flex-center">
        <div id="content" className="w-[100%] px-8">
          <CategoryToggler />
          {!groups.length && (
            <h1 className="accent-font text-center my-[40px] grid grid-cols-1 gap-6 w-[100%]">
              No groups at this moment
            </h1>
          )}
          <div className="my-[40px] grid grid-cols-5 gap-6 w-[100%]">
            {groups.map((group, idx) => (
              <Card
                elementId={idx}
                key={group.id}
                title={String(group[`title_${lang}` as keyof Groups])}
                description={String(
                  group[`description_${lang}` as keyof Groups]
                )}
                price={group.price_range}
                link={`/group?category=${group.category}&id=${group.id}&lang=${lang}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

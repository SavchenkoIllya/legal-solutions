"use client";
import SelectableItem from "./select-item";

export default function PostsSelect({
  selected,
  setIsSelected,
  posts,
}: {
  selected: any[];
  setIsSelected: any;
  posts: any[];
}) {
  return (
    <>
      <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
        <label
          htmlFor="title_ru"
          className="block mb-2 text-sm font-medium text-zinc-900 "
        >
          Posts
        </label>
        <div className="w-fit space-y-2 max-h-[300px] overflow-y-scroll">
          {posts.map((item) => {
            const isInSelected = selected.some((el) => el.id === item.id);
            return (
              <SelectableItem
                item={item}
                isCheckedProp={isInSelected}
                callback={setIsSelected}
              />
            );
          })}
        </div>
      </div>
      {/* selected posts wrapper */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {selected.map((item: any) => (
          <button className="dashboard__button__outlined max-w-[150px] line-clamp-1 truncate">
            {item?.title_ru!}
          </button>
        ))}
      </div>
    </>
  );
}

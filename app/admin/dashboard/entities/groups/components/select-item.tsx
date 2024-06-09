"use client";
import { Post } from "@/app/api/interfaces/posts/types";
import { useEffect, useState } from "react";

type SelectablePostsProps = {
  item: Pick<Post, "id" | "title_ru">;
  callback?: any;
  isCheckedProp?: boolean;
};

export default function SelectableItem({
  item,
  callback,
  isCheckedProp,
}: SelectablePostsProps) {
  const [isChecked, toCheck] = useState(false);

  useEffect(() => {
    if (isCheckedProp) toCheck(isCheckedProp);
  }, [isCheckedProp]);

  const handleClick = () => toCheck(!isChecked);

  useEffect(() => {
    if (isChecked) {
      // set is selected
      callback?.((prev: any[]) =>
        !prev.includes(item) ? [...prev, item] : prev
      );
    } else {
      // unselect
      callback?.((prev: any[]) =>
        prev.filter((selected) => selected.id !== item.id)
      );
    }
  }, [isChecked]);

  return (
    <div
      key={item.id}
      className="relative flex w-56 items-center rounded bg-zinc-50 py-3 px-4 pl-14 font-medium text-zinc-700"
      onClick={handleClick}
    >
      <input
        className="peer hidden"
        type="checkbox"
        name="title1"
        id="title1"
        checked={isChecked}
      />
      <label
        className="absolute left-0 top-0 h-full w-full cursor-pointer rounded border border-zinc-300 peer-checked:border-blue-600 peer-checked:bg-blue-100"
        htmlFor="title1"
      ></label>
      <div className="absolute left-4 h-5 w-5 rounded border-2 border-zinc-300 bg-zinc-200 ring-blue-600 ring-offset-2 peer-checked:border-transparent peer-checked:bg-blue-600 peer-checked:ring-2"></div>
      <span className="pointer-events-none z-10 max-w-[200px] truncate">
        {item.title_ru}
      </span>
    </div>
  );
}

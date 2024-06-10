"use client";
import { Categories } from "@/app/api/interfaces/groups/types";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CategoryToggler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  if (!params.get("category")) {
    params.set("category", "private");
    replace(`${pathname}?${params.toString()}`);
  }

  const handleChangeCategory = (category: Categories) => {
    params.set("category", category);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div id="tabs" className="flex flex-center flex-wrap p-8 sm:gap-12 gap-4">
      <div className="space-x-8 bg-red p-4 rounded-full text-white">
        <button
          onClick={() => handleChangeCategory("private")}
          data-active
          className="bg-dark py-4 px-4 rounded-full"
        >
          Private
        </button>
        <button
          onClick={() => handleChangeCategory("business")}
          className="py-4 px-4"
        >
          Business
        </button>
      </div>
    </div>
  );
}

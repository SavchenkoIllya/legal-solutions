"use client";
import { Categories } from "@/app/api/interfaces/groups/types";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex w-fit mx-auto mt-8 items-center gap-8 bg-red px-2 py-2 rounded-full text-white">
      <button
        onClick={() => handleChangeCategory("private")}
        data-active={params.get("category") === "private"}
        className="data-[active=true]:bg-dark py-2 px-4 rounded-full"
      >
        Private
      </button>
      <button
        data-active={params.get("category") === "business"}
        onClick={() => handleChangeCategory("business")}
        className="data-[active=true]:bg-dark py-2 px-4 rounded-full"
      >
        Business
      </button>
    </div>
  );
}

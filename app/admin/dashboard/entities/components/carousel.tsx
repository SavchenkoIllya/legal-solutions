"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiOutlinePlus } from "react-icons/hi";

export default function CarouselEntity() {
  const carouselItems = [];

  return (
    <Disclosure as="div" className="space-y-0">
      <DisclosureButton className="px-2 py-4 text-white bg-blue-500 w-full text-left rounded-lg data-[open]:rounded-b-none flex items-center justify-between">
        <h1>Carousel</h1>
        <div onClick={(e) => e.stopPropagation()}>
          <a href="/admin/dashboard/entities/new/carousel">
            <HiOutlinePlus size={24} className="hover:scale-110" />
          </a>
        </div>
      </DisclosureButton>
      <DisclosurePanel className="px-2 py-4 text-zinc-500 border border-zinc-300 border-t-0 rounded-b-lg">
        {!carouselItems.length && (
          <h2>You don't have any carousel items yet</h2>
        )}
      </DisclosurePanel>
    </Disclosure>
  );
}

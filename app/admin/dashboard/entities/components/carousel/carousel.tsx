"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiOutlinePlus } from "react-icons/hi";
import EditIcon from "../../../components/icons/edit-icon";
import DeleteIcon from "../../../components/icons/delete-icon";
import { Carousel } from "@/app/api/interfaces/carousel/types";

type CarouselsProps = { carousels: Carousel[] };

export default function CarouselEntity({ carousels }: CarouselsProps) {
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
      <DisclosurePanel className="px-2 py-4 text-zinc-500 border border-zinc-300 border-t-0 rounded-b-lg max-h-[1000px] overflow-hidden">
        <div className="space-y-2 overflow-scroll">
          {!carousels.length && <h2>You don't have any carousel items yet</h2>}
          {/* TODO: render carousel elements links and edit/remove */}
          {carousels.map((element) => (
            <div className="flex items-center justify-between">
              <p className="overflow-hidden truncate max-w-full">
                {element.dev_name}
              </p>
              <div className="flex flex-nowrap items-center gap-4">
                <a
                  className="leading-none"
                  href={`/admin/dashboard/entities/${element.id}`}
                >
                  <EditIcon />
                </a>
                <DeleteIcon />
              </div>
            </div>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

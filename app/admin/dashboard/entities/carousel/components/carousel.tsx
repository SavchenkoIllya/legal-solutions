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
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../../../components/modal/modal";
import { deleteCarousel } from "@/app/api/interfaces/carousel/carousel.api";

type CarouselsProps = { carousels: Carousel[] };

export default function CarouselEntity({ carousels }: CarouselsProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      await deleteCarousel(id).then(() => {
        router.refresh();
      });
    } catch (error) {
      setError(String(error));
    }
  };

  return (
    <Disclosure as="div" className="space-y-0">
      <DisclosureButton className="px-2 py-4 text-white bg-blue-500 w-full text-left rounded-lg data-[open]:rounded-b-none flex items-center justify-between">
        <h1>Carousel</h1>
        <div onClick={(e) => e.stopPropagation()}>
          <a href="/admin/dashboard/entities/carousel/new">
            <HiOutlinePlus size={24} className="hover:scale-110" />
          </a>
        </div>
      </DisclosureButton>
      <DisclosurePanel className="px-2 py-4 text-zinc-500 border border-zinc-300 border-t-0 rounded-b-lg max-h-[1000px] overflow-hidden">
        <div className="space-y-2">
          {!carousels.length && <h2>You don't have any carousel items yet</h2>}
          {carousels.map((element) => (
            <>
              <div className="flex items-center justify-between">
                <p className="max-w-full overflow-hidden truncate">
                  {element.dev_name}
                </p>
                <div className="flex items-center gap-4 flex-nowrap">
                  <a
                    className="leading-none"
                    href={`/admin/dashboard/entities/carousel/${element.id}`}
                  >
                    <EditIcon />
                  </a>
                  <DeleteIcon
                    onClick={() => {
                      setIsOpened(true);
                      setSelectedId(element.id);
                    }}
                  />
                </div>
              </div>
              {error && <p className="text-center text-rose-500">{error}</p>}
            </>
          ))}
        </div>
        <Modal
          isOpened={isOpened}
          title="You are going to delete carousel. Are you sure?"
          description="This action is irreversible. Once you are going to delete it you cannot retrieve it back again. Do you really want to delete carousel?"
          setToggle={setIsOpened}
          callback={() => handleDelete(selectedId)}
        />
      </DisclosurePanel>
    </Disclosure>
  );
}

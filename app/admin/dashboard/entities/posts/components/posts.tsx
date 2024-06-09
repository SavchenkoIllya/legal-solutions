"use client";
import { Post } from "@/app/api/interfaces/posts/types";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiOutlinePlus } from "react-icons/hi";
import EditIcon from "../../../components/icons/edit-icon";
import DeleteIcon from "../../../components/icons/delete-icon";
import Modal from "../../../components/modal/modal";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/app/api/interfaces/posts/posts.api";

type PostsEntityProps = { posts: Post[] };

export default function PostsEntity({ posts }: PostsEntityProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id).then(() => {
        router.refresh();
      });
    } catch (error) {
      setError(String(error));
    }
  };

  return (
    <Disclosure as="div" className="space-y-0">
      <DisclosureButton className="px-2 py-4 text-white bg-blue-500 w-full text-left rounded-lg data-[open]:rounded-b-none flex items-center justify-between">
        <h1>Posts</h1>
        <div onClick={(e) => e.stopPropagation()}>
          <a href="/admin/dashboard/entities/posts/new">
            <HiOutlinePlus size={24} className="hover:scale-110" />
          </a>
        </div>
      </DisclosureButton>
      <DisclosurePanel className="px-2 py-4 border space-y-2 border-t-0 rounded-b-lg text-zinc-500 border-zinc-300">
        {!posts.length && <h2>You don't have any posts yet</h2>}
        {posts.map((element) => (
          <Fragment key={element.id}>
            <div className="flex items-center justify-between">
              <p className="max-w-full overflow-hidden truncate">
                {element.title_ru}
              </p>
              <div className="flex items-center gap-4 flex-nowrap">
                <a
                  className="leading-none"
                  href={`/admin/dashboard/entities/posts/${element.id}`}
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
          </Fragment>
        ))}
        <Modal
          isOpened={isOpened}
          title="You are going to delete post. Are you sure?"
          description="This action is irreversible. Once you are going to delete it you cannot retrieve it back again. Do you really want to delete post?"
          setToggle={setIsOpened}
          callback={() => handleDelete(selectedId)}
        />
      </DisclosurePanel>
    </Disclosure>
  );
}

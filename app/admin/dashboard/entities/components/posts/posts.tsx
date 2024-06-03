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

type PostsEntityProps = { posts: Post[] };

export default function PostsEntity({ posts }: PostsEntityProps) {
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
      <DisclosurePanel className="px-2 py-4 text-zinc-500 border border-zinc-300 border-t-0 rounded-b-lg">
        {!posts.length && <h2>You don't have any posts yet</h2>}
        {posts.map((element) => (
          <div className="flex items-center justify-between">
            <p className="overflow-hidden truncate max-w-full">
              {element.title_ru}
            </p>
            <div className="flex flex-nowrap items-center gap-4">
              <a
                className="leading-none"
                href={`/admin/dashboard/entities/posts/${element.id}`}
              >
                <EditIcon />
              </a>
              <DeleteIcon />
            </div>
          </div>
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
}

"use client";
import { Post as PostType } from "@/app/api/interfaces/posts/types";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiOutlinePlus } from "react-icons/hi";
import Post from "./post";

type PostsEntityProps = { posts: PostType[] };

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
      <DisclosurePanel className="px-2 py-4 border space-y-2 border-t-0 rounded-b-lg text-zinc-500 border-zinc-300">
        {!posts.length && <h2>You don't have any posts yet</h2>}
        {posts.map((element) => (
          <Post element={element} />
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
}

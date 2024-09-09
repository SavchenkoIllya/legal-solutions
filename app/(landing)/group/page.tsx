import CategoryToggler from "../components/card/category-toggler";
import { Categories } from "@/app/api/interfaces/groups/types";
import Card from "../components/card/card";
import { Post } from "@/app/api/interfaces/posts/types";
import { getRequestedPosts } from "@/app/api/interfaces/posts/posts.api";
import { getGroupById } from "@/app/api/interfaces/groups/groups.api";
import { Groups as GroupsType } from "@/app/api/interfaces/groups/types";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Link from "next/link";


export const revalidate = 0;

export default async function Groups({
  searchParams,
}: {
  searchParams: {
    category: Categories;
    id: number;
    lang: string;
  };
}) {
  const group = await getGroupById(searchParams.id);

  console.log(group);
  
  const posts = await getRequestedPosts(group.posts_id);
  console.log(posts);

  return (
    <div className="pt-[80px] container m-auto">
      <Link
        className="text-button flex items-center gap-2 mt-4"
        href={`/?lang=${searchParams.lang}&category=${searchParams.category}#cards`}
      >
        <HiArrowNarrowLeft /> Back
      </Link>
      <CategoryToggler />
      <div className="flex flex-col items-center">
      {group[`title_${searchParams.lang}` as keyof GroupsType] && (
        <h1 className="accent-font text-center my-[40px] w-[100%]">
          {String(group[`title_${searchParams.lang}` as keyof GroupsType])}
        </h1>
      )}
            {group[`description_${searchParams.lang}` as keyof GroupsType] && (
        <p className="plain-font text-justify my-[40px] max-w-[600px]">
          {String(group[`description_${searchParams.lang}` as keyof GroupsType])}
        </p>
      )}
      {!posts.length && (
        <h2 className="accent-font text-center my-[40px] grid grid-cols-1 gap-6 w-[100%]">
          No posts at this moment
        </h2>
      )}
      <div
        id="cards"
        className="my-[40px] grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-6 w-[100%]"
      >
        {posts.map(
          (post) =>
            post.is_published && (
              <Card
                key={post.id}
                title={String(post[`title_${searchParams.lang}` as keyof Post])}
                price={post.price_range}
                link={`/group/${post.id}?lang=${searchParams.lang}`}
              />
            )
        )}
      </div>
      </div>
    </div>
  );
}

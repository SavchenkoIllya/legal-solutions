import { getPostsByCategory } from "@/app/api/interfaces/posts/posts.api";
import CategoryToggler from "../components/card/category-toggler";
import { Categories } from "@/app/api/interfaces/groups/types";
import Card from "../components/card/card";
import { Post } from "@/app/api/interfaces/posts/types";

export default async function Groups({
  searchParams,
}: {
  searchParams: {
    category: Categories;
    lang: string;
  };
}) {
  const posts = await getPostsByCategory(searchParams.category || "private");
  return (
    <div className="pt-[80px] container m-auto">
      <CategoryToggler />
      {!posts.length && (
        <h1 className="accent-font text-center my-[40px] grid grid-cols-1 gap-6 w-[100%]">
          No posts at this moment
        </h1>
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
                link={`/group/${post.id}`}
              />
            )
        )}
      </div>
    </div>
  );
}

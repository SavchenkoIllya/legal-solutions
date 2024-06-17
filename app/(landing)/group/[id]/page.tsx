import { getPostById } from "@/app/api/interfaces/posts/posts.api";
import { Post } from "@/app/api/interfaces/posts/types";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function PostPage({
  params: { id },
  searchParams: { lang },
}: {
  params: { id: number };
  searchParams: { lang: string };
}) {
  const post = await getPostById(id);
  return (
    <div className="pt-[80px] container m-auto">
      <div id="content" className="mt-8">
      {!post && <h1>No data </h1>}
        <h1 className="accent-font text-center">{String(post[`title_${lang}` as keyof Post])}</h1>
        <p>{post.price_range}</p>
        <MDXRemote source={String(post[`description_${lang}` as keyof Post])} />
      </div>
    </div>
  );
}

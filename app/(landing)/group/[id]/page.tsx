import { getPostById } from "@/app/api/interfaces/posts/posts.api";
import { Post } from "@/app/api/interfaces/posts/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from 'next';

export async function generateMetadata({
  params: { id },
  searchParams: { lang },
}: {
  params: { id: number };
  searchParams: { lang: string };
}): Promise<Metadata> {
  const post = await getPostById(id);
  const title = post ? String(post[`title_${lang}` as keyof Post]) : 'No data';
  const description = post ? String(post[`description_${lang}` as keyof Post]) : 'No data';
  
  return {
    title,
    description
  };
}
export const revalidate = 0;

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
        <h1 className="accent-font text-center">
          {String(post[`title_${lang}` as keyof Post])}
        </h1>
        <div className="m-4">
          {post.price_range && <p>{post.price_range}</p>}
          <MDXRemote
            source={String(post[`description_${lang}` as keyof Post])}
            components={{
              h1: (props) => <h1 {...props} className="accent-font"></h1>,
              p: (props) => <p {...props} className="plain-font"></p>,
            }}
          />
        </div>
      </div>
    </div>
  );
}

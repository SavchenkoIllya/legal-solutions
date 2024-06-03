"use client";
import CarouselEntity from "./carousel/carousel";
import Contacts from "./contacts/contacts";
import PostsEntity from "./posts/posts";

type PropsData = { data: Record<string, any[]> };

export default function Entities({ data }: PropsData) {
  return (
    <div className="space-y-4">
      <Contacts contacts={data.contacts} />
      <CarouselEntity carousels={data.carousel} />
      <PostsEntity posts={data.posts} />
    </div>
  );
}

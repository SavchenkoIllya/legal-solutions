"use client";
import CarouselEntity from "../carousel/components/carousel";
import Contacts from "./contacts";
import PostsEntity from "../posts/components/posts";
import GroupEntityView from "../groups/components/groups";

type PropsData = { data: Record<string, any[]> };

export default function Entities({ data }: PropsData) {
  return (
    <div className="space-y-4">
      <Contacts contacts={data.contacts} />
      <CarouselEntity carousels={data.carousel} />
      <PostsEntity posts={data.posts} />
      <GroupEntityView groups={data.groups}/>
    </div>
  );
}

import { getPosts } from "@/app/api/interfaces/posts/posts.api";
import GroupsForm from "../components/groups-form";

export const revalidate = 0;

export default async function NewGroupView() {
  const posts = await getPosts();

  return <GroupsForm posts={posts} />;
}

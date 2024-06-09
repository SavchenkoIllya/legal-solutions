import { getGroupById } from "@/app/api/interfaces/groups/groups.api";
import GroupsForm from "../components/groups-form";
import { getPosts } from "@/app/api/interfaces/posts/posts.api";

export const revalidate = 0;

export default async function EditGroupsViewPage(req: any) {
  const { id } = req.params;
  const groupData = await getGroupById(id);
  const posts = await getPosts();

  return <GroupsForm posts={posts} groupData={groupData} />;
}

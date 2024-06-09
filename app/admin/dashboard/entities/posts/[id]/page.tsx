import { getPostById } from "@/app/api/interfaces/posts/posts.api";
import PostsFormView from "../components/post-form";

export const revalidate = 0;

export default async function EditEntity(req: any) {
  const { id } = req.params;
  const postData = await getPostById(id);
  return <PostsFormView postData={postData} />;
}

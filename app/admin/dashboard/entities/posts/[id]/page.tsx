import { getPostById } from "@/app/api/interfaces/posts/posts.api";
import CarouselFormView from "../../components/carousel/carousel-form";
import PostsFormView from "../../components/posts/post-form";

export const revalidate = 0;

export default async function EditEntity(req: any) {
  const { id } = req.params;
  const postData = await getPostById(id);
  return <PostsFormView postData={postData} />;
}

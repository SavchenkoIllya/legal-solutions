import { getCarouselById } from "@/app/api/interfaces/carousel/carousel.api";
import CarouselFormView from "../components/carousel-form";

export const revalidate = 0;

export default async function EditEntity(req: any) {
  const { id } = req.params;
  const carouselData = await getCarouselById(id);

  return <CarouselFormView carouselData={carouselData} />;
}

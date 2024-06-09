import Carousel from "./components/carousel";
import Cards from "./components/cards";
import About from "./components/about";
import Form from "./components/form";
import Footer from "./components/footer";
import SpeedDial from "./components/speed-dial";
import { getCarousels } from "../api/interfaces/carousel/carousel.api";
import { getAllGroups } from "../api/interfaces/groups/groups.api";
import { getContacts } from "@/app/api/interfaces/contacts/contacts.api";

export const revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  const carouselData = await getCarousels();
  const groupsData = await getAllGroups();
  const request = await getContacts();
  const contacts = request[0];

  return (
    <>
      <Carousel carousels={carouselData} />
      <Cards groups={groupsData} lang={searchParams.lang} />
      <About />
      <Form />
      <Footer {...contacts} />
      <SpeedDial />
    </>
  );
}

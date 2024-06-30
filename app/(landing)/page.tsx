import Carousel from "./components/carousel/carousel";
import Cards from "./components/cards";
import About from "./components/about";
import Form from "./components/form/form";
import Footer from "./components/footer";
import SpeedDial from "./components/speed-dial";
import { getCarousels } from "../api/interfaces/carousel/carousel.api";
import { getCategorizedGroups } from "../api/interfaces/groups/groups.api";
import { getContacts } from "@/app/api/interfaces/contacts/contacts.api";
import { Categories } from "../api/interfaces/groups/types";
import { getChatIds } from "../api/interfaces/mails/mails.api";

export const revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams: { lang?: string; category: Categories };
}) {
  const chatIds = await getChatIds();

  console.log(chatIds);

  const carouselData = await getCarousels();
  const groupsData = await getCategorizedGroups(searchParams.category);
  const request = await getContacts();
  const contacts = request[0];

  return (
    <>
      <Carousel carousels={carouselData} />
      <Cards groups={groupsData} lang={searchParams.lang} />
      <About />
      <Form />
      <Footer {...contacts} />
      <SpeedDial {...contacts} />
    </>
  );
}

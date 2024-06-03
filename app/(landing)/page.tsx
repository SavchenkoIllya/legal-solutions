import Header from "./components/header";
import Carousel from "./components/carousel";
import Cards from "./components/cards";
import About from "./components/about";
import Form from "./components/form";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Carousel />
      <Cards />
      <About />
      <Form />
      <Footer />
    </>
  );
}

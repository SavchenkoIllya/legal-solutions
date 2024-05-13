import Header from './(landing)/components/header';
import Carousel from './(landing)/components/carousel';
import Cards from './(landing)/components/cards';
import About from './(landing)/components/about';
import Form from './(landing)/components/form';
import Footer from './(landing)/components/footer';

export default function Home() {
  return (
    <main className="">
      <Header />
      <Carousel />
      <Cards />
      <About />
      <Form />
      <Footer />
    </main>
  );
}

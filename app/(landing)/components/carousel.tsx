"use client";
import { Carousel as FlowbitCarousel } from "flowbite-react";
import { useRef } from "react";
import { CustomFlowbiteTheme } from "flowbite-react";

const carouselTheme: CustomFlowbiteTheme["carousel"] = {
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
  },
};

export default function Carousel() {
  const leftArrowRef = useRef<HTMLButtonElement | null>(null);
  const rightArrowRef = useRef<HTMLButtonElement | null>(null);
  const apiLink =
    "https://st2.depositphotos.com/4021139/5864/i/450/depositphotos_58644741-stock-photo-api-concept.jpg";

  return (
    <section className="pt-20">
      <div className="h-[500px] relative">
        <FlowbitCarousel
          theme={carouselTheme}
          className="rounded-none"
          leftControl={
            <button className="opacity-0" ref={leftArrowRef}></button>
          }
          rightControl={
            <button className="opacity-0" ref={rightArrowRef}></button>
          }
          indicators={false}
        >
          {/* TODO: 
                  - remake ability to catch right src's for different screen sizes
                  - change schema for 
          */}
          <div
            className="flex align-center justify-center flex-col p-16 bg-[#7D1F12] h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${apiLink})` }}
          >
            <h1 className="max-w-2xl mb-2 accent-font text-light">
              Payments tool for software companies
            </h1>
            <p className="max-w-2xl mb-6 mt-4 mb-2 plain-font text-light">
              From checkout to global sales tax compliance, companies around the
              world use Flowbite to simplify their payment stack.
            </p>
            <a href="#" className="button w-fit">
              Get started
            </a>
          </div>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </FlowbitCarousel>
        <div className="flex absolute right-0 bottom-0 mx-4 md:mx-16 my-4 gap-4">
          <button
            onClick={() => {
              leftArrowRef.current?.click();
            }}
          >
            <svg
              className="w-12 h-25 fill-light transition-all hover:fill-dark transform rotate-180"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />
              <g data-name="Layer 2" id="Layer_2">
                <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
              </g>
            </svg>
          </button>
          <button
            onClick={() => {
              rightArrowRef.current?.click();
            }}
          >
            <svg
              className="w-12 h-25 fill-light transition-all hover:fill-dark"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />
              <g data-name="Layer 2" id="Layer_2">
                <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

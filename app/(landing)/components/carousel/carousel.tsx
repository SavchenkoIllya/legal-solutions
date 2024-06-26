"use client";
import { useCallback } from "react";
import { Carousel as CarouselType } from "@/app/api/interfaces/carousel/types";
import { useSearchParams } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./carousel.css";

export default function Carousel({ carousels }: { carousels: CarouselType[] }) {
  const searchParams = useSearchParams();
  const language = searchParams.get("lang") || "ru";

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {carousels.map((item) => (
            <div 
            key={item.id}
            className="embla__slide mt-8 md:mt-0 h-[60dvh] md:h-[80dvh]">
              <div
                className="flex align-center justify-center flex-col p-16 bg-[#7D1F12] h-full bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `linear-gradient(to right, #000000b8, transparent), url(${item.image_src})` }}
              >
                <h1 className="max-w-2xl mb-2 accent-font text-light">
                  {item[`title_${language}` as keyof CarouselType]}
                </h1>
                <p className="max-w-2xl mt-4 mb-2 plain-font text-light">
                  {item[`description_${language}` as keyof CarouselType]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {carousels.length > 1 && (
        <div className="flex absolute right-0 bottom-0 mx-4 md:mx-16 my-4 gap-4">
          <button onClick={scrollPrev}>
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
          <button onClick={scrollNext}>
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
      )}
    </div>
  );
}

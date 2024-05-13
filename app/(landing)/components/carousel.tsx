export default function Carousel() {
  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96 bg-red-600">
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          12345
        </div>
      </div>
    </div>
  );
}

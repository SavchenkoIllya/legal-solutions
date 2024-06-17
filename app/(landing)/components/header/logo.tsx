import SVGLogo from "@/app/assets/Logo.svg";

export default function Logo() {
  return (
    <a href="/" className="flex-center gap-[10px]">
      <img src={SVGLogo.src} className="h-[40px] w-[40px]" />
      <p className="accent-font text-[19px] leading-[100%] text-wrap max-w-[90px] text-[#474747]">
        Pro-Legal solutions
      </p>
    </a>
  );
}

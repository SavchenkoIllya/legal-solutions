import SVGLogo from "@/app/accets/Logo.svg"

export default function Logo() {
  return (
    <div className="flex-center gap-[10px]">
      <img src={SVGLogo.src} className="h-[40px] w-[40px]" />
      <p className="accent-font text-[19px] leading-[100%] text-wrap max-w-[70px]">
        Legal solutions
      </p>
    </div>
  );
}

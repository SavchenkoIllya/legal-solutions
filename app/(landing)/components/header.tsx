import Logo from "./header/logo";
import Navigation from "./header/navigation";
import Language from "./header/language";

export default function Header() {
  return (
    <header className="bg-white w-full flex-center border-b border-gray fixed z-[20]">
      <div
        id="container"
        className="w-[1200px] my-[20px] mx-[10px] flex items-center justify-between"
      >
        <div className="flex-center gap-[48px]">
          <Logo />
          <Navigation />
        </div>
        <Language />
      </div>
    </header>
  );
}

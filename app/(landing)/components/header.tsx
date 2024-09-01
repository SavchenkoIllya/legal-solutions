"use client"
import Logo from "./header/logo";
import Navigation from "./header/navigation";
import Language from "./header/language";
import Burger from "./header/burger";
import { Transition } from "@headlessui/react";
import { useState, useRef, useEffect } from "react";
import LanguageList from "./header/language/language-list";

export default function Header() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpened(!isOpened)
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isOpened && !dropdownRef.current?.contains(e.target as Node)) {
        setIsOpened(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpened]);

  return (
    <>
      <header className="bg-white w-full flex-center border-b border-gray fixed z-[9999]">
        <div
          id="container"
          className="container my-[20px] mx-[20px] flex items-center justify-between"
        >
          <div className="flex-center gap-[48px]">
            <Logo />
            <Navigation className="hidden md:block" />
          </div>
          <Language className="hidden md:block" />
          <Burger onClick={toggleMenu} />
        </div>
      </header>

      <Transition
        show={isOpened}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div ref={dropdownRef} className="fixed pt-[5rem] bg-light z-[10] w-full md:hidden md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" className="block py-2 px-3 plain-font text-dark hover:underline" aria-current="page">Home</a>
            </li>
            <li>
              <LanguageList />
            </li>
          </ul>
        </div>
      </Transition>
    </>
  );
}

import { cn } from "@/app/utils/cn";
import { forwardRef } from "react";
import { Transition } from "@headlessui/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import LandingLocales from "@/app/locales/landing/locales";

type PopupProps = React.ComponentPropsWithRef<"div"> & { isOpened: boolean };

const LanguagePopup = forwardRef<HTMLDivElement, PopupProps>((props, ref) => {
  const { isOpened, ...restProps } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  if (!params.get("lang")) {
    params.set("lang", "ru");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const handleChangeLanguage = (lang: string) => {
    params.set("lang", lang);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Transition
      show={isOpened}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        id="mega-menu-dropdown"
        className={cn(
          "absolute z-10 -mt-4 text-sm text-center bg-gray rounded-lg shadow-md w-[68px] opacity-0 open:opacity-100 open:transition-opacity open:duration-500"
        )}
        ref={ref}
        {...restProps}
      >
        <div className="p-4 pt-6 pb-0 text-zinc-900 md:pb-4">
          <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
            {Object.keys(LandingLocales).map((language) => (
              <li key={language}>
                <button
                  className="bold-transition descriptor-font text-zinc-500  hover:text-red-hovered"
                  onClick={() => handleChangeLanguage(language)}
                >
                  {language}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Transition>
  );
});

LanguagePopup.displayName = "LanguagePopup";
export default LanguagePopup;

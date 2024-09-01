"use client"
import { cn } from "@/app/utils/cn";
import { forwardRef, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Transition } from "@headlessui/react";
import LanguageList from "./language-list";


type PopupProps = React.ComponentPropsWithRef<"div"> & { isOpened: boolean };

const LanguagePopup = forwardRef<HTMLDivElement, PopupProps>((props, ref) => {
  const { isOpened, ...restProps } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    if (!params.get("lang")) {
      params.set("lang", "ru");
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [])

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
          <LanguageList />
        </div>
      </div>
    </Transition>
  );
});

LanguagePopup.displayName = "LanguagePopup";
export default LanguagePopup;

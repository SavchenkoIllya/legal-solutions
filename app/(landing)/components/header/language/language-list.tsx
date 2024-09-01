"use client"
import LandingLocales from "@/app/locales/landing/locales";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function LanguageList() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);

    const handleChangeLanguage = (lang: string) => {
        params.set("lang", lang);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <ul className="flex justify-between w-[50%] m-auto items-center md:block md:space-y-4" aria-labelledby="mega-menu-dropdown-button">
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
    )
}
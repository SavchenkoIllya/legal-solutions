"use client";
import { useEffect, useRef } from "react";

import { Categories } from "@/app/api/interfaces/groups/types";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import "./toggler.css";

export default function CategoryToggler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const switchRef = useRef(null);

  if (!params.get("category")) {
    params.set("category", "private");
    replace(`${pathname}?${params.toString()}`);
  }

  const handleChangeCategory = (category: Categories) => {
    params.set("category", category);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const switchElement = switchRef.current;

    if (switchElement) {
      const handleClick = () => {
        const switchBg = document.querySelector(".switch_bg");
        const switchSpans = document.querySelectorAll(".switch span");
        switchBg!.classList.toggle("right");
        switchSpans.forEach((span) => span.classList.remove("on"));
        if (switchBg!.classList.contains("right")) {
          switchSpans[switchSpans.length - 1]?.classList.add("on");
        } else {
          switchSpans[0]?.classList.add("on");
        }
      };
      (switchElement as HTMLElement).addEventListener("click", handleClick);
      return () => {
        (switchElement as HTMLElement).removeEventListener(
          "click",
          handleClick
        );
      };
    }
  }, []);

  return (
    <div className="switch" ref={switchRef}>
      <span className="on" onClick={() => handleChangeCategory("private")}>
        Private
      </span>
      <span onClick={() => handleChangeCategory("business")}>Business</span>
      <div className="switch_bg"></div>
    </div>
  );
}

import Link from "next/link";
import React from "react";

export default function Navigation(
  props: React.ComponentPropsWithoutRef<"nav">
) {
  return (
    <nav {...props}>
      <ul className="flex gap-[20px]">
        <li>
          <Link
            className="link-text hover:font-normal hover:underline"
            href="/"
          >
            Главная
          </Link>
        </li>
        <li>
          <Link
            className="link-text hover:font-normal hover:underline"
            href="/#form"
          >
            Контакты
          </Link>
        </li>
      </ul>
    </nav>
  );
}

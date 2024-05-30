import { cn } from "@/app/utils/cn";

// TODO: edit types

type SidebarElementProps = any;

export default function SidebarElement(props: SidebarElementProps) {
  return (
    <div
      className={cn(
        "[&>.tooltip]:hover:opacity-100 h-14 w-16 cursor-pointer p-3",
        props.className
      )}
      {...props}
    >
      <a
        href={props.link}
        className="border-blue pointer-events-auto absolute flex h-10 w-10 items-center justify-center rounded-full text-blue-200 shadow duration-100 hover:bg-blue-700"
      >
        {props.icon}
      </a>

      <a
        href="/admin/dashboard"
        className="tooltip absolute z-50 mt-3 ml-14 w-max rounded-md bg-blue-700 p-1 text-xs text-white opacity-0 shadow-md duration-200"
      >
        {props.name}
      </a>
    </div>
  );
}

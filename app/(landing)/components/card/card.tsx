import Link from "next/link";

var beforeElement =
  "first:before:absolute first:before:content-[' '] first:before:h-[500px] first:before:w-[500px] first:before: inset-0 first:before:opacity-30 first:before:bg-[url('/_next/static/media/Logo.c69687ea.svg')] first:before:bg-no-repeat first:before:transform first:before:translate-x-[50%] first:before:translate-y-[10%] first:before:rotate-45";

type CardProps = {
  title: string | undefined;
  description?: string | undefined;
  price: string | undefined;
  link?: URL | string;
};

export default function Card({ title, description, price, link }: CardProps) {
  return (
    <Link
      href={link || "#"}
      id="card"
      className={`
    overflow-hidden relative min-h-[250px] card col-span-5 
    md:first:col-span-3 md:col-span-2 md:last:col-span-3
    
    ${beforeElement}
    
    last:bg-dark
    last:text-light
    `}
    >
      <div id="card-content" className="flex flex-col">
        <h1 className="plain-bold-font transition-all duration-500 hover:text-red">
          {title}
        </h1>
        <p>{description}</p>
        <p className="self-end mt-[17%] z-[50]">{price}</p>
      </div>
    </Link>
  );
}

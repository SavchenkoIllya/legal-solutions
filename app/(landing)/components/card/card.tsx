import React from 'react';

const beforeElement = `first:before:absolute 
                    first:before:content-[' '] 
                    first:before:h-[400px] 
                    first:before:w-[400px]
                    first:before:inset-0 
                    first:before:opacity-80 
                    first:before:bg-[url('/_next/static/media/Logo.92b5e6c3.svg')] 
                    first:before:transform 
                    first:before:bg-no-repeat
                    first:before:translate-x-[80%] 
                    first:before:rotate-45`;

type CardProps = {
  elementId: number;
  title: string | undefined;
  description?: string | undefined;
  price: string | undefined;
  link?: string;
  rest?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
};

export default function Card({
  title,
  description,
  price,
  link,
  elementId,
}: CardProps) {
  console.log(elementId % 4 === 3);

  return (
    <a
      href={link || '#'}
      id="card"
      className={`animate-reveal overflow-hidden relative min-h-[250px] card col-span-5 
                  md:first:col-span-3 md:col-span-2 
                  hover:scale-105
                  transition-all
                  ${beforeElement}
                  ${elementId % 4 === 3 ? 'md:col-span-3' : ''}
                  ${elementId % 5 === 4 ? 'md:col-span-3' : ''}
                  last:bg-dark
                  last:text-light
                  first:bg-red
                  first:text-light
                  `}
    >
      <article id="card-content" className="flex flex-col">
        <h1 className="plain-bold-font transition-all duration-500 z-[99]">
          {title}
        </h1>
        <p className="z-[99] line-clamp-4">{description}</p>
        <p className="self-end mt-[17%] z-[50]">{price}</p>
      </article>
    </a>
  );
}

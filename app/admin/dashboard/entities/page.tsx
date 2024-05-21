"use client";
import { Accordion } from "flowbite-react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function Entities() {
  const router = useRouter();
  //   const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     console.log("click");
  //   };

  const handleNew = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    var entityName = "Users";
    router.push(`/admin/dashboard/entities/new/${entityName}`, {
      scroll: false,
    });
  };

  return (
    <section className="min-h-[90dvh]">
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>
            <div className="flex justify-between">
              <div className="flex gap-4 mr-4">
                <button onClick={handleNew}>
                  <HiOutlinePlusCircle />
                </button>

                {/* TODO:
                        -at this moment ability to remove or edit tables is unavailable */}
                {/* <button className="text-blue-500">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-blue-500"
                  >
                    <title />
                    <g data-name="Layer 18" id="Layer_18">
                      <path
                        className="cls-1"
                        d="M2,31a1,1,0,0,1-1-1.11l.9-8.17a1,1,0,0,1,.29-.6L21.27,2.05a3.56,3.56,0,0,1,5.05,0L30,5.68a3.56,3.56,0,0,1,0,5.05L10.88,29.8a1,1,0,0,1-.6.29L2.11,31Zm8.17-1.91h0ZM3.86,22.28l-.73,6.59,6.59-.73L28.54,9.31a1.58,1.58,0,0,0,0-2.22L24.91,3.46a1.58,1.58,0,0,0-2.22,0Z"
                      />
                      <path
                        className="cls-1"
                        d="M26.52,13.74a1,1,0,0,1-.7-.29L18.55,6.18A1,1,0,0,1,20,4.77L27.23,12a1,1,0,0,1,0,1.41A1,1,0,0,1,26.52,13.74Z"
                      />
                      <rect
                        className="cls-1"
                        height="2"
                        transform="translate(-7.91 15.47) rotate(-45)"
                        width="12.84"
                        x="8.29"
                        y="16.28"
                      />
                    </g>
                  </svg>
                </button> */}
                {/* <button onClick={handleDelete}>
                  <svg
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-rose-500"
                  >
                    <path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" />
                  </svg>
                </button> */}
              </div>
              <h1>What is Flowbite?</h1>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <a href="./entities/1">kkasdmklsadmks</a>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </section>
  );
}

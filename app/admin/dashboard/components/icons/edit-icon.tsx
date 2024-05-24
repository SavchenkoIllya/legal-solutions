import { cn } from "@/app/utils/cn";
import { ComponentPropsWithoutRef } from "react";

export default function EditIcon(props: ComponentPropsWithoutRef<"button">) {
  const { className, ...rest } = props;
  return (
    <button className={cn("text-blue-500", className)} {...rest}>
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
    </button>
  );
}

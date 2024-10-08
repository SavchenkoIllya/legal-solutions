import { Contacts } from "@/app/api/interfaces/contacts/types";

export default async function Footer(props: Partial<Contacts>) {
  return (
    <footer className="bg-dark text-light">
      <div className="container p-16 mx-auto">
        {props.work_hours && (
          <>
            <p className="descriptor-font">Work hours</p>
            <p className="plain-font">{props.work_hours}</p>
          </>
        )}
        <div className="flex justify-between flex-wrap gap-4 mt-4">
          <div className="flex flex-col">
            {props.telephone && (
              <a href={`tel:${props.telephone}`}>{props.telephone}</a>
            )}
            {props.email && (
              <a href={`mailto: ${props.email}`}>{props.email}</a>
            )}
          </div>
          <div>
            <p className="descriptor-font">Privacy policy</p>
            <svg
              enableBackground="new 0 0 48 48"
              className="h-[20px] mt-2 fill-light"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M37,47H11c-2.209,0-4-1.791-4-4V5c0-2.209,1.791-4,4-4h18.973  c0.002,0,0.005,0,0.007,0h0.02H30c0.32,0,0.593,0.161,0.776,0.395l9.829,9.829C40.84,11.407,41,11.68,41,12l0,0v0.021  c0,0.002,0,0.003,0,0.005V43C41,45.209,39.209,47,37,47z M31,4.381V11h6.619L31,4.381z M39,13h-9c-0.553,0-1-0.448-1-1V3H11  C9.896,3,9,3.896,9,5v38c0,1.104,0.896,2,2,2h26c1.104,0,2-0.896,2-2V13z M33,39H15c-0.553,0-1-0.447-1-1c0-0.552,0.447-1,1-1h18  c0.553,0,1,0.448,1,1C34,38.553,33.553,39,33,39z M33,31H15c-0.553,0-1-0.447-1-1c0-0.552,0.447-1,1-1h18c0.553,0,1,0.448,1,1  C34,30.553,33.553,31,33,31z M33,23H15c-0.553,0-1-0.447-1-1c0-0.552,0.447-1,1-1h18c0.553,0,1,0.448,1,1C34,22.553,33.553,23,33,23  z"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

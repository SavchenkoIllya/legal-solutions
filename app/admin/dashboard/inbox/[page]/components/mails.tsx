import { Mail } from "@/app/api/interfaces/mails/types";
import MailCard from "./mail";
import SearchWithDate from "./search/search-with-date";

export default async function MailView({ mails }: { mails: Mail[] }) {
  return (
    <>
      <div className="mb-4">
        <SearchWithDate />
      </div>
      <div className="flex flex-wrap gap-4">
        {mails.map((mail) => (
          <MailCard mail={mail} key={mail.id} />
        ))}
        {!mails.length && <h1>You don't have any mails yet</h1>}
      </div>
    </>
  );
}

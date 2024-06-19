import { IsReadStates, Mail } from "@/app/api/interfaces/mails/types";
import MailCard from "./mail";
import { cn } from "@/app/utils/cn";
import { mailStatus } from "./utils/mailStatus";
import SearchWithDate from "./search/search-with-date";

const mapper = Object.keys(mailStatus);

export default async function MailView({ mails }: { mails: Mail[] }) {
  return (
    <>
      <div className="flex flex-wrap mb-4 items-center justify-center p-4 bg-blue-400 text-white rounded-full">
        <p className="font-bold">Legend:</p>
        <div className="flex flex-wrap items-center gap-4 ml-4">
          {mapper.map((status, idx) => (
            <div key={idx} className="flex items-center justify-center gap-2">
              <div
                className={cn(
                  "w-3 h-3 rounded-full",
                  mailStatus[status as IsReadStates].styles
                )}
              ></div>
              <span>{mailStatus[status as IsReadStates].text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <SearchWithDate/>
      </div>
      <div className="flex flex-wrap gap-8">
        {mails.map((mail) => (
          <MailCard mail={mail} key={mail.id} />
        ))}
        {!mails.length && <h1>You don't have any mails yet</h1>}
      </div>
    </>
  );
}

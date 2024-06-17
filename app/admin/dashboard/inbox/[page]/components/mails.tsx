import { Mail } from "@/app/api/interfaces/mails/types";
import MailCard from "./mail";

export default function MailView({ mails }: { mails: Mail[] }) {
  return (
    <div className="flex flex-wrap gap-8">
      {mails.map((mail) => (
        <MailCard mail={mail} key={mail.id} />
      ))}
    </div>
  );
}

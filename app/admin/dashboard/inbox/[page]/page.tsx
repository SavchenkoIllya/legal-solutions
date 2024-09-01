import { searchMail } from "@/app/api/interfaces/mails/mails.api";
import { Mail } from "@/app/api/interfaces/mails/types";
import MailView from "./components/mails";

export const revalidate = 0;

export default async function InboxPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    endDate?: string;
    startDate?: string;
    relevance?: string;
    mailStatus?: string;
  };
}) {
  const query = searchParams?.query || "";
  const startDate = searchParams?.startDate || String(new Date("2024-05-01T00:00:00"));
  const endDate = searchParams?.endDate || String(new Date());
  const relevance = searchParams?.relevance || "DESC"
  const mailStatus = searchParams?.mailStatus || "unread"

  const data: Mail[] = await searchMail(query, startDate, endDate, relevance, mailStatus);
  
  return (
    <section className="min-h-[90dvh]">
      <MailView mails={data} />
    </section>
  );
}

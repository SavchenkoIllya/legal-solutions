import { searchMail } from "@/app/api/interfaces/mails/mails.api";
import { Mail } from "@/app/api/interfaces/mails/types";
import MailView from "./components/mails";
import { Suspense } from "react";
import { Spinner } from "flowbite-react";

export const revalidate = 0;

export default async function InboxPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    endDate?: string;
    startDate?: string;
  };
}) {
  const query = searchParams?.query || "";
  const startDate =
    searchParams?.startDate || String(new Date("2024-05-01T00:00:00"));
  const endDate = searchParams?.endDate || String(new Date());
  const data: Mail[] = await searchMail(query, startDate, endDate);

  return (
    <section className="min-h-[90dvh]">
      <Suspense fallback={<Spinner className="m-4" />}>
        <MailView mails={data} />
      </Suspense>
    </section>
  );
}

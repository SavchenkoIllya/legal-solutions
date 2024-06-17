import { getMails } from "@/app/api/interfaces/mails/mails.api";
import { Mail } from "@/app/api/interfaces/mails/types";
import MailView from "./components/mails";
import { Suspense } from "react";
import { Spinner } from "flowbite-react";

export const revalidate = 0;

export default async function InboxPage() {
  const data: Mail[] = await getMails();

  return (
    <section className="min-h-[90dvh]">
      <Suspense fallback={<Spinner className="m-4" />}>
        <MailView mails={data} />
      </Suspense>
    </section>
  );
}

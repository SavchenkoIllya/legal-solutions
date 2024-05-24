"use client";
import Contacts from "./contacts";

type PropsData = { data: Record<string, any[]> };

export default function Entities({ data }: PropsData) {
  return (
    <div className="space-y-4">
      <Contacts contacts={data.contacts} />
    </div>
  );
}

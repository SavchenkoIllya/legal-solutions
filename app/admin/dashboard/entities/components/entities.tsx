"use client";
import CarouselEntity from "./carousel";
import Contacts from "./contacts";

type PropsData = { data: Record<string, any[]> };

export default function Entities({ data }: PropsData) {
  return (
    <div className="space-y-4">
      <Contacts contacts={data.contacts} />
      <CarouselEntity />
    </div>
  );
}

"use client";
import Search from "./search";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchWithDate() {
  const [startDate, setStartDate] = useState(new Date("2024-05-01T00:00:00"));
  const [endDate, setEndDate] = useState(new Date());

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleStartSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("startDate", term);
    } else {
      params.delete("startDate");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    handleStartSearch(String(startDate));
  }, [startDate]);

  const handleEndSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("endDate", term);
    } else {
      params.delete("endDate");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    handleEndSearch(String(endDate));
  }, [endDate]);

  return (
    <div className="flex gap-2">
      <Search placeholder="Search me" />
      <DatePicker
        selected={startDate}
        onChange={(date) => !!date && setStartDate(date)}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => !!date && setEndDate(date)}
      />
    </div>
  );
}

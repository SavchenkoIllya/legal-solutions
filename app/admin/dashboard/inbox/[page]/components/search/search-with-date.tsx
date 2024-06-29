"use client";
import Search from "./search";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchWithDate() {
  const [startDate, setStartDate] = useState(new Date("2024-04-01T00:00:00"));
  const [endDate, setEndDate] = useState(new Date());

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleStartSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("startDate", term);
    } else {
      params.delete("startDate");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);


  const handleEndSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("endDate", term);
    } else {
      params.delete("endDate");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);


  const handleOptionsChange = useDebouncedCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => handleOptionsChange(e.target.name, e.target.value)

  useEffect(() => {
    handleStartSearch("2024-04-01T00:00:00");
    handleEndSearch(String(new Date()));
    handleOptionsChange("relevance", "DESC")
    handleOptionsChange("mailStatus", "unread")
  }, []);

  useEffect(() => handleStartSearch(String(startDate)), [startDate])
  useEffect(() => handleEndSearch(String(endDate)), [endDate])

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
      <select
        defaultValue={searchParams.get("relevance")?.toString()}
        name="relevance" onChange={handleSelect}>
        <option value={"ASC"}>Ascendent</option>
        <option value={"DESC"}>Descendent</option>
      </select>
      <select
        defaultValue={searchParams.get("mailStatus")?.toString()}
        name="mailStatus" onChange={handleSelect}>
        <option>read</option>
        <option>unread</option>
        <option>in progress</option>
        <option>complete</option>
      </select>
    </div>
  );
}

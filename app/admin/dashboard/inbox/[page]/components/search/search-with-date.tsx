"use client";
import Search from "./search";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import "react-datepicker/dist/react-datepicker.css";
import CustomDropdown from "./dropdown";
import { cn } from "@/app/utils/cn";
import { mailStatus } from "./utils/mailStatus";


const relevanceValues = [{
  value: "ASC",
  title: "Ascendent",
  optionName: "relevance"
},
{
  value: "DESC",
  title: "Descendent",
  optionName: "relevance"
},
]

const mailStatuses = [
  {
    value: "read",
    title: <div
      className="flex items-center gap-2"
    ><div
      className={cn(
        "w-3 h-3 rounded-full",
        mailStatus["read"].styles
      )}
    ></div><p>read</p></div>,
    optionName: "mailStatus"
  }, {
    value: "unread",
    title: <div
      className="flex items-center gap-2"
    ><div
      className={cn(
        "w-3 h-3 rounded-full",
        mailStatus["unread"].styles
      )}
    ></div><p>unread</p></div>,
    optionName: "mailStatus"
  }, {
    value: "in progress",
    title: <div
      className="flex items-center gap-2"
    ><div
      className={cn(
        "w-3 h-3 rounded-full",
        mailStatus["progress"].styles
      )}
    ></div><p>in progress</p></div>,
    optionName: "mailStatus"
  }, {
    value: "complete",
    title: <div
      className="flex items-center gap-2"
    ><div
      className={cn(
        "w-3 h-3 rounded-full",
        mailStatus["complete"].styles
      )}
    ></div><p>complete</p></div>,
    optionName: "mailStatus"
  }
]

export default function SearchWithDate() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [startDate, setStartDate] = useState(new Date("2024-04-01T00:00:00"));
  const [endDate, setEndDate] = useState(new Date());

  const updateSearchParams = useCallback((name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, replace]);

  const handleStartSearch = useDebouncedCallback((date: Date) => {
    updateSearchParams("startDate", date.toISOString());
  }, 300);

  const handleEndSearch = useDebouncedCallback((date: Date) => {
    updateSearchParams("endDate", date.toISOString());
  }, 300);

  const handleOptionsChange = useDebouncedCallback((name: string, value: string) => {
    updateSearchParams(name, value);
  }, 300);

  useEffect(() => {
    handleStartSearch(new Date("2024-04-01T00:00:00"));
    handleEndSearch(new Date());
    handleOptionsChange("relevance", "DESC")
    handleOptionsChange("mailStatus", "unread")
  }, []);

  useEffect(() => handleStartSearch(startDate), [startDate])
  useEffect(() => handleEndSearch(endDate), [endDate])

  return (
    <div className="flex flex-wrap gap-2">
      <Search placeholder="Search me" />
      <DatePicker
        className="dashboard__input max-w-[120px]"
        selected={startDate}
        onChange={(date) => !!date && setStartDate(date)}
      />
      <DatePicker
        className="dashboard__input max-w-[120px]"
        selected={endDate}
        onChange={(date) => !!date && setEndDate(date)}
      />
      <CustomDropdown
        initialValue={searchParams.get("relevance")?.toString()}
        values={relevanceValues}
        callback={handleOptionsChange}
      />
      <CustomDropdown
        initialValue={searchParams.get("mailStatus")?.toString()}
        values={mailStatuses}
        callback={handleOptionsChange}
      />
    </div>
  );
}

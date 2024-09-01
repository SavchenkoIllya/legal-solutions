"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <TextField
      placeholder={placeholder}
      onChange={(e) => { handleSearch(e.target.value) }}
      defaultValue={searchParams.get("query")?.toString()}
      InputProps={{ startAdornment: <SearchIcon sx={{ marginRight: 1 }} /> }}
      sx={{
        bgcolor: "white",
        flex: 3,
        borderRadius: 1,
        "& fieldset": { border: 'none' },
      }}
      fullWidth
    />
  );
}

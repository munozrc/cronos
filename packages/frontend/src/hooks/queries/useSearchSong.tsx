import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { searchSong } from "../../services/api";

export function useSearchSong() {
  const [query, setQuery] = useState<string | undefined>();

  const querySong = useQuery({
    queryKey: ["search-song", query],
    queryFn: () => searchSong(query || ""),
    enabled: Boolean(query),
  });

  const handleSearchSong = (value: string) => {
    if (typeof value !== "string" || value?.trim() === "") return;
    setQuery(() => value?.trim());
  };

  return {
    ...querySong,
    handleSearchSong,
    results: querySong.data || [],
  };
}

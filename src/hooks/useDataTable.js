import { useState } from "react";

export function useDataTable(data, columns) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const filtered = data.filter((row) =>
    columns.some((col) =>
      String(row[col.key] ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()),
    ),
  );

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const valA = String(a[sortKey] ?? "").toLowerCase();
        const valB = String(b[sortKey] ?? "").toLowerCase();
        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      })
    : filtered;

  return {
    search,
    setSearch,
    sorted,
    sortKey,
    sortDirection,
    handleSort,
  };
}

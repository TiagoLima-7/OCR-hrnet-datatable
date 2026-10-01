import { useState, useEffect, use } from "react";

export function useDataTable(data, columns) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handlePageSize = (size) => {
    setPageSize(Number(size));
    setCurrentPage(1);
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

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * pageSize;
  const paginated = sorted.slice(start, start + pageSize);

  return {
    search,
    setSearch,
    sorted: paginated,
    sortKey,
    sortDirection,
    handleSort,
    currentPage: safePage,
    setCurrentPage,
    pageSize,
    handlePageSize,
    totalPages,
    totalFiltered: sorted.length,
    totalEntries: data.length,
    startEntry: sorted.length === 0 ? 0 : start + 1,
    endEntry: Math.min(start + pageSize, sorted.length),
  };
}

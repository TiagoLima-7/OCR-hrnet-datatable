import { useState, useMemo } from "react";

export function useDataTable(data, columns) {
  const [search, setSearchRaw] = useState("");
  const [sorts, setSorts] = useState([]); // [{ key, direction }]
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  function setSearch(value) {
    setSearchRaw(value);
    setCurrentPage(1);
  }

  function handleSort(key) {
    setSorts((prev) => {
      const existing = prev.find((s) => s.key === key);
      if (!existing) return [...prev, { key, direction: "asc" }];
      if (existing.direction === "asc")
        return prev.map((s) =>
          s.key === key ? { ...s, direction: "desc" } : s,
        );
      return prev.filter((s) => s.key !== key); // 3e clic → supprime
    });
    setCurrentPage(1);
  }

  function clearSorts() {
    setSorts([]);
    setCurrentPage(1);
  }

  function handlePageSize(size) {
    setPageSize(size);
    setCurrentPage(1);
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.key] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [data, search, columns]);

  const sortedFiltered = useMemo(() => {
    if (sorts.length === 0) return filtered;
    return [...filtered].sort((a, b) => {
      for (const { key, direction } of sorts) {
        const aVal = String(a[key] ?? "").toLowerCase();
        const bVal = String(b[key] ?? "").toLowerCase();
        if (aVal < bVal) return direction === "asc" ? -1 : 1;
        if (aVal > bVal) return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filtered, sorts]);

  const totalEntries = data.length;
  const totalFiltered = sortedFiltered.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const startEntry = totalFiltered === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalFiltered);
  const sorted = sortedFiltered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return {
    sorted,
    totalEntries,
    totalFiltered,
    totalPages,
    startEntry,
    endEntry,
    search,
    setSearch,
    sorts,
    handleSort,
    clearSorts,
    currentPage,
    setCurrentPage,
    pageSize,
    handlePageSize,
  };
}

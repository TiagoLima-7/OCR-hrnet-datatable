import { useState } from "react";

export function useDataTable(data, columns) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((row) =>
    columns.some((col) =>
      String(row[col.key] ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()),
    ),
  );

  return {
    search,
    setSearch,
    filtered,
  };
}

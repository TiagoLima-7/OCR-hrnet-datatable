import { useDataTable } from "../hooks/useDataTable";

export default function DataTable({ data = [], columns = [] }) {
  const { search, setSearch, sorted, sortKey, sortDirection, handleSort } =
    useDataTable(data, columns);

  const getArrow = (key) => {
    if (sortKey !== key) return <i class="fa-solid fa-arrow-down-a-z"></i>;
    return sortDirection === "asc" ? (
      <i class="fa-solid fa-arrow-down-a-z"></i>
    ) : (
      <i class="fa-solid fa-arrow-down-z-a"></i>
    );
  };

  return (
    <div className="global-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="sortable-th"
              >
                {col.label}
                <span className="sort-arrow">{getArrow(col.key)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

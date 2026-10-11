import { useDataTable } from "../hooks/useDataTable";
import "../styles/datatable.css";

export default function DataTable({ data = [], columns = [] }) {
  const {
    search,
    setSearch,
    sorted,
    sorts,
    handleSort,
    clearSorts,
    currentPage,
    setCurrentPage,
    pageSize,
    handlePageSize,
    totalPages,
    totalFiltered,
    totalEntries,
    startEntry,
    endEntry,
  } = useDataTable(data, columns);

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="global-container">
      {/* -- Contrôles supérieurs -- */}
      <div className="datatable-controls">
        <div className="page-size-control">
          <label htmlFor="page-size">Show</label>{" "}
          <select
            data-testid="select-page-size"
            id="page-size"
            value={pageSize}
            onChange={(e) => handlePageSize(e.target.value)}
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>{" "}
          entries
        </div>
        <div className="search-container">
          <input
            data-testid="input-search"
            type="text"
            id="input-search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* -- Chips de tri (mode cartes mobile uniquement) -- */}
      <div className="sort-controls">
        <span className="sort-controls-label">Sort by:</span>
        {columns.map((col) => {
          const sortEntry = sorts.find((s) => s.key === col.key);
          const sortIndex = sorts.findIndex((s) => s.key === col.key) + 1;
          return (
            <button
              key={col.key}
              className={`sort-chip${sortEntry ? " sort-chip--active" : ""}`}
              onClick={() => handleSort(col.key)}
            >
              {col.label}
              {sortEntry ? (sortEntry.direction === "asc" ? " ↑" : " ↓") : ""}
              {sortEntry && sorts.length > 1 && <sup>{sortIndex}</sup>}
            </button>
          );
        })}
        {sorts.length > 0 && (
          <button className="sort-chip sort-chip--clear" onClick={clearSorts}>
            ✕ Clear
          </button>
        )}
      </div>

      {/* -- Table -- */}
      <table>
        <thead>
          <tr>
            {columns.map((col) => {
              const sortEntry = sorts.find((s) => s.key === col.key);
              const sortIndex = sorts.findIndex((s) => s.key === col.key) + 1;
              return (
                <th
                  key={col.key}
                  className={`sortable-th${sortEntry ? " active-sort" : ""}`}
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  <span className="sort-arrow">
                    {sortEntry ? (
                      <>
                        {sortEntry.direction === "asc" ? " ↑" : " ↓"}
                        {sorts.length > 1 && <sup>{sortIndex}</sup>}
                      </>
                    ) : (
                      " ↕"
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No entries found
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key} data-label={col.label}>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* -- Pied -- */}
      <div className="datatable-footer">
        <div className="datatable-info">
          {totalFiltered === 0
            ? "No entries found"
            : `Showing ${startEntry} to ${endEntry} of ${totalFiltered} entries${
                totalFiltered !== totalEntries
                  ? ` (filtered from ${totalEntries} total entries)`
                  : ""
              }`}
        </div>
        <div className="datatable-pagination">
          <button
            data-testid="btn-previous"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {getPageNumbers().map((page, i) =>
            page === "..." ? (
              <span key={`ellipsis-${i}`} className="pagination-ellipsis">
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "active-page" : ""}
              >
                {page}
              </button>
            ),
          )}
          <button
            data-testid="btn-next"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

import { useDataTable } from "../hooks/useDataTable";
import "../styles/datatable.css";

export default function DataTable({ data = [], columns = [] }) {
  const {
    search,
    setSearch,
    sorted,
    sortKey,
    sortDirection,
    handleSort,
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

  const getArrow = (key) => {
    if (sortKey !== key) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

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
      <div className="datatable-controls">
        <div className="page-size-control">
          <label htmlFor="page-size">Show</label>{" "}
          <select
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
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={`sortable-th${sortKey === col.key ? " active-sort" : ""}`}
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

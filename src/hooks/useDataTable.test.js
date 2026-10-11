import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useDataTable } from "./useDataTable";

const columns = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "department", label: "Department" },
];

const mockData = [
  { firstName: "Alice", lastName: "Martin", department: "Engineering" },
  { firstName: "Bob", lastName: "Smith", department: "Marketing" },
  { firstName: "Charlie", lastName: "Brown", department: "Engineering" },
  { firstName: "Diana", lastName: "Prince", department: "HR" },
  { firstName: "Eve", lastName: "Adams", department: "Marketing" },
];

// --- Initial state -----------------------------------------------
describe("initial state", () => {
  it("returns all data on page 1", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalEntries).toBe(5);
    expect(result.current.totalFiltered).toBe(5);
  });

  it("default pageSize is 10", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    expect(result.current.pageSize).toBe(10);
  });

  it("no active sort by default", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    expect(result.current.sorts).toHaveLength(0);
  });
});

// --- Filtering ---------------------------------------------------
describe("filtering", () => {
  it("filters results based on search query", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.setSearch("alice"));
    expect(result.current.totalFiltered).toBe(1);
    expect(result.current.sorted[0].firstName).toBe("Alice");
  });

  it("search is case-insensitive", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.setSearch("MARKETING"));
    expect(result.current.totalFiltered).toBe(2);
  });

  it("returns 0 results when no match found", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.setSearch("xyz_not_found"));
    expect(result.current.totalFiltered).toBe(0);
    expect(result.current.sorted).toHaveLength(0);
  });

  it("resets currentPage to 1 when search changes", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.setCurrentPage(2));
    act(() => result.current.setSearch("alice"));
    expect(result.current.currentPage).toBe(1);
  });
});

// --- Sorting -----------------------------------------------------
describe("sorting", () => {
  it("sorts ascending on first click", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handleSort("firstName"));
    expect(result.current.sorts[0]).toEqual({
      key: "firstName",
      direction: "asc",
    });
    expect(result.current.sorted[0].firstName).toBe("Alice");
  });

  it("sorts descending on second click on the same column", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handleSort("firstName"));
    act(() => result.current.handleSort("firstName"));
    expect(result.current.sorts[0]).toEqual({
      key: "firstName",
      direction: "desc",
    });
    expect(result.current.sorted[0].firstName).toBe("Eve");
  });

  it("removes sort on third click", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handleSort("firstName"));
    act(() => result.current.handleSort("firstName"));
    act(() => result.current.handleSort("firstName"));
    expect(result.current.sorts).toHaveLength(0);
  });

  it("accumulates multiple sorts in click order", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handleSort("department"));
    act(() => result.current.handleSort("firstName"));
    expect(result.current.sorts).toHaveLength(2);
    expect(result.current.sorts[0].key).toBe("department");
    expect(result.current.sorts[1].key).toBe("firstName");
  });

  it("sorts by multiple columns correctly", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handleSort("department"));
    act(() => result.current.handleSort("firstName"));
    expect(result.current.sorted[0]).toMatchObject({
      department: "Engineering",
      firstName: "Alice",
    });
    expect(result.current.sorted[1]).toMatchObject({
      department: "Engineering",
      firstName: "Charlie",
    });
    expect(result.current.sorted[2]).toMatchObject({ department: "HR" });
  });

  it("changing direction of one sort does not affect other sorts", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handleSort("department"));
    act(() => result.current.handleSort("firstName"));
    act(() => result.current.handleSort("department"));
    expect(result.current.sorts[0]).toEqual({
      key: "department",
      direction: "desc",
    });
    expect(result.current.sorts[1]).toEqual({
      key: "firstName",
      direction: "asc",
    });
  });

  it("clearSorts removes all active sorts", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handleSort("department"));
    act(() => result.current.handleSort("firstName"));
    act(() => result.current.clearSorts());
    expect(result.current.sorts).toHaveLength(0);
  });

  it("resets currentPage to 1 when sorting", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.setCurrentPage(2));
    act(() => result.current.handleSort("firstName"));
    expect(result.current.currentPage).toBe(1);
  });
});

// --- Pagination --------------------------------------------------
describe("pagination", () => {
  it("calculates totalPages correctly", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handlePageSize(2));
    expect(result.current.totalPages).toBe(3);
  });

  it("returns only the entries for the current page", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handlePageSize(2));
    expect(result.current.sorted).toHaveLength(2);
    act(() => result.current.setCurrentPage(3));
    expect(result.current.sorted).toHaveLength(1);
  });

  it("startEntry and endEntry are correct", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handlePageSize(2));
    expect(result.current.startEntry).toBe(1);
    expect(result.current.endEntry).toBe(2);
    act(() => result.current.setCurrentPage(2));
    expect(result.current.startEntry).toBe(3);
    expect(result.current.endEntry).toBe(4);
  });

  it("handlePageSize resets currentPage to 1", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handlePageSize(2));
    act(() => result.current.setCurrentPage(3));
    act(() => result.current.handlePageSize(10));
    expect(result.current.currentPage).toBe(1);
  });

  it("handles empty data without error", () => {
    const { result } = renderHook(() => useDataTable([], columns));
    expect(result.current.totalPages).toBe(1);
    expect(result.current.startEntry).toBe(0);
    expect(result.current.sorted).toHaveLength(0);
  });
});

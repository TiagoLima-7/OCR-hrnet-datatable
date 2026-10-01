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

// ─── État initial ────────────────────────────────────────────────
describe("état initial", () => {
  it("retourne toutes les données à la page 1", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalEntries).toBe(5);
    expect(result.current.totalFiltered).toBe(5);
  });

  it("pageSize par défaut est 10", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    expect(result.current.pageSize).toBe(10);
  });

  it("aucun tri actif par défaut", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    expect(result.current.sortKey).toBeNull();
    expect(result.current.sortDirection).toBe("asc");
  });
});

// ─── Filtrage ────────────────────────────────────────────────────
describe("filtrage", () => {
  it("filtre les résultats selon la recherche", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.setSearch("alice"));
    expect(result.current.totalFiltered).toBe(1);
    expect(result.current.sorted[0].firstName).toBe("Alice");
  });

  it("la recherche est insensible à la casse", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.setSearch("MARKETING"));
    expect(result.current.totalFiltered).toBe(2);
  });

  it("retourne 0 résultat si aucune correspondance", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.setSearch("xyz_inexistant"));
    expect(result.current.totalFiltered).toBe(0);
    expect(result.current.sorted).toHaveLength(0);
  });

  it("remet currentPage à 1 quand la recherche change", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.setCurrentPage(2));
    act(() => result.current.setSearch("alice"));
    expect(result.current.currentPage).toBe(1);
  });
});

// ─── Tri ─────────────────────────────────────────────────────────
describe("tri", () => {
  it("trie par ordre croissant au premier clic", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handleSort("firstName"));
    expect(result.current.sortKey).toBe("firstName");
    expect(result.current.sortDirection).toBe("asc");
    expect(result.current.sorted[0].firstName).toBe("Alice");
  });

  it("inverse le tri au deuxième clic sur la même colonne", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handleSort("firstName"));
    act(() => result.current.handleSort("firstName"));
    expect(result.current.sortDirection).toBe("desc");
    expect(result.current.sorted[0].firstName).toBe("Eve");
  });

  it("remet le tri à asc lors du changement de colonne", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handleSort("firstName"));
    act(() => result.current.handleSort("firstName")); // desc
    act(() => result.current.handleSort("lastName")); // nouvelle colonne
    expect(result.current.sortDirection).toBe("asc");
    expect(result.current.sortKey).toBe("lastName");
  });

  it("remet currentPage à 1 lors du tri", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.setCurrentPage(2));
    act(() => result.current.handleSort("firstName"));
    expect(result.current.currentPage).toBe(1);
  });
});

// ─── Pagination ──────────────────────────────────────────────────
describe("pagination", () => {
  it("calcule totalPages correctement", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handlePageSize(2));
    expect(result.current.totalPages).toBe(3); // 5 entrées / 2 = 3 pages
  });

  it("retourne seulement les entrées de la page courante", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handlePageSize(2));
    expect(result.current.sorted).toHaveLength(2);
    act(() => result.current.setCurrentPage(3));
    expect(result.current.sorted).toHaveLength(1); // dernière page : 1 entrée
  });

  it("startEntry et endEntry sont corrects", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handlePageSize(2));
    expect(result.current.startEntry).toBe(1);
    expect(result.current.endEntry).toBe(2);
    act(() => result.current.setCurrentPage(2));
    expect(result.current.startEntry).toBe(3);
    expect(result.current.endEntry).toBe(4);
  });

  it("handlePageSize remet currentPage à 1", () => {
    const { result } = renderHook(() => useDataTable(mockData, columns));
    act(() => result.current.handlePageSize(2));
    act(() => result.current.setCurrentPage(3));
    act(() => result.current.handlePageSize(10));
    expect(result.current.currentPage).toBe(1);
  });

  it("gère les données vides sans erreur", () => {
    const { result } = renderHook(() => useDataTable([], columns));
    expect(result.current.totalPages).toBe(1);
    expect(result.current.startEntry).toBe(0);
    expect(result.current.sorted).toHaveLength(0);
  });
});

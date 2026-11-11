# hrnet-datatable

A React datatable component with search, multi-column sort, and pagination. Built as part of the WealthHealth HRnet project (OpenClassrooms P12).

## Installation

```bash
npm install hrnet-datatable
```

Requires React 18 or higher as a peer dependency.

## Usage

```jsx
import { DataTable } from "hrnet-datatable";

const columns = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "startDate", label: "Start Date" },
  { key: "department", label: "Department" },
];

function EmployeeList({ employees }) {
  return <DataTable data={employees} columns={columns} />;
}
```

## Props

| Prop      | Type    | Required | Description          |
| --------- | ------- | -------- | -------------------- |
| `data`    | `array` | yes      | Array of row objects |
| `columns` | `array` | yes      | Column definitions   |

### Column definition

```js
{ key: "firstName", label: "First Name" }
```

- `key` — the property name on each row object
- `label` — the column header text

## Features

**Search** — filters across all columns simultaneously. Resets to page 1 on each keystroke.

**Multi-column sort** — click a column header to sort ascending, click again for descending, click a third time to remove that sort. When multiple columns are sorted, each header displays a priority number so the order is clear.

**Pagination** — choose between 10, 25, 50, or 100 rows per page.

**Mobile card layout** — below 1024px the table switches to a card-per-row layout. A row of sort chips replaces the column headers so sorting stays accessible.

## Development

This package is built as an ES module library with Vite.

```bash
npm run dev     # dev server (for isolated component development)
npm run build   # build the library to dist/
npm run test    # run unit tests with Vitest
```

Unit tests cover: initial state, search/filter, sort cycle (asc → desc → removed), multi-column sort with priority ordering, clearSorts, and pagination.

## Local usage without npm publish

In a sibling React project, add a Vite alias to point directly at the source:

```js
// vite.config.js
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "hrnet-datatable": resolve(__dirname, "../hrnet-datatable/src/index.js"),
    },
    dedupe: ["react", "react-dom"],
  },
});
```

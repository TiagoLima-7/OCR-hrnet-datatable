# hrnet-datatable

A React datatable component with search, multi-column sort, and pagination. Built as part of the WealthHealth HRnet project (OpenClassrooms P14).

## Installation

```bash
npm install hrnet-datatable-tiago
```

Requires React 18 or higher as a peer dependency.

## Usage

```jsx
import { DataTable } from "hrnet-datatable-tiago";
import "hrnet-datatable-tiago/dist/hrnet-datatable.css";

const columns = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "startDate", label: "Start Date", type: "date" },
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

| Field   | Type                   | Description                                                                                        |
| ------- | ---------------------- | -------------------------------------------------------------------------------------------------- |
| `key`   | `string`               | Property name on each row object                                                                   |
| `label` | `string`               | Column header text                                                                                 |
| `type`  | `"date"` \| `"string"` | Optional. Use `"date"` for MM/DD/YYYY columns - enables chronological sort instead of alphabetical |

## Features

**Search** - filters across all columns simultaneously. Resets to page 1 on each keystroke.

**Multi-column sort** - click a column header to sort ascending, click again for descending, click a third time to remove that sort. When multiple columns are sorted, each header displays a priority number. A "Clear sorts" button appears when any sort is active.

**Date-aware sort** - columns with `type: "date"` are sorted chronologically, not alphabetically.

**Pagination** - choose between 10, 25, 50, or 100 rows per page.

**Mobile card layout** - below 1024px the table switches to a card-per-row layout.

## Development

```bash
npm run dev     # dev server
npm run build   # build to dist/
npm run test    # unit tests with Vitest
```

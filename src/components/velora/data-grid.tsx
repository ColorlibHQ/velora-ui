"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  PlusCircleIcon,
  SearchIcon,
  Settings2Icon,
  XIcon,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type { ColumnDef } from "@tanstack/react-table";

export interface DataGridFilter {
  /** Column id (usually the accessorKey) to filter */
  column: string;
  /** Label on the filter button */
  title: string;
  /** Choices; read from the data when omitted */
  options?: { label: string; value: string }[];
}

export interface DataGridProps<TData, TValue> {
  /** Rows to display */
  data: TData[];
  /** TanStack Table column definitions; set `meta.label` for a readable name in menus */
  columns: ColumnDef<TData, TValue>[];
  /** Stable row id, so selection survives sorting and new data. Defaults to the row index */
  getRowId?: (row: TData, index: number) => string;
  /** Show a search box that matches text in every column @default true */
  searchable?: boolean;
  /** @default "Search…" */
  searchPlaceholder?: string;
  /** Multi-select filter buttons, one per column */
  filters?: DataGridFilter[];
  /** Add a checkbox column @default false */
  selectable?: boolean;
  /** Called with the selected rows' data whenever the selection changes */
  onSelectionChange?: (rows: TData[]) => void;
  /** Actions shown in a bar while rows are selected */
  bulkActions?: (rows: TData[], clearSelection: () => void) => React.ReactNode;
  /** Show the column visibility menu @default true */
  columnToggle?: boolean;
  /** @default 10 */
  pageSize?: number;
  /** Options in the rows-per-page menu @default [10, 20, 50] */
  pageSizes?: number[];
  /** Initial sort, e.g. `[{ id: "date", desc: true }]` */
  defaultSort?: SortingState;
  /** Show skeleton rows instead of data @default false */
  loading?: boolean;
  /** Shown when no row matches @default "No results." */
  empty?: React.ReactNode;
  /** Row height @default "comfortable" */
  density?: "compact" | "comfortable";
  /** Accessible name for the table @default "Data table" */
  label?: string;
  className?: string;
}

// Faceted filters store an array of accepted values; an empty array means "any".
const inSet: FilterFn<unknown> = (row, id, value: string[]) =>
  !value?.length || value.includes(String(row.getValue(id)));

const labelOf = <TData,>(column: Column<TData, unknown>) =>
  (column.columnDef.meta as { label?: string } | undefined)?.label ??
  (typeof column.columnDef.header === "string"
    ? column.columnDef.header
    : column.id);

// A native checkbox, so selection works the same whether the project's
// shadcn/ui primitives are built on Radix or Base UI.
function SelectBox({
  checked,
  indeterminate = false,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      aria-label={label}
      className="size-4 translate-y-0.5 cursor-pointer rounded accent-primary"
    />
  );
}

function FacetFilter<TData>({
  column,
  title,
  options,
}: {
  column: Column<TData, unknown>;
  title: string;
  options?: DataGridFilter["options"];
}) {
  const facets = column.getFacetedUniqueValues();
  const choices =
    options ??
    [...facets.keys()]
      .map((v) => ({ label: String(v), value: String(v) }))
      .sort((a, b) => a.label.localeCompare(b.label));
  const selected = new Set(
    (column.getFilterValue() as string[] | undefined) ?? [],
  );

  const toggle = (value: string, on: boolean) => {
    const next = new Set(selected);
    if (on) next.add(value);
    else next.delete(value);
    column.setFilterValue(next.size ? [...next] : undefined);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "border-dashed",
        )}
      >
        <PlusCircleIcon aria-hidden />
        <span className="sr-only">Filter by </span>
        {title}
        {selected.size > 0 && (
          <span className="rounded-sm bg-primary/10 px-1.5 text-xs font-medium tabular-nums text-foreground">
            {selected.size}
            <span className="sr-only"> selected</span>
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{title}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {choices.map((choice) => (
          <DropdownMenuCheckboxItem
            key={choice.value}
            checked={selected.has(choice.value)}
            onCheckedChange={(on) => toggle(choice.value, on === true)}
            onSelect={(e) => e.preventDefault()}
          >
            <span className="flex-1">{choice.label}</span>
            <span className="ml-4 text-xs text-muted-foreground tabular-nums">
              {facets.get(choice.value) ?? 0}
            </span>
          </DropdownMenuCheckboxItem>
        ))}
        {selected.size > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => column.setFilterValue(undefined)}
              className="justify-center text-muted-foreground"
            >
              Clear filter
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Sortable, filterable, paginated table built on TanStack Table and the
 * shadcn/ui table primitives. Pass column definitions and rows; search,
 * faceted filters, selection and column visibility are opt-in props.
 */
export function DataGrid<TData, TValue>({
  data,
  columns,
  getRowId,
  searchable = true,
  searchPlaceholder = "Search…",
  filters = [],
  selectable = false,
  onSelectionChange,
  bulkActions,
  columnToggle = true,
  pageSize = 10,
  pageSizes = [10, 20, 50],
  defaultSort = [],
  loading = false,
  empty = "No results.",
  density = "comfortable",
  label = "Data table",
  className,
}: DataGridProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSort);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const allColumns = React.useMemo<ColumnDef<TData, TValue>[]>(() => {
    if (!selectable) return columns;
    const select: ColumnDef<TData, TValue> = {
      id: "__select",
      enableSorting: false,
      enableHiding: false,
      header: ({ table }) => (
        <SelectBox
          label="Select all rows on this page"
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onChange={(v) => table.toggleAllPageRowsSelected(v)}
        />
      ),
      cell: ({ row }) => (
        <SelectBox
          label={`Select row ${row.index + 1}`}
          checked={row.getIsSelected()}
          onChange={(v) => row.toggleSelected(v)}
        />
      ),
    };
    return [select, ...columns];
  }, [columns, selectable]);

  // TanStack returns a mutable table instance, so React Compiler skips this
  // component instead of memoizing it — the intended behavior.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: allColumns,
    getRowId,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      columnVisibility,
    },
    initialState: { pagination: { pageSize } },
    defaultColumn: { filterFn: inSet as FilterFn<TData> },
    globalFilterFn: "includesString",
    enableRowSelection: selectable,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);
  const onSelectionChangeRef = React.useRef(onSelectionChange);
  onSelectionChangeRef.current = onSelectionChange;
  React.useEffect(() => {
    onSelectionChangeRef.current?.(
      table.getSelectedRowModel().rows.map((r) => r.original),
    );
  }, [rowSelection, table]);

  const filtered = table.getFilteredRowModel().rows.length;
  const { pageIndex, pageSize: size } = table.getState().pagination;
  const first = filtered ? pageIndex * size + 1 : 0;
  const last = Math.min((pageIndex + 1) * size, filtered);
  const isFiltered = globalFilter !== "" || columnFilters.length > 0;
  const cellPad = density === "compact" ? "py-1.5" : "py-3";
  const visibleColumns = table.getVisibleLeafColumns().length;
  const clearSelection = () => table.resetRowSelection();

  return (
    <div data-slot="data-grid" className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center gap-2">
        {searchable && (
          <div className="relative w-full sm:w-64">
            <SearchIcon
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              value={globalFilter}
              onChange={(e) => {
                setGlobalFilter(e.target.value);
                table.setPageIndex(0);
              }}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder.replace(/…$/, "")}
              className="h-8 pl-8"
            />
          </div>
        )}
        {filters.map((f) => {
          const column = table.getColumn(f.column);
          return column ? (
            <FacetFilter
              key={f.column}
              column={column as Column<TData, unknown>}
              title={f.title}
              options={f.options}
            />
          ) : null;
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setGlobalFilter("");
              setColumnFilters([]);
            }}
          >
            Reset
            <XIcon aria-hidden />
          </Button>
        )}
        {columnToggle && (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "ml-auto",
              )}
            >
              <Settings2Icon aria-hidden />
              Columns
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Show columns</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {table
                .getAllLeafColumns()
                .filter((c) => c.getCanHide())
                .map((c) => (
                  <DropdownMenuCheckboxItem
                    key={c.id}
                    checked={c.getIsVisible()}
                    onCheckedChange={(v) => c.toggleVisibility(v === true)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {labelOf(c as Column<TData, unknown>)}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {selectable && selectedRows.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1">
          <span className="font-medium tabular-nums">
            {selectedRows.length} selected
          </span>
          <div className="ml-auto flex items-center gap-2">
            {bulkActions?.(selectedRows, clearSelection)}
            <Button variant="ghost" size="sm" onClick={clearSelection}>
              Clear
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border">
        <Table aria-label={label} aria-busy={loading || undefined}>
          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id} className="hover:bg-transparent">
                {group.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const content = header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      );
                  return (
                    <TableHead
                      key={header.id}
                      className="px-3"
                      aria-sort={
                        sorted === "asc"
                          ? "ascending"
                          : sorted === "desc"
                            ? "descending"
                            : header.column.getCanSort()
                              ? "none"
                              : undefined
                      }
                    >
                      {header.column.getCanSort() ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="-mx-1.5 inline-flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-1 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                          {content}
                          {sorted === "asc" ? (
                            <ArrowUpIcon aria-hidden className="size-3.5" />
                          ) : sorted === "desc" ? (
                            <ArrowDownIcon aria-hidden className="size-3.5" />
                          ) : (
                            <ChevronsUpDownIcon
                              aria-hidden
                              className="size-3.5 text-muted-foreground/60"
                            />
                          )}
                        </button>
                      ) : (
                        content
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: size }, (_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  {table.getVisibleLeafColumns().map((c) => (
                    <TableCell key={c.id} className={cn("px-3", cellPad)}>
                      <Skeleton className="h-4 w-full max-w-32" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cn("px-3", cellPad)}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={visibleColumns}
                  className="h-28 text-center text-muted-foreground"
                >
                  {empty}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <p aria-live="polite" className="tabular-nums">
          {loading
            ? "Loading…"
            : filtered
              ? `${first}–${last} of ${filtered}`
              : "0 results"}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span aria-hidden className="hidden sm:inline">
              Rows per page
            </span>
            <Select
              value={String(size)}
              onValueChange={(v) => table.setPageSize(Number(v))}
            >
              <SelectTrigger
                size="sm"
                aria-label="Rows per page"
                className="w-[4.5rem]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizes.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="tabular-nums">
            Page {table.getPageCount() ? pageIndex + 1 : 0} of{" "}
            {table.getPageCount()}
          </span>
          <div className="flex items-center gap-1">
            {(
              [
                [
                  "First page",
                  ChevronsLeftIcon,
                  () => table.firstPage(),
                  !table.getCanPreviousPage(),
                ],
                [
                  "Previous page",
                  ChevronLeftIcon,
                  () => table.previousPage(),
                  !table.getCanPreviousPage(),
                ],
                [
                  "Next page",
                  ChevronRightIcon,
                  () => table.nextPage(),
                  !table.getCanNextPage(),
                ],
                [
                  "Last page",
                  ChevronsRightIcon,
                  () => table.lastPage(),
                  !table.getCanNextPage(),
                ],
              ] as const
            ).map(([name, Icon, go, disabled]) => (
              <Button
                key={name}
                variant="outline"
                size="icon-sm"
                onClick={go}
                disabled={disabled}
                aria-label={name}
              >
                <Icon aria-hidden />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

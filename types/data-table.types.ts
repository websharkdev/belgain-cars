import { type ColumnDef } from "@tanstack/react-table";
import { type LucideIcon } from "lucide-react";

export interface DataTableFilterTab {
    id: string;
    label: string;
    className?: string;
}

export interface DataTableRowAction<TData extends object> {
    label: string;
    icon: LucideIcon;
    variant?: "default" | "destructive";
    separatorBefore?: boolean;
    disabled?: boolean | ((row: TData) => boolean);
    onSelect?: (row: TData) => void;
}

export interface DataTableServerPagination {
    total: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export interface DataTableProps<TData extends object> {
    data: TData[];
    columns: ColumnDef<TData>[];
    filterTabs?: DataTableFilterTab[];
    filterColumnId?: string;
    allTabId?: string;
    allButtonLabel?: string;
    showAllButton?: boolean;
    showFilters?: boolean;
    showSearch?: boolean;
    showPagination?: boolean;
    showEntryCount?: boolean;
    pageSize?: number;
    searchPlaceholder?: string;
    emptyMessage?: string;
    minWidthClassName?: string;
    getSearchableValue?: (row: TData) => string;
    onTabChange?: (tabId: string) => void;
    serverPagination?: DataTableServerPagination;
}

export interface DataTableSortableHeaderProps {
    title: string;
    canSort: boolean;
    isSorted: false | "asc" | "desc";
    onSort?: (event: unknown) => void;
}

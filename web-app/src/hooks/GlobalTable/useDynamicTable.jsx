import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React, {useState} from "react";
import {debounce} from "lodash";

export const useDynamicTable = (data, columns, onFilterChange, pageIndex, pageSize,
                                totalPages,) => {

    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: {pageIndex, pageSize},
        },
        manualPagination: true,
        pageCount: totalPages,
        getCoreRowModel: getCoreRowModel(),
    });

    const [filter, setFilter] = useState('');

    const debouncedSearch = React.useCallback(
        debounce((value) => {
            onFilterChange(value);
        }, 500),
        [onFilterChange]
    );

    const handleChange = React.useCallback(
        (e) => {
            const value = e.target.value;
            setFilter(value);
            debouncedSearch(value);
        },
        [debouncedSearch]
    )

    return{
        filter,
        table,
        handleChange,
    }

}

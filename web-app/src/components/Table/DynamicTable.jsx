import React, {useState} from 'react';
import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table";
import {debounce} from "lodash";


const DynamicTable = ({
                          data,
                          columns,
                          onFilterChange,
                          enableFilters = true,
                          pageIndex,
                          pageSize,
                          totalPages,
                          onPageChange,
                          onPageSizeChange,
                          loading,
                      }) => {

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

    return (
        <div className="content-box-table">
            <input
                type="text"
                placeholder="Wyszukaj w tabeli"
                value={filter}
                className="search-input"
                onChange={handleChange}
            />
            <div className="content-table">
                {!loading ? (
                    <table>
                        <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>

                        <tbody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={table.getHeaderGroups()[0]?.headers.length || 1}>
                                    Brak danych do wyświetlenia
                                </td>
                            </tr>
                        )}
                        </tbody>

                    </table>
                ) : (
                    <p>Ładowanie...</p>
                )}
            </div>
            <div className="pagination">
                <button onClick={() => onPageChange(pageIndex - 1)} disabled={pageIndex <= 0}>
                    Poprzednia
                </button>
                <p>
                    Strona {pageIndex + 1} z {totalPages}
                </p>
                <button onClick={() => onPageChange(pageIndex + 1)} disabled={pageIndex + 1 >= totalPages}>
                    Następna
                </button>
                <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </div>
    );
};

export default DynamicTable;

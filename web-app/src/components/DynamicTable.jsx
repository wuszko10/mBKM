import React from 'react';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";


const DynamicTable = ({data, columns}) => {

    const [filter, setFilter] = React.useState('');

    const filteredData = React.useMemo(
        () => {
            return data.filter(row => {
                return Object.values(row).some(value =>
                    value.toString().toLowerCase().includes(filter.toLowerCase())
                );
            });
        },
        [filter, data]
    );

    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 14,
    });

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="content-box-table">
            <input
                type="text"
                placeholder="Wyszukaj w tabeli"
                value={filter}
                className="search-input"
                onChange={(e) => setFilter(e.target.value)}
            />
            <div className="content-table">

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
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Poprzednia
                </button>
                <p>Strona {table.getState().pagination.pageIndex + 1} z {table.getPageCount()}</p>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Następna
                </button>
            </div>
        </div>

    );
};

export default DynamicTable;

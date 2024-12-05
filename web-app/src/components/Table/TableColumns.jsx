import React from "react";

export const getTicketsTableColumns = (navigate) => [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'typeName',
        header: 'Typ biletu',
    },
    {
        accessorKey: 'periodName',
        header: 'Ważność*',
    },
    {
        accessorKey: 'lineName',
        header: 'Ilość linii',
    },
    {
        accessorKey: 'price',
        header: 'Cena [zł]',
        cell: (info) => (info.getValue() + " zł"),
    },
    {
        accessorKey: 'offerStartDate',
        header: 'Data rozpoczęcia oferty',
        cell: (info) => {
            const dateValue = info.getValue();
            return dateValue ? new Date(dateValue).toLocaleDateString() : 'Brak';
        },
    },
    {
        accessorKey: 'offerEndDate',
        header: 'Data zakończenia oferty',
        cell: (info) => {
            const dateValue = info.getValue();
            return dateValue ? new Date(dateValue).toLocaleDateString() : 'Brak';
        },
    },
    {
        header: 'Szczegóły',
        cell: ({ row }) => (
            <button onClick={() => navigate(`/ticket/${row.original._id}`)}>Zobacz szczegóły</button>
        ),
    },
];

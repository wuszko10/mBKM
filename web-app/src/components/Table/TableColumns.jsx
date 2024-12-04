import React from "react";

export const getTicketsTableColumns = (navigate) => [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'ticketType',
        header: 'Typ biletu',
    },
    {
        accessorKey: 'period',
        header: 'Ważność*',
    },
    {
        accessorKey: 'lines',
        header: 'Ilość linii',
    },
    {
        accessorKey: 'price',
        header: 'Cena [zł]',
    },
    {
        accessorKey: 'offerStartDate',
        header: 'Data rozpoczęcia oferty',
    },
    {
        accessorKey: 'offerEndDate',
        header: 'Data zakończenia oferty',
    },
    {
        header: 'Szczegóły',
        cell: ({ row }) => (
            <button onClick={() => navigate(`/ticket/${row.original.id}`)}>Zobacz szczegóły</button>
        ),
    },
];

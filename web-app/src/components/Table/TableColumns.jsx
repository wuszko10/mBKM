import React from "react";

export const getTicketsTableColumns = (handleEdit, handleRemove) => [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'typeLabel',
        header: 'Typ biletu',
    },
    {
        accessorKey: 'periodLabel',
        header: 'Ważność',
    },
    {
        accessorKey: 'lineLabel',
        header: 'Ilość linii',
    },
    {
        accessorKey: 'price',
        header: 'Cena [zł]',
        cell: (info) => (info.getValue().toFixed(2) + " zł"),
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
        header: ' ',
        cell: ({ row }) => (
            <div className="row-div">
                <button onClick={() => handleEdit(row.original._id)}>Edytuj</button>
                <button onClick={() => handleRemove(row.original._id)}>Usuń</button>
            </div>
        ),
    },
];

export const getReliefColumns = (handleEdit, handleRemove) => [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'name',
        header: 'Nazwa ulgi',
    },
    {
        accessorKey: 'percentage',
        header: 'Odpłatność [%]',
        cell: (info) => (info.getValue() + " %"),
    },
    {
        accessorKey: 'typeLabel',
        header: 'Typ ulgi',
    },
    {
        accessorKey: 'ticketTypeLabel',
        header: 'Typ biletu',
    },
    {
        header: ' ',
        cell: ({ row }) => (
            <div className="row-div">
                <button onClick={() => handleEdit(row.original._id)}>Edytuj</button>
                <button onClick={() => handleRemove(row.original._id)}>Usuń</button>
            </div>
        ),
    },
];

export const getStopsColumns = (handleEdit, handleRemove) => [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'name',
        header: 'Nazwa przystanku',
    },
    {
        accessorKey: 'latitude',
        header: 'Szerokość geograficzna',
    },
    {
        accessorKey: 'longitude',
        header: 'Długość geograficzna',
    },
    {
        header: ' ',
        cell: ({ row }) => (
            <div className="row-div">
                <button onClick={() => handleEdit(row.original._id)}>Edytuj</button>
                <button onClick={() => handleRemove(row.original._id)}>Usuń</button>
            </div>
        ),
    },
];

export const getUsersColumns = (navigate) => [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'firstName',
        header: 'Imię',
    },
    {
        accessorKey: 'lastName',
        header: 'Nazwisko',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'active',
        header: 'Aktywny',
        cell: (info) => {
            const dateValue = info.getValue();
            return dateValue ? "Tak" : 'Nie';
        }
    },
    {
        header: ' ',
        cell: ({ row }) => (
            <button onClick={() => navigate(`/user/${row.original._id}`)}>Zobacz szczegóły</button>
        ),
    },
];

export const getTransactionColumns = (navigate) => [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'number',
        header: 'Numer transakcji',
    },
    {
        accessorKey: 'userEmail',
        header: 'Użytkownik',
        cell: ({row} ) => {
            return <button onClick={() => navigate(`/user/${row.original.userId}`)}>{row.original.userEmail}</button>
        }
    },
    {
        accessorKey: 'finalPrice',
        header: 'Kwota [zł]',
        cell: (info) => (info.getValue().toFixed(2) + " zł"),
    },
    {
        accessorKey: 'paymentDate',
        header: 'Data zakupu',
        cell: (info) => new Date(info.getValue()).toLocaleString(),
    },
    {
        accessorKey: 'ticketNumber',
        header: 'Numer biletu',
    },
    {
        header: ' ',
        cell: ({ row }) => (
            <button onClick={() => navigate(`/transaction/${row.original._id}`)}>Zobacz szczegóły</button>
        ),
    },
];

export const getTopUpTransactionColumns = (navigate) => [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'number',
        header: 'Numer transakcji',
    },
    {
        accessorKey: 'userEmail',
        header: 'Użytkownik',
        cell: ({row} ) => {
            return <button onClick={() => navigate(`/user/${row.original.userId}`)}>{row.original.userEmail}</button>
        }
    },
    {
        accessorKey: 'amount',
        header: 'Kwota [zł]',
        cell: (info) => (info.getValue().toFixed(2) + " zł"),
    },
    {
        accessorKey: 'method',
        header: 'Metoda',
    },
    {
        accessorKey: 'referenceId',
        header: 'Numer płatności',
    },
    {
        accessorKey: 'paymentDate',
        header: 'Data doładowania',
        cell: (info) => new Date(info.getValue()).toLocaleString(),
    }
];

export const getLinesColumns = (handleEdit, handleRemove) => [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'number',
        header: 'Numer linii',
    },
    {
        accessorKey: 'name',
        header: 'Nazwa linii',
    },
    {
        header: ' ',
        cell: ({ row }) => (
            <div className="row-div">
                <button onClick={() => handleEdit(row.original._id)}>Edytuj</button>
                <button onClick={() => handleRemove(row.original._id)}>Usuń</button>
            </div>
        ),
    },
];

import React from "react";

export const getTicketsTableColumns = (handleEdit, handleRemove) => [
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
        header: ' ',
        cell: ({ row }) => (
            <div className="row-div">
                <button onClick={() => handleEdit(row.original._id)}>Edytuj</button>
                <button onClick={() => handleRemove(row.original._id)}>Usuń</button>
            </div>
        ),
    },
];

export const getReliefColumns = (navigate) => [
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
        header: 'Szczegóły',
        cell: ({ row }) => (
            <button onClick={() => navigate(`/relief/${row.original._id}`)}>Zobacz szczegóły</button>
        ),
    },
];

export const getStopsColumns = (navigate) => [
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
        accessorKey: 'longitude',
        header: 'Długość geograficzna',
    },
    {
        accessorKey: 'latitude',
        header: 'Szerokość geograficzna',
    },
    {
        header: 'Szczegóły',
        cell: ({ row }) => (
            <button onClick={() => navigate(`/relief/${row.original._id}`)}>Zobacz szczegóły</button>
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
        header: 'Szczegóły',
        cell: ({ row }) => (
            <button onClick={() => navigate(`/user/${row.original._id}`)}>Zobacz szczegóły</button>
        ),
    },
];

export const getTransactionColumns = (navigate) => [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'number',
        header: 'Numer transakcji',
    },
    {
        accessorKey: 'numberTicket',
        header: 'Numer biletu',
    },
    {
        accessorKey: 'userEmail',
        header: 'Użytkownik',
    },
    {
        accessorKey: 'amount',
        header: 'Kwota [zł]',
    },
    {
        accessorKey: 'purchaseDate',
        header: 'Data zakupu',
    },
    {
        header: 'Szczegóły',
        cell: ({ row }) => (
            <button onClick={() => navigate(`/transaction/${row.original.id}`)}>Zobacz szczegóły</button>
        ),
    },
];

export const getTopUpTransactionColumns = () => [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'number',
        header: 'Numer transakcji',
    },
    {
        accessorKey: 'userEmail',
        header: 'Użytkownik',
    },
    {
        accessorKey: 'amount',
        header: 'Kwota [zł]',
    },
    {
        accessorKey: 'topUpDate',
        header: 'Data doładowania',
    },
    {
        accessorKey: 'method',
        header: 'Metoda',
    }
];

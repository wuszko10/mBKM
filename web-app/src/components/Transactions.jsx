import React from 'react';
import './style.scss';
import DynamicTable from "./DynamicTable";
import {transactions} from "./data";
import {ColumnDef} from "@tanstack/react-table";
import {useNavigate} from "react-router-dom";
const Transactions = () => {

    const navigate = useNavigate();

    const data = React.useMemo(() => transactions, []);
    const columns: ColumnDef<typeof data[0]>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'number',
            header: 'Numer transakcji',
        },
        {
            accessorKey: 'user',
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

    return (
        <div className="main-box">
            <div className="content-box">
                <h2>Transakcje</h2>
                <DynamicTable data={data} columns={columns} />
            </div>

        </div>
    );
};

export default Transactions;


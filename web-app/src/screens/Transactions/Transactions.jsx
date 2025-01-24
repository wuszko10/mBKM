import React from 'react';
import '../../styles/style.scss';
import DynamicTable from "../../components/GlobalTable/DynamicTable";
import {useTransactions} from "../../hooks/Transactions/useTransactions";
const Transactions = () => {

    const {
        columns,
        data,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
        handleTopUp,
    } = useTransactions();

    return (
        <div className="main-box">
            <div className="content-box">
                <div className="header-with-button">
                    <h2>Historia transakcji</h2>
                    <button className="global-button" onClick={handleTopUp}>Historia doładowań</button>
                </div>

                <DynamicTable
                    data={data}
                    columns={columns}
                    onFilterChange={setSearchQuery}
                    pageIndex={page - 1}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPage(newPage + 1)}
                    onPageSizeChange={setPageSize}
                    loading={loading}
                />

            </div>

        </div>
    );
};

export default Transactions;


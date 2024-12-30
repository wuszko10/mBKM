import React from 'react';
import '../../styles/style.scss';
import DynamicTable from "../../components/Table/DynamicTable";
import {useNavigate} from "react-router-dom";
import {getTransactionColumns} from "../../components/Table/TableColumns";
import {useTransactions} from "../../hooks/useTransactions";
const Transactions = () => {

    const navigate = useNavigate();
    const columns = getTransactionColumns(navigate);

    const {
        purchases,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
    } = useTransactions();

    const data = React.useMemo(() => {
        return purchases.length > 0 ? purchases : [];
    }, [purchases]);

    const handleTopUp = () => {
        navigate('/top-ups');
    }

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


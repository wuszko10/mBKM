import {useNavigate} from "react-router-dom";
import {getTopUpTransactionColumns} from "../../components/Table/TableColumns";
import React from "react";
import DynamicTable from "../../components/Table/DynamicTable";
import {useTopUps} from "../../hooks/useTopUps";

const TopUps = () => {

    const navigate = useNavigate();
    const columns = getTopUpTransactionColumns(navigate);

    const {
        topUps,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
    } = useTopUps();

    const data = React.useMemo(() => {
        return topUps.length > 0 ? topUps : [];
    }, [topUps]);


    return (
        <div className="main-box">
            <div className="content-box">
                <h2>Historia doładowań</h2>

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

export default TopUps;

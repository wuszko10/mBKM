import React from "react";
import DynamicTable from "../../components/GlobalTable/DynamicTable";
import {useTopUps} from "../../hooks/Transactions/useTopUps";

const TopUps = () => {

    const {
        data,
        columns,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
    } = useTopUps();

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

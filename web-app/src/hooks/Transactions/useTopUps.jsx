import React, {useEffect, useCallback} from 'react';
import {toast} from "react-toastify";
import {fetchTopUps} from "../../services/Transactions/trasanction.service";
import {getTopUpTransactionColumns} from "../../utils/TableColumns";
import useReusableState from "../useReusableState";

export const useTopUps = () => {

    const {
        items: topUps,
        setItems: setTopUps,
        loading,
        setLoading,
        page,
        setPage,
        pageSize,
        setPageSize,
        searchQuery,
        setSearchQuery,
        totalPages,
        setTotalPages,
        token,
        navigate,
    } = useReusableState();


    const refreshTopUps = useCallback( () => {
        fetchTopUps(page, pageSize, searchQuery, token)
            .then((data) => {
                setTopUps(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch(() => {
                setTopUps([]);
                toast.warn('Błąd odświeżania danych', {
                    position: 'top-right',
                    theme: "colored",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, pageSize, searchQuery, setLoading, setTopUps, setTotalPages, token])


    useEffect(() => {
        refreshTopUps();
    }, [refreshTopUps]);

    const data = React.useMemo(() => {
        return topUps.length > 0 ? topUps : [];
    }, [topUps]);

    const columns = getTopUpTransactionColumns(navigate);

    return {
        data,
        columns,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
    };
};

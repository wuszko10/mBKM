import React, {useCallback, useEffect} from 'react';
import {toast} from "react-toastify";
import {fetchTransactions} from "../../services/Transactions/trasanction.service";
import {getTransactionColumns} from "../../utils/TableColumns";
import useReusableState from "../useReusableState";

export const useTransactions = () => {

    const {
        items: transactions,
        setItems: setTransactions,
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

    const refreshTransaction = useCallback( () => {
        fetchTransactions(page, pageSize, searchQuery, token)
            .then((data) => {
                setTransactions(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch(() => {
                setTransactions([]);
                toast.warn('Błąd odświeżania danych', {
                    position: 'top-right',
                    theme: "colored",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, pageSize, searchQuery, setLoading, setTransactions, setTotalPages, token])

    useEffect(() => {
        refreshTransaction();
    }, [refreshTransaction]);

    const data = React.useMemo(() => {
        return transactions.length > 0 ? transactions : [];
    }, [transactions]);

    const handleTopUp = () => {
        navigate('/top-ups');
    }

    const columns = getTransactionColumns(navigate);

    return {
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
    };
};

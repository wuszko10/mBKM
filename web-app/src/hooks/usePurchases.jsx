import { useState, useEffect } from 'react';
import {toast} from "react-toastify";
import {fetchPurchases} from "../services/trasanction.service";

export const usePurchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchPurchases(page, pageSize, searchQuery)
            .then((data) => {
                setPurchases(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch((error) => {
                setPurchases([]);
                toast.error('Brak danych w bazie', {
                    position: 'top-right',
                    theme: "colored",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, pageSize, searchQuery]);

    return {
        purchases,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
    };
};

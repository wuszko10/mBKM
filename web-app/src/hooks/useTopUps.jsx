import { useState, useEffect } from 'react';
import {toast} from "react-toastify";
import {fetchTopUps} from "../services/trasanction.service";

export const useTopUps = () => {
    const [topUps, setTopUps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchTopUps(page, pageSize, searchQuery)
            .then((data) => {
                setTopUps(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch((error) => {
                setTopUps([]);
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
        topUps,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
    };
};

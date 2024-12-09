import { useState, useEffect } from 'react';
import { fetchTickets } from '../services/ticketService';
import {fetchReliefs} from "../services/reliefService";
import {toast} from "react-toastify";

export const useReliefs = () => {
    const [reliefs, setReliefs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    const refreshReliefs = () => {
        fetchReliefs(page, pageSize, searchQuery)
            .then((data) => {
                setReliefs(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch((error) => {
                setReliefs([]);
                toast.error('Brak danych w bazie', {
                    position: 'top-right',
                    theme: "colored",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        refreshReliefs();
    }, [page, pageSize, searchQuery]);

    return {
        reliefs,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
        refreshReliefs,
    };
};

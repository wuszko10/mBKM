import { useState, useEffect } from 'react';
import { fetchTickets } from '../services/ticket.service';
import {fetchReliefs} from "../services/relief.service";
import {toast} from "react-toastify";
import {useAuth} from "../context/authProvider";

export const useReliefs = () => {
    const [reliefs, setReliefs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const {token} = useAuth();
    const refreshReliefs = () => {
        fetchReliefs(page, pageSize, searchQuery, token)
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
        token,
    };
};

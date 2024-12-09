import { useState, useEffect } from 'react';
import { fetchTickets } from '../services/ticketService';
import {fetchReliefs} from "../services/reliefService";
import {toast} from "react-toastify";
import {fetchStops} from "../services/stopService";

export const useStops = () => {
    const [stops, setStops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    const refreshStops = () => {
        fetchStops(page, pageSize, searchQuery)
            .then((data) => {
                setStops(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch((error) => {
                setStops([]);
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
        refreshStops();
    }, [page, pageSize, searchQuery]);

    return {
        stops,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
        refreshStops,
    };
};

import { useState, useEffect } from 'react';
import { fetchTickets } from '../services/ticketService';

export const useTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        fetchTickets(page, pageSize, searchQuery)
            .then((data) => {
                setTickets(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch((error) => {
                console.error("Failed to fetch tickets", error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [page, pageSize, searchQuery]);

    return {
        tickets,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
    };
};

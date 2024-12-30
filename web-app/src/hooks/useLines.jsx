import { useState, useEffect } from 'react';
import { fetchTickets } from '../services/ticket.service';
import {fetchReliefs} from "../services/relief.service";
import {toast} from "react-toastify";
import {fetchStops} from "../services/stop.service";
import {fetchLines} from "../services/line.service";
import {useAuth} from "../context/authProvider";

export const useLines = () => {
    const [lines, setLines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const {token} = useAuth();

    const refreshLines = () => {
        fetchLines(page, pageSize, searchQuery, token)
            .then((data) => {
                setLines(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch((error) => {
                setLines([]);
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
        refreshLines();
    }, [page, pageSize, searchQuery]);

    return {
        lines,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
        refreshLines,
    };
};

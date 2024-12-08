import { useState, useEffect } from 'react';
import { fetchTickets } from '../services/ticketService';
import {fetchReliefs} from "../services/reliefService";
import {toast} from "react-toastify";
import {fetchUsers} from "../services/userService";

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchUsers(page, pageSize, searchQuery)
            .then((data) => {
                setUsers(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch((error) => {
                setUsers([]);
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
        users,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
    };
};

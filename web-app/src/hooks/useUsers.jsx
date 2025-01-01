import { useState, useEffect } from 'react';
import {toast} from "react-toastify";
import {fetchUsers} from "../services/user.service";
import {useAuth} from "../context/authProvider";

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const {token} = useAuth();
    const refreshUsers = () => {
        fetchUsers(page, pageSize, searchQuery, token)
            .then((data) => {
                setUsers(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch(() => {
                setUsers([]);
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
        refreshUsers();
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
        refreshUsers,
        token,
    };
};

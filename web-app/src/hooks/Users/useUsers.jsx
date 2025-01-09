import React, {useEffect, useCallback} from 'react';
import {toast} from "react-toastify";
import {fetchUsers} from "../../services/Users/user.service";
import {getUsersColumns} from "../../utils/TableColumns";
import useReusableState from "../useReusableState";
import {changeActiveStatus} from "../../services/Users/changeActiveStatus";

export const useUsers = () => {

    const {
        show,
        setShow,
        items: users,
        setItems: setUsers,
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


    const refreshUsers = useCallback (() => {
        fetchUsers(page, pageSize, searchQuery, token)
            .then((data) => {
                setUsers(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch(() => {
                setUsers([]);
                toast.warn('Błąd odświeżania danych', {
                    position: 'top-right',
                    theme: "colored",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, pageSize, searchQuery, setLoading, setTotalPages, setUsers, token])

    useEffect(() => {
        refreshUsers();
    }, [refreshUsers]);

    const data = React.useMemo(() => {
        return users.length > 0 ? users : [];
    }, [users]);

    const handleShowCreateForm = () => {
        setShow(true);
    };

    const handleToggle = async (id) => {

        await changeActiveStatus(id, token, refreshUsers);

    }

    const columns = getUsersColumns(navigate, handleToggle);

    return {
        data,
        columns,
        loading,
        page,
        pageSize,
        totalPages,
        show,
        setPage,
        setPageSize,
        setSearchQuery,
        setShow,
        refreshUsers,
        handleShowCreateForm
    };
};

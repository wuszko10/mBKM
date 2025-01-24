import React, {useState, useEffect, useCallback} from 'react';
import {fetchTickets} from '../../services/Tickets/ticket.service';
import {getTicketsTableColumns} from "../../utils/TableColumns";
import {toast} from "react-toastify";
import useReusableState from "../useReusableState";

export const useTickets = () => {

    const {
        show,
        setShow,
        selectedItem: selectedTicket,
        setSelectedItem: setSelectedTicket,
        title,
        setTitle,
        buttonText,
        setButtonText,
        editMode,
        setEditMode,
        items: tickets,
        setItems: setTickets,
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
        navigate
    } = useReusableState();

    const oldTicket = {};
    const [duplicateMode, setDuplicateMode] = useState(false);
    const [cancelMode, setCancelMode] = useState(false);

    const refreshTickets = useCallback(() => {
        fetchTickets(page, pageSize, searchQuery, token)
                .then((data) => {
                    setTickets(data.data);
                    setTotalPages(data.totalPages || 0);
                })
                .catch(() => {
                    toast.warn('Błąd odświeżania danych', {
                        position: 'top-right',
                        theme: "colored",
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
    },[page, pageSize, searchQuery, setLoading, setTickets, setTotalPages, token]);

    useEffect(() => {
        refreshTickets();
    }, [page, pageSize, refreshTickets, searchQuery]);


    const data = React.useMemo(() => {
        return tickets.length > 0 ? tickets : [];
    }, [tickets]);



    const handleShowCreateForm = () => {
        setSelectedTicket({});
        setTitle('Dodaj nowy typ biletu');
        setButtonText("Utwórz");
        setEditMode(false);
        setShow(true);
    };



    const columns = getTicketsTableColumns(navigate);

    return {
        loading,
        page,
        pageSize,
        totalPages,
        data,
        columns,
        show,
        selectedTicket,
        oldTicket,
        title,
        buttonText,
        editMode,
        duplicateMode,
        cancelMode,
        setPage,
        setPageSize,
        setSearchQuery,
        setShow,
        setEditMode,
        setDuplicateMode,
        setCancelMode,
        refreshTickets,
        handleShowCreateForm,
    };
};

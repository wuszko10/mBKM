import React, {useState, useEffect, useCallback} from 'react';
import {deleteTicket, fetchTickets} from '../../services/Tickets/ticket.service';
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
    } = useReusableState();

    const [oldTicket, setOldTicket] = useState({});
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

    const formatStartDate = (offerStartDate) => {
        const newStartDate = new Date(offerStartDate);
        newStartDate.setHours(12, 0, 0, 0);
        return newStartDate;
    };

    const getTicketById = (id) => {
        const ticket  = tickets.find(ticket => ticket._id === id);

        if (!ticket) {
            toast.warn('Nie znaleziono biletu', {
                position: 'top-right',
                theme: "colored",
            });
            return;
        }

        const updatedTicket = { ...ticket };

        updatedTicket.offerStartDate = formatStartDate(updatedTicket.offerStartDate)

        return updatedTicket;
    }

    const handleShowCreateForm = () => {
        setSelectedTicket({});
        setOldTicket({});
        setTitle('Dodaj nowy typ biletu');
        setButtonText("Utwórz");
        setCancelMode(false);
        setDuplicateMode(false);
        setEditMode(false);
        setShow(true);
    };

    function handleShowEditForm(id) {

        const updatedTicket = getTicketById(id);

        setSelectedTicket(updatedTicket);
        setOldTicket({});
        setTitle(`Aktualizuj bilet ${updatedTicket._id}`);
        setButtonText("Aktualizuj");
        setEditMode(true);
        setShow(true);
    }

    async function  handleCancel(id) {

        const updatedTicket = getTicketById(id);

        setSelectedTicket(updatedTicket);
        setOldTicket({});
        setTitle(`Zmień datę zakończenia oferty`);
        setButtonText("Zmień datę");
        setEditMode(true);
        setCancelMode(true);
        setShow(true);
    }

    async function handleRemove(id) {

        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć ten bilet?');

        if (confirmDelete) {
            await deleteTicket(id, token);
            await refreshTickets();
        }
    }

    function handleDuplicate(id) {
        const ticket = tickets.find(ticket => ticket._id === id);

        const oldTicket = { ...ticket };
        const newTicket = { ...ticket };

        const currentDate = oldTicket.offerEndDate ? oldTicket.offerEndDate : oldTicket.offerStartDate
        const newStartDate = new Date(currentDate);
        newStartDate.setDate(newStartDate.getDate() + 1);
        newStartDate.setHours(1,0,0,0);

        newTicket.offerStartDate = new Date(newStartDate);
        newTicket.price = '';
        newTicket.offerEndDate = '';

        delete newTicket._id;

        setSelectedTicket(newTicket);
        setOldTicket(oldTicket);
        setTitle('Ustal nową cenę biletu');
        setButtonText("Zmień cenę");
        setEditMode(true);
        setDuplicateMode(true);
        setShow(true);
    }

    const columns = getTicketsTableColumns(handleShowEditForm, handleRemove, handleDuplicate, handleCancel);

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

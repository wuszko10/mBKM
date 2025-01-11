import React, {useState, useEffect, useCallback} from 'react';
import {deleteTicket, fetchTickets} from '../../services/Tickets/ticket.service';
import {getTicketsDetailsTableColumns} from "../../utils/TableColumns";
import {toast} from "react-toastify";
import useReusableState from "../useReusableState";

export const useTicketsDetails = (type: string, lines: string, period: string) => {

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

    const query = type + ' ' + lines + ' ' + period;

    const refreshTickets = useCallback(() => {
        fetchTickets(page, pageSize, query, token, false)
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
    },[page, pageSize, query, setLoading, setTickets, setTotalPages, token]);

    useEffect(() => {
        refreshTickets();
    }, [page, pageSize, refreshTickets, searchQuery]);


    const data = React.useMemo(() => {
        if (tickets.length === 0) return [];

        const latestOfferStartDate = tickets.reduce((latest, row) => {
            const offerStartDate = new Date(row.offerStartDate);
            return offerStartDate > latest ? offerStartDate : latest;
        }, new Date(0));


        tickets.forEach((row, index) => {
            const currentDate = new Date(Date.now());
            currentDate.setDate(currentDate.getDate() + 1);
            currentDate.setHours(0,0,0,0);

            const isCurrentDateBetween = currentDate.getTime() <= latestOfferStartDate.getTime() && currentDate.getTime() >= new Date(row.offerEndDate).getTime();

            row.isLast = !row.offerEndDate || isCurrentDateBetween || (index === 0 && row.offerEndDate);
        });

        return tickets;

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

    const duplicateForm = (newTicket) => {
        newTicket.price = '';
        newTicket.offerEndDate = '';
        delete newTicket._id;

        setSelectedTicket(newTicket);
        setOldTicket({});
        setTitle('Ustal nową cenę biletu');
        setButtonText("Zmień cenę");
        setEditMode(true);
        setDuplicateMode(true);
        setShow(true);
    }

    const handleShowCreateForm = () => {
        const ticket = tickets[0];
        const currentDate = new Date(Date.now());
        currentDate.setHours(1,0,0,0);

        let latestOfferEndDate = tickets.reduce((latest, row) => {
            const offerEndDate = row.offerEndDate && new Date(row.offerEndDate); //tutaj dawać aktualną datę, jeśli jest to data wsteczna
            return offerEndDate > latest ? offerEndDate : latest;
        }, new Date(0));

        const hasNotOfferEndDate = tickets.some(row => !row.offerEndDate);

        if (hasNotOfferEndDate) {
            window.alert('Brak daty zakończenia oferty. Należy zakończyć aktualną ofertę.');
            return;
        }
        if (latestOfferEndDate)

        latestOfferEndDate.setDate(latestOfferEndDate.getDate() + 1);
        latestOfferEndDate.setHours(1,0,0,0);

        if (latestOfferEndDate < currentDate) {
            latestOfferEndDate = currentDate;
        }

        const newTicket = { ...ticket };
        newTicket.offerStartDate = latestOfferEndDate;

        duplicateForm(newTicket);

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

        const currentDate = new Date(Date.now());
        currentDate.setHours(1,0,0,0);

        const ticketDate = oldTicket.offerEndDate ? oldTicket.offerEndDate : oldTicket.offerStartDate
        let newStartDate = new Date(ticketDate);
        newStartDate.setDate(newStartDate.getDate() + 1);
        newStartDate.setHours(1,0,0,0);

        if (newStartDate < currentDate) {
            newStartDate = currentDate;
        }

        newTicket.offerStartDate = new Date(newStartDate);

        duplicateForm(newTicket);
    }

    const columns = getTicketsDetailsTableColumns(handleShowEditForm, handleRemove, handleDuplicate, handleCancel);

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

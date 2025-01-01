import React, { useState, useEffect } from 'react';
import {deleteTicket, fetchTickets} from '../services/ticket.service';
import {useAuth} from "../context/authProvider";
import {getTicketsTableColumns} from "../components/Table/TableColumns";

export const useTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [show, setShow] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState({});
    const [oldTicket, setOldTicket] = useState({});
    const [title, setTitle] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [duplicateMode, setDuplicateMode] = useState(false);
    const [cancelMode, setCancelMode] = useState(false);
    const {token} = useAuth();

    const refreshTickets = () => {
        fetchTickets(page, pageSize, searchQuery, token)
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
    };

    useEffect(() => {
        refreshTickets();
    }, [page, pageSize, searchQuery]);


    const data = React.useMemo(() => {
        return tickets.length > 0 ? tickets : [];
    }, [tickets]);

    const handleShowCreateForm = () => {
        setTitle('Dodaj nowy typ biletu');
        setButtonText("Utwórz");
        setShow(true);
    };

    function handleShowEditForm(id) {
        let ticket = tickets.find(ticket => ticket._id === id);
        setSelectedTicket(ticket);
        setTitle(`Aktualizuj bilet ${ticket._id}`);
        setButtonText("Aktualizuj");
        setEditMode(true);
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
        let ticket = tickets.find(ticket => ticket._id === id);
        let newTicket = ticket;

        const currentDate = ticket.offerEndDate ? ticket.offerEndDate : ticket.offerStartDate
        const newStartDate = new Date(currentDate);
        newStartDate.setDate(newStartDate.getDate() + 1);
        newStartDate.setHours(1,0,0,0);

        newTicket.offerStartDate = new Date(newStartDate);

        delete newTicket._id;
        delete newTicket.price;
        delete newTicket.offerEndDate;

        setSelectedTicket(newTicket);
        setOldTicket(ticket);
        setTitle('Zmień cenę biletu');
        setButtonText("Aktualizuj");
        setEditMode(true);
        setShow(true);
    }


    async function  handleCancel(id) {

        let ticket = tickets.find(ticket => ticket._id === id);
        setSelectedTicket(ticket);
        setTitle(`Zmień datę zakończenia oferty`);
        setButtonText("Zmień datę");
        setEditMode(true);
        setDuplicateMode(true);
        setCancelMode(true);
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

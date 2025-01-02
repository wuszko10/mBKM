import React, {useState, useEffect, useCallback} from 'react';
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

    const refreshTickets = useCallback(() => {
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
    },[page, pageSize, searchQuery, token]);

    useEffect(() => {
        refreshTickets();
    }, [page, pageSize, refreshTickets, searchQuery]);


    const data = React.useMemo(() => {
        return tickets.length > 0 ? tickets : [];
    }, [tickets]);

    const handleShowCreateForm = () => {
        setSelectedTicket({});
        setOldTicket({});
        setTitle('Dodaj nowy typ biletu');
        setButtonText("Utwórz");
        setShow(true);
    };

    function handleShowEditForm(id) {
        let tmp = tickets.find(ticket => ticket._id === id);
        const ticket = { ...tmp};

        const newStartDate = new Date(ticket.offerStartDate);
        newStartDate.setDate(newStartDate.getDate());
        newStartDate.setHours(1,0,0,0);
        ticket.offerStartDate = newStartDate

        setSelectedTicket(ticket);
        setOldTicket({});
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
        const ticket = tickets.find(ticket => ticket._id === id);
        const newTicket = { ...ticket };

        const currentDate = ticket.offerEndDate ? ticket.offerEndDate : ticket.offerStartDate
        const newStartDate = new Date(currentDate);
        newStartDate.setDate(newStartDate.getDate() + 1);
        newStartDate.setHours(1,0,0,0);

        newTicket.offerStartDate = new Date(newStartDate);
        newTicket.price = '';
        newTicket.offerEndDate = '';

        delete newTicket._id;

        setSelectedTicket(newTicket);
        setOldTicket(ticket);
        setTitle('Ustal nową cenę biletu');
        setButtonText("Zmień cenę");
        setEditMode(true);
        setShow(true);
    }


    async function  handleCancel(id) {

        let ticket = tickets.find(ticket => ticket._id === id);
        setSelectedTicket(ticket);
        setOldTicket({});
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

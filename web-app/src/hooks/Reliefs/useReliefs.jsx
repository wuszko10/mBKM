import React, {useEffect, useCallback} from 'react';
import {deleteRelief, editRelief, fetchReliefs} from "../../services/Reliefs/relief.service";
import {toast} from "react-toastify";
import {getReliefColumns} from "../../utils/TableColumns";
import useReusableState from "../useReusableState";

export const useReliefs = () => {

    const {
        show,
        setShow,
        selectedItem: selectedRelief,
        setSelectedItem: setSelectedRelief,
        title,
        setTitle,
        buttonText,
        setButtonText,
        editMode,
        setEditMode,
        items: reliefs,
        setItems: setReliefs,
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

    const refreshReliefs = useCallback( () => {
        fetchReliefs(page, pageSize, searchQuery, token)
            .then((data) => {
                setReliefs(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch(() => {
                setReliefs([]);
                toast.warn('Błąd odświeżania danych', {
                    position: 'top-right',
                    theme: "colored",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    },[page, pageSize, searchQuery, setLoading, setReliefs, setTotalPages, token]);

    useEffect(() => {
        refreshReliefs();
    }, [refreshReliefs]);


    const data = React.useMemo(() => {
        return reliefs.length > 0 ? reliefs : [];
    }, [reliefs]);


    const handleShowCreateForm = () => {
        setTitle('Dodaj nową ulgę');
        setButtonText("Utwórz");
        setShow(true);
    };

    function handleShowEditForm(id) {
        let relief = reliefs.find(relief => relief._id === id);
        setSelectedRelief(relief);
        setTitle('Aktualizuj ulgę');
        setButtonText("Aktualizuj");
        setEditMode(true);
        setShow(true);
    }

    async function  handleRemove(id) {

        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć tę ulgę?');

        if (confirmDelete) {
            await deleteRelief(id, token);
            await refreshReliefs();
        }
    }

    async function handleToggle(id, newState) {

        const isConfirmed = window.confirm("Czy chcesz dezaktywować ulgę?");

        if (isConfirmed) {
            const data = reliefs.find(relief => relief._id === id);
            data.isActive = Boolean(newState);

            if (data){
                await editRelief(id, data, token)
                await refreshReliefs();
            }
        }
    }

    const columns = getReliefColumns(handleShowEditForm, handleRemove, handleToggle);

    return {
        data,
        columns,
        loading,
        page,
        pageSize,
        totalPages,
        show,
        title,
        buttonText,
        editMode,
        selectedRelief,
        setPage,
        setPageSize,
        setSearchQuery,
        setShow,
        setEditMode,
        refreshReliefs,
        handleShowCreateForm,
    };
};

import React, {useEffect, useCallback} from 'react';
import {toast} from "react-toastify";
import {deleteLine, editLine, fetchLines} from "../../services/Lines/line.service";
import useReusableState from "../useReusableState";
import {getLinesColumns} from "../../utils/TableColumns";

export const useLines = () => {

    const {
        show,
        setShow,
        selectedItem: selectedLine,
        setSelectedItem: setSelectedLine,
        title,
        setTitle,
        buttonText,
        setButtonText,
        editMode,
        setEditMode,
        items: lines,
        setItems: setLines,
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


    const refreshLines = useCallback( () => {
        fetchLines(page, pageSize, searchQuery, token)
            .then((data) => {
                setLines(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch(() => {
                setLines([]);
                toast.warn('Błąd odświeżania danych', {
                    position: 'top-right',
                    theme: "colored",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, pageSize, searchQuery, setLoading, setLines, setTotalPages, token])

    useEffect(() => {
        refreshLines();
    }, [refreshLines]);

    const data = React.useMemo(() => {
        return lines.length > 0 ? lines : [];
    }, [lines]);

    const handleShowCreateForm = () => {
        setTitle('Dodaj nową linię');
        setButtonText("Utwórz");
        setShow(true);
    };

    function handleShowEditForm(id) {
        let line = lines.find(line => line._id === id);
        setSelectedLine(line);
        setTitle('Aktualizuj linię');
        setButtonText("Aktualizuj");
        setEditMode(true);
        setShow(true);
    }


    async function handleRemove(id) {

        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć tę linię?');

        if (confirmDelete) {
            await deleteLine(id, token);
            await refreshLines();
        }
    }

    async function handleToggle(id, newState) {

        const isConfirmed = window.confirm("Czy chcesz dezaktywować linię?");

        if (isConfirmed) {
            let data = lines.find(l => l._id === id);
            data.isActive = Boolean(newState);

            if (data) {
                await editLine(id, data, token)
                await refreshLines();
            }
        }

    }

    const columns = getLinesColumns(handleShowEditForm, handleRemove, handleToggle);

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
        selectedLine,
        setPage,
        setPageSize,
        setSearchQuery,
        setShow,
        setEditMode,
        refreshLines,
        handleShowCreateForm,
    };
};

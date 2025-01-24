import React, {useCallback, useEffect} from 'react';
import {toast} from "react-toastify";
import {deleteBusStop, editBusStop, fetchStops} from "../../services/BusStops/stop.service";
import {getStopsColumns} from "../../utils/TableColumns";
import useReusableState from "../useReusableState";

export const useStops = () => {

    const {
        show,
        setShow,
        selectedItem: selectedBusStop,
        setSelectedItem: setSelectedBusStop,
        title,
        setTitle,
        buttonText,
        setButtonText,
        editMode,
        setEditMode,
        items: stops,
        setItems: setStops,
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

    const refreshStops = useCallback( () => {
        fetchStops(page, pageSize, searchQuery, token)
            .then((data) => {
                setStops(data.data);
                setTotalPages(data.totalPages || 0);
            })
            .catch(() => {
                setStops([]);
                toast.warn('Błąd odświeżania danych', {
                    position: 'top-right',
                    theme: "colored",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, pageSize, searchQuery, setLoading, setStops, setTotalPages, token]);

    useEffect(() => {
        refreshStops();
    }, [refreshStops]);

    const data = React.useMemo(() => {
        return stops.length > 0 ? stops : [];
    }, [stops]);

    const handleShowCreateForm = () => {
        setTitle('Dodaj nowy przystanek');
        setButtonText("Utwórz");
        setShow(true);
    };

    function handleShowEditForm(id) {
        let busStop = stops.find(busStop => busStop._id === id);
        setSelectedBusStop(busStop);
        setTitle('Aktualizuj przystanek');
        setButtonText("Aktualizuj");
        setEditMode(true);
        setShow(true);
    }


    async function  handleRemove(id) {

        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć ten przystanek?');

        if (confirmDelete) {
            await deleteBusStop(id, token);
            await refreshStops();
        }
    }

    async function handleToggle(id, newState) {

        const isConfirmed = window.confirm("Czy chcesz dezaktywować przystanek?");

        if (isConfirmed) {
            let busStop = stops.find(busStop => busStop._id === id);
            busStop.isActive = Boolean(newState);

            if (busStop) {
                await editBusStop(id, busStop, token)
                await refreshStops();
            }
        }

    }

    const columns = getStopsColumns(handleShowEditForm, handleRemove, handleToggle);

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
        selectedBusStop,
        setPage,
        setPageSize,
        setSearchQuery,
        setShow,
        setEditMode,
        refreshStops,
        handleShowCreateForm,
    };
};

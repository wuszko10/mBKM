import GlobalPopupForm from "../GlobalPopupForm";
import React, {useEffect, useState} from "react";
import {getTicketFormFields} from "../PopupFields";
import {addTicket, editTicket} from "../../../services/ticket.service";
import {useAuth} from "../../../context/authProvider";
import {toast} from "react-toastify";

const TicketPopupForm = ({show, setShow, ticket, oldTicket, titleForm, buttonText, editMode, duplicateMode, cancelMode, setEditMode, setDuplicateMode, setCancelMode, refreshTickets}) => {

    const initialFormData = {
        type: '',
        lines: '',
        period: '',
        price: '',
        offerStartDate: '',
        offerEndDate: '',
    }

    const [formData, setFormData] = useState(initialFormData);
    const metadata = JSON.parse(localStorage.getItem('metadata'));
    const formFields = getTicketFormFields(metadata, editMode, duplicateMode, cancelMode);
    const { token } = useAuth();

    const loadData = () => {

        if (!(ticket === undefined)) {
            const startDate = ticket.offerStartDate && Date.parse(ticket.offerStartDate)
                ? (() => {
                    const localDate = new Date(ticket.offerStartDate);
                    return localDate.toISOString().split("T")[0];
                })()
                : '';

            const endDate = ticket.offerEndDate && Date.parse(ticket.offerEndDate)
                ? (() => {
                    const localDate = new Date(ticket.offerEndDate);
                    return localDate.toISOString().split("T")[0];
                })()
                : '';

            setFormData({
                type: ticket.type,
                lines: ticket.lines,
                period: ticket.period,
                price: ticket.price,
                offerStartDate: startDate,
                offerEndDate: endDate,
            });
        }

    }

    useEffect( () => {
        if (show){
            loadData();
        }

    }, [show]);

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setDuplicateMode(false);
        setCancelMode(false);
        setFormData(initialFormData);
    };
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const isFormValid = () => {
        const requiredFields = formFields.filter((field) => field.required).map((field) => field.name);
        return requiredFields.every((field) => formData[field] !== "");
    };

    const isValidDate = () => {
        const offerStartDate = new Date(formData.offerStartDate);
        offerStartDate.setHours(0,0,0,0);
        formData.offerStartDate = offerStartDate;

        const currentDate = new Date(Date.now())
        currentDate.setHours(0,0,0,0);

        if (editMode || cancelMode || duplicateMode) {

            const endDateCheck = new Date(oldTicket.offerEndDate);
            if (offerStartDate <= endDateCheck) {
                alert(`Data musi być późniejsza niż obowiązująca oferta.\n\nAktualnie oferta ważna jest do: ${endDateCheck.toLocaleString()}\nWybrana data: ${offerStartDate.toLocaleString()}`);
                return false;
            }
        } else {

            if (offerStartDate<=currentDate){
                alert(`Data rozpoczęcia oferty nie może być późniejsza niż bieżący dzień.\n\nAktualna data: ${currentDate.toLocaleString()}\nWybrana data: ${offerStartDate.toLocaleString()}`);
                return false;
            }

            if (formData.offerEndDate) {
                const offerEndDate = new Date(formData.offerEndDate);
                offerEndDate.setHours(23,59,59,999);
                formData.offerEndDate = offerEndDate;
            }
        }

        return true;
    }

    const handleCreateOrUpdateTicket = async () => {


        try {

            await addTicket(formData, token);
        } catch (err) {
            if (err.response && err.response.status === 405) {
                alert('Próba stworzenia oferty z nakładającą się datą. Operacja nie powiodła się');
            } else {
                toast.error('Bilet nie został utworzony', {
                    position: 'top-right',
                    theme: "colored",
                });
            }
            throw err;
        }

    };

    async function handleCreate(event) {
        event.preventDefault();

        if (!isFormValid()) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        if (!isValidDate()) {
            return;
        }

        try {
            await handleCreateOrUpdateTicket();
            handleClose();
            await refreshTickets();
        } catch (err) {
            toast.warn('Bilet nie został utworzony', {
                position: 'top-right',
                theme: "colored",
            });
        }


    }

    async function handleEdit(event) {
        event.preventDefault();

        if (!isFormValid()) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        const startDate = new Date(formData.offerStartDate);
        startDate.setHours(0,0,0,0);

        formData.offerStartDate = startDate;

        if (formData.offerEndDate && formData.offerEndDate !== ''){
            const endDate = new Date(formData.offerEndDate);
            endDate.setHours(23, 59, 59, 999);

            formData.offerEndDate = endDate;
        }


        try {

            await editTicket(ticket._id, formData, token);
        } catch (error) {
            toast.error('Operacja nie powiodła się', {
                position: 'top-right',
                theme: "colored",
            });
        } finally {
            handleClose();
            await refreshTickets();
        }
    }

    return (
        <GlobalPopupForm
            isOpen={show}
            onClose={handleClose}
            title={titleForm}
            formData={formData}
            handleInputChange={handleInputChange}
            onSubmit={ !ticket._id ? handleCreate : handleEdit}
            formFields={formFields}
            submitButtonText={buttonText}
        />
    );
};

export default TicketPopupForm;

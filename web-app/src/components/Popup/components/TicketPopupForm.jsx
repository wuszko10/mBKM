import GlobalPopupForm from "../GlobalPopupForm";
import React, {useEffect, useState} from "react";
import {getTicketFormFields} from "../PopupFields";
import {addTicket, editTicket} from "../../../services/ticket.service";
import {useAuth} from "../../../context/authProvider";

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

    useEffect(loadData, [ticket]);

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

    const handleOldTicketEdit = async () => {
        const newStartDate = new Date(formData.offerStartDate);
        const oldTicketEndDay = new Date(newStartDate);
        oldTicketEndDay.setDate(oldTicketEndDay.getDate() - 1);
        oldTicketEndDay.setHours(23, 59, 59, 999);
        oldTicket.offerEndDate = oldTicketEndDay;

        console.log(oldTicket)
        console.log(JSON.stringify(oldTicket))

        await editTicket(oldTicket._id, oldTicket, token);
    };

    const handleCreateOrUpdateTicket = async () => {
        const offerStartDate = new Date(formData.offerStartDate);
        formData.offerStartDate = offerStartDate;
        offerStartDate.setHours(0,0,0,0);


        if (editMode || cancelMode) {
            const endDateCheck = new Date(oldTicket.offerEndDate);
            if (offerStartDate <= endDateCheck) {
                alert(`Data musi być późniejsza niż obowiązująca oferta.\n\nAktualnie oferta ważna jest do: ${endDateCheck.toLocaleString()}\nWybrana data: ${offerStartDate.toLocaleString()}`);
                return;
            }
        }

        // await addTicket(formData, token);

        setFormData(initialFormData);
    };

    async function handleCreate(event) {
        event.preventDefault();

        if (!isFormValid()) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        if ( oldTicket ){
            console.log("tutaj");
            await handleOldTicketEdit();
        }

        // await handleCreateOrUpdateTicket();

        handleClose();
        await refreshTickets();

    }

    async function handleEdit(event) {
        event.preventDefault();

        const endDate = new Date(formData.offerEndDate);
        endDate.setHours(23, 59, 59, 999);

        formData.offerEndDate = endDate;

        await editTicket(ticket._id, formData, token);
        handleClose();
        await refreshTickets();
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

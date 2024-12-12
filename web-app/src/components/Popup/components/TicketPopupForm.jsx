import GlobalPopupForm from "../GlobalPopupForm";
import React, {useEffect, useState} from "react";
import {getTicketFormFields} from "../PopupFields";
import {addTicket, editTicket} from "../../../services/ticket.service";

const TicketPopupForm = ({show, setShow, ticket, titleForm, buttonText, refreshTickets}) => {

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
    const formFields = getTicketFormFields(metadata);

    const loadData = () => {

        if (!(ticket === undefined)) {
            const date = ticket.offerStartDate && Date.parse(ticket.offerStartDate)
                ? new Date(ticket.offerStartDate).toISOString().split("T")[0]
                : '';

            setFormData({
                type: ticket.type,
                lines: ticket.lines,
                period: ticket.period,
                price: ticket.price,
                offerStartDate: date,
                offerEndDate: '',
            });
        }

    }

    useEffect(loadData, [ticket]);

    const handleClose = () => setShow(false);
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    async function handleCreate(event) {
        event.preventDefault();

        const requiredFields = formFields
            .filter((field) => field.required)
            .map((field) => field.name);

        const allFieldsFilled = requiredFields.every((field) => formData[field] !== "");

        if (!allFieldsFilled) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        await addTicket(formData);

        setFormData(initialFormData);
        handleClose();
        await refreshTickets();
    }

    async function handleEdit(event) {
        event.preventDefault();

        await editTicket(ticket._id, formData);

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

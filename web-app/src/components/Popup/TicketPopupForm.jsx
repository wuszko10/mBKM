import GlobalPopupForm from "../GlobalPopupForm/GlobalPopupForm";
import React from "react";
import {useTicketPopupFormLogic} from "../../hooks/Tickets/useTicketPopupFormLogic";

const TicketPopupForm = ({show, setShow, ticket, oldTicket, titleForm, buttonText, editMode, duplicateMode, cancelMode, setEditMode, setDuplicateMode, setCancelMode, refreshTickets}) => {

    const {
        formData,
        formFields,
        handleCreate,
        handleClose,
        handleInputChange
    } = useTicketPopupFormLogic(show, setShow, ticket, oldTicket, editMode, duplicateMode, cancelMode, setEditMode, setDuplicateMode, setCancelMode, refreshTickets)

    return (
        <GlobalPopupForm
            isOpen={show}
            onClose={handleClose}
            title={titleForm}
            formData={formData}
            handleInputChange={handleInputChange}
            onSubmit={handleCreate}
            formFields={formFields}
            submitButtonText={buttonText}
        />
    );
};

export default TicketPopupForm;

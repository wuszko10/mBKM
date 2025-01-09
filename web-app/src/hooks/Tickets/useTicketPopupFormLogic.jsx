import {useCallback, useState} from "react";
import {getTicketFormFields} from "../../utils/PopupFields";
import {useAuth} from "../../context/authProvider";
import {isFormValid, isValidDate} from "../../utils/Tickets/validations";
import {handleCreateOrUpdateTicket} from "../../services/Tickets/ticketPopupAPI";
import useLoadDataOnShow from "../useLoadDataOnShow";

export const useTicketPopupFormLogic = (show, setShow, ticket, oldTicket, editMode, duplicateMode, cancelMode, setEditMode, setDuplicateMode, setCancelMode, refreshTickets) => {

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
    const formFields = getTicketFormFields(metadata, editMode, cancelMode);
    const { token } = useAuth();

    const loadData = useCallback(() => {
        if (ticket) {
            const startDate = ticket.offerStartDate ? new Date(ticket.offerStartDate).toISOString().split("T")[0] : '';
            const endDate = ticket.offerEndDate ? new Date(ticket.offerEndDate).toISOString().split("T")[0] : '';
            setFormData({
                type: ticket.type,
                lines: ticket.lines,
                period: ticket.period,
                price: ticket.price,
                offerStartDate: startDate,
                offerEndDate: endDate,
            });
        }
    }, [ticket]);

    useLoadDataOnShow(show, loadData);

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
    const handleCreate = async (event) => {
        event.preventDefault();

        if (!isFormValid(formData, formFields)) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        if (!isValidDate(formData, oldTicket, editMode, duplicateMode, cancelMode)) {
            return;
        }

        await handleCreateOrUpdateTicket(formData, token, editMode, ticket, refreshTickets);
        handleClose();
    };

    return {
        formData,
        formFields,
        handleCreate,
        handleClose,
        handleInputChange
    };

}

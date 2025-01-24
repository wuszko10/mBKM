import { addTicket, editTicket } from "./ticket.service";
import { toast } from "react-toastify";

export const handleCreateOrUpdateTicket = async (formData, token, editMode, ticket, refreshTickets) => {
    try {
        if (editMode && ticket._id) {
            await editTicket(ticket._id, formData, token);
        } else {
            await addTicket(formData, token);
        }
        await refreshTickets();
    } catch (err) {
        if (err.response && err.response.status === 409) {
            alert('Próba stworzenia oferty z nakładającą się datą. Operacja nie powiodła się');
        } else {
            toast.error('Bilet nie został utworzony', {
                position: 'top-right',
                theme: "colored",
            });
        }
    }
};

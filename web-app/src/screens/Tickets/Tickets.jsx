import React, {useState} from 'react';
import '../../styles/style.scss'
import {Link} from "react-router-dom";
import DynamicTable from "../../components/Table/DynamicTable";
import GlobalPopupForm from "../../components/Popup/GlobalPopupForm";
import {FaReceipt} from "react-icons/fa";
import {LuPlusCircle} from "react-icons/lu";
import {useTickets} from "../../hooks/useTickets";
import {getTicketsTableColumns} from "../../components/Table/TableColumns";
import {getCreateTicketFormFields, getEditTicketFormFields} from "../../components/Popup/PopupFields";
import {addTicket, deleteTicket, editTicket} from "../../services/ticketService";

const Tickets = () => {

    const [show, setShow] = useState(false);
    const initialFormData = {
        type: '',
        lines: '',
        period: '',
        price: '',
        offerStartDate: '',
    }
    const [formData, setFormData] = useState(initialFormData);
    const [buttonText, setButtonText] = useState('');
    const [formFields, setFormFields] = useState([]);
    const [editTicketId, setEditTicketId] = useState();

    const metadata = JSON.parse(localStorage.getItem('metadata'));

    const {
        tickets,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
        refreshTickets,
    } = useTickets();

    const data = React.useMemo(() => {
        return tickets.length > 0 ? tickets : [];
    }, [tickets]);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleClose = () => setShow(false);
    const handleShowCreateForm = () => {
        setFormFields(getCreateTicketFormFields(metadata));
        setButtonText("Utwórz");
        setShow(true);
    };

    function handleShowEditForm(id) {

        const ticket = tickets.find(ticket => ticket._id === id);

        let date = ticket.offerStartDate && Date.parse(ticket.offerStartDate) ?
            new Date(ticket.offerStartDate).toISOString().split("T")[0] : '';

        setFormData({
            type: ticket.type,
            lines: ticket.lines,
            period: ticket.period,
            price: ticket.price,
            offerStartDate: date,
            offerEndDate: '',
        });

        setEditTicketId(id);
        setFormFields(getEditTicketFormFields(metadata));
        setButtonText("Aktualizuj");
        setShow(true);
    }

    async function handleCreate(event) {
        event.preventDefault();

        const allFieldsFilled = Object.values(formData).every((value) => value !== "");

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

        console.log (formData);

        await editTicket(editTicketId, formData);

        setFormData(initialFormData);
        handleClose();
        await refreshTickets();
    }

    async function  handleRemove(id) {
        await deleteTicket(id);
        await refreshTickets();
    }

    const columns = getTicketsTableColumns(handleShowEditForm, handleRemove);


    return (
        <div className="main-box">
            <div className="content-box">
                <div className="header-with-button">
                    <h2>Bilety</h2>
                    <div>
                        <Link to={"/reliefs"} className="global-button"><FaReceipt />Ulgi</Link>
                        <button className="global-button" onClick={handleShowCreateForm}><LuPlusCircle />Dodaj rodzaj biletu</button>
                    </div>

                </div>


                <DynamicTable
                    data={data}
                    columns={columns}
                    onFilterChange={setSearchQuery}
                    pageIndex={page - 1}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPage(newPage + 1)}
                    onPageSizeChange={setPageSize}
                    loading={loading}
                />

                <p>* – ważność biletów okresowych wyrażona jest w miesiącach, a biletów jednorazowych – w minutach</p>
            </div>

            <GlobalPopupForm
                isOpen={show}
                onClose={handleClose}
                title="Utwórz nowy typ biletu"
                formData={formData}
                handleInputChange={handleInputChange}
                onSubmit={ !editTicketId ? handleCreate : handleEdit}
                formFields={formFields}
                submitButtonText={buttonText}
            />
        </div>
    );
};

export default Tickets;

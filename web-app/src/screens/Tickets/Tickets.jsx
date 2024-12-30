import React, {useState} from 'react';
import '../../styles/style.scss'
import {Link} from "react-router-dom";
import DynamicTable from "../../components/Table/DynamicTable";
import {FaReceipt} from "react-icons/fa";
import {LuPlusCircle} from "react-icons/lu";
import {useTickets} from "../../hooks/useTickets";
import {getTicketsTableColumns} from "../../components/Table/TableColumns";
import {deleteTicket} from "../../services/ticket.service";
import TicketPopupForm from "../../components/Popup/components/TicketPopupForm";

const Tickets = () => {

    const [show, setShow] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState({});
    const [title, setTitle] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [editMode, setEditMode] = useState(false);

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

    const handleShowCreateForm = () => {
        setTitle('Dodaj nowy typ biletu');
        setButtonText("Utwórz");
        setShow(true);
    };

    function handleShowEditForm(id) {
        let ticket = tickets.find(ticket => ticket._id === id);
        setSelectedTicket(ticket);
        setTitle('Aktualizuj bilet');
        setButtonText("Aktualizuj");
        setEditMode(true);
        setShow(true);
    }


    async function  handleRemove(id) {

        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć ten bilet?');

        if (confirmDelete) {
            await deleteTicket(id);
            await refreshTickets();
        }
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
            </div>

            <TicketPopupForm
                show={show}
                setShow={setShow}
                ticket={selectedTicket}
                titleForm={title}
                buttonText={buttonText}
                editMode={editMode}
                setEditMode={setEditMode}
                refreshTickets={refreshTickets}
            />

        </div>
    );
};

export default Tickets;

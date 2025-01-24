import React from 'react';
import '../../styles/style.scss'
import {useParams} from "react-router-dom";
import DynamicTable from "../../components/GlobalTable/DynamicTable";
import {LuPlusCircle} from "react-icons/lu";
import TicketPopupForm from "../../components/Popup/TicketPopupForm";
import {useTicketsDetails} from "../../hooks/Tickets/useTicketsDetails";

const Tickets = () => {

    const { type, lines, period } = useParams();

    const {
        loading,
        page,
        pageSize,
        totalPages,
        data,
        columns,
        show,
        selectedTicket,
        oldTicket,
        title,
        buttonText,
        editMode,
        duplicateMode,
        cancelMode,
        setPage,
        setPageSize,
        setSearchQuery,
        setShow,
        setEditMode,
        setDuplicateMode,
        setCancelMode,
        refreshTickets,
        handleShowCreateForm,
    } = useTicketsDetails(type, lines, period);



    return (
        <div className="main-box">
            <div className="content-box">
                <div className="header-with-button">
                    <div>
                        <h3>Bilet {type} {period} {lines}</h3>
                    </div>
                    <div>
                        <button className="global-button" onClick={handleShowCreateForm}><LuPlusCircle />Dodaj nową ofertę </button>
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
                    isInput={false}
                />
            </div>

            <TicketPopupForm
                show={show}
                setShow={setShow}
                ticket={selectedTicket}
                oldTicket={oldTicket}
                titleForm={title}
                buttonText={buttonText}
                editMode={editMode}
                duplicateMode={duplicateMode}
                cancelMode={cancelMode}
                setEditMode={setEditMode}
                setDuplicateMode={setDuplicateMode}
                setCancelMode={setCancelMode}
                refreshTickets={refreshTickets}
            />

        </div>
    );
};

export default Tickets;

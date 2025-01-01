import React from 'react';
import '../../styles/style.scss'
import {Link} from "react-router-dom";
import DynamicTable from "../../components/Table/DynamicTable";
import {FaReceipt} from "react-icons/fa";
import {LuPlusCircle} from "react-icons/lu";
import {useTickets} from "../../hooks/useTickets";
import TicketPopupForm from "../../components/Popup/components/TicketPopupForm";

const Tickets = () => {


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
    } = useTickets();



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

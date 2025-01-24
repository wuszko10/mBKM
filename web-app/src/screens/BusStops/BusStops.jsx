import React from 'react';
import '../../styles/style.scss'
import DynamicTable from "../../components/GlobalTable/DynamicTable";
import {LuPlusCircle} from "react-icons/lu";
import {useStops} from "../../hooks/BusStops/useStops";
import BusStopPopupForm from "../../components/Popup/BusStopPopupForm";

const BusStops = () => {

    const {
        data,
        columns,
        loading,
        page,
        pageSize,
        totalPages,
        show,
        title,
        buttonText,
        editMode,
        selectedBusStop,
        setPage,
        setPageSize,
        setSearchQuery,
        setShow,
        setEditMode,
        refreshStops,
        handleShowCreateForm,
    } = useStops();

    return (
        <div className="main-box">
            <div className="content-box">
                <div className="header-with-button">
                    <h2>Przystanki</h2>
                    <button className="global-button" onClick={handleShowCreateForm}><LuPlusCircle />Dodaj przystanek</button>

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

            <BusStopPopupForm
                show={show}
                setShow={setShow}
                stop={selectedBusStop}
                titleForm={title}
                buttonText={buttonText}
                editMode={editMode}
                setEditMode={setEditMode}
                refreshStops={refreshStops}
            />
        </div>
    );
};

export default BusStops;

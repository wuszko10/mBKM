import React from 'react';
import '../../styles/style.scss'
import DynamicTable from "../../components/GlobalTable/DynamicTable";
import {LuPlusCircle} from "react-icons/lu";
import {useReliefs} from "../../hooks/Reliefs/useReliefs";
import ReliefPopupForm from "../../components/Popup/ReliefPopupForm";

const Reliefs = () => {

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
        selectedRelief,
        setPage,
        setPageSize,
        setSearchQuery,
        setShow,
        setEditMode,
        refreshReliefs,
        handleShowCreateForm,
    } = useReliefs();


    return (
        <div className="main-box">
            <div className="content-box">
                <div className="header-with-button">
                    <h2>Ulgi</h2>
                    <button className="global-button" onClick={handleShowCreateForm}><LuPlusCircle />Dodaj nową ulgę</button>
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

            <ReliefPopupForm
                show={show}
                setShow={setShow}
                relief={selectedRelief}
                titleForm={title}
                buttonText={buttonText}
                editMode={editMode}
                setEditMode={setEditMode}
                refreshReliefs={refreshReliefs}
            />
        </div>
    );
};

export default Reliefs;

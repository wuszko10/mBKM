import React from 'react';
import '../../styles/style.scss'
import DynamicTable from "../../components/GlobalTable/DynamicTable";
import {LuPlusCircle} from "react-icons/lu";
import LinePopupForm from "../../components/Popup/LinePopupForm";
import {useLines} from "../../hooks/Lines/useLines";

const Lines = () => {

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
        selectedLine,
        setPage,
        setPageSize,
        setSearchQuery,
        setShow,
        setEditMode,
        refreshLines,
        handleShowCreateForm,
    } = useLines();


    return (
        <div className="main-box">
            <div className="content-box">
                <div className="header-with-button">
                    <h2>Linie</h2>
                    <button className="global-button" onClick={handleShowCreateForm}><LuPlusCircle />Dodaj linię</button>

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

            <LinePopupForm
                show={show}
                setShow={setShow}
                line={selectedLine}
                titleForm={title}
                buttonText={buttonText}
                editMode={editMode}
                setEditMode={setEditMode}
                refreshLines={refreshLines}
            />
        </div>
    );
};

export default Lines;

import React, {useState} from 'react';
import '../../styles/style.scss'
import DynamicTable from "../../components/Table/DynamicTable";
import {LuPlusCircle} from "react-icons/lu";
import {getLinesColumns} from "../../components/Table/TableColumns";
import LinePopupForm from "../../components/Popup/components/LinePopupForm";
import {useLines} from "../../hooks/useLines";
import {deleteLine} from "../../services/line.service";
import {editBusStop} from "../../services/stop.service";

const Lines = () => {

    const {
        lines,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
        refreshLines,
        token,
    } = useLines();


    const [show, setShow] = useState(false);
    const [selectedLine, setSelectedLine] = useState({});
    const [title, setTitle] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [editMode, setEditMode] = useState(false);


    const data = React.useMemo(() => {
        return lines.length > 0 ? lines : [];
    }, [lines]);

    const handleShowCreateForm = () => {
        setTitle('Dodaj nową linię');
        setButtonText("Utwórz");
        setShow(true);
    };

    function handleShowEditForm(id) {
        let line = lines.find(line => line._id === id);
        setSelectedLine(line);
        setTitle('Aktualizuj linię');
        setButtonText("Aktualizuj");
        setEditMode(true);
        setShow(true);
    }


    async function handleRemove(id) {

        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć tę linię?');

        if (confirmDelete) {
            await deleteLine(id, token);
            await refreshLines();
        }
    }

    async function handleToggle(id, newState) {

        let data = lines.find(l => l._id === id);

        data.isActive = Boolean(newState);

        if (data){
            await editBusStop(id, data, token)
            await refreshLines();
        }

    }

    const columns = getLinesColumns(handleShowEditForm, handleRemove, handleToggle);

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

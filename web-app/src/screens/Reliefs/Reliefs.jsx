import React, {useState} from 'react';
import '../../styles/style.scss'
import DynamicTable from "../../components/Table/DynamicTable";
import {LuPlusCircle} from "react-icons/lu";
import {getReliefColumns} from "../../components/Table/TableColumns";
import {useReliefs} from "../../hooks/useReliefs";
import {deleteRelief} from "../../services/relief.service";
import ReliefPopupForm from "../../components/Popup/components/ReliefPopupForm";

const Reliefs = () => {



    const [show, setShow] = useState(false);
    const [selectedRelief, setSelectedRelief] = useState({});
    const [title, setTitle] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [editMode, setEditMode] = useState(false);

    const {
        reliefs,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
        refreshReliefs,
    } = useReliefs();

    const data = React.useMemo(() => {
        return reliefs.length > 0 ? reliefs : [];
    }, [reliefs]);


    const handleShowCreateForm = () => {
        setTitle('Dodaj nową ulgę');
        setButtonText("Utwórz");
        setShow(true);
    };

    function handleShowEditForm(id) {
        let relief = reliefs.find(relief => relief._id === id);
        setSelectedRelief(relief);
        setTitle('Aktualizuj ulgę');
        setButtonText("Aktualizuj");
        setEditMode(true);
        setShow(true);
    }


    async function  handleRemove(id) {

        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć tę ulgę?');

        if (confirmDelete) {
            await deleteRelief(id);
            await refreshReliefs();
        }
    }

    const columns = getReliefColumns(handleShowEditForm, handleRemove);

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

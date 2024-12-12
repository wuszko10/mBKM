import React, {useState} from 'react';
import '../../styles/style.scss'
import DynamicTable from "../../components/Table/DynamicTable";
import {LuPlusCircle} from "react-icons/lu";
import {getStopsColumns} from "../../components/Table/TableColumns";
import {useStops} from "../../hooks/useStops";
import BusStopPopupForm from "../../components/Popup/components/BusStopPopupForm";
import {deleteBusStop} from "../../services/stop.service";

const BusStops = () => {

    const {
        stops,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
        refreshStops,
    } = useStops();


    const [show, setShow] = useState(false);
    const [selectedBusStop, setSelectedBusStop] = useState({});
    const [title, setTitle] = useState('');
    const [buttonText, setButtonText] = useState('');


    const data = React.useMemo(() => {
        return stops.length > 0 ? stops : [];
    }, [stops]);

    const handleShowCreateForm = () => {
        setTitle('Dodaj nowy przystanek');
        setButtonText("Utwórz");
        setShow(true);
    };

    function handleShowEditForm(id) {
        let busStop = stops.find(busStop => busStop._id === id);
        setSelectedBusStop(busStop);
        setTitle('Aktualizuj przystanek');
        setButtonText("Aktualizuj");
        setShow(true);
    }


    async function  handleRemove(id) {

        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć ten przystanek?');

        if (confirmDelete) {
            await deleteBusStop(id);
            await refreshStops();
        }
    }

    const columns = getStopsColumns(handleShowEditForm, handleRemove);

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
                refreshStops={refreshStops}
            />
        </div>
    );
};

export default BusStops;

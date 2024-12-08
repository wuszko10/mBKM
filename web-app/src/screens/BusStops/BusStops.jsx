import React, {useState} from 'react';
import '../../styles/style.scss'
import {useNavigate} from "react-router-dom";
import DynamicTable from "../../components/Table/DynamicTable";
import GlobalPopupForm from "../../components/Popup/GlobalPopupForm";
import {LuPlusCircle} from "react-icons/lu";
import {getStopsColumns} from "../../components/Table/TableColumns";
import {getCreateBusStopFormFields} from "../../components/Popup/PopupFields";
import {useStops} from "../../hooks/useStops";
import {addBusStop} from "../../services/stopService";

const BusStops = () => {

    const navigate = useNavigate();
    const columns = getStopsColumns(navigate);

    const {
        stops,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
    } = useStops();


    const [show, setShow] = useState(false);

    const initialFormData = {
        name: '',
        longitude: '',
        latitude: '',
    }

    const [formData, setFormData] = useState(initialFormData);

    const data = React.useMemo(() => {
        return stops.length > 0 ? stops : [];
    }, [stops]);

    const handleClose = () => {
        setFormData(initialFormData);
        setSearchQuery("");
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const formFields = getCreateBusStopFormFields();

    async function handleCreate(event) {
        event.preventDefault();

        console.log(formData);

        const allFieldsFilled = Object.values(formData).every((value) => value !== "");

        if (!allFieldsFilled) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        console.log(formData);

        await addBusStop(formData);

        setSearchQuery("");
        setFormData(initialFormData);
        handleClose();
        window.location.reload();
    }

    return (
        <div className="main-box">
            <div className="content-box">
                <div className="header-with-button">
                    <h2>Przystanki</h2>
                    <button className="global-button" onClick={handleShow}><LuPlusCircle />Dodaj przystanek</button>

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

            <GlobalPopupForm
                isOpen={show}
                onClose={handleClose}
                title="Utwórz nowy przystanek"
                formData={formData}
                handleInputChange={handleInputChange}
                onSubmit={handleCreate}
                formFields={formFields}
                submitButtonText="Dodaj przystanek"
            />
        </div>
    );
};

export default BusStops;

import React, {useState} from 'react';
import '../../styles/style.scss'
import {Link, useNavigate} from "react-router-dom";
import {tickets} from "../../assets/data";
import DynamicTable from "../../components/Table/DynamicTable";
import GlobalPopup from "../../components/Popup/GlobalPopup";
import {FaReceipt} from "react-icons/fa";
import {LuPlusCircle} from "react-icons/lu";
import {useMetadata} from "../../context/metadataContext";
import {useTickets} from "../../hooks/useTickets";
import {getTicketsTableColumns} from "../../components/Table/TableColumns";
import {getCreateTicketFormFields} from "../../components/Popup/PopupFields";
import {addTicket} from "../../services/ticketService";
import {toast} from "react-toastify";

const Tickets = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const initialFormData = {
        type: '',
        lines: '',
        period: '',
        price: '',
        offerStartDate: '',
    }

    // const { tickets, loading } = useTickets();
    const [formData, setFormData] = useState(initialFormData);


    const { metadata } = useMetadata();


    const data = React.useMemo(() => tickets, []);
    const columns = getTicketsTableColumns(navigate);
    const formFields = getCreateTicketFormFields(metadata);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    async function handleCreate(event) {
        event.preventDefault();

        const allFieldsFilled = Object.values(formData).every((value) => value !== "");

        if (!allFieldsFilled) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        await addTicket(formData);

        // console.log(formData);

        // window.location.reload();


        // console.log(formData);

        setFormData(initialFormData);
        handleClose();
    }


    // if (loading) return <p>Ładowanie...</p>;

    return (
        <div className="main-box">
            <div className="content-box">
                <div className="header-with-button">
                    <h2>Bilety</h2>
                    <div>
                        <Link to={"/reliefs"} className="global-button"><FaReceipt />Ulgi</Link>
                        <button className="global-button" onClick={handleShow}><LuPlusCircle />Dodaj rodzaj biletu</button>
                    </div>

                </div>


                <DynamicTable data={data} columns={columns} />

                <p>* – ważność biletów okresowych wyrażona jest w miesiącach, a biletów jednorazowych – w minutach</p>
            </div>

            <GlobalPopup
                isOpen={show}
                onClose={handleClose}
                title="Utwórz nowy typ biletu"
                formData={formData}
                handleInputChange={handleInputChange}
                onSubmit={handleCreate}
                formFields={formFields}
                submitButtonText="Utwórz"
            />
        </div>
    );
};

export default Tickets;

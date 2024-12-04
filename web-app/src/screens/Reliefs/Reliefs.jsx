import React, {useState} from 'react';
import '../../styles/style.scss'
import {useNavigate} from "react-router-dom";
import {discounts} from "../../assets/data";
import {ColumnDef} from "@tanstack/react-table";
import DynamicTable from "../../components/Table/DynamicTable";
import GlobalPopup from "../../components/Popup/GlobalPopup";
import {LuPlusCircle} from "react-icons/lu";

const Reliefs = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        percentage: '',
    });


    const data = React.useMemo(() => discounts, []);
    const columns: ColumnDef<typeof data[0]>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Nazwa ulgi',
        },
        {
            accessorKey: 'percentage',
            header: 'Odpłatność [%]',
        },
        {
            header: 'Szczegóły',
            cell: ({ row }) => (
                <button onClick={() => navigate(`/relief/${row.original.id}`)}>Zobacz szczegóły</button>
            ),
        },
    ];

    const handleClose = () => setShow(false);
    function afterOpenModal() {
    }
    const handleShow = () => setShow(true);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const formFields = [
        { name: "name", placeholder: "Nazwa ulgi" },
        { name: "percentage", placeholder: "Odpłatność" },
    ];

    function handleCreate() {
        setFormData({
            name: '',
            percentage: '',
        });
        handleClose();
    }

    return (
        <div className="main-box">
            <div className="content-box">
                <div className="header-with-button">
                    <h2>Ulgi</h2>
                    <button className="global-button" onClick={handleShow}><LuPlusCircle />Dodaj ulgę</button>

                </div>

                <DynamicTable data={data} columns={columns} />

            </div>

            <GlobalPopup
                isOpen={show}
                onClose={handleClose}
                title="Utwórz nowy typ ulgi"
                formData={formData}
                handleInputChange={handleInputChange}
                onSubmit={handleCreate}
                formFields={formFields}
                submitButtonText="Dodaj ulgę"
            />
        </div>
    );
};

export default Reliefs;

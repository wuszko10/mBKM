import React, {useState} from 'react';
import './style.scss'
import {Link, useNavigate} from "react-router-dom";
import {tickets} from "./data";
import {ColumnDef} from "@tanstack/react-table";
import DynamicTable from "./DynamicTable";
import GlobalPopup from "./GlobalPopup";
import {FaReceipt} from "react-icons/fa";
import {LuPlusCircle} from "react-icons/lu";

const Tickets = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        ticketType: '',
        period: '',
        lines: '',
        price: '',
        offerStartDate: '',
    });


    const data = React.useMemo(() => tickets, []);
    const columns: ColumnDef<typeof data[0]>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'ticketType',
            header: 'Typ biletu',
        },
        {
            accessorKey: 'period',
            header: 'Ważność*',
        },
        {
            accessorKey: 'lines',
            header: 'Ilość linii',
        },
        {
            accessorKey: 'price',
            header: 'Cena [zł]',
        },
        {
            accessorKey: 'offerStartDate',
            header: 'Data rozpoczęcia oferty',
        },
        {
            accessorKey: 'offerEndDate',
            header: 'Data zakończenia oferty',
        },
        {
            header: 'Szczegóły',
            cell: ({ row }) => (
                <button onClick={() => navigate(`/ticket/${row.original.id}`)}>Zobacz szczegóły</button>
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
        { name: "ticketType", type: "select", options: [
                { label: "jednorazowy", value: "jednorazowy" },
                { label: "okresowy", value: "okresowy" },
            ] },
        { name: "period", type: "select", options: [
                { label: "brak", value: "null" },
                { label: "30-minutowy", value: "30" },
                { label: "60-minutowy", value: "60" },
                { label: "1-miesięczny", value: "1" },
                { label: "3-miesięczny", value: "3" },
                { label: "6-miesięczny", value: "6" },
                { label: "12-miesięczny", value: "12" },
            ] },
        { name: "lines", type: "select", options: [
                { label: "jedna linia", value: "1" },
                { label: "dwie linie", value: "2" },
                { label: "wszystkie", value: "wszystkie" },
            ] },
        { name: "price", placeholder: "Cena", type: "number" },
        { name: "offerStartDate", type: "date" },
    ];

    function handleCreate() {
        setFormData({
            ticketType: '',
            period: '',
            lines: '',
            price: '',
            offerStartDate: '',
        });
        handleClose();
    }

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

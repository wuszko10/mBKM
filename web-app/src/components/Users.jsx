import React, {useState} from 'react';
import './style.scss'
import {useNavigate} from "react-router-dom";
import {users} from "./data";
import {ColumnDef} from "@tanstack/react-table";
import DynamicTable from "./DynamicTable";
import GlobalPopup from "./GlobalPopup";
import {LuPlusCircle} from "react-icons/lu";

const Users = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    function afterOpenModal() {
    }
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const data = React.useMemo(() => users, []);
    const columns: ColumnDef<typeof data[0]>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'username',
            header: 'Nazwa użytkownika',
        },
        {
            accessorKey: 'firstName',
            header: 'Imię',
        },
        {
            accessorKey: 'lastName',
            header: 'Nazwisko',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            header: 'Szczegóły',
            cell: ({ row }) => (
                <button onClick={() => navigate(`/user/${row.original.id}`)}>Zobacz szczegóły</button>
            ),
        },
    ];

    const formFields = [
        { name: "firstName", placeholder: "Imię" },
        { name: "lastName", placeholder: "Nazwisko" },
        { name: "email", placeholder: "Email" },
        { name: "password", placeholder: "Hasło", type: "password" },
    ];

    function handleRegister() {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        });
        handleClose();
    }

    return (
        <div className="main-box">
            <div className="content-box">
                <div className="header-with-button">
                    <h2>Użytkowicy</h2>
                    <button className="global-button" onClick={handleShow}><LuPlusCircle />Dodaj użytkownika</button>
                </div>

                <DynamicTable data={data} columns={columns} />
            </div>

            <GlobalPopup
                isOpen={show}
                onClose={handleClose}
                title="Dodaj użytkownika"
                formData={formData}
                handleInputChange={handleInputChange}
                onSubmit={handleRegister}
                formFields={formFields}
                submitButtonText="Utwórz użytkownika"
            />
        </div>
    );
};

export default Users;

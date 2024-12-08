import React, {useState} from 'react';
import '../../styles/style.scss'
import {useNavigate} from "react-router-dom";
import DynamicTable from "../../components/Table/DynamicTable";
import GlobalPopupForm from "../../components/Popup/GlobalPopupForm";
import {LuPlusCircle} from "react-icons/lu";
import {getUsersColumns} from "../../components/Table/TableColumns";
import {getCreateUserFormFields} from "../../components/Popup/PopupFields";
import {useUsers} from "../../hooks/useUsers";
import {addUser} from "../../services/userService";

const Users = () => {

    const navigate = useNavigate();
    const columns = getUsersColumns(navigate);

    const [show, setShow] = useState(false);
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        pesel: '',
    }
    const [formData, setFormData] = useState(initialFormData);

    const {
        users,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
    } = useUsers();

    const formFields = getCreateUserFormFields();

    const data = React.useMemo(() => {
        return users.length > 0 ? users : [];
    }, [users]);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    async function handleRegister(event) {
        event.preventDefault();

        const allFieldsFilled = Object.values(formData).every((value) => value !== "");

        if (!allFieldsFilled) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }
        await addUser(formData);

        setFormData(initialFormData);
        handleClose();
        window.location.reload();
    }

    return (
        <div className="main-box">
            <div className="content-box">
                <div className="header-with-button">
                    <h2>Użytkowicy</h2>
                    <button className="global-button" onClick={handleShow}><LuPlusCircle />Dodaj użytkownika</button>
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

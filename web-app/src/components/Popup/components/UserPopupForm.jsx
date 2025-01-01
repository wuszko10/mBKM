import GlobalPopupForm from "../GlobalPopupForm";
import React, {useEffect, useState} from "react";
import {
    getBusStopFormFields, getCreateUserFormFields
} from "../PopupFields";
import {addBusStop, editBusStop} from "../../../services/stop.service";
import {addUser} from "../../../services/user.service";
import {useAuth} from "../../../context/authProvider";

const UserPopupForm = ({show, setShow, refreshUsers}) => {

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        pesel: '',
        isActive: '',
    }

    const [formData, setFormData] = useState(initialFormData);
    const formFields = getCreateUserFormFields();
    const { token } = useAuth();

    const handleClose = () => setShow(false);
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

        await addUser(formData, token);

        setFormData(initialFormData);
        handleClose();
        await refreshUsers();
    }

    return (
        <GlobalPopupForm
            isOpen={show}
            onClose={handleClose}
            title="Dodaj użytkownika"
            formData={formData}
            handleInputChange={handleInputChange}
            onSubmit={handleCreate}
            formFields={formFields}
            submitButtonText="Utwórz"
        />
    );
};

export default UserPopupForm;

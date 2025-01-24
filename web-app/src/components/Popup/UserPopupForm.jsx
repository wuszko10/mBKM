import GlobalPopupForm from "../GlobalPopupForm/GlobalPopupForm";
import React from "react";
import {useUserPopupFormLogic} from "../../hooks/Users/useUserPopupFormLogic";

const UserPopupForm = ({show, setShow, refreshUsers}) => {

    const {
        formData,
        formFields,
        handleCreate,
        handleClose,
        handleInputChange,
    } = useUserPopupFormLogic(show, setShow, refreshUsers);

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

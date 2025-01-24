import GlobalPopupForm from "../GlobalPopupForm/GlobalPopupForm";
import React from "react";
import {useLinePopupFormLogic} from "../../hooks/Lines/useLinePopupFormLogic";

const LinePopupForm = ({show, setShow, line, titleForm, buttonText, editMode, setEditMode, refreshLines}) => {

    const {
        formData,
        formFields,
        handleClose,
        handleCreateOrUpdate,
        handleInputChange,
    } = useLinePopupFormLogic(show, setShow, line, editMode, setEditMode, refreshLines)

    return (
        <GlobalPopupForm
            isOpen={show}
            onClose={handleClose}
            title={titleForm}
            formData={formData}
            handleInputChange={handleInputChange}
            onSubmit={ handleCreateOrUpdate}
            formFields={formFields}
            submitButtonText={buttonText}
        />
    );
};

export default LinePopupForm;

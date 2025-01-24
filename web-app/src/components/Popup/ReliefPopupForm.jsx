import GlobalPopupForm from "../GlobalPopupForm/GlobalPopupForm";
import React from "react";
import {useReliefPopupFormLogic} from "../../hooks/Reliefs/useReliefPopupFormLogic";

const ReliefPopupForm = ({show, setShow, relief, titleForm, buttonText, editMode, setEditMode, refreshReliefs}) => {

    const {
        formData,
        formFields,
        handleClose,
        handleCreateOrUpdate,
        handleInputChange,
    } = useReliefPopupFormLogic(show, setShow, relief, editMode, setEditMode, refreshReliefs)

    return (
        <GlobalPopupForm
            isOpen={show}
            onClose={handleClose}
            title={titleForm}
            formData={formData}
            handleInputChange={handleInputChange}
            onSubmit={handleCreateOrUpdate}
            formFields={formFields}
            submitButtonText={buttonText}
        />
    );
};

export default ReliefPopupForm;

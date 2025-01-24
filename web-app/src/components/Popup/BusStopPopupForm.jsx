import GlobalPopupForm from "../GlobalPopupForm/GlobalPopupForm";
import React from "react";
import {useBusStopPopupFormLogic} from "../../hooks/BusStops/useBusStopPopupFormLogic";

const BusStopPopupForm = ({show, setShow, stop, titleForm, buttonText, editMode, setEditMode, refreshStops}) => {

    const {
        formData,
        formFields,
        handleClose,
        handleCreateOrUpdate,
        handleInputChange,
    } = useBusStopPopupFormLogic(show, setShow, stop, editMode, setEditMode, refreshStops);

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

export default BusStopPopupForm;

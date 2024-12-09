import GlobalPopupForm from "../GlobalPopupForm";
import React, {useEffect, useState} from "react";
import {
    getBusStopFormFields
} from "../PopupFields";
import {addBusStop, editBusStop} from "../../../services/stopService";

const BusStopPopupForm = ({show, setShow, stop, titleForm, buttonText, refreshStops}) => {

    const initialFormData = {
        name: '',
        longitude: '',
        latitude: '',
    }

    const [formData, setFormData] = useState(initialFormData);
    const formFields = getBusStopFormFields();

    const loadData = () => {

        if (!(stop === undefined)) {
            setFormData({
                name: stop.name,
                longitude: stop.longitude,
                latitude: stop.latitude,
            });
        }

    }

    useEffect(loadData, [stop]);

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

        await addBusStop(formData);

        setFormData(initialFormData);
        handleClose();
        await refreshStops();
    }

    async function handleEdit(event) {
        event.preventDefault();

        await editBusStop(stop.id, formData);

        handleClose();
        await refreshStops();
    }

    return (
        <GlobalPopupForm
            id="edit-ticket-modal"
            isOpen={show}
            onClose={handleClose}
            title={titleForm}
            formData={formData}
            handleInputChange={handleInputChange}
            onSubmit={ !stop.id ? handleCreate : handleEdit}
            formFields={formFields}
            submitButtonText={buttonText}
        />
    );
};

export default BusStopPopupForm;

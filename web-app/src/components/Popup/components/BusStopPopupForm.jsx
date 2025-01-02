import GlobalPopupForm from "../GlobalPopupForm";
import React, {useEffect, useState} from "react";
import {
    getBusStopFormFields
} from "../PopupFields";
import {addBusStop, editBusStop} from "../../../services/stop.service";
import {useAuth} from "../../../context/authProvider";

const BusStopPopupForm = ({show, setShow, stop, titleForm, buttonText, editMode, setEditMode, refreshStops}) => {

    const initialFormData = {
        name: '',
        longitude: '',
        latitude: '',
        isActive: '',
    }

    const [formData, setFormData] = useState(initialFormData);
    const formFields = getBusStopFormFields(editMode);
    const { token } = useAuth();

    const loadData = () => {

        if (!(stop === undefined)) {
            setFormData({
                name: stop.name,
                longitude: stop.longitude,
                latitude: stop.latitude,
                isActive: stop.isActive,
            });
        }

    }

    useEffect( () => {
        if (show){
            loadData();
        }

    }, [show]);

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
    };
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

        await addBusStop(formData, token);

        setFormData(initialFormData);
        handleClose();
        await refreshStops();
    }

    async function handleEdit(event) {
        event.preventDefault();

        await editBusStop(stop._id, formData, token);

        handleClose();
        await refreshStops();
    }

    return (
        <GlobalPopupForm
            isOpen={show}
            onClose={handleClose}
            title={titleForm}
            formData={formData}
            handleInputChange={handleInputChange}
            onSubmit={ !stop._id ? handleCreate : handleEdit}
            formFields={formFields}
            submitButtonText={buttonText}
        />
    );
};

export default BusStopPopupForm;

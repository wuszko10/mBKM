import GlobalPopupForm from "../GlobalPopupForm";
import React, {useEffect, useState} from "react";
import {
    getBusStopFormFields, getLineFormFields
} from "../PopupFields";
import {addBusStop, editBusStop} from "../../../services/stop.service";
import {addLine, editLine} from "../../../services/line.service";
import {useAuth} from "../../../context/authProvider";

const LinePopupForm = ({show, setShow, line, titleForm, buttonText, editMode, setEditMode, refreshLines}) => {

    const initialFormData = {
        number: '',
        name: '',
        isActive: '',
    }

    const [formData, setFormData] = useState(initialFormData);
    const formFields = getLineFormFields(editMode);
    const { token } = useAuth();

    const loadData = () => {

        if (!(line === undefined)) {
            setFormData({
                number: line.number,
                name: line.name,
                isActive: line.isActive,
            });
        }

    }

    useEffect(loadData, [line]);

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

        const requiredFields = formFields
            .filter((field) => field.required)
            .map((field) => field.name);

        const allFieldsFilled = requiredFields.every((field) => formData[field] !== "");

        if (!allFieldsFilled) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        await addLine(formData, token);

        setFormData(initialFormData);
        handleClose();
        await refreshLines();
    }

    async function handleEdit(event) {
        event.preventDefault();

        await editLine(line._id, formData, token);

        handleClose();
        await refreshLines();
    }

    return (
        <GlobalPopupForm
            isOpen={show}
            onClose={handleClose}
            title={titleForm}
            formData={formData}
            handleInputChange={handleInputChange}
            onSubmit={ !line._id ? handleCreate : handleEdit}
            formFields={formFields}
            submitButtonText={buttonText}
        />
    );
};

export default LinePopupForm;

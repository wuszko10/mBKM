import GlobalPopupForm from "../GlobalPopupForm";
import React, {useEffect, useState} from "react";
import {getReliefFormFields} from "../PopupFields";
import {addRelief, editRelief} from "../../../services/reliefService";

const ReliefPopupForm = ({show, setShow, relief, titleForm, buttonText, refreshReliefs}) => {

    const initialFormData = {
        name: '',
        type: '',
        percentage: '',
    }

    const [formData, setFormData] = useState(initialFormData);
    const metadata = JSON.parse(localStorage.getItem('metadata'));
    const formFields = getReliefFormFields(metadata);

    const loadData = () => {

        if (!(relief === undefined)) {
            setFormData({
                name: relief.name,
                type: relief.type,
                percentage: relief.percentage,
            });
        }

    }

    useEffect(loadData, [relief]);

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

        await addRelief(formData);

        setFormData(initialFormData);
        handleClose();
        await refreshReliefs();
    }

    async function handleEdit(event) {
        event.preventDefault();

        await editRelief(relief.id, formData);

        handleClose();
        await refreshReliefs();
    }

    return (
        <GlobalPopupForm
            id="edit-ticket-modal"
            isOpen={show}
            onClose={handleClose}
            title={titleForm}
            formData={formData}
            handleInputChange={handleInputChange}
            onSubmit={ !relief.id ? handleCreate : handleEdit}
            formFields={formFields}
            submitButtonText={buttonText}
        />
    );
};

export default ReliefPopupForm;

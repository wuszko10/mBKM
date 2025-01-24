import {useCallback, useState} from "react";
import {getLineFormFields} from "../../utils/PopupFields";
import {useAuth} from "../../context/authProvider";
import {handleCreateOrUpdateLines} from "../../services/Lines/linePopupAPI";
import useLoadDataOnShow from "../useLoadDataOnShow";

export const useLinePopupFormLogic = (show, setShow, line, editMode, setEditMode, refreshLines) => {

    const initialFormData = {
        number: '',
        name: '',
        isActive: '',
    }

    const [formData, setFormData] = useState(initialFormData);
    const formFields = getLineFormFields(editMode);
    const { token } = useAuth();

    const loadData = useCallback( () => {

        if (!(line === undefined)) {
            setFormData({
                number: line.number,
                name: line.name,
                isActive: line.isActive,
            });
        }

    }, [line]);

    useLoadDataOnShow(show, loadData);

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setFormData(initialFormData);
    };
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    async function handleCreateOrUpdate(event) {
        event.preventDefault();

        const requiredFields = formFields
            .filter((field) => field.required)
            .map((field) => field.name);

        const allFieldsFilled = requiredFields.every((field) => formData[field] !== "");

        if (!allFieldsFilled) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        await handleCreateOrUpdateLines(formData, token, editMode, line, refreshLines);

        handleClose();
    }

    return {
        formData,
        formFields,
        handleClose,
        handleCreateOrUpdate,
        handleInputChange,
    }

}

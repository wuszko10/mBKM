import {useCallback, useState} from "react";
import {getReliefFormFields} from "../../utils/PopupFields";
import {useAuth} from "../../context/authProvider";
import useLoadDataOnShow from "../useLoadDataOnShow";
import {handleCreateOrUpdateRelief} from "../../services/Reliefs/reliefPopupAPI";

export const useReliefPopupFormLogic = (show, setShow, relief, editMode, setEditMode, refreshReliefs) => {

    const initialFormData = {
        name: '',
        type: '',
        ticketType: '',
        percentage: '',
        isActive: '',
    }

    const [formData, setFormData] = useState(initialFormData);
    const metadata = JSON.parse(localStorage.getItem('metadata'));
    const formFields = getReliefFormFields(metadata, editMode);
    const { token } = useAuth();

    const loadData = useCallback( () => {

        if (!(relief === undefined)) {
            setFormData({
                name: relief.name,
                type: relief.type,
                ticketType: relief.ticketType,
                percentage: relief.percentage,
                isActive: relief.isActive,
            });
        }

    }, [relief]);

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

        const allFieldsFilled = Object.values(formData).every((value) => value !== "");

        if (!allFieldsFilled) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        await handleCreateOrUpdateRelief(formData, token, editMode, relief, refreshReliefs);
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

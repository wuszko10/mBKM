import {useCallback, useState} from "react";
import {getBusStopFormFields} from "../../utils/PopupFields";
import {useAuth} from "../../context/authProvider";
import useLoadDataOnShow from "../useLoadDataOnShow";
import {handleCreateOrUpdateStop} from "../../services/BusStops/stopPopupAPI";

export const useBusStopPopupFormLogic = (show, setShow, stop, editMode, setEditMode, refreshStops) => {

    const initialFormData = {
        name: '',
        longitude: '',
        latitude: '',
        isActive: '',
    }

    const [formData, setFormData] = useState(initialFormData);
    const formFields = getBusStopFormFields(editMode);
    const { token } = useAuth();

    const loadData = useCallback(() => {

        if (!(stop === undefined)) {
            setFormData({
                name: stop.name,
                longitude: stop.longitude,
                latitude: stop.latitude,
                isActive: stop.isActive,
            });
        }

    }, [stop]);

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

        await handleCreateOrUpdateStop(formData, token, editMode, stop, refreshStops);
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

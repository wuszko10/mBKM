import {useState} from "react";
import {getCreateUserFormFields} from "../../utils/PopupFields";
import {useAuth} from "../../context/authProvider";
import {addUser} from "../../services/Users/user.service";

export const useUserPopupFormLogic = (show, setShow, refreshUsers) => {

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        pesel: '',
        isActive: '',
    }

    const [formData, setFormData] = useState(initialFormData);
    const formFields = getCreateUserFormFields();
    const { token } = useAuth();

    const handleClose = () => {
        setShow(false);
        setFormData(initialFormData);
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

        await addUser(formData, token);

        handleClose();
        await refreshUsers();
    }

    return {
        formData,
        formFields,
        handleCreate,
        handleClose,
        handleInputChange,
    }
}

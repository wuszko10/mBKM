import {toast} from "react-toastify";
import {addRelief, editRelief} from "./relief.service";

export const handleCreateOrUpdateRelief = async (formData, token, editMode, relief, refreshReliefs) => {
    try {
        if (editMode && relief._id) {
            await editRelief(relief._id, formData, token);
        } else {
            await addRelief(formData, token);
        }
        await refreshReliefs();
    } catch (err) {
        toast.error('Operacja nie powiodła się', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

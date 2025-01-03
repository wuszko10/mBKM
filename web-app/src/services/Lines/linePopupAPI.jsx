import {toast} from "react-toastify";
import {addLine, editLine} from "./line.service";

export const handleCreateOrUpdateLines = async (formData, token, editMode, line, refreshLines) => {
    try {
        if (editMode && line._id) {
            await editLine(line._id, formData, token);
        } else {
            await addLine(formData, token);
        }
        await refreshLines();
    } catch (err) {
        toast.error('Operacja nie powiodła się', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

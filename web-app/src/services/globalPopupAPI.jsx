import {toast} from "react-toastify";

export const handleCreateOrUpdateAPI = async (formData, token, editMode, item, refreshItems, { addItem, editItem }) => {
    try {
        if (editMode && item?._id) {
            await editItem(item._id, formData, token);
        } else {
            await addItem(formData, token);
        }
        await refreshItems();
    } catch (err) {
        toast.error('Operacja nie powiodła się', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

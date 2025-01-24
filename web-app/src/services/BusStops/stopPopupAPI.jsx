import {toast} from "react-toastify";
import {addBusStop, editBusStop} from "./stop.service";

export const handleCreateOrUpdateStop = async (formData, token, editMode, stop, refreshStops) => {
    try {
        if (editMode && stop._id) {
            await editBusStop(stop._id, formData, token);
        } else {
            await addBusStop(formData, token);
        }
        await refreshStops();
    } catch (err) {
        toast.error('Operacja nie powiodła się', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

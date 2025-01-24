import {deactivateUser} from "./user.service";
import {toast} from "react-toastify";

export const changeActiveStatus = async (id, token, refreshData) => {
    const isConfirmed = window.confirm("Czy chcesz dezaktywować użytkownika?");

    if (isConfirmed) {
        try {
            await deactivateUser(id, token)
            await refreshData();
        } catch (error) {
            toast.warn('Błąd operacji', {
                position: 'top-right',
                theme: "colored",
            });
        }
    }
}

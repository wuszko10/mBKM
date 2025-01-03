import {editUser} from "./user.service";

export const changeActiveStatus = async (id, data, token, refreshData) => {
    const isConfirmed = window.confirm("Czy chcesz dezaktywować użytkownika?");

    if (isConfirmed) {
        data.active = !data.active;

        await editUser(id, data, token)
        await refreshData();
    }
}

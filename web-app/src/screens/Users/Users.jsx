import React, {useState} from 'react';
import '../../styles/style.scss'
import {useNavigate} from "react-router-dom";
import DynamicTable from "../../components/Table/DynamicTable";
import {LuPlusCircle} from "react-icons/lu";
import {getUsersColumns} from "../../components/Table/TableColumns";
import {useUsers} from "../../hooks/useUsers";
import UserPopupForm from "../../components/Popup/components/UserPopupForm";
import {editBusStop} from "../../services/stop.service";
import {addUser} from "../../services/user.service";

const Users = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const {
        users,
        loading,
        page,
        pageSize,
        totalPages,
        setPage,
        setPageSize,
        setSearchQuery,
        refreshUsers,
        token,
    } = useUsers();

    const data = React.useMemo(() => {
        return users.length > 0 ? users : [];
    }, [users]);

    const handleShowCreateForm = () => {
        setShow(true);
    };

    const handleToggle = async (id, newState) => {
        let data = users.find(u => u._id === id);

        data.isActive = Boolean(newState);

        if (data){
            await addUser(id, data, token)
            await refreshUsers();
        }
    }

    const columns = getUsersColumns(navigate, handleToggle);

    return (
        <div className="main-box">
            <div className="content-box">
                <div className="header-with-button">
                    <h2>Użytkowicy</h2>
                    <button className="global-button" onClick={handleShowCreateForm}><LuPlusCircle />Dodaj użytkownika</button>
                </div>

                <DynamicTable
                    data={data}
                    columns={columns}
                    onFilterChange={setSearchQuery}
                    pageIndex={page - 1}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPage(newPage + 1)}
                    onPageSizeChange={setPageSize}
                    loading={loading}
                />
            </div>

            <UserPopupForm
                show={show}
                setShow={setShow}
                refreshUsers={refreshUsers}
            />
        </div>
    );
};

export default Users;

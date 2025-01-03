import React from 'react';
import '../../styles/style.scss'
import DynamicTable from "../../components/GlobalTable/DynamicTable";
import {LuPlusCircle} from "react-icons/lu";
import {useUsers} from "../../hooks/Users/useUsers";
import UserPopupForm from "../../components/Popup/UserPopupForm";

const Users = () => {

    const {
        data,
        columns,
        loading,
        page,
        pageSize,
        totalPages,
        show,
        setPage,
        setPageSize,
        setSearchQuery,
        setShow,
        refreshUsers,
        handleShowCreateForm
    } = useUsers();


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

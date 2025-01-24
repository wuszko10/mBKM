import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <div className="LoginRegister">
            <Outlet />
        </div>
    );
};

export default PublicLayout;

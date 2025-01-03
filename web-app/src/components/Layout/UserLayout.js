import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const UserLayout = () => {
    return (
        <div className="App">
            <div className="menu">
                <Header />
            </div>
            <div className="content">
                <Outlet />
                <hr />
                <Footer />
            </div>

        </div>
    );
};

export default UserLayout;

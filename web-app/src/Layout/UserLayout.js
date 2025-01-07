import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

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

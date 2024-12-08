import {isExpired} from "react-jwt";
import {Navigate, Route, Routes} from "react-router-dom";
import UserLayout from "./components/UserLayout";
import Main from "./screens/Home/Main";
import Tickets from "./screens/Tickets/Tickets";
import Reliefs from "./screens/Reliefs/Reliefs";
import ReliefDetails from "./screens/Reliefs/ReliefDetails";
import BusStops from "./screens/BusStops/BusStops";
import BusStopDetails from "./screens/BusStops/BusStopDetails";
import TransactionDetails from "./screens/Users/UserDetails";
import Transactions from "./screens/Transactions/Transactions";
import Users from "./screens/Users/Users";
import UserDetails from "./screens/Users/UserDetails";
import NotFound from "./screens/Home/NotFound";
import PublicLayout from "./components/PublicLayot";
import Login from "./screens/Home/Login";
import TopUps from "./screens/Transactions/topUps";
import {useEffect, useState} from "react";
import axios from "axios";

const AppRoutes = () => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !isExpired(token);

    const [metadata, setMetadata] = useState({
        ticketTypes: [],
        ticketPeriods: [],
        ticketLines: [],
        reliefTypes: [],
    });

    useEffect(() => {
        const URI = process.env.REACT_APP_API_URL;
        const fetchMetadata = async () => {

            try {
                const response = await axios.get(URI + 'metadata', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setMetadata(response.data);
                localStorage.setItem('metadata', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMetadata();

    }, [token]);

    return (
        <Routes>
            {isAuthenticated ? (
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Main />} />
                    <Route path="tickets" element={<Tickets />} />
                    <Route path="reliefs" element={<Reliefs />} />
                    <Route path="relief/:id" element={<ReliefDetails />} />
                    <Route path="stops" element={<BusStops />} />
                    <Route path="stop/:id" element={<BusStopDetails />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="top-ups" element={<TopUps />} />
                    <Route path="transaction/:id" element={<TransactionDetails />} />
                    <Route path="users" element={<Users />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            ) : (
                <Route path="/" element={<PublicLayout />}>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<Navigate to="/signin" />} />
                </Route>
            )}
        </Routes>
    );
};

export default AppRoutes;

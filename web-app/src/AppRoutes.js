import {isExpired} from "react-jwt";
import {Navigate, Route, Routes} from "react-router-dom";
import UserLayout from "./Layout/UserLayout";
import Main from "./screens/Home/Main/Main";
import Tickets from "./screens/Tickets/Tickets";
import Reliefs from "./screens/Reliefs/Reliefs";
import BusStops from "./screens/BusStops/BusStops";
import UserDetails from "./screens/Users/UserDetails/UserDetails";
import Transactions from "./screens/Transactions/Transactions";
import Users from "./screens/Users/Users";
import NotFound from "./screens/Home/NotFound/NotFound";
import PublicLayout from "./Layout/PublicLayot";
import Login from "./screens/Home/Login/Login";
import TopUps from "./screens/Transactions/TopUps";
import {useEffect} from "react";
import Lines from "./screens/Lines/Lines";
import {useAuth} from "./context/authProvider";
import {fetchMetadata} from "./services/metadata.service";
import TransactionDetails from "./screens/Transactions/TransationDetails/TransactionDetails";
import Loading from "./components/Loading/Loading";

const AppRoutes = () => {
    const { token, loading } = useAuth();

    useEffect(() => {
        if (token && !isExpired(token)) {
            fetchMetadata(token).then();
        }
    }, [token]);

    if( loading ) {
        return (
            <Loading />
        )
    }

    return (
        <Routes>
            {token ? (
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Main />} />
                    <Route path="tickets" element={<Tickets />} />
                    <Route path="reliefs" element={<Reliefs />} />
                    <Route path="stops" element={<BusStops />} />
                    <Route path="lines" element={<Lines />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="top-ups" element={<TopUps />} />
                    <Route path="transaction/:id" element={<TransactionDetails />} />
                    <Route path="users" element={<Users />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            ) : (
                <Route path="/" element={<PublicLayout />}>
                    <Route index element={<Login />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            )}
        </Routes>
    );
};

export default AppRoutes;

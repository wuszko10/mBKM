import './App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./screens/Home/Main";
import {isExpired} from "react-jwt";
import Register from "./screens/Home/Register";
import Login from "./screens/Home/Login";
import {ToastContainer} from 'react-toastify';
import Tickets from "./screens/Tickets/Tickets";
import Transactions from "./screens/Transactions/Transactions";
import Users from "./screens/Users/Users";
import TransactionDetails from "./screens/Transactions/TransactionDetails";
import UserDetails from "./screens/Users/UserDetails";
import React, {useEffect} from "react";
import TicketDetails from "./screens/Tickets/TicketDetails";
import Reliefs from "./screens/Reliefs/Reliefs";
import ReliefDetails from "./screens/Reliefs/ReliefDetails";
import NotFound from "./screens/Home/NotFound";
import axios from "axios";
import {MetadataProvider} from "./context/metadataContext";

function App() {
    return (
        <Router>
            { (!isExpired(localStorage.getItem('token'))) ? (
                <MetadataProvider>
                    <div className="App">
                        <div className="menu">
                            <Header/>
                        </div>
                        <div className="content">
                            <Routes>
                                <Route path="/" element={<Main/>}/>
                                <Route path="/tickets" element={<Tickets/>}/>
                                <Route path="/ticket/:id" element={<TicketDetails/>}/>
                                <Route path="/reliefs" element={<Reliefs/>}/>
                                <Route path="/relief/:id" element={<ReliefDetails/>}/>
                                <Route path="/transactions" element={<Transactions/>}/>
                                <Route path="/transaction/:id" element={<TransactionDetails />} />
                                <Route path="/users" element={<Users/>}/>
                                <Route path="/user/:id" element={<UserDetails/>}/>
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                            <hr />
                            <Footer />
                        </div>
                    </div>
                </MetadataProvider>
            ):(
                <div className="LoginRegister">
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/signin" element={<Login/>}/>
                        <Route path="/signup" element={<Register/>}/>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            )}
            <ToastContainer/>
        </Router>

    );
}

export default App;

/*
<Route path="/add" element={isExpired(localStorage.getItem('token')) ? <Navigate replace to="/" /> : <AddMovie />} />
<Route path="/delete" element={isExpired(localStorage.getItem('token')) ? <Navigate replace to="/" /> : <DeleteMovie />} />
<Route path="/search/:query" element={<SearchResults />} />
<Route path="/details/:title/:id" element={<MovieDetails />} />
*/

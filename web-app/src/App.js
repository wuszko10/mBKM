import './App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import {isExpired} from "react-jwt";
import Register from "./components/Register";
import Login from "./components/Login";
import {ToastContainer} from 'react-toastify';
import Tickets from "./components/Tickets";
import Transactions from "./components/Transactions";
import Users from "./components/Users";

function App() {
    return (
        <Router>
            { (!isExpired(localStorage.getItem('token'))) ? (
                <div className="App">
                    <div className="menu">
                        <Header/>
                    </div>
                    <div className="content">

                        <Routes>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/tickets" element={<Tickets/>}/>
                            <Route path="/transactions" element={<Transactions/>}/>
                            <Route path="/users" element={<Users/>}/>
                        </Routes>
                    </div>

                </div>
            ):(
                <div className="LoginRegister">
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/signin" element={<Login/>}/>
                        <Route path="/signup" element={<Register/>}/>
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

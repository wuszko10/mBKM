import './App.scss';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import {isExpired} from "react-jwt";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={isExpired(localStorage.getItem('token')) ? <Navigate replace to="/signin" /> : <Main/>} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
        <Footer />
      </div>
      <ToastContainer />
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
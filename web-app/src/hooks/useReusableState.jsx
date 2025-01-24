import { useState } from 'react';
import {useAuth} from "../context/authProvider";
import {useNavigate} from "react-router-dom";

const useReusableState = () => {
    const [show, setShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [title, setTitle] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [editMode, setEditMode] = useState(false);

    const [items, setItems] = useState([]); // items can be reliefs, stops, etc.
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    const {token} = useAuth();
    const navigate = useNavigate();

    return {
        show,
        setShow,
        selectedItem,
        setSelectedItem,
        title,
        setTitle,
        buttonText,
        setButtonText,
        editMode,
        setEditMode,
        items,
        setItems,
        loading,
        setLoading,
        page,
        setPage,
        pageSize,
        setPageSize,
        searchQuery,
        setSearchQuery,
        totalPages,
        setTotalPages,
        token,
        navigate,
    };
};

export default useReusableState;

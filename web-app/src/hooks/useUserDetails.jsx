import {useAuth} from "../context/authProvider";
import {useEffect, useState} from "react";
import {getUser} from "../services/user.service";

export const useUserDetails = (id) => {

    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState();

    useEffect(() => {

        getUser(id, token)
            .then((data) => {
                setUserDetails(data);
            })
            .catch((error) => {
                console.error("Failed to fetch ticket", error);
            }).finally(() => {
            setLoading(false);
        });
    }, [id])

    return {
        loading,
        userDetails,
    }
}

import {useAuth} from "../../context/authProvider";
import {useState} from "react";
import {toast} from "react-toastify";
import {userLogin} from "../../services/Users/user.service";

export const useLoginLogic = () => {

    const { setToken, setUser } = useAuth();

    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    function handleChangeRoute() {
        toast.success('Zalogowano', {
            position: 'top-right',
            theme: "colored",
        });
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!formData.login || !formData.password)
            return;

        try {
            const response = await userLogin(formData.login, formData.password)
            if(response) {
                if (response.user.isAdmin === true) {

                    setToken(response.token.token);
                    setUser(response.user);
                    localStorage.setItem('token', JSON.stringify(response.token.token));
                    localStorage.setItem('user', JSON.stringify(response.user));

                    handleChangeRoute();
                } else {
                    toast.warn('Brak uprawnień administratora', {
                        position: 'top-right',
                        theme: "colored",
                    });
                }
            }
        } catch {
            toast.error('Błąd logowania', {
                position: 'top-right',
                theme: "colored",
            });
        }
    };

    return {
        formData,
        handleInputChange,
        handleLogin,
    }

}

import { AxiosInstance } from "@/lib/axios";
import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);

    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [authUser, setAuthUser] = useState(null);

    const checkAuth = async () => {
        try {
            const res = await AxiosInstance.get('/auth/check');
            setAuthUser(res.data.data);     
        } catch (error) {
            setAuthUser(null);
        } finally {
            setIsCheckingAuth(false);
        }
    };

    const [isSigningUp, setIsSigningUp] = useState(false);
    const [signUpData, setSignUpData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    
    const logout = async () => {
        try {
        await AxiosInstance.post('/auth/logout');
        toast.success('Logged Out Successfully');
        setAuthUser(null);
        navigate('/login');
        } catch (error) {
        toast.error(error.response.data.message);
        }
    } ;


    const value = {
        navigate, location,
        isCheckingAuth,
        authUser,setAuthUser ,
        checkAuth,
        showPassword, setShowPassword,
        isSigningUp, setIsSigningUp,
        signUpData, setSignUpData,
        isLoggingIn, setIsLoggingIn,
        loginData, setLoginData ,
        logout ,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;

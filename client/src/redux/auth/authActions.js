import { AxiosInstance } from "@/lib/axios";
import { setUser , setIsCheckingAuth, setIsSigningUp, setIsLoggingIn, setIsprofilePicLoading, setIsPasswordLoading, setIsProfileLoading} from "./authSlice";
import { toast } from "react-toastify";
import { setBlogData, setMyBlogs, setViewBlogdata } from "../blog/blogSlice";

export const checkAuth = () => async(dispatch) => {
    try {
        const res = await AxiosInstance.get('/auth/check');
        dispatch(setUser(res.data.data));
    } catch (error) {
        dispatch(setUser(null));
        console.log('Error from logging' , error);
        
    } finally {
        dispatch(setIsCheckingAuth(false));
    }
};

export const signUp = (data) => async(dispatch) => {
    dispatch(setIsSigningUp(true));
    try {
        await AxiosInstance.post('/auth/signup',data);
        toast.success('Account Created successfully !');
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    } finally {
        dispatch(setIsSigningUp(false));
    }
};

export const login = (data) => async(dispatch) => {
    dispatch(setIsLoggingIn(true));
    try {
        const res = await AxiosInstance.post('/auth/login',data);
        dispatch(setUser(res.data.data));
        toast.success('Logged in successfully');
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    } finally {
        dispatch(setIsLoggingIn(false));
    }
};

export const logout = () => async(dispatch) => {
    try {
        await AxiosInstance.post('/auth/logout');
        dispatch(setUser(null));
        dispatch(setBlogData([]));
        dispatch(setMyBlogs([]));
        dispatch(setViewBlogdata(null));
        toast.success('Logged Out Successfully !');
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
};

export const updateProfilePic = (userId,data) => async(dispatch) => {
    dispatch(setIsprofilePicLoading(true));
    try {
        const res = await AxiosInstance.put(`/auth/update-profile-pic/${userId}`, {profilePic : data});
        dispatch(setUser(res.data.data));
        toast.success('Profile pic updated successfully !');
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    } finally {
        dispatch(setIsprofilePicLoading(false));
    }
};

export const updatePassword = (userId,data) => async(dispatch) => {
    dispatch(setIsPasswordLoading(true));
    try {
        await AxiosInstance.put(`/auth/update-password/${userId}`,data);
        toast.success('password Successfully Updated !');
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    } finally  {
        dispatch(setIsPasswordLoading(false));
    }
};

export const updateProfile = (userId,data) => async(dispatch) => {
    dispatch(setIsProfileLoading(true));
    try {
        const res = await AxiosInstance.put(`/auth/update-profile/${userId}`,data);
        dispatch(setUser(res.data.data));
        toast.success('Profile Updated successfully !');
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    } finally {
        dispatch(setIsProfileLoading(false));
    }
};
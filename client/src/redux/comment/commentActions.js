import { toast } from "react-toastify";
import { setComments, setIsPostingComment } from "./commentSlice";
import { AxiosInstance } from "@/lib/axios";


export const postComment = (blogId,data) => async(dispatch) => {
    dispatch(setIsPostingComment(true));
    try {
        await AxiosInstance.post('/comments/create-comment',data);
        toast.success('Comment Added Successfully !');
        const commentsData = await AxiosInstance.get(`/comments/${blogId}`)
        dispatch(setComments(commentsData.data.data));
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    } finally {
        dispatch(setIsPostingComment(false));
    }
};

export const getComments = (blogId) => async(dispatch) => {
    try {
        const res = await AxiosInstance.get(`/comments/${blogId}`);
        dispatch(setComments(res.data.data));
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    }
};
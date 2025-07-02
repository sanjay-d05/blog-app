import { toast } from "react-toastify";
import { setBlogData, setIsCreatingBlog, setIsUpdatingBlog, setMyBlogs, setViewBlogdata,  } from "./blogSlice";
import { AxiosInstance } from "@/lib/axios";


export const createBlog = (id,data) => async(dispatch) => {
    dispatch(setIsCreatingBlog(true));
    try {
        await AxiosInstance.post('/blogs/create',data);
        toast.success('Blog created successfully !');
        const allBlogs = await AxiosInstance.get('/blogs');
        dispatch(setBlogData(allBlogs.data.data));
        const myBlogs = await AxiosInstance.get(`/blogs/${id}`);
        dispatch(setMyBlogs(myBlogs.data.data));
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    } finally{
        dispatch(setIsCreatingBlog(false));
    }
};

export const getBlogs = () => async(dispatch) => {
    try {
        const res = await AxiosInstance.get('/blogs');
        dispatch(setBlogData(res.data.data));
        toast.success('Blogs fetched successfully');
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    }
};

export const updateBlog = (id,blogId,data) => async(dispatch) => {
    dispatch(setIsUpdatingBlog(true));
    try {
        await AxiosInstance.put(`/blogs/update-blog/${blogId}`,data);
        toast.success('Blog Updated successfully');
         const allBlogs = await AxiosInstance.get('/blogs');
        dispatch(setBlogData(allBlogs.data.data));
        const myBlogs = await AxiosInstance.get(`/blogs/${id}`);
        dispatch(setMyBlogs(myBlogs.data.data));
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    } finally {
        dispatch(setIsUpdatingBlog(false));
    }
};

export const deleteBlog = (id,blogId) => async(dispatch) => {
    try {
        await AxiosInstance.delete(`/blogs/delete/${blogId}`);
        toast.success('Blog deleted successfully');
        const allBlogs = await AxiosInstance.get('/blogs');
        dispatch(setBlogData(allBlogs.data.data));
        const myBlogs = await AxiosInstance.get(`/blogs/${id}`);
        dispatch(setMyBlogs(myBlogs.data.data));
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    }
};

export const userBlogs = (id) => async(dispatch) => {
    try {
        const res = await AxiosInstance.get(`/blogs/${id}`);
        dispatch(setMyBlogs(res.data.data));
        toast.success('My Blogs fetched successfully');
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    }
};

export const viewBlogs = (blogId) => async(dispatch) => {
    try {
        const res = await AxiosInstance.get(`/blogs/view-blog/${blogId}`);
        dispatch(setViewBlogdata(res.data.data));
        toast.success(`${blogId} is ready for viewing`);
        return true;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return false;
    }
};
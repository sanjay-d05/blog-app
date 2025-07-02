import {createSlice} from '@reduxjs/toolkit';

const blogSlice = createSlice({
    name:'blog',
    initialState:{
        blogData:[],
        isCreatingBlog:false,
        isUpdatingBlog:false,
        currentCategory:'',
        myBlogs:[],
        setViewBlogdata:null,
    },
    reducers:{
        setBlogData:(state,action) => {
            state.blogData = action.payload;
        },
        setIsCreatingBlog:(state,action) => {
            state.isCreatingBlog = action.payload;
        },
        setIsUpdatingBlog:(state,action) => {
            state.isUpdatingBlog = action.payload;
        },
        setCurrentCategory:(state,action) => {
            state.currentCategory = action.payload;
        },
        setMyBlogs:(state,action) => {
            state.myBlogs = action.payload;
        },
        setViewBlogdata:(state,action) => {
            state.viewBlogdata = action.payload;
        },
    },
});

export const {
    setBlogData,
    setIsCreatingBlog,
    setIsUpdatingBlog,
    setCurrentCategory,
    setMyBlogs ,
    setViewBlogdata
} = blogSlice.actions;
export default blogSlice.reducer;
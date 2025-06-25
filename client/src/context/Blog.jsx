import { categories } from "@/constants/category";
import { createContext, useState } from "react";


export const BlogContext = createContext();

const BlogProvider = ({children}) => {

    const [isCreatingBlog,setIsCreatingBlog] = useState(false);
    const [createBlogData, setCreateBlogData] = useState({
        title: '',
        description: '',
        category: '',
        coverImage: null,
        coverImageName: '',
        tags: [],
        content: ''
    });
    const [tagInput, setTagInput] = useState('');

    const [allBlogs ,  setAllBlogs] = useState(null);

     const [isSearchActive , setIsSearchActive] = useState(false);

    const value = {
        createBlogData,setCreateBlogData,
        tagInput,setTagInput,
        isCreatingBlog,setIsCreatingBlog,
        allBlogs ,  setAllBlogs ,
        isSearchActive , setIsSearchActive ,
        categories ,

    };

    return(
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
};

export default BlogProvider;
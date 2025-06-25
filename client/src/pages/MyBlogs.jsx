import { AuthContext } from '@/context/Auth';
import { AxiosInstance } from '@/lib/axios';
import BlogCard from '@/modals/BlogCard';
import { Loader } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function MyBlogs() {
    const { authUser } = useContext(AuthContext);
    const [myBlogs, setMyBlogs] = useState([]);
    const [loading, setLoading] = useState(true); // 👈 loading state

    useEffect(() => {
        const fetchMyBlogs = async () => {
            if (!authUser?._id) return; // wait until authUser is available
            try {
                const res = await AxiosInstance.get(`/blogs`);
                setMyBlogs(res.data.data);
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Failed to fetch blogs');
            } finally {
                setLoading(false); // 👈 mark as loaded
            }
        };

        fetchMyBlogs();
    }, [authUser?._id]);

    // Filter blogs authored by current user
    const myBlog = myBlogs.filter(item => item.author === authUser?._id);

    if (!authUser) {
        return <div className="min-h-[90vh] flex justify-center items-center text-black"><Loader className="size-10 animate-spin" /></div>;
    }

    if (loading) {
        return <div className="min-h-[90vh] flex justify-center items-center text-black"><Loader className="size-10 animate-spin" /></div>;
    }

    return (
        <div className='min-h-[90vh] h-fit bg-[rgba(9,0,47,255)] text-white flex flex-col justify-start items-center pt-20 pb-10'>
            
            <div className='py-2 border-b-2'>
                MyBlogs
            </div>

            {myBlog.length > 0 ? (
                <div className='w-full flex justify-center items-center flex-wrap gap-3 pt-5'>
                    {myBlog.map((item, index) => (
                        <BlogCard key={index} blog={item} isMyBlog={true}/>
                    ))}
                </div>
            ) : (
                <p>No Blogs Found, Create one</p>
            )}

        </div>
    );
}

export default MyBlogs;

import BlogCard from '@/modals/BlogCard';
import { userBlogs } from '@/redux/blog/blogActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MyBlogsPage() {
  const { user } = useSelector(store => store.auth);
  const { myBlogs } = useSelector(store => store.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userBlogs(user?._id));
  }, []);

  return (
    <div className='bg-[rgba(9,0,47,255)] text-white flex justify-center items-start h-screen overflow-auto custom-scrollbar'>
      <div className='w-full pt-24 pb-10 px-4 flex flex-col items-center'>

        {/* Title */}
        <h2 className='text-3xl font-bold mb-6 text-center'>
          My Blogs
        </h2>

        {/* Blog Cards */}
        <div className='flex flex-wrap justify-center items-center gap-3'>
          {myBlogs.length > 0 ? (
            myBlogs.map((item, index) => (
              <BlogCard key={index} blog={item} isUserOptions={true} />
            ))
          ) : (
            <p className='text-gray-400'>You haven't created any blogs yet.</p>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default MyBlogsPage;

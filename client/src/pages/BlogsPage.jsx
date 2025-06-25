import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '@/components/custom/SearchBar';
import { Button } from '@/components/ui/button';
import { BlogContext } from '@/context/Blog';
import { AxiosInstance } from '@/lib/axios';
import BlogCard from '@/modals/BlogCard';
import { RiMenu2Line, RiMenu3Line } from 'react-icons/ri';
import { IoClose, IoFilter } from 'react-icons/io5';
import { FaGreaterThan } from 'react-icons/fa6';

function BlogsPage() {
  const {
    allBlogs, setAllBlogs,
    isSearchActive,
    categories
  } = useContext(BlogContext);

  const [openFilter, setOpenFilter] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const res = await AxiosInstance.get('/blogs');
      setAllBlogs(res.data.data);
    };
    fetchAllBlogs();
  }, []);

  const FilterCard = () => {
    return (
      <div className='flex flex-col justify-start items-start gap-3 w-full py-1 px-3'>
        <div className='flex justify-between items-center w-full py-1 border-b'>
          <h6>Filters</h6>
          <IoClose className='block md:hidden' size={25} onClick={() => setOpenFilter(false)} />
        </div>
        <div className='flex justify-center items-center flex-wrap gap-2 pb-5'>
          <span
            className={`border rounded-xl px-3 py-1 border-indigo-600 hover:bg-indigo-900 cursor-pointer ${
              currentCategory === '' ? 'bg-indigo-600 text-white' : ''
            }`}
            onClick={() => {
              setCurrentCategory('');
              setOpenFilter(false);
            }}
          >
            All
          </span>
          {categories.map((item, index) => (
            <span
              key={index}
              className={`border rounded-xl p-1 border-indigo-600 hover:bg-indigo-900 cursor-pointer ${
                currentCategory === item.value ? 'bg-indigo-600 text-white' : ''
              }`}
              onClick={() => {
                setCurrentCategory(item.value);
                setOpenFilter(false);
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const matchedCategory = categories.find(item => item.value === currentCategory);
  const currentCategoryName = matchedCategory ? matchedCategory.name : currentCategory;

  const filteredBlogs = allBlogs?.filter(blog => {
    const matchesCategory = currentCategory
      ? blog.category?.trim().toLowerCase() === currentCategory.trim().toLowerCase()
      : true;

    const matchesSearch = searchQuery
      ? blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className='pt-16 pb-5 bg-[rgba(9,0,47,255)] text-white w-full'>
      {/* SearchBar */}
      <div className='hidden md:block'>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      {isSearchActive && (
        <div className='md:hidden'>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      )}

      <div className={`flex justify-center items-center md:pt-20 w-full ${isSearchActive ? 'pt-20' : 'pt-0'}`}>
        <div className='flex justify-center items-start w-full px-4 md:px-5 gap-0 md:gap-2 h-[90vh] py-5'>
          <div className='flex flex-col justify-center items-center gap-2 h-full w-full'>
            <div className='flex justify-between items-center py-2 border-b-2 border-indigo-600 w-full'>
              <h5 className='font-medium text-md flex justify-center items-center gap-1'>
                <span onClick={() => setCurrentCategory('')}>Blogs</span>
                {currentCategory && <FaGreaterThan />}
                {currentCategoryName}
              </h5>
              <IoFilter className='block md:hidden' size={25} onClick={() => setOpenFilter(true)} />
            </div>

            <div className='flex-1 md:flex-2/3 h-[90%] overflow-auto relative w-full custom-scrollbar'>
              <div className='flex justify-center items-center gap-3 flex-wrap py-5 w-full'>
                {filteredBlogs && filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog, index) => (
                    <BlogCard key={index} blog={blog} isMyBlog={false}/>
                  ))
                ) : (
                  <p>No blogs found.</p>
                )}
              </div>

              {openFilter && (
                <div className='flex justify-start items-start gap-3 md:hidden absolute top-0 right-0 w-[90%] sm:w-[50%] h-full overflow-auto border-2 rounded-lg border-indigo-600 bg-[rgba(9,0,47,255)] z-45'>
                  <FilterCard />
                </div>
              )}
            </div>
          </div>

          <div className='hidden md:flex flex-1/3 h-full overflow-auto border-2 rounded-lg border-indigo-600 custom-scrollbar'>
            <FilterCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsPage;

import SearchBar from '@/components/custom/SearchBar';
import { categories } from '@/constants/category';
import FilterCard from '@/modals/FilterCard';
import { getBlogs } from '@/redux/blog/blogActions';
import { setCurrentCategory } from '@/redux/blog/blogSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaGreaterThan } from "react-icons/fa";
import BlogCard from '@/modals/BlogCard';
import { IoFilter } from 'react-icons/io5';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

function BlogsPage() {
  const { isSearchActive } = useSelector(store => store.auth);
  const { blogData, currentCategory } = useSelector(store => store.blog);
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  // Auto-close sheet when screen width is >= 768px
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleMediaQueryChange = (event) => {
      if (event.matches) setOpenFilter(false);
    };
    if (mediaQuery.matches) setOpenFilter(false);
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  const matchedCategory = categories.find(item => item.value === currentCategory);
  const currentCategoryName = matchedCategory ? matchedCategory.name : currentCategory;

  // Filter blogs by category + search
  const filteredBlogs = blogData?.filter((item) => {
    const matchesCategory = currentCategory === '' || item.category === currentCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`h-screen flex flex-col justify-center items-start bg-[rgba(9,0,47,255)] text-white pt-16 md:pt-32 pb-5 ${isSearchActive ? 'pt-32' : ''}`}>

      <div className='hidden md:block w-full'>
        <SearchBar setSearchQuery={setSearchQuery} />
      </div>

      {isSearchActive && (
        <div className='md:hidden w-full'>
          <SearchBar setSearchQuery={setSearchQuery} />
        </div>
      )}

      <div className='w-full h-full flex justify-center items-start py-3 px-1 md:px-10'>
        <div className='flex flex-col justify-start items-start flex-3/3 h-full p-2'>

          <div className='ps-1 pb-2 flex justify-between items-center gap-1 font-bold text-2xl w-full'>
            <h5>
              <span onClick={() => dispatch(setCurrentCategory(''))}>Blogs</span>
              {currentCategory ? (
                <div className='hidden md:inline'>
                  <FaGreaterThan className=' inline mx-2' />
                  {currentCategoryName}
                </div>
              ) : null}
              <span className='ms-1'>: {filteredBlogs?.length || 0}</span>
            </h5>

            {/* Mobile Filter Sheet */}
            <div className='md:hidden '>
              <Sheet open={openFilter} onOpenChange={setOpenFilter}>
                <SheetTrigger asChild>
                  <IoFilter size={25} className='cursor-pointer' />
                </SheetTrigger>
                <SheetContent className='md:hidden bg-[rgba(9,0,47,255)] text-white'>
                  <FilterCard onFilterSelect={() => setOpenFilter(false)} />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Blog List */}
          <div className='h-full w-full overflow-auto custom-scrollbar border-2 border-[rgba(61,62,119,255)] rounded-xl p-3 flex flex-wrap justify-center items-center gap-3'>
            {filteredBlogs?.length > 0 ? (
              filteredBlogs.map((item, index) => (
                <BlogCard
                  key={index}
                  blog={item}
                  category={currentCategoryName}
                />
              ))
            ) : (
              <p>
                {currentCategory
                  ? `No Blogs found for the category "${currentCategoryName}"`
                  : 'No blogs found.'}
              </p>

            )}
          </div>
        </div>

        {/* Desktop Filter Sidebar */}
        <div className='md:flex md:flex-1/3 hidden h-full border-2 border-[rgba(61,62,119,255)] rounded-xl p-1'>
          <FilterCard />
        </div>
      </div>
    </div>
  );
}

export default BlogsPage;

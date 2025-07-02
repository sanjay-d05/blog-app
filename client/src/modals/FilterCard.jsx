import { categories } from '@/constants/category';
import { setCurrentCategory } from '@/redux/blog/blogSlice';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

function FilterCard({ onFilterSelect }) {
  const { currentCategory } = useSelector(store => store.blog);
  const dispatch = useDispatch();

  const handleSelect = (category) => {
    dispatch(setCurrentCategory(category));
    if (onFilterSelect) onFilterSelect(); // Close sheet
  };

  return (
    <div className='h-full w-full rounded-xl flex flex-col justify-start items-start'>
      <div className='flex justify-between items-center w-full py-3 md:py-1 px-1 border-b'>
        <h6>Filters</h6>
      </div>

      <div className='flex justify-center items-start flex-wrap gap-2 py-5 px-1  w-full h-full overflow-auto custom-scrollbar'>
        <span
          className='border rounded-xl px-3 py-1 border-indigo-600 hover:bg-indigo-900 cursor-pointer'
          onClick={() => handleSelect('')}
        >
          All
        </span>
        {categories.map((item, index) => (
          <span
            key={index}
            className='border rounded-xl p-1 border-indigo-600 hover:bg-indigo-900 cursor-pointer'
            onClick={() => handleSelect(item.value)}
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default FilterCard;

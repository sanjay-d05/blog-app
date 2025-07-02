import React from 'react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { IoSearch } from 'react-icons/io5';

function SearchBar({ setSearchQuery }) {
  return (
    <div className='w-full  z-50 flex justify-center px-4'>
      <Label className='w-full md:w-[60%] flex items-center border bg-white rounded-full shadow-md overflow-hidden'>
        <input
          className='w-full px-5 py-3 text-gray-800 text-base focus:outline-none placeholder:text-gray-400'
          type='text'
          placeholder='Search blog posts...'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className='h-full md:w-25 rounded-none rounded-r-full bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-0 flex items-center justify-center'>
          <IoSearch size={20} />
        </Button>
      </Label>
    </div>
  );
}

export default SearchBar;

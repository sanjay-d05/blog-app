import React, { useContext, useEffect, useState } from 'react';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '../ui/menubar';
import { IoClose, IoMenuSharp, IoPersonCircleOutline } from 'react-icons/io5';
import { RiPenNibFill } from "react-icons/ri";
import { MdOutlineSearchOff, MdSearch } from 'react-icons/md';
import { AuthContext } from '@/context/Auth';
import { toast } from 'react-toastify';
import { AxiosInstance } from '@/lib/axios';
import { BlogContext } from '@/context/Blog';
import { Loader } from 'lucide-react';

function Navbar() {
  const { authUser, setAuthUser, checkAuth, navigate, location, logout, isLoading } = useContext(AuthContext);
  const { isSearchActive, setIsSearchActive } = useContext(BlogContext);

  const [openMenu, setOpenMenu] = useState(false);

  const currentRoute = location.pathname;

  // Helper to check if the route is /create or starts with /edit-blog/
  const isEditorRoute = currentRoute === '/create' || currentRoute.startsWith('/edit-blog/');

  return (
    <header className='w-full flex justify-between items-center px-5 py-4 fixed top-0 z-50 bg-[rgba(28,24,75,255)] text-[rgba(161,177,255,255)]'>
      <h1
        onClick={() => navigate('/')}
        className="text-2xl font-bold flex justify-center items-center gap-1 cursor-pointer hover:underline transition duration-200"
      >
        <RiPenNibFill />Scribly
      </h1>


      {authUser && !isEditorRoute && (
        <div className='hidden md:flex justify-center items-center gap-3'>
          <button className={`${currentRoute === '/' ? 'underline underline-offset-8' : 'hover:underline hover:underline-offset-8 decoration-white'}`} onClick={() => navigate('/')}>Home</button>
          <button className={`${currentRoute === '/blogs' ? 'underline underline-offset-8' : 'hover:underline hover:underline-offset-8 decoration-white'}`} onClick={() => navigate('/blogs')}>Blogs</button>
          <button className={`${currentRoute === '/about' ? 'underline underline-offset-8' : 'hover:underline hover:underline-offset-8 decoration-white'}`} onClick={() => navigate('/about')}>About</button>
        </div>
      )}

      {authUser && (
        <div className='flex justify-center items-center gap-2 md:gap-4'>
          {currentRoute === '/blogs' && (
            <div className='md:hidden'>
              {isSearchActive ? (
                <MdOutlineSearchOff size={25} onClick={() => { setIsSearchActive(false); setOpenMenu(false); }} />
              ) : (
                <MdSearch size={25} onClick={() => { setIsSearchActive(true); setOpenMenu(false); }} />
              )}
            </div>
          )}

          <Menubar className='bg-none border-none bg-[rgba(28,24,75,255)] text-inherit'>
            <MenubarMenu>
              <MenubarTrigger className='bg-none'>
                <IoPersonCircleOutline size={25} />
              </MenubarTrigger>
              <MenubarContent className='bg-[rgba(9,0,47,1)] text-white border-indigo-600 px-2 mr-1'>
                <MenubarItem>
                  <span className='text-lg font-serif'>Hello {authUser?.name || 'Unknown'} Welcome!</span>
                </MenubarItem>

                {!isEditorRoute && (
                  <>
                    <MenubarSeparator className=' bg-indigo-600' />
                    <MenubarItem onClick={() => navigate('/profile')}>Profile</MenubarItem>
                    <MenubarSeparator className=' bg-indigo-600' />
                    <MenubarItem onClick={() => navigate('/myblogs')}>MyBlogs</MenubarItem>
                    <MenubarSeparator className=' bg-indigo-600' />
                    <MenubarItem onClick={() => { navigate('/create'); setOpenMenu(false); }}>Create Blog</MenubarItem>
                    <MenubarSeparator className=' bg-indigo-600' />
                    <MenubarItem onClick={() => { logout(); setOpenMenu(false); }}>Logout</MenubarItem>
                  </>
                )}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          {!isEditorRoute && (
            <div className='md:hidden'>
              {openMenu ? (
                <IoClose size={25} onClick={() => { setOpenMenu(false); setIsSearchActive(false); }} />
              ) : (
                <IoMenuSharp size={25} onClick={() => { setOpenMenu(true); setIsSearchActive(false); }} />
              )}
            </div>
          )}
        </div>
      )}

      {openMenu && !isEditorRoute && (
        <div className="absolute top-full left-0 w-full bg-[#1C184B] text-white flex flex-col items-center gap-1 py-4 md:hidden shadow-lg border-t border-white/10 z-50 rounded-b-lg">
          <button
            onClick={() => { navigate('/'); setOpenMenu(false); }}
            className="w-full text-center py-1 text-lg font-medium hover:bg-white/10 transition rounded"
          >
            Home
          </button>
          <button
            onClick={() => { navigate('/blogs'); setOpenMenu(false); }}
            className="w-full text-center py-1 text-lg font-medium hover:bg-white/10 transition rounded"
          >
            Blogs
          </button>
          <button
            onClick={() => { navigate('/about'); setOpenMenu(false); }}
            className="w-full text-center py-1 text-lg font-medium hover:bg-white/10 transition rounded"
          >
            About
          </button>
        </div>

      )}
    </header>
  );
}

export default Navbar;

import React, { useEffect } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/custom/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './modals/ProfilePage';
import BlogsPage from './pages/BlogsPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/custom/Footer';
import { checkAuth } from './redux/auth/authActions';
import {FiLoader} from 'react-icons/fi';
import CreateBlog from './modals/CreateBlog';
import MyBlogsPage from './pages/MyBlogsPage';
import ViewBlog from './modals/ViewBlog';
import EditBlog from './modals/EditBlog';

function App() {

  const {user , isCheckingAuth} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  },[]);

   if (isCheckingAuth && !user)
    return (
      <div className="flex items-center justify-center h-screen">
        <FiLoader className="size-10 animate-spin" />
      </div>
    );
  

  return (
    <div className='h-screen w-full overflow-auto scrollbar-invisible-thin'>
    <ToastContainer position='top-center' />

    <Navbar />

    <Routes>
      <Route path='/' element={user ? <HomePage /> : <Navigate to={'/login'} /> } />
      <Route path='/signup' element={!user ? <SignUpPage buttonText={'SignUp'}/> : <Navigate to={'/'} />} />
      <Route path='/login' element={!user ? <LoginPage buttonText={'Login'}/> : <Navigate to={'/'} />} />
      <Route path='/profile' element={user ? <ProfilePage /> : <Navigate to={'/login'} /> } />
      <Route path='/blogs' element={user ? <BlogsPage /> : <Navigate to={'/login'} /> } />
      <Route path='/create' element={user ? <CreateBlog /> : <Navigate to={'/login'} /> } />
      <Route path='/about' element={<AboutPage /> } />
      <Route path='/myblogs' element={user ? <MyBlogsPage /> : <Navigate to={'/login'} /> } />
      <Route path='/view-blog/:id' element={user ? <ViewBlog /> : <Navigate to={'/login'} /> } />
      <Route path='/edit-blog/:id' element={user ? <EditBlog /> : <Navigate to={'/login'} /> } />
    </Routes>

    <Footer />

    </div>
  )
}

export default App
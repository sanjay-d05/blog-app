import React, { useContext, useEffect } from 'react';
import './App.css';
import { AuthContext } from './context/Auth';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/custom/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import BlogsPage from './pages/BlogsPage';
import Footer from './components/custom/Footer';
import { Loader } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css'; // Required for styles
import CreateBlogsPage from './pages/CreateBlogsPage';
import ViewBlogs from './modals/ViewBlogs';
import MyBlogs from './pages/MyBlogs';
import EditBlogPage from './modals/EditBlogPage';

function App() {

  const {
    isCheckingAuth,
    authUser,
    checkAuth
  } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>

      <ToastContainer position='top-center' />

      <Navbar authUser={authUser}/>


      <Routes >
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path='/signup' element={!authUser ? <SignUpPage buttonText={'SignUp'}/> : <Navigate to={'/'} />} />
        <Route path='/login' element={!authUser ? <LoginPage buttonText={'Login'}/> : <Navigate to={'/'} />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={'/login'} />} />
        <Route path='/blogs' element={authUser ? <BlogsPage /> : <Navigate to={'/login'} />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/create' element={authUser ? <CreateBlogsPage /> : <Navigate to={'/login'} />} />
        <Route path='/blogs/:id' element={authUser ? <ViewBlogs /> : <Navigate to={'/login'} />} />
        <Route path='/myblogs' element={authUser ? <MyBlogs /> : <Navigate to={'/login'} />} />
        <Route path='/edit-blog/:id' element={authUser ? <EditBlogPage /> : <Navigate to={'/login'} />} />
      </Routes>


      <Footer />

    </div>
  )
}

export default App

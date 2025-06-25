import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AuthContext } from '@/context/Auth';
import { AxiosInstance } from '@/lib/axios';
import React, { useContext, useState } from 'react';
import {
  FaUserCircle,
  FaBlog,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';

function ProfilePage() {
  const {
    authUser, navigate, logout,
  } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [bio, setBio] = useState(authUser?.bio || 'Type your bio.....');
  const [profilePicData, setProfilePicData] = useState({
    profilePic: authUser?.profilePic || '',
    profilePicName: '',
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [conformNewPassword, setConformNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConformNewPassword, setShowConformNewPassword] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [isBioLoading, setIsBioLoading] = useState(false);
  const [isprofilePicLoading, setIsprofilePicLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);


  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicData((prev) => ({
          ...prev,
          profilePic: reader.result,
          profilePicName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const updateBio = async (e) => {
    e.preventDefault();
    setIsBioLoading(true);
    try {
      await AxiosInstance.put(`/auth/update-bio/${authUser._id}`, { bio });
      toast.success('Bio Updated Successfully');
      setIsDialogOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsBioLoading(false);
    }
  };

  const updateProfilePic = async (e) => {
    e.preventDefault();
    setIsprofilePicLoading(true);
    try {
      let base64Image = profilePicData.profilePic;

      if (profilePicData.profilePic instanceof File) {
        base64Image = await convertToBase64(profilePicData.profilePic);
      }

      await AxiosInstance.put(`/auth/update-profilePic/${authUser?._id}`, { profilePic: base64Image });
      toast.success('Profile Pic Updated Successfully');
      setIsProfileOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsprofilePicLoading(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    setIsPasswordLoading(true);
    try {
      await AxiosInstance.post('/auth/update-password', {
        email: authUser?.email,
        currentPassword,
        newPassword,
        conformNewPassword
      });
      toast.success('Password Updated Successfully');
      setIsPasswordChangeOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#090031] to-[#130f40] text-white flex flex-col md:flex-row pt-16'>

      {/* Mobile Off-canvas Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-45 w-64 bg-white/10 backdrop-blur-md shadow-xl transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        {/* Close Button in Sidebar (mobile only) */}
        <div className='md:hidden flex justify-end p-4 pt-20'>
          <button onClick={toggleSidebar}>
            <FaTimes size={22} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className='p-6 flex flex-col items-center gap-2'>
          {authUser?.profilePic ? (
            <img
              src={authUser.profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle size={64} className='text-white/70' />
          )}

          <h2 className='text-xl font-semibold text-center'>
            {authUser?.name || 'Guest User'}
          </h2>
          <p className='text-sm text-white/60 text-center'>{authUser?.email}</p>
        </div>


        <nav className='flex flex-col gap-4 mt-4 px-6'>
          <button className='flex items-center gap-2 hover:text-blue-400 transition' onClick={() => navigate('/myblogs')}>
            <FaBlog /> My Blogs
          </button>
          <button className='flex items-center gap-2 hover:text-blue-400 transition'>
            <FaCog /> Settings
          </button>
          <button className='flex items-center gap-2 hover:text-red-400 transition' onClick={() => logout()}>
            <FaSignOutAlt /> Logout
          </button>

          <Dialog open={isPasswordChangeOpen} onOpenChange={setIsPasswordChangeOpen} >
            <DialogTrigger asChild>
              <Button className=' text-xs px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition'>
                Update Password
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] bg-[rgba(9,0,47,1)] text-white">
              <DialogHeader>
                <DialogTitle>Update Password</DialogTitle>
                <DialogDescription>
                  Enter your current password and the new password you'd like to use. Click save when you're done.
                </DialogDescription>

              </DialogHeader>

              {/* ✅ Move form HERE */}
              <form onSubmit={updatePassword} className="grid gap-4">
                <div className="grid gap-3">

                  <div className='w-full'>
                    <Label className={'mb-1'}>Password</Label>
                    <div className='w-full flex justify-center items-center gap-2'>
                      <Input
                        className={`border-2 border-indigo-600`}
                        type={`${showPassword ? 'text' : 'password'}`}
                        placeholder='......'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      {showPassword ?
                        <IoEyeOff size={25} onClick={() => setShowPassword(false)} className='text-indigo-600' />
                        : <IoEye size={25} onClick={() => setShowPassword(true)} className='text-indigo-600' />}
                    </div>
                  </div>

                  <div className='w-full'>
                    <Label className={'mb-1'}>New Password</Label>
                    <div className='w-full flex justify-center items-center gap-2'>
                      <Input
                        className={`border-2 border-indigo-600`}
                        type={`${showNewPassword ? 'text' : 'password'}`}
                        placeholder='......'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      {showNewPassword ?
                        <IoEyeOff size={25} onClick={() => setShowNewPassword(false)} className='text-indigo-600' />
                        : <IoEye size={25} onClick={() => setShowNewPassword(true)} className='text-indigo-600' />}
                    </div>
                  </div>

                  <div className='w-full'>
                    <Label className={'mb-1'}>Conform New Password</Label>
                    <div className='w-full flex justify-center items-center gap-2'>
                      <Input
                        className={`border-2 border-indigo-600`}
                        type={`${showConformNewPassword ? 'text' : 'password'}`}
                        placeholder='......'
                        value={conformNewPassword}
                        onChange={(e) => setConformNewPassword(e.target.value)}
                      />
                      {showConformNewPassword ?
                        <IoEyeOff size={25} onClick={() => setShowConformNewPassword(false)} className='text-indigo-600' />
                        : <IoEye size={25} onClick={() => setShowConformNewPassword(true)} className='text-indigo-600' />}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button className='bg-indigo-600 hover:bg-red-600'>Cancel</Button>
                  </DialogClose>

                  <Button className='bg-indigo-600 hover:bg-green-600' type="submit">
                    {isPasswordLoading ? 'Updating....' : 'Update Password'}
                  </Button>

                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </nav>
      </div>

      {/* Main Content */}
      <main className='flex-1 p-6 md:p-10 relative'>

        {/* Header (My Profile + Toggle Button) */}
        <div className='flex items-center justify-between mb-6 md:hidden'>
          <h1 className='text-2xl font-bold'>My Profile</h1>
          {!sidebarOpen && (
            <button onClick={toggleSidebar}>
              <FaBars size={24} />
            </button>
          )}
        </div>

        {/* Profile Info Section */}
        <div className='bg-white/10 p-6 rounded-xl shadow-md max-w-xl mx-auto flex flex-col gap-10 items-center relative'>
          {/* Profile Image Section with Edit */}
          <div className='relative'>
            <div className='w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-lg'>
              {authUser?.profilePic ? (
                <img
                  src={authUser.profilePic}
                  alt='Profile'
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full bg-white/10 flex items-center justify-center text-white/50 text-4xl'>
                  <FaUserCircle />
                </div>
              )}
            </div>

            {/* Edit Profile Image Button */}
            <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen} >
              <DialogTrigger asChild>
                <Button className='absolute top-0 right-0 text-xs px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition'>
                  Edit
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px] bg-[rgba(9,0,47,1)] text-white">
                <DialogHeader>
                  <DialogTitle>Update Profile Picture</DialogTitle>
                  <DialogDescription>
                    Choose a new profile picture to upload. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>

                {/* ✅ Move form HERE */}
                <form onSubmit={updateProfilePic} className="grid gap-4">
                  <div className="grid gap-3">
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium">Profile Picture</label>
                      <div className="border-2 border-dashed border-white/30 rounded-md w-full h-40 flex items-center justify-center relative hover:border-blue-500 transition duration-300">
                        <label htmlFor="profile-upload" className="cursor-pointer text-center text-white/80 hover:text-blue-400">
                          {profilePicData.profilePic ? (
                            <>
                              <img
                                src={profilePicData.profilePic}
                                alt="Profile"
                                className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
                              />
                              <p className="font-medium">Change picture</p>
                            </>
                          ) : (
                            <>
                              Click to upload image
                              <br />
                              <span className="text-sm text-white/50">(JPG, PNG, etc.)</span>
                            </>
                          )}
                        </label>
                        <input
                          id="profile-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePicChange} // ⬅️ you need to define this
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      {profilePicData.profilePic && (
                        <p className="mt-2 text-sm text-white/70">Selected: {profilePicData.profilePicName}</p>
                      )}
                    </div>

                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button className='bg-indigo-600 hover:bg-red-600'>Cancel</Button>
                    </DialogClose>

                    {isprofilePicLoading ?
                      <Button className='bg-indigo-600 hover:bg-green-600'>Saving.....</Button>
                      :
                      <Button className='bg-indigo-600 hover:bg-green-600' type="submit">Save changes</Button>}
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Profile Fields */}
          <div className='space-y-4 w-full'>

            <div>
              <label className='text-sm text-white/60'>Name</label>
              <p className='text-lg font-medium'>{authUser?.name || 'N/A'}</p>
            </div>

            <div>
              <label className='text-sm text-white/60'>Email</label>
              <p className='text-lg font-medium'>{authUser?.email || 'N/A'}</p>
            </div>



            <div>
              <label className='text-sm text-white/60'>Joined</label>
              <p className='text-lg font-medium'>
                {authUser?.createdAt
                  ? new Date(authUser.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                  : 'N/A'}
              </p>
            </div>

            {/* Bio with Edit Button */}
            <div className='relative'>
              <label className='text-sm text-white/60'>Bio</label>
              <p className='text-lg font-medium whitespace-pre-wrap'>
                {authUser?.bio?.trim() || 'Add Bio.'}
              </p>

              <button
                onClick={() => alert('Open bio edit modal')}
                className='absolute top-0 right-0 text-xs px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition'
              >
                Edit
              </button>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className='absolute top-0 right-0 text-xs px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition'>
                    Edit
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] bg-[rgba(9,0,47,1)] text-white">
                  <DialogHeader>
                    <DialogTitle>Update Bio</DialogTitle>
                    <DialogDescription>
                      Edit your bio below. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>

                  {/* ✅ Move form HERE */}
                  <form onSubmit={updateBio} className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Type your bio..."
                      />
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button className={'bg-indigo-600 hover:bg-red-600'}>Cancel</Button>
                      </DialogClose>

                      {isBioLoading ?
                        <Button className={'bg-indigo-600 hover:bg-green-600'}>Saving....</Button>
                        :
                        <Button type="submit" className={'bg-indigo-600 hover:bg-green-600'}>Save changes</Button>}
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

            </div>
          </div>
        </div>


      </main>
    </div>
  );
}

export default ProfilePage;

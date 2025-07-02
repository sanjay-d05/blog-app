import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { logout, updatePassword, updateProfile, updateProfilePic } from '@/redux/auth/authActions';
import React, { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaBlog, FaCog, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaSignOutAlt, FaTimes, FaUserCircle } from 'react-icons/fa';

function ProfilePage() {

  const { user, isprofilePicLoading, isPasswordLoading, isProfileLoading } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConformNewPassword, setShowConformNewPassword] = useState(false);
  const [profilePicData, setProfilePicData] = useState({
    profilePic: user?.profilePic || '',
    profilePicName: '',
  });
  const [passwordData, setPasswordData] = useState({
    password: '',
    newPassword: '',
    conformNewPassword: ''
  });
  const [profileData, setProfileData] = useState({
    bio: user?.bio,
    instagramUrl: user?.instagramUrl ,
    linkedinUrl: user?.linkedinUrl  ,
    githubUrl: user?.githubUrl  ,
    facebookUrl: user?.facebookUrl 
  })

  const socialLinks = [
    user?.instagramUrl && { url: user.instagramUrl, icon: <FaInstagram /> },
    user?.linkedinUrl && { url: user.linkedinUrl, icon: <FaLinkedin /> },
    user?.githubUrl && { url: user.githubUrl, icon: <FaGithub /> },
    user?.facebookUrl && { url: user.facebookUrl, icon: <FaFacebook /> },
  ].filter(Boolean); // Remove undefined/null items

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

  const updateUserProfile = async (e) => {
    e.preventDefault();
    let base64Image = profilePicData.profilePic;

    if (profilePicData.profilePic instanceof File) {
      base64Image = await convertToBase64(profilePicData.profilePic);
    }
    const success = await dispatch(updateProfilePic(user?._id, base64Image));
    if (success) {
      setIsProfileOpen(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const success = await dispatch(updatePassword(user?._id, passwordData));
    if (success) {
      setIsPasswordChangeOpen(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const success = await dispatch(updateProfile(user?._id, profileData));
    if (success) {
      setIsDialogOpen(false);
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
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle size={64} className='text-white/70' />
          )}

          <h2 className='text-xl font-semibold text-center'>
            {user?.name || 'Guest User'}
          </h2>
          <p className='text-sm text-white/60 text-center'>{user?.email}</p>
        </div>


        <nav className='flex flex-col gap-4 mt-4 px-6'>
          <button className='flex items-center gap-2 hover:text-blue-400 transition' onClick={() => navigate('/myblogs')}>
            <FaBlog /> My Blogs
          </button>
          <button className='flex items-center gap-2 hover:text-red-400 transition' onClick={() => dispatch(logout())}>
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
              <form onSubmit={handlePasswordChange} className="grid gap-4">
                <div className="grid gap-3">

                  <div className='w-full'>
                    <Label className={'mb-1'}>Password</Label>
                    <div className='w-full flex justify-center items-center gap-2'>
                      <Input
                        className={`border-2 border-indigo-600`}
                        type={`${showPassword ? 'text' : 'password'}`}
                        placeholder='......'
                        value={passwordData.password}
                        onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
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
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
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
                        value={passwordData.conformNewPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, conformNewPassword: e.target.value })}
                      />
                      {showConformNewPassword ?
                        <IoEyeOff size={25} onClick={() => setShowConformNewPassword(false)} className='text-indigo-600' />
                        : <IoEye size={25} onClick={() => setShowConformNewPassword(true)} className='text-indigo-600' />}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={() => setPasswordData({})} className='bg-indigo-600 hover:bg-red-600'>Cancel</Button>
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
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
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
                <form onSubmit={updateUserProfile} className="grid gap-4">
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
                      <Button onClick={() => setProfilePicData({ profilePic: user?.profilePic })} className='bg-indigo-600 hover:bg-red-600'>Cancel</Button>
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

            {/* Name */}
            <div>
              <label className='text-sm text-white/60'>Name</label>
              <p className='text-lg font-medium'>{user?.name || 'N/A'}</p>
            </div>

            {/* Email */}
            <div>
              <label className='text-sm text-white/60'>Email</label>
              <p className='text-lg font-medium'>{user?.email || 'N/A'}</p>
            </div>

            {/* Joined Date */}
            <div>
              <label className='text-sm text-white/60'>Joined</label>
              <p className='text-lg font-medium'>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                  : 'N/A'}
              </p>
            </div>

            {/* Bio */}
            <div>
              <label className='text-sm text-white/60'>Bio</label>
              <p className='text-lg font-medium whitespace-pre-wrap'>
                {user?.bio?.trim() || 'Add Bio.'}
              </p>
            </div>

            {/* Social Links */}

            {socialLinks.length > 0 ? (
              <div className="space-y-2">
                <label className="text-sm text-white/60">Social Links</label>
                <div className="flex items-center gap-4 text-lg mt-2">
                  {socialLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-white/60">Add Social links</p>
            )}

            {/* Update Button */}
            <div className='pt-6'>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                <DialogTrigger asChild>
                  <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition'>
                    Update Profile
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
                  <form onSubmit={handleProfileUpdate} className="grid gap-4">
                    <div className="grid gap-3">

                      <div className="w-full">
                        <Label className="mb-1">Bio</Label>
                        <Input
                          className="border-2 border-indigo-600"
                          placeholder="Tell us about yourself"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        />
                      </div>

                      <div className="w-full">
                        <Label className="mb-1">Instagram URL</Label>
                        <Input
                          className="border-2 border-indigo-600"
                          placeholder="https://instagram.com/yourusername"
                          value={profileData.instagramUrl}
                          onChange={(e) => setProfileData({ ...profileData, instagramUrl: e.target.value })}
                        />
                      </div>

                      <div className="w-full">
                        <Label className="mb-1">LinkedIn URL</Label>
                        <Input
                          className="border-2 border-indigo-600"
                          placeholder="https://linkedin.com/in/yourusername"
                          value={profileData.linkedinUrl}
                          onChange={(e) => setProfileData({ ...profileData, linkedinUrl: e.target.value })}
                        />
                      </div>

                      <div className="w-full">
                        <Label className="mb-1">GitHub URL</Label>
                        <Input
                          className="border-2 border-indigo-600"
                          placeholder="https://github.com/yourusername"
                          value={profileData.githubUrl}
                          onChange={(e) => setProfileData({ ...profileData, githubUrl: e.target.value })}
                        />
                      </div>

                      <div className="w-full">
                        <Label className="mb-1">Facebook URL</Label>
                        <Input
                          className="border-2 border-indigo-600"
                          placeholder="https://facebook.com/yourusername"
                          value={profileData.facebookUrl}
                          onChange={(e) => setProfileData({ ...profileData, facebookUrl: e.target.value })}
                        />
                      </div>

                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button className="bg-indigo-600 hover:bg-red-600">Cancel</Button>
                      </DialogClose>

                      <Button className="bg-indigo-600 hover:bg-green-600" type="submit">
                        {isProfileLoading ? 'Updating...' : 'Update Profile'}
                      </Button>
                    </DialogFooter>
                  </form>

                </DialogContent>
              </Dialog>

            </div>
          </div>

        </div>


      </main>
    </div>
  )
}

export default ProfilePage
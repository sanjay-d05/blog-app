import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AuthContext } from '@/context/Auth';
import { BlogContext } from '@/context/Blog';
import { AxiosInstance } from '@/lib/axios';
import React, { useContext } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { toast } from 'react-toastify';

function CreateBlogsPage() {

  const {
    tagInput, setTagInput,
    createBlogData, setCreateBlogData,
    isCreatingBlog, setIsCreatingBlog,
    categories
  } = useContext(BlogContext);

  const { authUser, navigate } = useContext(AuthContext);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCreateBlogData((prev) => ({
          ...prev,
          coverImage: reader.result,
          coverImageName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ New: handle tag input by comma
  const handleTagInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.includes(',')) {
      const tagsFromInput = inputValue
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0 && !createBlogData.tags.includes(tag));

      if (tagsFromInput.length > 0) {
        setCreateBlogData((prev) => ({
          ...prev,
          tags: [...prev.tags, ...tagsFromInput],
        }));
      }

      setTagInput('');
    } else {
      setTagInput(inputValue);
    }
  };

  const removeTag = (tagToRemove) => {
    setCreateBlogData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreatingBlog(true);

    try {
      let base64Image = createBlogData.coverImage;

      if (createBlogData.coverImage instanceof File) {
        base64Image = await convertToBase64(createBlogData.coverImage);
      }

      const blogPayload = {
        ...createBlogData,
        author: authUser._id,
        authorName: authUser.name,
        coverImage: base64Image,
      };

      await AxiosInstance.post('/blogs/create', blogPayload);
      toast.success('Blog Created Successfully!');
      setCreateBlogData({ title: '', description: '', category: '', content: '', coverImage: '', coverImageName: '', tags: [] });
    } catch (error) {
      console.error('Blog create error:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsCreatingBlog(false);
    }
  };

  const navigateBack = () => {
    const confirmed = window.confirm('Are you sure you want to go back? Unsaved changes may be lost.');
    if (confirmed) {
      navigate(-1);
      setCreateBlogData({});
    }
  };

  return (
    <div className='pt-16 min-h-screen flex justify-center w-full bg-[rgba(9,0,47,1)] text-white'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-start items-start gap-6 w-full mx-4 md:mx-20 lg:mx-32 py-10 max-w-4xl'
      >
        <span onClick={() => navigateBack()} className='flex justify-center items-center gap-2 hover:underline underline-offset-4'>
          <IoArrowBack size={20} /> Go Back
        </span>

        {/* Title */}
        <div className='w-full'>
          <label className='block mb-2 text-sm font-medium'>Blog Title</label>
          <input
            type='text'
            placeholder='Enter title...'
            className='w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={createBlogData.title}
            onChange={(e) => setCreateBlogData({ ...createBlogData, title: e.target.value })}
          />
        </div>

        {/* Category */}
        <div className="relative w-full">
          <Select
            className="w-full appearance-none px-4 py-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
            value={createBlogData.category}
            onValueChange={(value) => setCreateBlogData({ ...createBlogData, category: value })}
          >
            <SelectTrigger className={'w-full bg-white/10 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500'}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {categories.map((item, index) => (
                  <SelectItem key={index} value={item.value}>{item.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className='w-full'>
          <label className='block mb-2 text-sm font-medium'>Short Description</label>
          <textarea
            rows='3'
            placeholder='Enter a short description...'
            className='w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={createBlogData.description}
            onChange={(e) => setCreateBlogData({ ...createBlogData, description: e.target.value })}
          />
        </div>

        {/* Cover Image */}
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium">Cover Image</label>
          <div className="border-2 border-dashed border-white/30 rounded-md w-full h-40 flex items-center justify-center relative hover:border-blue-500 transition duration-300">
            <label htmlFor="cover-upload" className="cursor-pointer text-center text-white/80 hover:text-blue-400">
              {createBlogData.coverImage ? (
                <>
                  <p className="font-medium">Change image</p>
                  <p className="text-sm text-white/50">({createBlogData.coverImageName})</p>
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
              id="cover-upload"
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          {createBlogData.coverImage && (
            <p className="mt-2 text-sm text-white/70">Selected: {createBlogData.coverImageName}</p>
          )}
        </div>

        {/* Content */}
        <div className='w-full'>
          <label className='block mb-2 text-sm font-medium'>Content</label>
          <textarea
            rows='10'
            placeholder='Write your blog content here...'
            className='w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={createBlogData.content}
            onChange={(e) => setCreateBlogData({ ...createBlogData, content: e.target.value })}
          />
        </div>

        {/* Tags */}
        <div className='w-full'>
          <label className='block mb-2 text-sm font-medium'>Tags</label>
          <div className='flex flex-wrap gap-2 mb-2'>
            {createBlogData?.tags?.map((tag, idx) => (
              <span key={idx} className='flex items-center gap-1 bg-blue-600 px-2 py-1 rounded text-sm'>
                {tag}
                <button type='button' onClick={() => removeTag(tag)} className='text-white hover:text-red-300'>
                  &times;
                </button>
              </span>
            ))}
          </div>
          <input
            type='text'
            placeholder='Type tags separated by commas'
            value={tagInput}
            onChange={handleTagInputChange}
            className='w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <p className="text-sm text-white/50 mt-1">Separate tags with commas (e.g., react, blog, tech)</p>
        </div>

        <Button
          type='submit'
          className='px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition duration-300'
        >
          {isCreatingBlog ? 'Creating…' : 'Create Blog'}
        </Button>
      </form>
    </div>
  );
}

export default CreateBlogsPage;

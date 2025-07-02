import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { categories } from '@/constants/category';
import { updateBlog, viewBlogs } from '@/redux/blog/blogActions';
import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function EditBlog() {
  const { user } = useSelector((store) => store.auth);
  const { viewBlogdata, isUpdatingBlog } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const blogId = location?.pathname?.split('/')[2];

  const [tagInput, setTagInput] = useState('');
  const [isDialogOpen,setIsDialogOpen] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    content: '',
    coverImage: '',
    coverImageName: '',
    tags: []
  });

  // Load blog data
  useEffect(() => {
    dispatch(viewBlogs(blogId));
  }, [dispatch, blogId]);

  // Set form data when viewBlogdata is available
  useEffect(() => {
    if (viewBlogdata) {
      setData({
        title: viewBlogdata.title || '',
        description: viewBlogdata.description || '',
        category: viewBlogdata.category || '',
        content: viewBlogdata.content || '',
        coverImage: viewBlogdata.coverImage || '',
        coverImageName: '',
        tags: Array.isArray(viewBlogdata.tags)
          ? viewBlogdata.tags
          : typeof viewBlogdata.tags === 'string'
            ? viewBlogdata.tags.split(',').map((t) => t.trim())
            : []
      });
    }
  }, [viewBlogdata]);

  const navigateBack = () => {
      navigate(-1);
      setData({});
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prev) => ({
          ...prev,
          coverImage: reader.result,
          coverImageName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.includes(',')) {
      const tagsFromInput = inputValue
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0 && !data.tags.includes(tag));

      if (tagsFromInput.length > 0) {
        setData((prev) => ({
          ...prev,
          tags: [...prev.tags, ...tagsFromInput]
        }));
      }

      setTagInput('');
    } else {
      setTagInput(inputValue);
    }
  };

  const removeTag = (tagToRemove) => {
    setData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogPayload = {
      ...data,
      coverImage: data.coverImage
    };

    const success = await dispatch(updateBlog(user?._id, blogId, blogPayload));
    if (success) {
      navigate(-1);
    }
  };

  return (
    <div className='pt-16 min-h-screen flex justify-center w-full bg-[rgba(9,0,47,1)] text-white'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-start items-start gap-6 w-full mx-4 md:mx-20 lg:mx-32 py-10 max-w-4xl'
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
          <DialogTrigger asChild>
            <span className='flex justify-center items-center gap-2 hover:underline underline-offset-4'>
              <IoArrowBack size={20} /> Go Back
            </span>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] bg-[rgba(9,0,47,1)] text-white">
            <DialogHeader>
              <DialogTitle>Close page</DialogTitle>
              <DialogDescription>
                Are you sure you want to go back? Unsaved changes may be lost.
              </DialogDescription>

            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button className="bg-indigo-600 hover:bg-red-600">Cancel</Button>
              </DialogClose>

              <Button onClick={() => navigateBack()} className="bg-indigo-600 hover:bg-green-600" type="submit">
                Yes
              </Button>
            </DialogFooter>

          </DialogContent>
        </Dialog>

        <h4 className='text-center w-full px-4 font-bold text-2xl'>Edit Blog</h4>

        {/* Title */}
        <div className='w-full'>
          <label className='block mb-2 text-sm font-medium'>Blog Title</label>
          <input
            type='text'
            placeholder='Enter title...'
            className='w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>

        {/* Category */}
        <div className='w-full'>
          <Select
            value={data.category}
            onValueChange={(value) => setData({ ...data, category: value })}
          >
            <SelectTrigger className='w-full bg-white/10 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500'>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {categories.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.name}
                  </SelectItem>
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
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>

        {/* Cover Image */}
        <div className='w-full'>
          <label className='block mb-2 text-sm font-medium'>Cover Image</label>
          <div className='border-2 border-dashed border-white/30 rounded-md w-full min-h-40 flex items-center justify-center relative hover:border-blue-500 transition duration-300 overflow-hidden'>
            {data.coverImage && (
              <img
                src={data.coverImage}
                alt='Cover Preview'
                className='absolute inset-0 object-cover w-full h-full opacity-80'
              />
            )}
            <label
              htmlFor='cover-upload'
              className='cursor-pointer z-10 text-center text-white/80 hover:text-blue-400 bg-black/50 px-4 py-2 rounded-md'
            >
              {data.coverImage ? (
                <>
                  <p className='font-medium'>Change image</p>
                  <p className='text-sm text-white/50'>
                    ({data.coverImageName || 'Current Image'})
                  </p>
                </>
              ) : (
                <>
                  Click to upload image
                  <br />
                  <span className='text-sm text-white/50'>(JPG, PNG, etc.)</span>
                </>
              )}
            </label>
            <input
              id='cover-upload'
              type='file'
              accept='image/*'
              onChange={handleCoverChange}
              className='absolute inset-0 opacity-0 cursor-pointer'
            />
          </div>
        </div>

        {/* Content */}
        <div className='w-full'>
          <label className='block mb-2 text-sm font-medium'>Content</label>
          <textarea
            rows='10'
            placeholder='Write your blog content here...'
            className='w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
          />
        </div>

        {/* Tags */}
        <div className='w-full'>
          <label className='block mb-2 text-sm font-medium'>Tags</label>
          <div className='flex flex-wrap gap-2 mb-2'>
            {Array.isArray(data.tags) &&
              data.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className='flex items-center gap-1 bg-blue-600 px-2 py-1 rounded text-sm'
                >
                  {tag}
                  <button
                    type='button'
                    onClick={() => removeTag(tag)}
                    className='text-white hover:text-red-300'
                  >
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
          <p className='text-sm text-white/50 mt-1'>
            Separate tags with commas (e.g., react, blog, tech)
          </p>
        </div>

        {/* Submit */}
        <Button
          type='submit'
          className='px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition duration-300'
        >
          {isUpdatingBlog ? 'Updating...' : 'Update Blog'}
        </Button>
      </form>
    </div>
  );
}

export default EditBlog;

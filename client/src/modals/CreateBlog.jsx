import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/constants/category';
import { createBlog } from '@/redux/blog/blogActions';
import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {

  const { user } = useSelector(store => store.auth);
  const { isCreatingBlog } = useSelector(store => store.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createBlogData, setCreateBlogData] = useState({
    title: '',
    category: '',
    description: '',
    content: '',
    tags: [],
    coverImage: '',
    coverImageName: ''
  });
  const [tagInput, setTagInput] = useState('');

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
    let base64Image = createBlogData.coverImage;

    if (createBlogData.coverImage instanceof File) {
      base64Image = await convertToBase64(createBlogData.coverImage);
    }

    const blogPayload = {
      ...createBlogData,
      coverImage: base64Image,
      authorId: user?._id,
      authorName: user?.name
    };

    e.preventDefault();

    const success = await dispatch(createBlog(user?._id,blogPayload));
    if (success) {
      setCreateBlogData({title:'',description:'',category:'',content:'',tags:[],coverImage:''});
    }
  };

   const navigateBack = () => {
      navigate(-1);
      setCreateBlogData({});
  };


  return (
    <div className='min-h-screen flex justify-center items-center bg-[rgba(9,0,47,255)] text-white pt-14'>
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
  )
}

export default CreateBlog
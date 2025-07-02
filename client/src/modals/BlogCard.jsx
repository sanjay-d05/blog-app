import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { categories } from '@/constants/category';
import { deleteBlog } from '@/redux/blog/blogActions';
import React, { useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function BlogCard({ blog, isUserOptions }) {

  const {user} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  const matchedCategory = categories.find(item => item.value === blog.category);
  const currentCategoryName = matchedCategory?.name;

  const handleDelete = async() => {
    const success = await dispatch(deleteBlog(user?._id,blog._id));
    if(success){
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="relative bg-white/5 backdrop-blur-lg rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-2 hover:shadow-lg duration-300 w-full max-w-xs">

      {/* Cover Image */}
      <div className="h-36 w-full overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-3 text-white flex flex-col gap-2">
        <p className="text-xs font-medium text-purple-400">{currentCategoryName}</p>
        <h3 className="text-lg font-semibold line-clamp-2">{blog.title}</h3>

        <div className="flex justify-between items-end pt-1">
          <div className="text-[11px] text-gray-300 flex flex-col leading-snug">
            <span>By {blog.authorName}</span>
            <span>{formattedDate}</span>
          </div>

          <div className='flex justify-center items-center gap-2'>
            {/* View Button */}
            <button
              onClick={() => navigate(`/view-blog/${blog._id}`)}
              className="p-2 bg-purple-600 hover:bg-green-600 text-white rounded-md transition duration-200"
              title="View"
            >
              <FaEye size={14} />
            </button>

            {/* Conditionally show Edit/Delete if user */}
            {isUserOptions && (
              <>
                <button
                onClick={() => navigate(`/edit-blog/${blog._id}`)}
                  className="p-2 bg-purple-600 hover:bg-blue-600 text-white rounded-md transition duration-200"
                  title="Edit"
                >
                  <MdEdit size={14} />
                </button>
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} >
                  <DialogTrigger asChild>
                    <span className='flex justify-center items-center gap-2 hover:underline underline-offset-4'>
                      <button
                        className="p-2 bg-purple-600 hover:bg-red-600 text-white rounded-md transition duration-200"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </span>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px] bg-[rgba(9,0,47,1)] text-white">
                    <DialogHeader>
                      <DialogTitle>Delete Blog</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this blog? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button className="bg-indigo-600 hover:bg-red-600">Cancel</Button>
                      </DialogClose>

                      <Button onClick={()=> handleDelete()} className="bg-indigo-600 hover:bg-green-600" type="submit">
                        Delete
                      </Button>
                    </DialogFooter>

                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default BlogCard;

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AuthContext } from '@/context/Auth';
import { BlogContext } from '@/context/Blog';
import { AxiosInstance } from '@/lib/axios';
import { DialogDescription } from '@radix-ui/react-dialog';
import React, { useContext, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function BlogCard({ blog, isMyBlog }) {

  const { authUser, } = useContext(AuthContext);

  const { categories } = useContext(BlogContext);

  const [isDialgoOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const matchedCategory = categories.find(item => item.value === blog.category);
  const categoryName = matchedCategory ? matchedCategory.name : blog.category;

  const deleteBlog = async () => {
    setIsDeleting(true);
    try {
      await AxiosInstance.delete(`/blogs/${blog._id}`);
      toast.success('Blog deleted successfully');
      setIsDialogOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <Card className="relative group bg-transparent text-white border rounded-lg border-indigo-600 w-[90%] max-w-[23rem] h-[15rem] overflow-hidden shadow-md cursor-pointer p-0">

      {/* Image */}
      <img
        src={blog.coverImage}
        alt="Blog Cover"
        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
      />

      {/* Always-visible info section (bottom overlay) */}
      <div className="absolute bottom-0 left-0 w-full bg-black/70 px-4 py-3 z-10 text-left space-y-1 card-data">
        <h3 className="text-lg font-semibold line-clamp-1">{blog.title}</h3>
        <p className="text-sm text-gray-300">
          Uploaded by <span className="font-medium text-white">{blog.authorName}</span> on {formattedDate}
        </p>


        {/* Extra info only on small screens */}
        <div className="block md:hidden">
          <p className="text-sm text-indigo-300">Category: {categoryName}</p>
        </div>


        <div className='flex justify-end items-center gap-3'>

          <Link to={`/blogs/${blog._id}`}>
            <Button className='bg-indigo-600 hover:bg-indigo-800'>View</Button>
          </Link>

          {isMyBlog && blog?.author === authUser?._id ?
            (

              <Link to={`/edit-blog/${blog?._id}`}>
                <Button className='bg-indigo-600 hover:bg-green-600' >
                  <MdEdit />
                </Button>
              </Link>

            ) : null}

          {isMyBlog && blog?.author === authUser?._id ?
            (


              <Dialog open={isDialgoOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger>

                  <Button className='bg-indigo-600 hover:bg-red-600' >
                    <MdDelete />
                  </Button>

                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>

                  <div className='flex justify-end gap-2'>
                    <DialogClose asChild>
                      <Button className='bg-indigo-600 hover:bg-indigo-800'>Close</Button>
                    </DialogClose>
                    {isDeleting ?
                      <Button className='bg-red-700'>......</Button>
                      :
                      <Button className='bg-red-700 hover:bg-red-600' onClick={() => deleteBlog()}>Delete</Button>}
                  </div>
                </DialogContent>
              </Dialog>
            ) : null}

        </div>
      </div>

      {/* Hover overlay for extra info (only visible on md and up) */}
      <div className="hidden md:flex absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-3 flex-col justify-start items-start text-left">
        <p className="text-sm text-indigo-300 mt-1 mb-2">Category: {categoryName}</p>
        <p className="text-sm text-gray-200 line-clamp-3">{blog.description}</p>
      </div>
    </Card>
  );
}

export default BlogCard;

import { AuthContext } from '@/context/Auth';
import { AxiosInstance } from '@/lib/axios';
import React, { useContext, useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { toast } from 'react-toastify';

function ViewBlogs() {

  const {authUser,navigate,location} = useContext(AuthContext);
  const currentBlogId = location?.pathname?.split('/')[2];

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchCurrentBlog = async () => {
      try {
        const res = await AxiosInstance.get(`/blogs/${currentBlogId}`);
        setBlog(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await AxiosInstance.get(`/comments/${currentBlogId}`);
        setComments(res.data.data || []);
      } catch (error) {
        toast.error('Failed to load comments');
      }
    };

    if (currentBlogId) {
      fetchCurrentBlog();
      fetchComments();
    }
  }, [currentBlogId]);

  const handleCommentSubmit = async () => {

    try {
      const res = await AxiosInstance.post('/comments', {
        blogId: currentBlogId,
        commenterName : authUser.name,
        commentText: newComment ,
      });

      setComments(prev => [res.data.data, ...prev]);
      setNewComment('');
      toast.success('Comment added');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post comment');
    }
  };

  if (loading) {
    return <div className="pt-20 text-white text-center">Loading blog...</div>;
  }

  if (!blog) {
    return <div className="pt-20 text-white text-center">Blog not found.</div>;
  }

  return (
    <div className="pt-20 pb-10 px-5 md:px-10 text-white bg-[rgba(9,0,47,255)]  overflow-x-hidden">

      <div className="max-w-3xl mx-auto flex flex-col gap-6 border-2 rounded-lg border-indigo-600 p-3">

        <IoArrowBack size={25} onClick={() => navigate(-1)}/>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-indigo-100">
          {blog.title}
        </h1>

        {/* Author & Date */}
        <div className="text-sm text-gray-400">
          By <span className="text-indigo-400">{blog.authorName || 'Anonymous'}</span> •{' '}
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>

        {/* Image */}
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt="Blog Cover"
            className="w-full max-h-[250px] object-cover rounded-xl shadow-lg"
          />
        )}

        {/* Content */}
        <div className="text-lg leading-relaxed text-gray-200 whitespace-pre-line">
          {blog.content || 'No content available.'}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-indigo-800">
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="text-sm px-3 py-1 bg-indigo-700 rounded-full text-white hover:bg-indigo-600 transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Comment Section */}
        <div className="pt-6 border-t border-indigo-800 mt-4">
          <h2 className="text-xl font-semibold text-indigo-200 mb-2">Comments</h2>

          {/* Comment input */}
          <div className="flex flex-col gap-2 mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              rows={3}
              className="bg-[#1e1b4b] text-white p-3 rounded-lg resize-none border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleCommentSubmit}
              className="self-end bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500 transition"
            >
              Post Comment
            </button>
          </div>

          {/* Comment list */}
          {comments.length > 0 ? (
            <div className="space-y-3">
              {comments.map((cmt, index) => (
                <div key={index} className="bg-[#141135] p-3 rounded-lg shadow">
                  <div className="text-sm text-indigo-300">
                    {cmt.commenterName || 'User'} •{' '}
                    {new Date(cmt.createdAt).toLocaleDateString()}
                  </div>
                  <p className="text-gray-100 mt-1">{cmt.commentText}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewBlogs;

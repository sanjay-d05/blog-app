import { categories } from '@/constants/category';
import { viewBlogs } from '@/redux/blog/blogActions';
import { getComments, postComment } from '@/redux/comment/commentActions';
import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function ViewBlog() {
  const { user } = useSelector(store => store.auth);
  const { viewBlogdata } = useSelector(store => store.blog);
  const { comments } = useSelector(store => store.comment);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const blogId = location.pathname.split('/')[2];

  const [commentData, setCommentData] = useState({
    blogId: '',
    commenterName: '',
    commentText: ''
  });

  const matchedCategory = categories.find(item => item.value === viewBlogdata?.category);
  const currentCategoryName = matchedCategory?.name;

  useEffect(() => {
    dispatch(viewBlogs(blogId));
    dispatch(getComments(blogId));
  }, [dispatch, blogId]);

  // Set blogId and commenterName once data is available
  useEffect(() => {
    if (viewBlogdata?._id && user?.name) {
      setCommentData(prev => ({
        ...prev,
        blogId: viewBlogdata._id,
        commenterName: user.name
      }));
    }
  }, [viewBlogdata?._id, user?.name]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(postComment(blogId, commentData));
    if (success) {
      setCommentData(prev => ({ ...prev, commentText: '' }));
      dispatch(getComments(blogId)); // Refresh comments after successful post
    }
  };

  return (
    <div className="pt-20 pb-10 px-5 md:px-10 text-white bg-[rgba(9,0,47,255)] overflow-x-hidden">
      <div className="max-w-3xl mx-auto flex flex-col gap-6 border-2 rounded-lg border-indigo-600 p-3">

        <IoArrowBack size={25} onClick={() => navigate(-1)} className="cursor-pointer" />

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-indigo-100">
          {viewBlogdata.title}
        </h1>

        <h5>
          <span className="text-green-400">{currentCategoryName || 'Uncategorized'}</span>
        </h5>

        {/* Author & Date */}
        <div className="text-sm text-gray-400">
          By <span className="text-indigo-400">{viewBlogdata.authorName || 'Anonymous'}</span> •{' '}
          {new Date(viewBlogdata.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          })}
        </div>

        {/* Image */}
        {viewBlogdata.coverImage && (
          <img
            src={viewBlogdata.coverImage}
            alt="Blog Cover"
            className="w-full max-h-[250px] object-cover rounded-xl shadow-lg"
          />
        )}

        {/* Content */}
        <div className="text-lg leading-relaxed text-gray-200 whitespace-pre-line">
          {viewBlogdata.content || 'No content available.'}
        </div>

        {/* Tags */}
        {viewBlogdata.tags && viewBlogdata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-indigo-800">
            {viewBlogdata.tags.map((tag, i) => (
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

          <div className="flex flex-col gap-2 mb-4">
            <textarea
              value={commentData.commentText}
              onChange={(e) =>
                setCommentData(prev => ({ ...prev, commentText: e.target.value }))
              }
              placeholder="Write your comment here..."
              rows={3}
              className="bg-[#1e1b4b] text-white p-3 rounded-lg resize-none border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleCommentSubmit}
              className="self-end bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500 transition"
              disabled={!commentData.commentText.trim()}
            >
              Post Comment
            </button>
          </div>

          {comments.length > 0 ? (
            <div className="space-y-3 h-[20rem] overflow-auto custom-scrollbar">
              {comments.map((cmt, index) => (
                <div key={index} className="bg-[#141135] p-3 rounded-lg shadow">
                  <div className="text-sm text-indigo-300">
                    {cmt.commenterName || 'User'} •{' '}
                    {new Date(cmt.createdAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
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

export default ViewBlog;

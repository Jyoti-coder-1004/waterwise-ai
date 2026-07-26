import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Send, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

export const CommunityPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentText, setCommentText] = useState('');

  const fallbackPosts = [
    {
      _id: '1',
      user: { name: 'Sarah Jenkins', avatar: null },
      content: 'Just installed a low-flow showerhead! The water pressure is actually amazing and saved 15 liters today.',
      likes: [{ user: '101' }, { user: '102' }],
      comments: [{ _id: 'c1', user: { name: 'Alex' }, text: 'That is awesome! Which brand did you get?' }],
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      user: { name: 'David Chen', avatar: null },
      content: 'Smart irrigation system automatically skipped watering due to rain forecast! #WaterWise #EcoTech',
      likes: [{ user: '103' }],
      comments: [],
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
    }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await API.get('/community');
        if (res.data?.data && res.data.data.length > 0) {
          setPosts(res.data.data);
        } else {
          setPosts(fallbackPosts);
        }
      } catch (_err) {
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    try {
      const res = await API.post('/community', { content: newPostContent });
      if (res.data?.data) {
        setPosts(prev => [res.data.data, ...prev]);
      }
    } catch (_err) {
      const newPost = {
        _id: Date.now().toString(),
        user: { name: user?.name || 'You', avatar: user?.avatar },
        content: newPostContent,
        likes: [],
        comments: [],
        createdAt: new Date().toISOString()
      };
      setPosts(prev => [newPost, ...prev]);
    } finally {
      setNewPostContent('');
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await API.put(`/community/${postId}/like`);
      if (res.data?.likes) {
        setPosts(prev => prev.map(p => p._id === postId ? { ...p, likes: res.data.likes } : p));
      }
    } catch (_err) {
      setPosts(prev => prev.map(p => {
        if (p._id === postId) {
          const hasLiked = p.likes.some(l => l.user === (user?._id || 'me'));
          const updatedLikes = hasLiked
            ? p.likes.filter(l => l.user !== (user?._id || 'me'))
            : [...p.likes, { user: user?._id || 'me' }];
          return { ...p, likes: updatedLikes };
        }
        return p;
      }));
    }
  };

  const handleAddComment = async (postId) => {
    if (!commentText.trim()) return;

    try {
      const res = await API.post(`/community/${postId}/comment`, { text: commentText });
      if (res.data?.comments) {
        setPosts(prev => prev.map(p => p._id === postId ? { ...p, comments: res.data.comments } : p));
      }
    } catch (_err) {
      setPosts(prev => prev.map(p => {
        if (p._id === postId) {
          return {
            ...p,
            comments: [...p.comments, { _id: Date.now().toString(), user: { name: user?.name || 'You' }, text: commentText }]
          };
        }
        return p;
      }));
    } finally {
      setCommentText('');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="text-2xl font-bold text-textMain tracking-tight">Eco Community</h2>
          <p className="text-textMuted mt-1">Connect with neighbors, share water-saving tips, and celebrate conservation milestones.</p>
        </motion.div>

        {/* Create Post Card */}
        <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/30 mb-8">
          <form onSubmit={handleCreatePost}>
            <div className="flex gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-forest text-surface flex items-center justify-center font-bold text-sm shrink-0">
                {getInitials(user?.name)}
              </div>
              <textarea
                placeholder="Share a water conservation tip or milestone..."
                rows={3}
                className="w-full bg-cream border border-sage/40 rounded-xl p-3 text-sm text-textMain focus:outline-none focus:border-forest transition-colors resize-none"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-sage/20">
              <span className="text-xs text-textMuted flex items-center gap-1.5">
                <Sparkles size={14} className="text-forest" /> Post to local neighborhood feed
              </span>
              <Button type="submit" size="sm" className="gap-2" disabled={!newPostContent.trim()}>
                <Send size={14} /> Post
              </Button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12 text-textMuted">Loading community feed...</div>
          ) : posts.map((post, idx) => {
            const isLikedByMe = post.likes.some(l => l.user === user?._id || l.user === 'me');

            return (
              <motion.div 
                key={post._id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-forest text-surface flex items-center justify-center text-sm font-bold shrink-0">
                    {getInitials(post.user?.name)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-textMain">{post.user?.name || 'Community Member'}</h4>
                    <span className="text-xs text-textMuted">
                      {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-textMain leading-relaxed mb-4">{post.content}</p>

                <div className="flex items-center gap-6 pt-3 border-t border-sage/20 text-textMuted">
                  <button 
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${isLikedByMe ? 'text-red-500' : 'hover:text-forest'}`}
                  >
                    <Heart size={16} className={isLikedByMe ? 'fill-red-500' : ''} />
                    <span>{post.likes?.length || 0} Likes</span>
                  </button>
                  <button 
                    onClick={() => setActiveCommentPostId(activeCommentPostId === post._id ? null : post._id)}
                    className="flex items-center gap-2 text-sm font-medium hover:text-forest transition-colors"
                  >
                    <MessageSquare size={16} />
                    <span>{post.comments?.length || 0} Comments</span>
                  </button>
                </div>

                {/* Comments Section */}
                {activeCommentPostId === post._id && (
                  <div className="mt-4 pt-4 border-t border-sage/20 space-y-3">
                    {post.comments?.map(c => (
                      <div key={c._id} className="bg-cream/60 p-3 rounded-xl text-xs">
                        <span className="font-semibold text-textMain block mb-1">{c.user?.name || 'User'}</span>
                        <span className="text-textMuted">{c.text}</span>
                      </div>
                    ))}

                    <div className="flex gap-2 pt-2">
                      <input 
                        type="text"
                        placeholder="Write a comment..."
                        className="flex-1 h-9 px-3 bg-cream border border-sage/40 rounded-xl text-xs text-textMain focus:outline-none focus:border-forest"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post._id)}
                      />
                      <Button size="sm" className="h-9 px-3 text-xs" onClick={() => handleAddComment(post._id)}>
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

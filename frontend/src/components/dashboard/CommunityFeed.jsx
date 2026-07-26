import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const posts = [
  { user: "Sarah Jenkins", avatar: "SJ", time: "2h ago", text: "Just installed a low-flow showerhead. The pressure is actually amazing!", likes: 12, comments: 3 },
  { user: "David Chen", avatar: "DC", time: "5h ago", text: "My smart sprinkler skipped watering today because of the rain. #WaterWise", likes: 24, comments: 5 },
  { user: "Emily R.", avatar: "ER", time: "1d ago", text: "Beat my monthly conservation goal by 15%! Taking the family out for ice cream.", likes: 45, comments: 8 }
];

export const CommunityFeed = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-textMain">Community Feed</h3>
        <button onClick={() => navigate('/community')} className="text-sm font-medium text-forest hover:underline">
          See More
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="pb-4 border-b border-sage/20 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-forest text-surface flex items-center justify-center text-xs font-bold shrink-0">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-textMain">{post.user}</div>
                <div className="text-xs text-textMuted">{post.time}</div>
              </div>
            </div>
            <p className="text-sm text-textMain leading-relaxed mb-3">{post.text}</p>
            <div className="flex items-center gap-4 text-textMuted">
              <button onClick={() => navigate('/community')} className="flex items-center gap-1.5 text-xs hover:text-forest transition-colors">
                <Heart size={14} /> {post.likes}
              </button>
              <button onClick={() => navigate('/community')} className="flex items-center gap-1.5 text-xs hover:text-forest transition-colors">
                <MessageSquare size={14} /> {post.comments}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

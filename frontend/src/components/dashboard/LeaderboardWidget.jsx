import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LeaderboardWidget = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const currentUserName = user?.name || 'You';
  const currentUserPoints = user?.ecoPoints || 2120;

  const leaderboardData = [
    { name: 'Smith Family', points: 2450, rank: 1, isMe: false },
    { name: currentUserName, points: currentUserPoints, rank: 2, isMe: true },
    { name: 'Green House', points: 1980, rank: 3, isMe: false },
    { name: 'A. Davis', points: 1850, rank: 4, isMe: false },
  ];

  return (
    <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy size={20} className="text-forest" />
          <h3 className="text-lg font-semibold text-textMain">Local Leaderboard</h3>
        </div>
        <button onClick={() => navigate('/challenges')} className="text-sm font-medium text-forest hover:underline">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {leaderboardData.map((item, idx) => (
          <div 
            key={idx}
            className={`flex items-center justify-between p-3 rounded-xl ${item.isMe ? 'bg-forest/5 border border-forest/20' : 'hover:bg-cream'}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center font-bold text-forest text-xs">
                #{item.rank}
              </div>
              <div>
                <div className="text-sm font-medium text-textMain">{item.name} {item.isMe && '(You)'}</div>
                <div className="text-xs text-textMuted">{item.points} pts</div>
              </div>
            </div>
            {item.rank === 1 && <span className="text-xl">👑</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

const challenges = [
  { title: "7-Day Water Saver", progress: 60, reward: 500, icon: <Flame size={20} /> },
  { title: "No-Waste Weekend", progress: 0, reward: 200, icon: <Medal size={20} /> },
  { title: "Bucket Bath Challenge", progress: 100, reward: 1000, icon: <Medal size={20} /> }
];

export const EcoChallenges = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-textMain">Eco Challenges</h3>
        <button onClick={() => navigate('/challenges')} className="text-sm font-medium text-forest hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {challenges.map((c, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ x: 4 }}
            className="p-4 rounded-xl bg-cream border border-sage/30 flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center text-forest">
                  {c.icon}
                </div>
                <h4 className="font-medium text-sm text-textMain">{c.title}</h4>
              </div>
              <div className="text-xs font-bold text-forest bg-forest/10 px-2 py-1 rounded-full">
                +{c.reward} pts
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-sage/40 rounded-full overflow-hidden">
                <div className="h-full bg-forest rounded-full" style={{ width: `${c.progress}%` }} />
              </div>
              <span className="text-xs font-medium text-textMuted w-8">{c.progress}%</span>
            </div>

            {c.progress < 100 ? (
              <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={() => navigate('/challenges')}>
                Join Challenge
              </Button>
            ) : (
              <Button size="sm" variant="secondary" className="w-full h-8 text-xs" disabled>
                Completed
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

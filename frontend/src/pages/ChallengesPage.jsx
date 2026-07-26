import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { Award, Flame, Medal, CheckCircle2, ShieldAlert, Sparkles, Trophy } from 'lucide-react';
import { Button } from '../components/ui/Button';

const initialChallenges = [
  { id: '1', title: '7-Day Water Saver', category: 'Weekly', progress: 60, target: 'Keep daily usage under 150L for 7 consecutive days', reward: 500, status: 'in-progress', icon: <Flame size={24} /> },
  { id: '2', title: 'No-Waste Weekend', category: 'Weekend', progress: 0, target: 'Skip sprinkler cycles and reuse greywater on Sat & Sun', reward: 300, status: 'available', icon: <Medal size={24} /> },
  { id: '3', title: 'Bucket Bath Master', category: 'Daily Habit', progress: 100, target: 'Take bucket baths instead of long showers for 3 days', reward: 1000, status: 'completed', icon: <Trophy size={24} /> },
  { id: '4', title: 'Leak Detective', category: 'Inspection', progress: 0, target: 'Inspect all home faucets & toilets for silent leaks', reward: 250, status: 'available', icon: <ShieldAlert size={24} /> },
];

export const ChallengesPage = () => {
  const [challenges, setChallenges] = useState(initialChallenges);

  const handleJoin = (id) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, status: 'in-progress', progress: 10 } : c));
  };

  const handleClaim = (id) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, status: 'claimed' } : c));
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-textMain tracking-tight flex items-center gap-2">
              <Award className="text-forest" size={28} /> Eco Challenges & Quests
            </h2>
            <p className="text-textMuted mt-1">Complete challenges, earn eco-points, and level up your conservation badge!</p>
          </div>
          <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-2xl border border-sage/30 shadow-soft">
            <Sparkles className="text-amber-500" size={20} />
            <div>
              <span className="text-xs text-textMuted font-medium block">Total Eco-Points</span>
              <span className="text-lg font-bold text-textMain">2,450 pts</span>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {challenges.map((c, idx) => (
            <motion.div 
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-forest uppercase tracking-wider bg-forest/10 px-2 py-0.5 rounded-full">{c.category}</span>
                      <h3 className="font-bold text-textMain text-base mt-1">{c.title}</h3>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-forest bg-sage/40 px-2.5 py-1 rounded-full shrink-0">
                    +{c.reward} pts
                  </div>
                </div>

                <p className="text-sm text-textMuted leading-relaxed mb-6">{c.target}</p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-medium text-textMuted mb-2">
                  <span>Progress</span>
                  <span className="text-textMain font-bold">{c.progress}%</span>
                </div>

                <div className="w-full h-3 bg-cream rounded-full overflow-hidden border border-sage/30 mb-6">
                  <div className="h-full bg-forest rounded-full transition-all duration-500" style={{ width: `${c.progress}%` }} />
                </div>

                {c.status === 'available' && (
                  <Button className="w-full" onClick={() => handleJoin(c.id)}>Join Challenge</Button>
                )}
                {c.status === 'in-progress' && (
                  <Button variant="outline" className="w-full text-forest border-forest/30" disabled>In Progress ({c.progress}%)</Button>
                )}
                {c.status === 'completed' && (
                  <Button className="w-full bg-amber-500 text-surface hover:bg-amber-600" onClick={() => handleClaim(c.id)}>Claim {c.reward} Points 🎉</Button>
                )}
                {c.status === 'claimed' && (
                  <Button variant="secondary" className="w-full flex items-center justify-center gap-2" disabled>
                    <CheckCircle2 size={18} className="text-forest" /> Reward Claimed
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

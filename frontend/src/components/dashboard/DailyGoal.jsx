import React from 'react';
import { motion } from 'framer-motion';

export const DailyGoal = () => {
  const target = 150;
  const current = 85;
  const percentage = Math.round((current / target) * 100);
  const remaining = target - current;

  return (
    <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-textMain">Daily Goal</h3>
        <span className="text-sm font-medium text-forest">{percentage}%</span>
      </div>
      
      <div className="relative w-full h-4 bg-cream rounded-full overflow-hidden mb-4 border border-sage/30">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-forest rounded-full"
        />
      </div>

      <div className="flex justify-between text-sm">
        <div className="text-textMuted">Target: <span className="text-textMain font-medium">{target}L</span></div>
        <div className="text-textMuted">Remaining: <span className="text-textMain font-medium">{remaining}L</span></div>
      </div>
    </div>
  );
};

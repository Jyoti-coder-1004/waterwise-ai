import React from 'react';
import { motion } from 'framer-motion';

const activities = [
  { title: "Goal Completed", desc: "Stayed under 150 gal today", time: "2 hours ago", color: "bg-forest" },
  { title: "Challenge Joined", desc: "7-Day Water Saver", time: "Yesterday", color: "bg-sky" },
  { title: "Badge Earned", desc: "Leak Detective", time: "3 days ago", color: "bg-orange-400" },
  { title: "Water Saved", desc: "Skipped sprinkler cycle (200 gal)", time: "1 week ago", color: "bg-sage" }
];

export const RecentActivity = () => {
  return (
    <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20">
      <h3 className="text-lg font-semibold text-textMain mb-6">Recent Activity</h3>
      <div className="relative border-l-2 border-sage/40 ml-3 space-y-6">
        {activities.map((act, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-6"
          >
            <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-surface ${act.color}`} />
            <h4 className="text-sm font-semibold text-textMain">{act.title}</h4>
            <p className="text-xs text-textMuted mt-0.5 mb-1">{act.desc}</p>
            <span className="text-[10px] text-textMuted font-medium">{act.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

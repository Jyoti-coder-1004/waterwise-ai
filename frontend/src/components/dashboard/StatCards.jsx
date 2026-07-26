import React from 'react';
import { motion } from 'framer-motion';
import {
  Droplets,
  TrendingDown,
  DollarSign,
  Medal,
  Flame,
  CloudRain,
  Trophy,
  Target,
  BarChart2,
} from "lucide-react";

export const StatCards = ({ summary }) => {
  const stats = [
    { label: "Today's Usage", value: summary?.todaysUsage ? `${summary.todaysUsage} L` : "142 L", trend: "↓ 12%", icon: <Droplets size={20} />, color: "bg-sky/10 text-sky" },
    { label: "Weekly Usage", value: "980 L", trend: "↓ 5%", icon: <BarChart2 size={20} />, color: "bg-forest/10 text-forest" },
    { label: "Monthly Usage", value: summary?.monthlyUsage ? `${summary.monthlyUsage} L` : "4,200 L", trend: "↑ 2%", icon: <CloudRain size={20} />, color: "bg-sage text-forest" },
    { label: "Total Saved", value: summary?.waterSaved ? `${summary.waterSaved} L` : "8,500 L", trend: "Awesome!", icon: <DollarSign size={20} />, color: "bg-green-100 text-green-600" },
    { label: "Eco Points", value: summary?.ecoPoints !== undefined ? `${summary.ecoPoints}` : "2,450", trend: "+50 today", icon: <Medal size={20} />, color: "bg-yellow-100 text-yellow-600" },
    { label: "Current Streak", value: "12 Days", trend: "Keep it up!", icon: <Flame size={20} />, color: "bg-orange-100 text-orange-500" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-surface p-4 rounded-2xl shadow-soft border border-sage/20 hover:shadow-float hover:-translate-y-1 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>
              {stat.icon}
            </div>
            <span className="text-textMuted text-xs font-medium truncate">{stat.label}</span>
          </div>
          <div className="text-xl font-bold text-textMain mb-1 truncate">{stat.value}</div>
          <div className="text-forest text-xs font-medium truncate">{stat.trend}</div>
        </motion.div>
      ))}
    </div>
  );
};

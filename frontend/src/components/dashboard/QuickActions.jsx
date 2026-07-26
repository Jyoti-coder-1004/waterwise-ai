import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ScanLine, Bot, Swords } from 'lucide-react';
import { motion } from 'framer-motion';

const actions = [
  { icon: <PlusCircle size={20} />, label: "Log Usage", color: "bg-sky/10 text-sky", path: "/tracking/add" },
  { icon: <ScanLine size={20} />, label: "Scan Bill", color: "bg-forest/10 text-forest", path: "/tracking/add" },
  { icon: <Bot size={20} />, label: "Ask AI", color: "bg-sage text-forest", path: "/ai" },
  { icon: <Swords size={20} />, label: "Join Challenge", color: "bg-orange-100 text-orange-600", path: "/challenges" }
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20">
      <h3 className="text-lg font-semibold text-textMain mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-cream border border-sage/30 hover:border-forest/30 transition-colors gap-2"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${action.color}`}>
              {action.icon}
            </div>
            <span className="text-xs font-medium text-textMain">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

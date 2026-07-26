import React from 'react';
import { Lightbulb, Wrench, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const AITips = () => {
  return (
    <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb size={20} className="text-forest" />
        <h3 className="text-lg font-semibold text-textMain">AI Insights</h3>
      </div>
      
      <div className="space-y-4">
        <motion.div 
          whileHover={{ x: 4 }}
          className="flex gap-4 p-4 rounded-xl bg-cream border border-sage/30 transition-transform"
        >
          <div className="w-10 h-10 rounded-lg bg-red-100 text-red-500 flex items-center justify-center shrink-0">
            <Wrench size={20} />
          </div>
          <div>
            <h4 className="font-medium text-textMain text-sm">Potential Toilet Leak</h4>
            <p className="text-textMuted text-xs mt-1 mb-2">Guest bathroom shows continuous flow for 3 hours.</p>
            <Button size="sm" variant="outline" className="h-7 text-xs">View Details</Button>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ x: 4 }}
          className="flex gap-4 p-4 rounded-xl bg-cream border border-sage/30 transition-transform"
        >
          <div className="w-10 h-10 rounded-lg bg-sage text-forest flex items-center justify-center shrink-0">
            <Sprout size={20} />
          </div>
          <div>
            <h4 className="font-medium text-textMain text-sm">Irrigation Optimization</h4>
            <p className="text-textMuted text-xs mt-1">Rain expected tomorrow. Skip sprinkler schedule?</p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" className="h-7 text-xs">Skip Schedule</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

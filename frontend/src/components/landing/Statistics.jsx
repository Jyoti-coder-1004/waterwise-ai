import React from 'react';
import { motion } from 'framer-motion';

export const Statistics = () => {
  return (
    <section className="py-24 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sage via-forest to-forest"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-sage/20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="pt-8 md:pt-0"
          >
            <div className="text-5xl md:text-6xl font-bold text-surface mb-2">15%</div>
            <div className="text-sage text-lg font-medium">Average Usage Reduction</div>
            <p className="text-sage/70 mt-2 text-sm">Within the first 3 months</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pt-8 md:pt-0"
          >
            <div className="text-5xl md:text-6xl font-bold text-surface mb-2">$420</div>
            <div className="text-sage text-lg font-medium">Annual Savings</div>
            <p className="text-sage/70 mt-2 text-sm">For the average household</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-8 md:pt-0"
          >
            <div className="text-5xl md:text-6xl font-bold text-surface mb-2">2.4M</div>
            <div className="text-sage text-lg font-medium">Gallons Saved</div>
            <p className="text-sage/70 mt-2 text-sm">By our community this year</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

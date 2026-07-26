import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BarChart3, Medal, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <BarChart3 size={24} />,
    title: "Real-time Analytics",
    description: "View your water usage down to the minute. Understand exactly where your water is going, from the sprinkler to the shower."
  },
  {
    icon: <ShieldAlert size={24} />,
    title: "AI Leak Detection",
    description: "Our machine learning models detect continuous abnormal flows and alert you instantly before water damage occurs."
  },
  {
    icon: <Medal size={24} />,
    title: "Community Gamification",
    description: "Compete on localized leaderboards. Earn badges and see how your conservation efforts stack up against your neighbors."
  },
  {
    icon: <Smartphone size={24} />,
    title: "Hardware Agnostic",
    description: "Works securely via API with all major smart meter providers. No expensive proprietary hardware installation required."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-textMain mb-4 tracking-tight">Everything you need to conserve.</h2>
          <p className="text-textMuted text-lg">Powerful software designed to change habits without sacrificing comfort.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-cream rounded-2xl p-8 border border-sage/40 hover:shadow-float transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center text-forest mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-textMain mb-3">{feature.title}</h3>
              <p className="text-textMuted leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

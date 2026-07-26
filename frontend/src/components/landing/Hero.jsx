import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Droplets, Target } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-sage/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-sky/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface shadow-sm border border-sage mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-forest animate-pulse"></span>
          <span className="text-sm font-medium text-forest">WaterWise AI 2.0 is live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-textMain mb-6 max-w-4xl mx-auto leading-tight"
        >
          The fitness tracker for your <span className="text-forest">water consumption.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-textMuted mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Track usage in real-time, detect hidden leaks automatically, and compete with your neighbors to save money and the planet.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="w-full sm:w-auto gap-2" onClick={() => navigate('/signup')}>
            Start saving today <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="secondary" className="w-full sm:w-auto" onClick={() => navigate('/login')}>
            Book a Demo
          </Button>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent z-10 h-full" />
          <div className="bg-surface rounded-2xl md:rounded-[32px] shadow-float border border-sage/50 p-4 md:p-6 text-left relative overflow-hidden">
            {/* Minimal Mockup UI */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-cream rounded-xl p-6 border border-sage/30">
                <div className="flex items-center gap-3 mb-4 text-textMuted"><Droplets size={20}/> Daily Usage</div>
                <div className="text-3xl font-bold">142<span className="text-lg text-textMuted font-normal ml-1">gal</span></div>
                <div className="text-forest text-sm font-medium mt-2 flex items-center gap-1">↓ 12% vs last week</div>
              </div>
              <div className="bg-cream rounded-xl p-6 border border-sage/30">
                <div className="flex items-center gap-3 mb-4 text-textMuted"><Activity size={20}/> Live Flow Rate</div>
                <div className="text-3xl font-bold">0.0<span className="text-lg text-textMuted font-normal ml-1">gpm</span></div>
                <div className="text-forest text-sm font-medium mt-2">All systems clear</div>
              </div>
              <div className="bg-forest text-surface rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4 text-sage"><Target size={20}/> Current Rank</div>
                <div className="text-3xl font-bold">Top 5%</div>
                <div className="text-sage text-sm font-medium mt-2">In your neighborhood</div>
              </div>
            </div>
            <div className="h-48 bg-gradient-to-r from-sage/20 to-sky/20 rounded-xl border border-sage/30 flex items-center justify-center text-textMuted">
              [ Interactive Usage Chart Simulation ]
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

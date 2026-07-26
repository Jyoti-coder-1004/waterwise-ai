import React from 'react';
import { Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[600px] h-[600px] bg-sage/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-sky/20 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-sage rounded-xl flex items-center justify-center text-forest shadow-sm">
              <Droplet size={24} className="fill-forest" />
            </div>
            <span className="text-2xl font-poppins font-bold text-textMain tracking-tight">WaterWise AI</span>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-2xl shadow-float border border-sage/30">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-textMain mb-2">{title}</h1>
            {subtitle && <p className="text-textMuted text-sm">{subtitle}</p>}
          </div>
          
          {children}
        </div>
        
        <div className="mt-8 text-center text-sm text-textMuted">
          By continuing, you agree to our <a href="#" className="text-forest hover:underline">Terms of Service</a> and <a href="#" className="text-forest hover:underline">Privacy Policy</a>.
        </div>
      </motion.div>
    </div>
  );
};

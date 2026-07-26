import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 md:px-12 bg-cream">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-forest rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden shadow-float"
        >
          {/* Decor */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-sage/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-sky/20 rounded-full blur-3xl"></div>

          <h2 className="text-4xl md:text-5xl font-bold text-surface mb-6 relative z-10 tracking-tight">Ready to stop wasting water?</h2>
          <p className="text-sage text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of users who are saving money and the planet. Setup takes less than 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Button size="lg" className="bg-surface text-forest hover:bg-cream" onClick={() => navigate('/signup')}>
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline" className="border-sage text-sage hover:bg-sage hover:text-forest" onClick={() => navigate('/login')}>
              Talk to Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

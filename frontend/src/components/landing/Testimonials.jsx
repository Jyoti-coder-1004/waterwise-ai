import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Homeowner",
    quote: "WaterWise AI alerted me to a silent toilet leak while I was on vacation. It saved me a massive utility bill and potential water damage. The interface is stunning too.",
    avatar: "S"
  },
  {
    name: "David Chen",
    role: "Property Manager",
    quote: "Managing 3 apartment complexes used to be a nightmare for water bills. Now we see anomalies instantly. The ROI was realized in less than two months.",
    avatar: "D"
  },
  {
    name: "Emily Rodriguez",
    role: "Eco-Enthusiast",
    quote: "I love the gamification! Beating my neighbors on the leaderboard has become a fun monthly challenge for my whole family.",
    avatar: "E"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-textMain mb-16 tracking-tight">Loved by users and the planet.</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface rounded-2xl p-8 shadow-soft flex flex-col"
            >
              <div className="flex-grow">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-5 h-5 text-forest" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-textMain text-lg italic leading-relaxed mb-8">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center font-bold text-forest text-xl">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-textMain">{t.name}</h4>
                  <p className="text-textMuted text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

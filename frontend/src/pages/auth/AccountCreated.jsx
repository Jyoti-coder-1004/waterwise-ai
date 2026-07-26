import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout';
import { Button } from '../../components/ui/Button';
import { PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

export const AccountCreated = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout title="Account Created!" subtitle="Welcome to WaterWise AI. Your journey starts here.">
      <div className="flex flex-col items-center justify-center py-6">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-20 h-20 bg-sky/10 rounded-full flex items-center justify-center mb-8"
        >
          <PartyPopper size={40} className="text-sky" />
        </motion.div>
        <p className="text-textMain text-center mb-8">
          Your account has been successfully set up. We've applied your personalized settings.
        </p>
        <Button className="w-full" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </div>
    </AuthLayout>
  );
};

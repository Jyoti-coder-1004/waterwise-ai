import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout';
import { Button } from '../../components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export const EmailVerification = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout title="Email Verified!" subtitle="Your email address has been successfully verified.">
      <div className="flex flex-col items-center justify-center py-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 size={40} className="text-forest" />
        </div>
        <p className="text-textMain text-center mb-8">
          Thank you for confirming your email. You can now access all features of WaterWise AI.
        </p>
        <Button className="w-full" onClick={() => navigate('/dashboard')}>
          Continue to Dashboard
        </Button>
      </div>
    </AuthLayout>
  );
};

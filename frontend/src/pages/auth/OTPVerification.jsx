import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout';
import { Button } from '../../components/ui/Button';

export const OTPVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/reset-password');
    }, 1000);
  };

  const handleResend = () => {
    setTimer(60);
  };

  return (
    <AuthLayout title="Check your email" subtitle="We sent a verification code to your email.">
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-textMain">Verification Code</label>
          <div className="flex gap-2 justify-between">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <input 
                key={i}
                type="text" 
                maxLength={1} 
                className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-cream border border-sage/50 text-textMain focus:outline-none focus:ring-2 focus:ring-forest transition-all"
              />
            ))}
          </div>
        </div>
        <Button className="w-full mt-6" type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-textMuted">
        Didn't receive the email?{' '}
        {timer > 0 ? (
          <span className="font-semibold text-textMain">Resend in {timer}s</span>
        ) : (
          <button onClick={handleResend} className="font-semibold text-forest hover:underline">Click to resend</button>
        )}
      </div>
    </AuthLayout>
  );
};

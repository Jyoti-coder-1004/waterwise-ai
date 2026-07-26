import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { authService } from '../../services/authService';

export const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');
    setSuccessMsg('');
    try {
      const res = await authService.forgotPassword(data.email);
      setSuccessMsg('Reset code sent to your email!');
      setTimeout(() => navigate('/verify-otp'), 1500);
    } catch (err) {
      setApiError(err.message || 'Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset your password" subtitle="We'll send you an OTP to reset your password.">
      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          {apiError}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl">
          {successMsg}
        </div>
      )}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Input 
          label="Email address" 
          type="email" 
          placeholder="name@example.com" 
          {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
          error={errors.email?.message}
        />
        <Button className="w-full mt-2" type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send OTP'}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:underline">
          <ArrowLeft size={16} /> Back to log in
        </Link>
      </div>
    </AuthLayout>
  );
};

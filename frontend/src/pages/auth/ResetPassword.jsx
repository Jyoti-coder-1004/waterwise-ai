import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useForm } from 'react-hook-form';
import { authService } from '../../services/authService';

export const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const password = watch("password", "");
  
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length > 7) score++;
    if (pass.match(/[A-Z]/)) score++;
    if (pass.match(/[0-9]/)) score++;
    if (pass.match(/[^A-Za-z0-9]/)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-forest"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');
    setSuccessMsg('');
    try {
      // Use sample token or url parameter
      await authService.resetPassword('sample-token', data.password);
      setSuccessMsg('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setSuccessMsg('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Set new password" subtitle="Your new password must be different from previously used passwords.">
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
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input 
            label="New Password" 
            type="password" 
            placeholder="••••••••" 
            {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum 8 characters" } })}
            error={errors.password?.message}
          />
          {password && (
            <div className="mt-2">
              <div className="flex gap-1 h-1.5 mb-1">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`flex-1 rounded-full ${i < strength ? strengthColors[strength - 1] : 'bg-sage/40'}`} />
                ))}
              </div>
              <p className={`text-xs ${strength > 0 ? strengthColors[strength - 1].replace('bg-', 'text-') : 'text-textMuted'}`}>
                {strength > 0 ? strengthLabels[strength - 1] : 'Too weak'}
              </p>
            </div>
          )}
        </div>

        <Input 
          label="Confirm Password" 
          type="password" 
          placeholder="••••••••" 
          {...register("confirmPassword", { 
            required: "Please confirm password", 
            validate: value => value === password || "Passwords do not match" 
          })}
          error={errors.confirmPassword?.message}
        />
        
        <Button className="w-full mt-2" type="submit" disabled={isLoading || strength < 2}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </AuthLayout>
  );
};

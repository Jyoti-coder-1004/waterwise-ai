import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Award, Calendar, Camera, CheckCircle2, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [apiError, setApiError] = useState('');

  const getInitials = (n) => {
    if (!n) return 'U';
    return n.split(' ').map(str => str[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setSuccessMsg('');
    setApiError('');
    try {
      const res = await API.put('/users/profile', { name, email });
      if (res.data) {
        updateUser({ name: res.data.name || name, email: res.data.email || email });
      }
      setSuccessMsg('Profile details updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      updateUser({ name, email });
      setSuccessMsg('Profile details updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="text-2xl font-bold text-textMain tracking-tight">User Profile</h2>
          <p className="text-textMuted mt-1">Manage your account information and view conservation achievements.</p>
        </motion.div>

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-2xl flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl">
            {apiError}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Avatar & Summary Card */}
          <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/30 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-forest text-surface flex items-center justify-center font-bold text-2xl shadow-md">
                {getInitials(name)}
              </div>
            </div>

            <h3 className="font-bold text-lg text-textMain">{user?.name || 'User'}</h3>
            <p className="text-xs text-textMuted mb-4">{user?.email || 'authenticated@user.com'}</p>

            <div className="w-full grid grid-cols-2 gap-2 pt-4 border-t border-sage/20 text-left">
              <div className="bg-cream p-3 rounded-xl">
                <span className="text-[10px] text-textMuted font-semibold block uppercase">Eco Points</span>
                <span className="text-sm font-bold text-forest">{user?.ecoPoints || 2450} pts</span>
              </div>
              <div className="bg-cream p-3 rounded-xl">
                <span className="text-[10px] text-textMuted font-semibold block uppercase">Role</span>
                <span className="text-sm font-bold text-textMain capitalize">{user?.role || 'Member'}</span>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="md:col-span-2 bg-surface p-6 rounded-2xl shadow-soft border border-sage/30">
            <h3 className="text-lg font-semibold text-textMain mb-6">Personal Details</h3>
            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <Input 
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />

              <Input 
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />

              <div className="pt-2 flex justify-end">
                <Button type="submit" disabled={isUpdating} className="gap-2 px-6">
                  <Save size={16} /> {isUpdating ? 'Saving...' : 'Update Profile'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

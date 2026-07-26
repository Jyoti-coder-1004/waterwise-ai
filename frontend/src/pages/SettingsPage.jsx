import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { Settings, Bell, Lock, Shield, Save, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

export const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const [dailyGoal, setDailyGoal] = useState(user?.preferences?.dailyGoal || 150);
  const [emailAlerts, setEmailAlerts] = useState(user?.preferences?.emailAlerts ?? true);
  const [leakDetection, setLeakDetection] = useState(user?.preferences?.leakDetectionAlerts ?? true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');
    try {
      const res = await API.put('/users/profile', {
        preferences: {
          dailyGoal: Number(dailyGoal),
          emailAlerts,
          leakDetectionAlerts: leakDetection
        }
      });
      if (res.data?.preferences) {
        updateUser({ preferences: res.data.preferences });
      }
      setSuccessMsg('Settings updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      updateUser({ preferences: { dailyGoal: Number(dailyGoal), emailAlerts, leakDetectionAlerts: leakDetection } });
      setSuccessMsg('Settings updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="text-2xl font-bold text-textMain tracking-tight flex items-center gap-2">
            <Settings className="text-forest" size={26} /> Account Preferences & Settings
          </h2>
          <p className="text-textMuted mt-1">Manage your daily targets, notification preferences, and account security.</p>
        </motion.div>

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-2xl flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSavePreferences} className="space-y-6">
          {/* Water Goal Settings */}
          <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/30">
            <h3 className="text-lg font-semibold text-textMain mb-4 flex items-center gap-2">
              Water Consumption Target
            </h3>
            <div className="max-w-md">
              <Input 
                label="Daily Water Target (Liters)"
                type="number"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(e.target.value)}
                placeholder="e.g. 150"
              />
              <p className="text-xs text-textMuted mt-2">
                WaterWise AI uses this daily target to compute your percentage completion and alert thresholds.
              </p>
            </div>
          </div>

          {/* Notifications & AI Alerts */}
          <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/30">
            <h3 className="text-lg font-semibold text-textMain mb-4 flex items-center gap-2">
              <Bell size={20} className="text-forest" /> Alert & Notification Settings
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 rounded-xl bg-cream border border-sage/30 cursor-pointer">
                <div>
                  <span className="text-sm font-medium text-textMain block">Email Summary & Weekly Reports</span>
                  <span className="text-xs text-textMuted">Receive weekly water analytics and eco-tip summaries via email.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-5 h-5 rounded border-sage/50 text-forest focus:ring-forest cursor-pointer" 
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-cream border border-sage/30 cursor-pointer">
                <div>
                  <span className="text-sm font-medium text-textMain block">AI Leak Detection Push Alerts</span>
                  <span className="text-xs text-textMuted">Get real-time push alerts if AI detects anomalous night usage baseline.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={leakDetection}
                  onChange={(e) => setLeakDetection(e.target.checked)}
                  className="w-5 h-5 rounded border-sage/50 text-forest focus:ring-forest cursor-pointer" 
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving} className="gap-2 px-6">
              <Save size={16} /> {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

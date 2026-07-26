import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Droplet, Upload, Plus, Calendar, Clock, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { waterService } from '../../services/waterService';

const categories = [
  { id: 'Drinking', label: 'Drinking', icon: '💧' },
  { id: 'Bathing', label: 'Bathing', icon: '🚿' },
  { id: 'Washing Clothes', label: 'Washing Clothes', icon: '👕' },
  { id: 'Cooking', label: 'Cooking', icon: '🍳' },
  { id: 'Cleaning', label: 'Cleaning', icon: '🧹' },
  { id: 'Gardening', label: 'Gardening', icon: '🌱' }
];

export const AddWaterUsage = () => {
  const [activeTab, setActiveTab] = useState('manual');
  const [selectedCategory, setSelectedCategory] = useState('Drinking');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMsg('');
    setApiError('');
    try {
      await waterService.addUsage({
        amount: Number(data.amount),
        category: selectedCategory,
        date: data.date,
        notes: data.notes,
      });
      setSuccessMsg('Water usage logged successfully!');
      reset();
      setTimeout(() => navigate('/tracking/history'), 1500);
    } catch (err) {
      setApiError(err.message || 'Failed to log water usage.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="text-2xl font-bold text-textMain tracking-tight">Log Water Usage</h2>
          <p className="text-textMuted mt-1">Track your consumption manually or scan your utility bill.</p>
        </motion.div>

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-2xl flex items-center gap-3">
            <CheckCircle2 size={20} className="text-emerald-600" />
            <span>{successMsg} Redirecting to history...</span>
          </div>
        )}

        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl">
            {apiError}
          </div>
        )}

        <div className="bg-surface rounded-2xl shadow-soft border border-sage/30 overflow-hidden">
          <div className="flex border-b border-sage/30">
            <button 
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'manual' ? 'text-forest border-b-2 border-forest bg-cream/50' : 'text-textMuted hover:bg-cream'}`}
              onClick={() => setActiveTab('manual')}
            >
              Manual Entry
            </button>
            <button 
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'bill' ? 'text-forest border-b-2 border-forest bg-cream/50' : 'text-textMuted hover:bg-cream'}`}
              onClick={() => setActiveTab('bill')}
            >
              Scan Water Bill
            </button>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'manual' ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div>
                  <label className="text-sm font-medium text-textMain block mb-3">Select Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${selectedCategory === cat.id ? 'border-forest bg-forest/5 shadow-sm' : 'border-sage/40 bg-cream hover:border-forest/40'}`}
                      >
                        <span className="text-2xl mb-2">{cat.icon}</span>
                        <span className={`text-xs font-medium ${selectedCategory === cat.id ? 'text-forest' : 'text-textMain'}`}>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Input 
                      label="Amount (Liters)" 
                      type="number" 
                      placeholder="e.g. 50" 
                      {...register("amount", { required: "Amount is required", min: 1 })}
                      error={errors.amount?.message}
                    />
                    <Droplet className="absolute right-4 top-9 text-sky" size={18} />
                  </div>
                  <div className="relative">
                    <Input 
                      label="Date" 
                      type="date" 
                      defaultValue={new Date().toISOString().split('T')[0]}
                      {...register("date", { required: "Date is required" })}
                    />
                    <Calendar className="absolute right-4 top-9 text-textMuted pointer-events-none" size={18} />
                  </div>
                </div>

                <Input 
                  label="Optional Notes" 
                  placeholder="e.g. Watered the front lawn" 
                  {...register("notes")}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging...' : 'Log Usage'}
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-sage/50 rounded-2xl bg-cream/50 text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center text-forest mb-4">
                  <ImageIcon size={32} />
                </div>
                <h3 className="text-lg font-semibold text-textMain mb-2">Upload your utility bill</h3>
                <p className="text-sm text-textMuted max-w-md mb-6">
                  Our AI will automatically extract your total consumption, billing period, and compare it with local averages.
                </p>
                <div className="flex gap-4">
                  <Button className="flex gap-2">
                    <Upload size={18} /> Browse Files
                  </Button>
                </div>
                <p className="text-xs text-textMuted mt-4">Supports PDF, JPG, PNG up to 10MB</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

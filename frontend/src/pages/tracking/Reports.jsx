import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, TrendingDown, Target, Droplet } from 'lucide-react';
import { waterService } from '../../services/waterService';

const fallbackDaily = [
  { time: '6am', usage: 10 }, { time: '9am', usage: 45 }, { time: '12pm', usage: 15 },
  { time: '3pm', usage: 20 }, { time: '6pm', usage: 60 }, { time: '9pm', usage: 25 },
];

const fallbackWeekly = [
  { day: 'Mon', usage: 140 }, { day: 'Tue', usage: 165 }, { day: 'Wed', usage: 130 },
  { day: 'Thu', usage: 155 }, { day: 'Fri', usage: 145 }, { day: 'Sat', usage: 180 }, { day: 'Sun', usage: 142 },
];

const fallbackMonthly = [
  { week: 'W1', usage: 950 }, { week: 'W2', usage: 890 }, { week: 'W3', usage: 1020 }, { week: 'W4', usage: 850 }
];

const fallbackCategory = [
  { name: 'Bathing', value: 40, color: '#4FC3F7' },
  { name: 'Gardening', value: 30, color: '#2E7D32' },
  { name: 'Washing', value: 20, color: '#DDEED8' },
  { name: 'Cooking', value: 10, color: '#FCD34D' },
];

export const Reports = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [chartData, setChartData] = useState(fallbackDaily);
  const [categories, setCategories] = useState(fallbackCategory);
  const [totalConsumed, setTotalConsumed] = useState(175);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await waterService.getAnalytics(activeTab);
        if (res?.data && res.data.length > 0) {
          setChartData(res.data.map(item => ({
            time: item._id,
            day: item._id,
            week: item._id,
            usage: item.totalAmount
          })));
          if (res.totalUsage) setTotalConsumed(res.totalUsage);
        } else {
          setChartData(activeTab === 'daily' ? fallbackDaily : activeTab === 'weekly' ? fallbackWeekly : fallbackMonthly);
        }

        const catRes = await waterService.getCategoryAnalytics();
        if (catRes?.data && catRes.data.length > 0) {
          const colors = ['#4FC3F7', '#2E7D32', '#DDEED8', '#FCD34D', '#F87171'];
          setCategories(catRes.data.map((c, i) => ({
            name: c.category,
            value: Number(c.percentage) || c.amount,
            color: colors[i % colors.length]
          })));
        }
      } catch (err) {
        console.warn('Analytics fetch error, using fallbacks:', err);
        setChartData(activeTab === 'daily' ? fallbackDaily : activeTab === 'weekly' ? fallbackWeekly : fallbackMonthly);
      }
    };

    loadAnalytics();
  }, [activeTab]);

  const SummaryCards = ({ total, saved, goal }) => (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-sky/10 text-sky flex items-center justify-center shrink-0">
          <Droplet size={24} />
        </div>
        <div>
          <div className="text-sm text-textMuted font-medium">Total Consumption</div>
          <div className="text-2xl font-bold text-textMain">{total} L</div>
        </div>
      </div>
      <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
          <TrendingDown size={24} />
        </div>
        <div>
          <div className="text-sm text-textMuted font-medium">Water Saved</div>
          <div className="text-2xl font-bold text-textMain">{saved} L</div>
        </div>
      </div>
      <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-sage text-forest flex items-center justify-center shrink-0">
          <Target size={24} />
        </div>
        <div>
          <div className="text-sm text-textMuted font-medium">Goal Progress</div>
          <div className="text-2xl font-bold text-textMain">{goal}%</div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-textMain tracking-tight">Analytics & Reports</h2>
            <p className="text-textMuted mt-1">Deep dive into your water consumption trends.</p>
          </motion.div>
          
          <div className="flex bg-cream p-1 rounded-xl border border-sage/30">
            {['daily', 'weekly', 'monthly'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-surface text-forest shadow-sm' : 'text-textMuted hover:text-textMain'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'daily' && (
            <motion.div key="daily" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <SummaryCards total={totalConsumed || 175} saved="25" goal="85" />
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-surface p-6 rounded-2xl shadow-soft border border-sage/20">
                  <h3 className="text-lg font-semibold text-textMain mb-6">Today's Usage Timeline</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                        <Tooltip cursor={{fill: '#F8F7F2'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)' }} />
                        <Bar dataKey="usage" fill="#4FC3F7" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20">
                  <h3 className="text-lg font-semibold text-textMain mb-6">Category Breakdown</h3>
                  <div className="h-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categories} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                          {categories.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'weekly' && (
            <motion.div key="weekly" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <SummaryCards total={totalConsumed || "1,057"} saved="143" goal="92" />
              <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20 mb-6">
                <h3 className="text-lg font-semibold text-textMain mb-6">Weekly Comparison</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)' }} />
                      <Line type="monotone" dataKey="usage" stroke="#2E7D32" strokeWidth={3} activeDot={{ r: 6, fill: '#4FC3F7' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'monthly' && (
            <motion.div key="monthly" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <SummaryCards total={totalConsumed || "3,710"} saved="590" goal="115" />
              <div className="bg-surface p-6 rounded-2xl shadow-soft border border-sage/20">
                <h3 className="text-lg font-semibold text-textMain mb-6">Monthly Trend</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barSize={40}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                      <Tooltip cursor={{fill: '#F8F7F2'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)' }} />
                      <Bar dataKey="usage" fill="#2E7D32" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

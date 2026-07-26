import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, AlertCircle, Droplets, Trophy, Info } from 'lucide-react';
import API from '../services/api';

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackNotifications = [
    { _id: '1', title: 'High Water Usage Alert', message: 'Your consumption yesterday was 20% higher than your daily target.', type: 'alert', read: false, createdAt: new Date().toISOString() },
    { _id: '2', title: 'Challenge Completed!', message: 'You successfully completed Bucket Bath Master and earned 1,000 points!', type: 'reward', read: false, createdAt: new Date(Date.now() - 3600000 * 4).toISOString() },
    { _id: '3', title: 'AI Tip Available', message: 'Rain is forecasted tomorrow. Turn off automated sprinkler schedules to save water.', type: 'info', read: true, createdAt: new Date(Date.now() - 3600000 * 24).toISOString() },
  ];

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await API.get('/notifications');
      if (res.data?.data && res.data.data.length > 0) {
        setNotifications(res.data.data);
      } else {
        setNotifications(fallbackNotifications);
      }
    } catch (err) {
      console.warn('Notifications fetch error:', err);
      setNotifications(fallbackNotifications);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await API.put('/notifications/read-all');
    } catch (err) {
      // fallback local update
    } finally {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
    } catch (err) {
      // fallback
    } finally {
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertCircle size={20} className="text-red-500" />;
      case 'reward': return <Trophy size={20} className="text-amber-500" />;
      case 'usage': return <Droplets size={20} className="text-sky" />;
      default: return <Info size={20} className="text-forest" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-textMain tracking-tight flex items-center gap-2">
              <Bell className="text-forest" size={26} /> Notifications
            </h2>
            <p className="text-textMuted mt-1">Stay updated with system alerts, goal milestones, and AI insights.</p>
          </div>
          <button 
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 text-xs font-semibold text-forest bg-forest/10 hover:bg-forest/20 px-3 py-2 rounded-xl transition-colors"
          >
            <CheckCheck size={16} /> Mark all read
          </button>
        </motion.div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-textMuted">Loading notifications...</div>
          ) : notifications.map((n, idx) => (
            <motion.div 
              key={n._id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleMarkRead(n._id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${n.read ? 'bg-surface/60 border-sage/20 opacity-75' : 'bg-surface border-sage/40 shadow-soft'}`}
            >
              <div className="p-2.5 rounded-xl bg-cream border border-sage/30 shrink-0">
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-sm text-textMain">{n.title}</h4>
                  <span className="text-[10px] text-textMuted">
                    {new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-textMuted mt-1 leading-relaxed">{n.message}</p>
              </div>
              {!n.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-forest shrink-0 mt-1" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

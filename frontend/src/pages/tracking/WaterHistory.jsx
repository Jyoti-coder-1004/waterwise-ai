import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Filter, ChevronDown, Download, Search, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { waterService } from '../../services/waterService';

const fallbackHistory = [
  { _id: '1', date: '2026-07-21', category: 'Bathing', icon: '🚿', amount: 45 },
  { _id: '2', date: '2026-07-21', category: 'Drinking', icon: '💧', amount: 2 },
  { _id: '3', date: '2026-07-20', category: 'Gardening', icon: '🌱', amount: 120 },
  { _id: '4', date: '2026-07-20', category: 'Washing Clothes', icon: '👕', amount: 65 },
  { _id: '5', date: '2026-07-19', category: 'Cooking', icon: '🍳', amount: 15 },
  { _id: '6', date: '2026-07-19', category: 'Cleaning', icon: '🧹', amount: 30 },
];

const categoryIcons = {
  Drinking: '💧',
  Bathing: '🚿',
  'Washing Clothes': '👕',
  Cooking: '🍳',
  Cleaning: '🧹',
  Gardening: '🌱',
  Other: '🚰',
};

export const WaterHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await waterService.getHistory();
      if (res?.data && res.data.length > 0) {
        setHistory(res.data);
      } else {
        setHistory(fallbackHistory);
      }
    } catch (err) {
      console.warn('Failed to fetch history, using local state:', err);
      setHistory(fallbackHistory);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await waterService.deleteUsage(id);
      setHistory(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      setHistory(prev => prev.filter(item => item._id !== id));
    }
  };

  const filteredHistory = history.filter(item => 
    item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-textMain tracking-tight">Water History</h2>
            <p className="text-textMuted mt-1">Review your past consumption logs.</p>
          </motion.div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
              <input 
                type="text" 
                placeholder="Search logs..." 
                className="h-10 pl-9 pr-4 bg-surface border border-sage/50 rounded-xl text-sm focus:outline-none focus:border-forest transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 h-10 px-4 bg-surface border border-sage/50 rounded-xl text-sm font-medium text-textMain hover:bg-cream transition-colors">
              <Filter size={16} /> Filter <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-2 h-10 px-4 bg-forest text-surface rounded-xl text-sm font-medium shadow-sm hover:bg-opacity-90 transition-colors">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        <div className="bg-surface rounded-2xl shadow-soft border border-sage/30 overflow-hidden flex-1 flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream/50 border-b border-sage/30">
                  <th className="py-4 px-6 text-xs font-semibold text-textMuted uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-xs font-semibold text-textMuted uppercase tracking-wider">Category</th>
                  <th className="py-4 px-6 text-xs font-semibold text-textMuted uppercase tracking-wider">Amount</th>
                  <th className="py-4 px-6 text-xs font-semibold text-textMuted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage/20">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-textMuted">Loading history...</td>
                  </tr>
                ) : filteredHistory.map((log, idx) => (
                  <motion.tr 
                    key={log._id || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-cream/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-medium text-textMain">
                        {new Date(log.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center text-lg shadow-sm border border-sage/20">
                          {log.icon || categoryIcons[log.category] || '🚰'}
                        </div>
                        <span className="font-medium text-textMain">{log.category}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-forest">{log.amount}</span>
                      <span className="text-textMuted ml-1 font-medium">L</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => handleDelete(log._id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete log"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-sage/30 flex items-center justify-between mt-auto bg-surface">
            <span className="text-sm text-textMuted">Showing {filteredHistory.length} entries</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm font-medium rounded-lg text-textMuted hover:bg-cream transition-colors" disabled>Previous</button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-forest text-surface shadow-sm">1</button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-lg text-textMain hover:bg-cream transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

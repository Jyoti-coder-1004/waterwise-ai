import React, { useState } from 'react';
import { Droplet, LayoutDashboard, BarChart2, Target, Award, Users, Settings, Bell, Menu, Search, LogOut, BotMessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfileDropdown } from '../components/dashboard/UserProfileDropdown';
import { AIChatModal } from '../components/dashboard/AIChatModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
  { icon: <Droplet size={20} />, label: 'Log Usage', path: '/tracking/add' },
  { icon: <Target size={20} />, label: 'History', path: '/tracking/history' },
  { icon: <BarChart2 size={20} />, label: 'Reports', path: '/tracking/reports' },
  { icon: <Award size={20} />, label: 'Challenges', path: '/challenges' },
  { icon: <Users size={20} />, label: 'Community', path: '/community' },
  { icon: <BotMessageSquare size={20} />, label: 'AI Assistant', path: '/ai' },
];

export const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.warn('Logout API error:', err);
    } finally {
      navigate('/login');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <div className="flex h-screen bg-cream font-inter overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-textMain/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-sage/30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-sage/30">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sage rounded-lg flex items-center justify-center text-forest">
              <Droplet size={18} className="fill-forest" />
            </div>
            <span className="text-xl font-poppins font-bold text-textMain tracking-tight">WaterWise</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={idx}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-sage/40 text-forest' : 'text-textMuted hover:text-textMain hover:bg-cream'}`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
          
          <div className="mt-8 mb-2 px-3 text-xs font-semibold text-textMuted uppercase tracking-wider">Preferences</div>
          <Link to="/notifications" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === '/notifications' ? 'bg-sage/40 text-forest' : 'text-textMuted hover:text-textMain hover:bg-cream'}`}>
            <Bell size={20} />
            Notifications
          </Link>
          <Link to="/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === '/settings' ? 'bg-sage/40 text-forest' : 'text-textMuted hover:text-textMain hover:bg-cream'}`}>
            <Settings size={20} />
            Settings
          </Link>
        </div>

        <div className="p-4 border-t border-sage/30 flex flex-col gap-2">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full text-left">
            <LogOut size={20} />
            Logout
          </button>
          <Link to="/profile" className="flex items-center gap-3 p-2 rounded-xl bg-cream hover:bg-sage/20 transition-colors">
            <div className="w-9 h-9 rounded-full bg-forest text-surface flex items-center justify-center font-semibold text-sm">
              {getInitials(user?.name)}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium text-textMain truncate">{user?.name || 'User'}</div>
              <div className="text-xs text-textMuted truncate">{user?.email || 'Logged in'}</div>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Topbar */}
        <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-sage/30 flex items-center justify-between px-4 lg:px-8 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-textMuted hover:text-textMain" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-poppins font-semibold text-textMain hidden sm:block">Welcome back, {firstName}! 👋</h1>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-64 h-10 pl-10 pr-4 bg-cream rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 transition-shadow"
              />
            </div>
            <button onClick={() => navigate('/notifications')} className="relative text-textMuted hover:text-textMain transition-colors">
              <Bell size={22} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full ring-2 ring-surface"></span>
            </button>
            <div className="w-px h-6 bg-sage/50 hidden md:block"></div>
            <UserProfileDropdown />
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </div>
        
        {/* Floating AI Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="absolute bottom-6 right-6 w-14 h-14 bg-forest text-surface rounded-full shadow-float flex items-center justify-center z-40 hover:bg-opacity-90 transition-all"
        >
          <BotMessageSquare size={24} />
        </motion.button>

        {/* AI Chat Modal */}
        <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </main>
    </div>
  );
};

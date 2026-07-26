import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Bell, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await logout();
    } catch (err) {
      console.warn('Logout error:', err);
    } finally {
      navigate('/login');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const menuItems = [
    { icon: <User size={16} />, label: "My Profile", path: "/profile" },
    { icon: <Settings size={16} />, label: "Settings", path: "/settings" },
    { icon: <Bell size={16} />, label: "Notifications", path: "/notifications" },
  ];

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-cream transition-colors border border-transparent hover:border-sage/30"
      >
        <div className="w-8 h-8 rounded-full bg-forest text-surface flex items-center justify-center font-semibold text-sm">
          {getInitials(user?.name)}
        </div>
        <ChevronDown size={16} className={`text-textMuted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-surface rounded-2xl shadow-float border border-sage/30 overflow-hidden py-2"
          >
            <div className="px-4 py-3 border-b border-sage/30 mb-2">
              <p className="text-sm font-semibold text-textMain truncate">{user?.name || 'WaterWise User'}</p>
              <p className="text-xs text-textMuted truncate">{user?.email || ''}</p>
            </div>
            
            {menuItems.map((item, idx) => (
              <button 
                key={idx}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-textMain hover:bg-cream hover:text-forest transition-colors"
                onClick={() => { setIsOpen(false); navigate(item.path); }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            
            <div className="border-t border-sage/30 mt-2 pt-2">
              <button 
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Droplet, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-surface/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center text-forest">
            <Droplet size={24} className="fill-forest" />
          </div>
          <span className="text-xl font-poppins font-bold text-textMain tracking-tight">WaterWise AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-textMuted hover:text-forest transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-textMuted hover:text-forest transition-colors">How it works</a>
          <a href="#testimonials" className="text-sm font-medium text-textMuted hover:text-forest transition-colors">Testimonials</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')}>Log In</Button>
          <Button variant="primary" onClick={() => navigate('/signup')}>Get Started</Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-textMain" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface shadow-soft border-t border-gray-100 flex flex-col p-6 gap-4">
          <a href="#features" className="text-base font-medium text-textMain" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-base font-medium text-textMain" onClick={() => setMobileMenuOpen(false)}>How it works</a>
          <a href="#testimonials" className="text-base font-medium text-textMain" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          <hr className="border-gray-100 my-2" />
          <Button variant="ghost" className="justify-start px-0" onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}>Log In</Button>
          <Button variant="primary" className="w-full" onClick={() => { setMobileMenuOpen(false); navigate('/signup'); }}>Get Started</Button>
        </div>
      )}
    </header>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { Droplet, Mail } from "lucide-react";
export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">

          {/* Logo */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Droplet className="text-green-700" size={20} />
              </div>

              <h2 className="text-xl font-bold text-gray-800">
                WaterWise AI
              </h2>
            </div>

            <p className="text-gray-500 max-w-sm leading-7 mb-6">
              The smartest way to monitor, manage, and reduce your daily
              water consumption while helping create a sustainable future.
            </p>

            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-textMuted hover:text-forest transition-colors"
              >
                Twitter
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-textMuted hover:text-forest transition-colors"
              >
                GitHub
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-textMuted hover:text-forest transition-colors"
              >
                LinkedIn
              </a>

              <a
                href="mailto:info@waterwise.ai"
                className="text-textMuted hover:text-forest transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Product</h3>

            <ul className="space-y-3 text-gray-500">
              <li><a href="#features">Features</a></li>
              <li><Link to="/dashboard" className="hover:text-forest transition-colors">Dashboard</Link></li>
              <li><Link to="/tracking/reports" className="hover:text-forest transition-colors">Analytics</Link></li>
              <li><Link to="/ai" className="hover:text-forest transition-colors">AI Assistant</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>

            <ul className="space-y-3 text-gray-500">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Legal</h3>

            <ul className="space-y-3 text-gray-500">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500 text-sm">
            © 2026 WaterWise AI. All rights reserved.
          </p>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="w-2 h-2 rounded-full bg-green-600"></div>

            <span className="text-sm text-gray-500">
              System Operational
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
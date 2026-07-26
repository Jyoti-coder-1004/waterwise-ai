import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Landing
import { LandingPage } from './pages/LandingPage';

// Auth
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { OTPVerification } from './pages/auth/OTPVerification';
import { ResetPassword } from './pages/auth/ResetPassword';
import { EmailVerification } from './pages/auth/EmailVerification';
import { AccountCreated } from './pages/auth/AccountCreated';

// App Pages
import { DashboardPage } from './pages/DashboardPage';
import { AddWaterUsage } from './pages/tracking/AddWaterUsage';
import { WaterHistory } from './pages/tracking/WaterHistory';
import { Reports } from './pages/tracking/Reports';
import { CommunityPage } from './pages/CommunityPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AIPage } from './pages/AIPage';

// Route Guard
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verified" element={<EmailVerification />} />
        <Route path="/account-created" element={<AccountCreated />} />

        {/* Protected App Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/tracking/add" element={<ProtectedRoute><AddWaterUsage /></ProtectedRoute>} />
        <Route path="/tracking/history" element={<ProtectedRoute><WaterHistory /></ProtectedRoute>} />
        <Route path="/tracking/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
        <Route path="/challenges" element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><AIPage /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

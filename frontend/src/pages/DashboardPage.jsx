import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { StatCards } from '../components/dashboard/StatCards';
import { UsageChart } from '../components/dashboard/UsageChart';
import { AITips } from '../components/dashboard/AITips';
import { LeaderboardWidget } from '../components/dashboard/LeaderboardWidget';
import { DailyGoal } from '../components/dashboard/DailyGoal';
import { QuickActions } from '../components/dashboard/QuickActions';
import { EcoChallenges } from '../components/dashboard/EcoChallenges';
import { CommunityFeed } from '../components/dashboard/CommunityFeed';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { waterService } from '../services/waterService';

export const DashboardPage = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const res = await waterService.getDashboardSummary();
        if (res?.data) {
          setSummary(res.data);
        }
      } catch (err) {
        console.warn('Dashboard summary fetch failed, using defaults:', err);
      }
    };
    loadSummary();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 pb-24">
        {/* Top Stats */}
        <StatCards summary={summary} />

        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (Charts & Community) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <UsageChart />
            
            <div className="grid md:grid-cols-2 gap-6">
              <EcoChallenges />
              <CommunityFeed />
            </div>
          </div>
          
          {/* Right Column (Goals, Actions, AI, Leaderboard, Activity) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <DailyGoal />
            <QuickActions />
            <AITips />
            <LeaderboardWidget />
            <RecentActivity />
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

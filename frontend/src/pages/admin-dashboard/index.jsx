import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DashboardStats from './components/DashboardStats';
import RevenueChart from './components/RevenueChart';
import PopularMovies from './components/PopularMovies';
import RecentBookings from './components/RecentBookings';
import TheaterPerformance from './components/TheaterPerformance';
import QuickActions from './components/QuickActions';

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDateRange, setSelectedDateRange] = useState('today');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Admin Header */}
        <div className="bg-cinema-black text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 bg-cinema-gold rounded-xl flex items-center justify-center">
                    <Icon name="Shield" size={24} color="#1A1A1A" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-300">CineBook Pro Management Center</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Icon name="Clock" size={16} />
                  <span>Last updated: {formatDateTime(currentTime)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-6 lg:mt-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300">Date Range:</span>
                  {dateRangeOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={selectedDateRange === option.value ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedDateRange(option.value)}
                      className={selectedDateRange === option.value ? "bg-cinema-gold text-cinema-black" : "text-gray-300 hover:text-white"}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <Icon name="Download" size={16} className="mr-2" />
                    Export
                  </Button>
                  <Button variant="default" className="bg-conversion-orange hover:bg-orange-600">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add Movie
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Revenue Chart - Takes 2 columns */}
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            
            {/* Popular Movies - Takes 1 column */}
            <div className="lg:col-span-1">
              <PopularMovies />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Bookings - Takes 2 columns */}
            <div className="lg:col-span-2">
              <RecentBookings />
            </div>
            
            {/* Quick Actions - Takes 1 column */}
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>

          {/* Theater Performance - Full width */}
          <TheaterPerformance />

          {/* System Status Footer */}
          <div className="mt-8 bg-card rounded-xl p-6 premium-shadow border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">System Status: All Services Operational</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>API Response: 98ms</span>
                  <span>Uptime: 99.9%</span>
                  <span>Active Users: 12,847</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <Button variant="ghost" size="sm">
                  <Icon name="Activity" size={16} className="mr-2" />
                  System Health
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="HelpCircle" size={16} className="mr-2" />
                  Help & Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
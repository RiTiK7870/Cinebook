import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueChart = () => {
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('7days');

  const revenueData = [
    { name: 'Mon', revenue: 12400, bookings: 245 },
    { name: 'Tue', revenue: 15600, bookings: 312 },
    { name: 'Wed', revenue: 18900, bookings: 378 },
    { name: 'Thu', revenue: 22100, bookings: 442 },
    { name: 'Fri', revenue: 28500, bookings: 570 },
    { name: 'Sat', revenue: 35200, bookings: 704 },
    { name: 'Sun', revenue: 31800, bookings: 636 }
  ];

  const timeRanges = [
    { value: '7days', label: '7 Days' },
    { value: '30days', label: '30 Days' },
    { value: '90days', label: '90 Days' },
    { value: '1year', label: '1 Year' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 premium-shadow border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Revenue Analytics</h3>
          <p className="text-muted-foreground text-sm">Track revenue and booking trends</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range.value)}
                className="text-xs"
              >
                {range.label}
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-1 border border-border rounded-lg p-1">
            <Button
              variant={chartType === 'bar' ? "default" : "ghost"}
              size="icon"
              onClick={() => setChartType('bar')}
              className="w-8 h-8"
            >
              <Icon name="BarChart3" size={16} />
            </Button>
            <Button
              variant={chartType === 'line' ? "default" : "ghost"}
              size="icon"
              onClick={() => setChartType('line')}
              className="w-8 h-8"
            >
              <Icon name="TrendingUp" size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="h-80 w-full" aria-label="Revenue Analytics Chart">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : 'Bookings'
                ]}
                labelStyle={{ color: '#1A1A1A' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="revenue" 
                fill="#00A8FF" 
                radius={[4, 4, 0, 0]}
                name="revenue"
              />
            </BarChart>
          ) : (
            <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : 'Bookings'
                ]}
                labelStyle={{ color: '#1A1A1A' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#00A8FF" 
                strokeWidth={3}
                dot={{ fill: '#00A8FF', strokeWidth: 2, r: 4 }}
                name="revenue"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
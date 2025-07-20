import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TheaterPerformance = () => {
  const [sortBy, setSortBy] = useState('revenue');

  const theaterData = [
    {
      id: 1,
      name: "AMC Times Square 25",
      location: "New York, NY",
      screens: 25,
      capacity: 4500,
      occupancy: 87,
      revenue: "$45,230",
      bookings: 892,
      rating: 4.8,
      status: "active",
      lastUpdate: "5 min ago"
    },
    {
      id: 2,
      name: "Regal Union Square 14",
      location: "New York, NY",
      screens: 14,
      capacity: 2800,
      occupancy: 92,
      revenue: "$38,450",
      bookings: 756,
      rating: 4.6,
      status: "active",
      lastUpdate: "3 min ago"
    },
    {
      id: 3,
      name: "Cinemark Downtown 16",
      location: "Los Angeles, CA",
      screens: 16,
      capacity: 3200,
      occupancy: 78,
      revenue: "$32,180",
      bookings: 634,
      rating: 4.4,
      status: "active",
      lastUpdate: "8 min ago"
    },
    {
      id: 4,
      name: "AMC Lincoln Center 13",
      location: "New York, NY",
      screens: 13,
      capacity: 2600,
      occupancy: 85,
      revenue: "$29,670",
      bookings: 587,
      rating: 4.7,
      status: "active",
      lastUpdate: "12 min ago"
    },
    {
      id: 5,
      name: "Regal Battery Park 11",
      location: "New York, NY",
      screens: 11,
      capacity: 2200,
      occupancy: 73,
      revenue: "$24,890",
      bookings: 492,
      rating: 4.3,
      status: "maintenance",
      lastUpdate: "1 hour ago"
    }
  ];

  const getOccupancyColor = (occupancy) => {
    if (occupancy >= 85) return 'text-success';
    if (occupancy >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'maintenance':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'inactive':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const sortOptions = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'occupancy', label: 'Occupancy' },
    { value: 'bookings', label: 'Bookings' },
    { value: 'rating', label: 'Rating' }
  ];

  const sortedTheaters = [...theaterData].sort((a, b) => {
    switch (sortBy) {
      case 'revenue':
        return parseFloat(b.revenue.replace(/[$,]/g, '')) - parseFloat(a.revenue.replace(/[$,]/g, ''));
      case 'occupancy':
        return b.occupancy - a.occupancy;
      case 'bookings':
        return b.bookings - a.bookings;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-card rounded-xl p-6 premium-shadow border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Theater Performance</h3>
          <p className="text-muted-foreground text-sm">Real-time theater analytics and metrics</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={sortBy === option.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy(option.value)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sortedTheaters.map((theater, index) => (
          <div
            key={theater.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground">{theater.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(theater.status)}`}>
                    {theater.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {theater.location}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Monitor" size={14} className="mr-1" />
                    {theater.screens} screens
                  </span>
                  <span className="flex items-center">
                    <Icon name="Users" size={14} className="mr-1" />
                    {theater.capacity} capacity
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-right">
              <div>
                <div className="text-sm text-muted-foreground">Revenue</div>
                <div className="font-semibold text-foreground">{theater.revenue}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Occupancy</div>
                <div className={`font-semibold ${getOccupancyColor(theater.occupancy)}`}>
                  {theater.occupancy}%
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Bookings</div>
                <div className="font-semibold text-foreground">{theater.bookings}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Rating</div>
                <div className="flex items-center justify-end">
                  <Icon name="Star" size={14} color="var(--color-cinema-gold)" className="mr-1" />
                  <span className="font-semibold text-foreground">{theater.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {sortedTheaters.length} of 156 theaters
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Filter" size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={16} className="mr-2" />
            Actions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TheaterPerformance;
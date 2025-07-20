import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentBookings = () => {
  const [filter, setFilter] = useState('all');

  const recentBookings = [
    {
      id: "BK-2025-001247",
      customer: "Sarah Johnson",
      movie: "Guardians of the Galaxy Vol. 3",
      theater: "AMC Times Square",
      showtime: "7:30 PM",
      seats: "A12, A13",
      amount: "$28.50",
      status: "confirmed",
      timestamp: "2 minutes ago",
      paymentMethod: "Credit Card"
    },
    {
      id: "BK-2025-001246",
      customer: "Michael Chen",
      movie: "Spider-Man: Across the Spider-Verse",
      theater: "Regal Union Square",
      showtime: "9:15 PM",
      seats: "F8, F9, F10",
      amount: "$42.75",
      status: "confirmed",
      timestamp: "5 minutes ago",
      paymentMethod: "PayPal"
    },
    {
      id: "BK-2025-001245",
      customer: "Emily Rodriguez",
      movie: "The Flash",
      theater: "Cinemark Downtown",
      showtime: "6:00 PM",
      seats: "D15",
      amount: "$14.25",
      status: "pending",
      timestamp: "8 minutes ago",
      paymentMethod: "Credit Card"
    },
    {
      id: "BK-2025-001244",
      customer: "David Wilson",
      movie: "Transformers: Rise of the Beasts",
      theater: "AMC Lincoln Center",
      showtime: "8:45 PM",
      seats: "G5, G6",
      amount: "$31.00",
      status: "cancelled",
      timestamp: "12 minutes ago",
      paymentMethod: "Debit Card"
    },
    {
      id: "BK-2025-001243",
      customer: "Lisa Thompson",
      movie: "Indiana Jones 5",
      theater: "Regal Battery Park",
      showtime: "5:30 PM",
      seats: "B20, B21, B22, B23",
      amount: "$57.00",
      status: "confirmed",
      timestamp: "15 minutes ago",
      paymentMethod: "Credit Card"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const filteredBookings = filter === 'all' 
    ? recentBookings 
    : recentBookings.filter(booking => booking.status === filter);

  const filterOptions = [
    { value: 'all', label: 'All Bookings', count: recentBookings.length },
    { value: 'confirmed', label: 'Confirmed', count: recentBookings.filter(b => b.status === 'confirmed').length },
    { value: 'pending', label: 'Pending', count: recentBookings.filter(b => b.status === 'pending').length },
    { value: 'cancelled', label: 'Cancelled', count: recentBookings.filter(b => b.status === 'cancelled').length }
  ];

  return (
    <div className="bg-card rounded-xl p-6 premium-shadow border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Recent Bookings</h3>
          <p className="text-muted-foreground text-sm">Latest ticket bookings and transactions</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(option.value)}
              className="text-xs"
            >
              {option.label}
              <span className="ml-1 px-1.5 py-0.5 bg-muted rounded text-xs">
                {option.count}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border ${getStatusColor(booking.status)}`}>
                <Icon 
                  name={getStatusIcon(booking.status)} 
                  size={20}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground">{booking.customer}</h4>
                  <span className="text-xs text-muted-foreground">#{booking.id}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{booking.movie}</p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {booking.theater}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Clock" size={12} className="mr-1" />
                    {booking.showtime}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Armchair" size={12} className="mr-1" />
                    {booking.seats}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-foreground">{booking.amount}</div>
              <div className="text-xs text-muted-foreground">{booking.paymentMethod}</div>
              <div className="text-xs text-muted-foreground mt-1">{booking.timestamp}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
          View All Bookings
        </button>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentBookings;
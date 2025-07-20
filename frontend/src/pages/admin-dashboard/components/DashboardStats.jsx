import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      title: "Total Bookings Today",
      value: "2,847",
      change: "+12.5%",
      changeType: "increase",
      icon: "Ticket",
      color: "bg-electric-blue"
    },
    {
      id: 2,
      title: "Revenue (24h)",
      value: "$45,230",
      change: "+8.2%",
      changeType: "increase",
      icon: "DollarSign",
      color: "bg-cinema-gold"
    },
    {
      id: 3,
      title: "Active Theaters",
      value: "156",
      change: "+3",
      changeType: "increase",
      icon: "Building",
      color: "bg-success"
    },
    {
      id: 4,
      title: "Customer Support",
      value: "23",
      change: "-15%",
      changeType: "decrease",
      icon: "MessageCircle",
      color: "bg-conversion-orange"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-card rounded-xl p-6 premium-shadow border border-border hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
              <Icon 
                name={stat.icon} 
                size={24} 
                color="#FFFFFF"
              />
            </div>
            <div className={`flex items-center text-sm font-medium ${
              stat.changeType === 'increase' ? 'text-success' : 'text-destructive'
            }`}>
              <Icon 
                name={stat.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className="mr-1"
              />
              {stat.change}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
            <p className="text-muted-foreground text-sm">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
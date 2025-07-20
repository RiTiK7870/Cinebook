import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: "Add New Movie",
      description: "Upload movie details and showtimes",
      icon: "Plus",
      color: "bg-electric-blue",
      action: () => console.log('Add new movie')
    },
    {
      id: 2,
      title: "Manage Theaters",
      description: "Update theater information and capacity",
      icon: "Building",
      color: "bg-cinema-gold",
      action: () => console.log('Manage theaters')
    },
    {
      id: 3,
      title: "Process Refunds",
      description: "Handle customer refund requests",
      icon: "RefreshCw",
      color: "bg-conversion-orange",
      action: () => console.log('Process refunds')
    },
    {
      id: 4,
      title: "Support Tickets",
      description: "Review and respond to customer issues",
      icon: "MessageCircle",
      color: "bg-success",
      action: () => console.log('Support tickets')
    },
    {
      id: 5,
      title: "Analytics Report",
      description: "Generate detailed performance reports",
      icon: "BarChart3",
      color: "bg-purple-500",
      action: () => console.log('Analytics report')
    },
    {
      id: 6,
      title: "User Management",
      description: "Manage customer accounts and permissions",
      icon: "Users",
      color: "bg-pink-500",
      action: () => console.log('User management')
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "warning",
      message: "Theater maintenance scheduled for AMC Lincoln Center",
      time: "10 minutes ago"
    },
    {
      id: 2,
      type: "success",
      message: "New theater partner onboarded successfully",
      time: "1 hour ago"
    },
    {
      id: 3,
      type: "error",
      message: "Payment gateway experiencing delays",
      time: "2 hours ago"
    }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card rounded-xl p-6 premium-shadow border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Quick Actions</h3>
            <p className="text-muted-foreground text-sm">Frequently used admin functions</p>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Customize
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="ghost"
              className="h-auto p-4 flex flex-col items-start space-y-3 hover:bg-muted/50 transition-colors duration-200"
              onClick={action.action}
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                <Icon 
                  name={action.icon} 
                  size={20} 
                  color="#FFFFFF"
                />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-foreground mb-1">{action.title}</h4>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-card rounded-xl p-6 premium-shadow border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Recent Alerts</h3>
            <p className="text-muted-foreground text-sm">System notifications and updates</p>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="Bell" size={16} className="mr-2" />
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <Icon 
                name={getAlertIcon(alert.type)} 
                size={20} 
                className={getAlertColor(alert.type)}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="X" size={16} />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" className="w-full text-sm">
            <Icon name="Archive" size={16} className="mr-2" />
            Clear All Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
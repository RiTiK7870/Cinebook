import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'booking':
        return 'Ticket';
      case 'review':
        return 'Star';
      case 'wishlist':
        return 'Heart';
      case 'friend':
        return 'Users';
      case 'achievement':
        return 'Award';
      case 'recommendation':
        return 'Sparkles';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'booking':
        return 'text-conversion-orange';
      case 'review':
        return 'text-cinema-gold';
      case 'wishlist':
        return 'text-red-500';
      case 'friend':
        return 'text-electric-blue';
      case 'achievement':
        return 'text-purple-500';
      case 'recommendation':
        return 'text-green-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card rounded-xl p-6 premium-shadow border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            {/* Activity Icon */}
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Icon 
                  name={getActivityIcon(activity.type)} 
                  size={16} 
                  className={getActivityColor(activity.type)}
                />
              </div>
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.action}</span>
                    {activity.movieTitle && (
                      <span className="text-muted-foreground"> for </span>
                    )}
                    {activity.movieTitle && (
                      <span className="font-medium text-cinema-gold">{activity.movieTitle}</span>
                    )}
                  </p>
                  
                  {activity.details && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.details}
                    </p>
                  )}

                  {activity.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < activity.rating ? 'text-cinema-gold fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>

              {/* Movie Poster for certain activities */}
              {activity.moviePoster && (
                <div className="mt-2">
                  <div className="w-12 h-16 rounded overflow-hidden">
                    <Image
                      src={activity.moviePoster}
                      alt={activity.movieTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Achievement Badge */}
              {activity.type === 'achievement' && activity.badge && (
                <div className="mt-2 inline-flex items-center gap-2 bg-purple-500/10 text-purple-500 px-2 py-1 rounded-full text-xs font-medium">
                  <Icon name="Award" size={12} />
                  <span>{activity.badge}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start booking movies to see your activity here
            </p>
          </div>
        )}
      </div>

      {activities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="text-sm text-electric-blue hover:text-blue-600 font-medium transition-colors duration-200">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
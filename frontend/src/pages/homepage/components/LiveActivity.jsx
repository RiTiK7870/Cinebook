import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LiveActivity = () => {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mockActivities = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      action: "just booked",
      movie: "Dune: Part Two",
      theater: "AMC Downtown",
      time: "2 minutes ago",
      seats: "2 tickets"
    },
    {
      id: 2,
      user: "Mike Chen",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      action: "rated",
      movie: "Oppenheimer",
      theater: "Regal Cinema",
      time: "5 minutes ago",
      rating: 5
    },
    {
      id: 3,
      user: "Emma Davis",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      action: "just booked",
      movie: "Spider-Man: Across the Spider-Verse",
      theater: "Cinemark XD",
      time: "8 minutes ago",
      seats: "4 tickets"
    },
    {
      id: 4,
      user: "Alex Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      action: "added to wishlist",
      movie: "The Batman",
      theater: "IMAX Theater",
      time: "12 minutes ago"
    },
    {
      id: 5,
      user: "Lisa Wang",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg",
      action: "just booked",
      movie: "Top Gun: Maverick",
      theater: "AMC IMAX",
      time: "15 minutes ago",
      seats: "3 tickets"
    },
    {
      id: 6,
      user: "David Kim",
      avatar: "https://randomuser.me/api/portraits/men/29.jpg",
      action: "reviewed",
      movie: "Everything Everywhere All at Once",
      theater: "Local Cinema",
      time: "18 minutes ago",
      rating: 4
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, activities.length - 2));
    }, 4000);

    return () => clearInterval(interval);
  }, [activities.length]);

  const getActionIcon = (action) => {
    switch (action) {
      case 'just booked':
        return 'Ticket';
      case 'rated': case'reviewed':
        return 'Star';
      case 'added to wishlist':
        return 'Heart';
      default:
        return 'Activity';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'just booked':
        return 'text-conversion-orange';
      case 'rated': case'reviewed':
        return 'text-cinema-gold';
      case 'added to wishlist':
        return 'text-red-500';
      default:
        return 'text-electric-blue';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={`${
          i < rating ? 'text-cinema-gold fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (activities.length === 0) {
    return null;
  }

  const visibleActivities = activities.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-conversion-orange rounded-full animate-pulse"></div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Live Activity
            </h2>
            <div className="w-2 h-2 bg-conversion-orange rounded-full animate-pulse"></div>
          </div>
          <p className="text-muted-foreground">
            See what movie lovers are doing right now
          </p>
        </div>

        {/* Activity Feed */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {visibleActivities.map((activity, index) => (
              <div
                key={`${activity.id}-${currentIndex}`}
                className="bg-card rounded-xl p-6 premium-shadow fade-in-up"
                style={{ '--index': index }}
              >
                <div className="flex items-center space-x-4">
                  {/* User Avatar */}
                  <div className="relative">
                    <Image
                      src={activity.avatar}
                      alt={activity.user}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                      getActionColor(activity.action).replace('text-', 'bg-')
                    }`}>
                      <Icon
                        name={getActionIcon(activity.action)}
                        size={10}
                        color="white"
                      />
                    </div>
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-1 text-sm">
                      <span className="font-semibold text-foreground">
                        {activity.user}
                      </span>
                      <span className={`font-medium ${getActionColor(activity.action)}`}>
                        {activity.action}
                      </span>
                      <span className="font-semibold text-foreground">
                        {activity.movie}
                      </span>
                      {activity.theater && (
                        <>
                          <span className="text-muted-foreground">at</span>
                          <span className="text-foreground">{activity.theater}</span>
                        </>
                      )}
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-center space-x-4 mt-2">
                      {activity.seats && (
                        <div className="flex items-center space-x-1 text-muted-foreground text-xs">
                          <Icon name="Users" size={12} />
                          <span>{activity.seats}</span>
                        </div>
                      )}
                      
                      {activity.rating && (
                        <div className="flex items-center space-x-1">
                          {renderStars(activity.rating)}
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1 text-muted-foreground text-xs">
                        <Icon name="Clock" size={12} />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-none">
                    <button className="text-electric-blue hover:text-blue-600 transition-colors duration-200">
                      <Icon name="ExternalLink" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-conversion-orange mb-1">
                1,247
              </div>
              <div className="text-sm text-muted-foreground">
                Tickets booked today
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-cinema-gold mb-1">
                89
              </div>
              <div className="text-sm text-muted-foreground">
                Movies reviewed
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-electric-blue mb-1">
                456
              </div>
              <div className="text-sm text-muted-foreground">
                Active users
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">
                24
              </div>
              <div className="text-sm text-muted-foreground">
                Theaters online
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveActivity;
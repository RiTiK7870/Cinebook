import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BookingCard from './components/BookingCard';
import WishlistCard from './components/WishlistCard';
import RecommendationCard from './components/RecommendationCard';
import StatsCard from './components/StatsCard';
import ActivityFeed from './components/ActivityFeed';
import LoyaltyCard from './components/LoyaltyCard';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      memberSince: "2022-03-15",
      location: "New York, NY",
      preferences: {
        genres: ["Action", "Sci-Fi", "Thriller"],
        theaters: ["AMC Empire 25", "Regal Union Square"],
        notifications: {
          newReleases: true,
          friendActivity: true,
          bookingReminders: true,
          promotions: false
        }
      }
    };
    setUser(mockUser);
  }, []);

  // Mock bookings data
  const upcomingBookings = [
    {
      id: 1,
      movieId: "movie-1",
      movieTitle: "Dune: Part Two",
      moviePoster: "https://images.unsplash.com/photo-1489599511986-c2e3b3c5b5e1?w=300&h=450&fit=crop",
      date: "2025-07-15",
      time: "19:30",
      theater: "AMC Empire 25 - Theater 7",
      seats: ["H12", "H13"],
      totalAmount: 28.50,
      status: "confirmed",
      bookingId: "BK2025071501"
    },
    {
      id: 2,
      movieId: "movie-2",
      movieTitle: "The Batman",
      moviePoster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
      date: "2025-07-18",
      time: "21:00",
      theater: "Regal Union Square - Theater 3",
      seats: ["F8"],
      totalAmount: 15.75,
      status: "confirmed",
      bookingId: "BK2025071802"
    }
  ];

  const pastBookings = [
    {
      id: 3,
      movieId: "movie-3",
      movieTitle: "Oppenheimer",
      moviePoster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
      date: "2025-07-10",
      time: "18:00",
      theater: "AMC Empire 25 - Theater 12",
      seats: ["G15", "G16"],
      totalAmount: 32.00,
      status: "completed",
      bookingId: "BK2025071003"
    }
  ];

  // Mock wishlist data
  const wishlistMovies = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
      releaseDate: "2025-12-16",
      duration: 192,
      rating: "PG-13",
      genres: ["Action", "Adventure", "Sci-Fi"],
      director: "James Cameron",
      notificationsEnabled: true
    },
    {
      id: 2,
      title: "Spider-Man: Across the Spider-Verse",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
      releaseDate: "2025-06-02",
      duration: 140,
      rating: "PG",
      genres: ["Animation", "Action", "Adventure"],
      director: "Joaquim Dos Santos",
      notificationsEnabled: false
    }
  ];

  // Mock recommendations data
  const recommendations = [
    {
      id: 1,
      title: "Top Gun: Maverick",
      poster: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=300&h=450&fit=crop",
      year: 2022,
      duration: 130,
      rating: 8.7,
      reviewCount: 1250,
      genres: ["Action", "Drama"],
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
      matchPercentage: 95
    },
    {
      id: 2,
      title: "Everything Everywhere All at Once",
      poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop",
      year: 2022,
      duration: 139,
      rating: 8.1,
      reviewCount: 890,
      genres: ["Action", "Adventure", "Comedy"],
      description: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have lived.",
      matchPercentage: 88
    }
  ];

  // Mock activity data
  const recentActivities = [
    {
      id: 1,
      type: "booking",
      action: "Booked tickets",
      movieTitle: "Dune: Part Two",
      moviePoster: "https://images.unsplash.com/photo-1489599511986-c2e3b3c5b5e1?w=300&h=450&fit=crop",
      details: "2 tickets for July 15, 7:30 PM",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: 2,
      type: "review",
      action: "Reviewed",
      movieTitle: "Oppenheimer",
      rating: 5,
      details: "Absolutely brilliant filmmaking!",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      id: 3,
      type: "wishlist",
      action: "Added to wishlist",
      movieTitle: "Avatar: The Way of Water",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      id: 4,
      type: "achievement",
      action: "Earned achievement",
      badge: "Movie Buff",
      details: "Watched 10 movies this month",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    }
  ];

  // Mock loyalty data
  const loyaltyData = {
    currentTier: "Gold",
    points: 2850,
    nextTierPoints: 5000,
    pointsToNextTier: 2150,
    benefits: [
      "Free popcorn upgrade",
      "Priority booking access",
      "Exclusive movie previews",
      "10% discount on concessions"
    ],
    recentEarnings: [
      { description: "Booked Dune: Part Two", points: 25 },
      { description: "Reviewed Oppenheimer", points: 10 },
      { description: "Friend referral bonus", points: 50 }
    ],
    availableRewards: [
      { title: "Free Movie Ticket", points: 500 },
      { title: "Large Popcorn & Drink", points: 200 },
      { title: "Premium Seat Upgrade", points: 300 },
      { title: "$10 Concession Credit", points: 400 }
    ]
  };

  // Mock stats data
  const userStats = [
    {
      icon: "Film",
      title: "Movies Watched",
      value: "47",
      subtitle: "This year",
      trend: "up",
      trendValue: "+12%",
      color: "cinema-gold"
    },
    {
      icon: "Star",
      title: "Average Rating",
      value: "4.2",
      subtitle: "Your reviews",
      trend: "up",
      trendValue: "+0.3",
      color: "electric-blue"
    },
    {
      icon: "Heart",
      title: "Wishlist Items",
      value: "23",
      subtitle: "Upcoming releases",
      trend: "stable",
      trendValue: "0%",
      color: "conversion-orange"
    },
    {
      icon: "Users",
      title: "Friends",
      value: "156",
      subtitle: "Movie buddies",
      trend: "up",
      trendValue: "+8",
      color: "success"
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'LayoutDashboard' },
    { id: 'bookings', name: 'My Bookings', icon: 'Ticket' },
    { id: 'wishlist', name: 'Wishlist', icon: 'Heart' },
    { id: 'recommendations', name: 'For You', icon: 'Sparkles' },
    { id: 'loyalty', name: 'Rewards', icon: 'Crown' },
    { id: 'settings', name: 'Settings', icon: 'Settings' }
  ];

  const handleRemoveFromWishlist = (movieId) => {
    console.log('Remove from wishlist:', movieId);
  };

  const handleToggleNotifications = (movieId) => {
    console.log('Toggle notifications for:', movieId);
  };

  const handleAddToWishlist = (movieId) => {
    console.log('Add to wishlist:', movieId);
  };

  const handleDismissRecommendation = (movieId) => {
    console.log('Dismiss recommendation:', movieId);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cinema-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-cinema-black via-gray-900 to-cinema-black py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* User Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-cinema-gold/20">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-cinema-gold rounded-full flex items-center justify-center">
                  <Icon name="Crown" size={16} className="text-cinema-black" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-gray-300 mb-4">
                  Member since {new Date(user.memberSince).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })} • {user.location}
                </p>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-cinema-gold/20 text-cinema-gold rounded-full text-sm font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <Link to="/movie-detail">
                  <Button
                    variant="default"
                    className="bg-conversion-orange hover:bg-orange-600 text-white font-medium"
                  >
                    <Icon name="Search" size={18} className="mr-2" />
                    Find Movies
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-cinema-gold text-cinema-gold hover:bg-cinema-gold hover:text-cinema-black"
                  onClick={() => setActiveTab('settings')}
                >
                  <Icon name="Settings" size={18} className="mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-card border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-cinema-gold text-cinema-gold' :'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <Icon name={tab.icon} size={18} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userStats.map((stat, index) => (
                  <StatsCard key={index} {...stat} />
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Upcoming Bookings */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-foreground">Upcoming Movies</h2>
                      <Button
                        variant="ghost"
                        onClick={() => setActiveTab('bookings')}
                        className="text-electric-blue hover:text-blue-600"
                      >
                        View All
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {upcomingBookings.slice(0, 2).map((booking) => (
                        <BookingCard key={booking.id} booking={booking} type="upcoming" />
                      ))}
                      {upcomingBookings.length === 0 && (
                        <div className="text-center py-12 bg-card rounded-xl border border-border">
                          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-foreground mb-2">No upcoming bookings</h3>
                          <p className="text-muted-foreground mb-4">Ready for your next movie adventure?</p>
                          <Link to="/movie-detail">
                            <Button variant="default" className="bg-conversion-orange hover:bg-orange-600 text-white">
                              <Icon name="Search" size={16} className="mr-2" />
                              Browse Movies
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-foreground">Recommended for You</h2>
                      <Button
                        variant="ghost"
                        onClick={() => setActiveTab('recommendations')}
                        className="text-electric-blue hover:text-blue-600"
                      >
                        View All
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {recommendations.slice(0, 2).map((movie) => (
                        <RecommendationCard
                          key={movie.id}
                          movie={movie}
                          reason="Based on your genre preferences"
                          onAddToWishlist={handleAddToWishlist}
                          onDismiss={handleDismissRecommendation}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Activity Feed */}
                  <ActivityFeed activities={recentActivities} />

                  {/* Quick Wishlist */}
                  <div className="bg-card rounded-xl p-6 premium-shadow border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Your Wishlist</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTab('wishlist')}
                        className="text-electric-blue hover:text-blue-600"
                      >
                        View All
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {wishlistMovies.slice(0, 3).map((movie) => (
                        <div key={movie.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                          <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={movie.poster}
                              alt={movie.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground text-sm truncate">{movie.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              {new Date(movie.releaseDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                          <Icon 
                            name={movie.notificationsEnabled ? "BellRing" : "Bell"} 
                            size={16} 
                            className={movie.notificationsEnabled ? "text-cinema-gold" : "text-muted-foreground"}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">My Bookings</h2>
                <Link to="/movie-detail">
                  <Button
                    variant="default"
                    className="bg-conversion-orange hover:bg-orange-600 text-white font-medium"
                  >
                    <Icon name="Plus" size={18} className="mr-2" />
                    Book New Movie
                  </Button>
                </Link>
              </div>

              {/* Upcoming Bookings */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Calendar" size={20} className="text-electric-blue" />
                  Upcoming ({upcomingBookings.length})
                </h3>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} type="upcoming" />
                  ))}
                </div>
              </div>

              {/* Past Bookings */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="History" size={20} className="text-muted-foreground" />
                  Past Bookings ({pastBookings.length})
                </h3>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} type="past" />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">My Wishlist</h2>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {wishlistMovies.length} movie{wishlistMovies.length !== 1 ? 's' : ''}
                  </span>
                  <Link to="/movie-detail">
                    <Button
                      variant="outline"
                      className="border-cinema-gold text-cinema-gold hover:bg-cinema-gold hover:text-cinema-black"
                    >
                      <Icon name="Search" size={18} className="mr-2" />
                      Browse Movies
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistMovies.map((movie) => (
                  <WishlistCard
                    key={movie.id}
                    movie={movie}
                    onRemove={handleRemoveFromWishlist}
                    onNotify={handleToggleNotifications}
                  />
                ))}
              </div>

              {wishlistMovies.length === 0 && (
                <div className="text-center py-16">
                  <Icon name="Heart" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Start adding movies you want to watch to keep track of upcoming releases
                  </p>
                  <Link to="/movie-detail">
                    <Button
                      variant="default"
                      className="bg-conversion-orange hover:bg-orange-600 text-white font-medium"
                    >
                      <Icon name="Search" size={18} className="mr-2" />
                      Discover Movies
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Recommended for You</h2>
                <Button
                  variant="outline"
                  onClick={() => console.log('Refresh recommendations')}
                >
                  <Icon name="RefreshCw" size={18} className="mr-2" />
                  Refresh
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((movie) => (
                  <RecommendationCard
                    key={movie.id}
                    movie={movie}
                    reason="Based on your genre preferences"
                    onAddToWishlist={handleAddToWishlist}
                    onDismiss={handleDismissRecommendation}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Loyalty Tab */}
          {activeTab === 'loyalty' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Loyalty & Rewards</h2>
                <Button
                  variant="outline"
                  onClick={() => console.log('View program details')}
                >
                  <Icon name="Info" size={18} className="mr-2" />
                  Program Details
                </Button>
              </div>

              <LoyaltyCard loyaltyData={loyaltyData} />
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-foreground">Account Settings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Settings */}
                <div className="bg-card rounded-xl p-6 premium-shadow border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="User" size={20} className="text-cinema-gold" />
                    Profile Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <div className="p-3 bg-muted rounded-lg text-foreground">{user.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <div className="p-3 bg-muted rounded-lg text-foreground">{user.email}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                      <div className="p-3 bg-muted rounded-lg text-foreground">{user.location}</div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Icon name="Edit" size={16} className="mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-card rounded-xl p-6 premium-shadow border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Bell" size={20} className="text-electric-blue" />
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(user.preferences.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                          value ? 'bg-cinema-gold' : 'bg-muted'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5 ${
                            value ? 'translate-x-6' : 'translate-x-0.5'
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preferred Genres */}
                <div className="bg-card rounded-xl p-6 premium-shadow border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Tag" size={20} className="text-conversion-orange" />
                    Preferred Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-2 bg-cinema-gold/20 text-cinema-gold rounded-lg text-sm font-medium flex items-center gap-2"
                      >
                        {genre}
                        <Icon name="X" size={14} className="cursor-pointer hover:text-cinema-gold/70" />
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add Genre
                  </Button>
                </div>

                {/* Account Actions */}
                <div className="bg-card rounded-xl p-6 premium-shadow border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Shield" size={20} className="text-red-500" />
                    Account & Security
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Key" size={16} className="mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Download" size={16} className="mr-2" />
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
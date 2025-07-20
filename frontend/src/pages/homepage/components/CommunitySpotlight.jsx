import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunitySpotlight = () => {
  const [activeTab, setActiveTab] = useState('reviews');

  const featuredReviews = [
    {
      id: 1,
      user: "MovieBuff2024",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      movie: "Dune: Part Two",
      rating: 5,
      review: `Absolutely spectacular! Denis Villeneuve has outdone himself with this sequel. The cinematography is breathtaking, and the sound design creates an immersive experience that makes you feel like you're on Arrakis. Hans Zimmer's score is phenomenal.`,
      likes: 234,
      helpful: 189,
      verified: true,
      date: "2024-03-15"
    },
    {
      id: 2,
      user: "CinemaLover",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg",
      movie: "Oppenheimer",
      rating: 4,
      review: `Christopher Nolan delivers another masterpiece. The practical effects and IMAX cinematography are stunning. Cillian Murphy's performance is career-defining. A must-watch in theaters for the full experience.`,
      likes: 156,
      helpful: 142,
      verified: true,
      date: "2024-03-12"
    },
    {
      id: 3,
      user: "FilmCritic_Pro",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
      movie: "Spider-Man: Across the Spider-Verse",
      rating: 5,
      review: `Animation perfection! Every frame is a work of art. The multiverse concept is executed flawlessly, and the emotional depth of Miles' journey is incredible. This sets a new standard for animated films.`,
      likes: 298,
      helpful: 267,
      verified: true,
      date: "2024-03-10"
    }
  ];

  const discussions = [
    {
      id: 1,
      title: "Best IMAX experiences in 2024",
      author: "TechFilmFan",
      replies: 45,
      lastActivity: "2 hours ago",
      category: "Technology",
      trending: true
    },
    {
      id: 2,
      title: "Underrated sci-fi movies you should watch",
      author: "SciFiExplorer",
      replies: 78,
      lastActivity: "4 hours ago",
      category: "Recommendations",
      trending: false
    },
    {
      id: 3,
      title: "Christopher Nolan\'s cinematography evolution",
      author: "CinemaStudent",
      replies: 23,
      lastActivity: "6 hours ago",
      category: "Analysis",
      trending: true
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={`${
          i < rating ? 'text-cinema-gold fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Community Spotlight
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover what fellow movie enthusiasts are saying and join the conversation
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-lg p-1 inline-flex">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'reviews' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Featured Reviews
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'discussions' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Hot Discussions
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'reviews' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredReviews.map((review) => (
                <div key={review.id} className="bg-card rounded-xl p-6 premium-shadow">
                  {/* Review Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <Image
                      src={review.avatar}
                      alt={review.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-foreground truncate">
                          {review.user}
                        </h4>
                        {review.verified && (
                          <Icon name="CheckCircle" size={14} className="text-electric-blue" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(review.date)}
                      </p>
                    </div>
                  </div>

                  {/* Movie & Rating */}
                  <div className="mb-4">
                    <h5 className="font-semibold text-foreground mb-2">
                      {review.movie}
                    </h5>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-4">
                    {review.review}
                  </p>

                  {/* Review Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={14} />
                        <span>{review.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="ThumbsUp" size={14} />
                        <span>{review.helpful}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-electric-blue hover:text-blue-600"
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'discussions' && (
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="bg-card rounded-xl p-6 premium-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-foreground text-lg">
                          {discussion.title}
                        </h4>
                        {discussion.trending && (
                          <span className="bg-conversion-orange text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Trending
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <span>by {discussion.author}</span>
                        <span className="bg-muted px-2 py-1 rounded text-xs">
                          {discussion.category}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="MessageCircle" size={14} />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{discussion.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-4"
                    >
                      Join Discussion
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-cinema-black to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Join the CineBook Pro Community
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Share your movie experiences, discover hidden gems, and connect with fellow film enthusiasts from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/user-dashboard">
                <Button
                  variant="default"
                  className="bg-cinema-gold hover:bg-yellow-600 text-cinema-black font-semibold"
                >
                  <Icon name="Users" size={16} className="mr-2" />
                  Join Community
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-cinema-black"
              >
                <Icon name="Edit" size={16} className="mr-2" />
                Write a Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySpotlight;
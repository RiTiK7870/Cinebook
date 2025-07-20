import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationSection = ({ recommendations }) => {
  const [activeFilter, setActiveFilter] = useState('similar');
  const navigate = useNavigate();

  const filters = [
    { id: 'similar', name: 'Similar Movies', icon: 'Film' },
    { id: 'director', name: 'Same Director', icon: 'User' },
    { id: 'genre', name: 'Same Genre', icon: 'Tag' },
    { id: 'trending', name: 'Trending Now', icon: 'TrendingUp' }
  ];

  const filteredRecommendations = recommendations.filter(movie => 
    movie.category === activeFilter
  );

  const handleMovieClick = (movieId) => {
    // In a real app, this would navigate to the specific movie detail page
    navigate('/movie-detail', { state: { movieId } });
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-cinema-black">You Might Also Like</h3>
        <Button
          variant="outline"
          iconName="ExternalLink"
          iconPosition="left"
        >
          View All
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              activeFilter === filter.id
                ? 'bg-cinema-gold text-cinema-black font-semibold' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon name={filter.icon} size={16} />
            <span>{filter.name}</span>
          </button>
        ))}
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRecommendations.slice(0, 8).map((movie) => (
          <div
            key={movie.id}
            className="group cursor-pointer"
            onClick={() => handleMovieClick(movie.id)}
          >
            <div className="relative overflow-hidden rounded-xl mb-3 movie-card-hover">
              <Image
                src={movie.poster}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} color="#D4AF37" className="fill-current" />
                      <span className="text-white text-sm font-medium">{movie.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} color="white" />
                      <span className="text-white text-sm">{movie.duration}</span>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full bg-conversion-orange hover:bg-orange-600 text-white"
                    iconName="Play"
                    iconPosition="left"
                  >
                    Watch Trailer
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                  <Icon name="Heart" size={16} />
                </button>
                <button className="w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                  <Icon name="Bookmark" size={16} />
                </button>
                <button className="w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                  <Icon name="Share2" size={16} />
                </button>
              </div>

              {/* Genre Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-cinema-gold text-cinema-black text-xs font-semibold rounded-full">
                  {movie.genre}
                </span>
              </div>
            </div>

            {/* Movie Info */}
            <div className="space-y-2">
              <h4 className="font-semibold text-cinema-black group-hover:text-cinema-gold transition-colors line-clamp-2">
                {movie.title}
              </h4>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{movie.year}</span>
                <span className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{movie.ageRating}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} color="#D4AF37" className="fill-current" />
                  <span className="text-sm font-medium">{movie.rating}/5</span>
                </div>
                <span className="text-sm text-gray-500">({movie.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button
          variant="outline"
          className="px-8 py-3"
          iconName="MoreHorizontal"
          iconPosition="left"
        >
          Load More Recommendations
        </Button>
      </div>

      {/* Personalization Notice */}
      <div className="mt-6 p-4 bg-electric-blue/10 border border-electric-blue/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} color="#00A8FF" />
          <div>
            <h4 className="font-semibold text-cinema-black mb-1">Personalized for You</h4>
            <p className="text-sm text-gray-600">
              These recommendations are based on your viewing history, ratings, and preferences. 
              Rate more movies to get better suggestions!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationSection;
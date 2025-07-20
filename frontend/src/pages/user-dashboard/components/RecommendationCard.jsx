import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ movie, reason, onAddToWishlist, onDismiss }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-cinema-gold fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="StarHalf" size={14} className="text-cinema-gold fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  const getReasonIcon = (reason) => {
    switch (reason) {
      case 'Similar to your favorites':
        return 'Heart';
      case 'Trending in your area':
        return 'TrendingUp';
      case 'Based on your genre preferences':
        return 'Tag';
      case 'Highly rated by similar users':
        return 'Users';
      case 'New release':
        return 'Sparkles';
      default:
        return 'Star';
    }
  };

  const getReasonColor = (reason) => {
    switch (reason) {
      case 'Similar to your favorites':
        return 'text-red-500';
      case 'Trending in your area':
        return 'text-electric-blue';
      case 'Based on your genre preferences':
        return 'text-cinema-gold';
      case 'Highly rated by similar users':
        return 'text-green-500';
      case 'New release':
        return 'text-purple-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden premium-shadow hover:shadow-lg transition-all duration-300 border border-border group">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Recommendation Reason Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Icon 
              name={getReasonIcon(reason)} 
              size={12} 
              className={getReasonColor(reason)}
            />
            <span className="hidden sm:inline">{reason}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white"
            onClick={() => onAddToWishlist(movie.id)}
          >
            <Icon name="Plus" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white"
            onClick={() => onDismiss(movie.id)}
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Rating Overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Icon name="Star" size={12} className="text-cinema-gold fill-current" />
            <span>{movie.rating}</span>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
          {movie.title}
        </h3>

        <div className="space-y-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={14} />
            <span>{movie.year}</span>
            <span className="mx-2">•</span>
            <Icon name="Clock" size={14} />
            <span>{movie.duration} min</span>
          </div>

          <div className="flex items-center gap-2">
            <Icon name="Tag" size={14} />
            <span className="line-clamp-1">{movie.genres.join(', ')}</span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(movie.rating)}
            </div>
            <span className="text-xs">({movie.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Movie Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {movie.description}
        </p>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link to="/movie-detail" className="block">
            <Button
              variant="default"
              className="w-full bg-conversion-orange hover:bg-orange-600 text-white font-medium"
            >
              <Icon name="Play" size={16} className="mr-2" />
              Watch Trailer
            </Button>
          </Link>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onAddToWishlist(movie.id)}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Wishlist
            </Button>
            
            <Link to="/movie-detail" className="flex-1">
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground"
              >
                <Icon name="Info" size={16} className="mr-2" />
                Details
              </Button>
            </Link>
          </div>
        </div>

        {/* Match Percentage */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Match for you</span>
            <div className="flex items-center gap-1">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cinema-gold rounded-full transition-all duration-300"
                  style={{ width: `${movie.matchPercentage}%` }}
                ></div>
              </div>
              <span className="text-cinema-gold font-medium ml-1">
                {movie.matchPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
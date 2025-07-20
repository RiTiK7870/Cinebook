import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WishlistCard = ({ movie, onRemove, onNotify }) => {
  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilRelease = (dateString) => {
    const releaseDate = new Date(dateString);
    const today = new Date();
    const diffTime = releaseDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilRelease = getDaysUntilRelease(movie.releaseDate);
  const isReleased = daysUntilRelease <= 0;

  return (
    <div className="bg-card rounded-xl overflow-hidden premium-shadow hover:shadow-lg transition-all duration-300 border border-border group">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Release Status Overlay */}
        <div className="absolute top-3 left-3">
          {isReleased ? (
            <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
              Now Playing
            </span>
          ) : (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              {daysUntilRelease} days left
            </span>
          )}
        </div>

        {/* Remove from Wishlist */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white"
          onClick={() => onRemove(movie.id)}
        >
          <Icon name="X" size={16} />
        </Button>

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute bottom-3 right-3 ${
            movie.notificationsEnabled 
              ? 'bg-cinema-gold text-cinema-black' :'bg-black/50 hover:bg-black/70 text-white'
          }`}
          onClick={() => onNotify(movie.id)}
        >
          <Icon name={movie.notificationsEnabled ? "BellRing" : "Bell"} size={16} />
        </Button>
      </div>

      {/* Movie Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
          {movie.title}
        </h3>

        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={14} />
            <span>Release: {formatReleaseDate(movie.releaseDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Icon name="Clock" size={14} />
            <span>{movie.duration} min</span>
            <span className="mx-2">•</span>
            <span className="bg-muted px-2 py-0.5 rounded text-xs">
              {movie.rating}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Icon name="Tag" size={14} />
            <span className="line-clamp-1">{movie.genres.join(', ')}</span>
          </div>

          {movie.director && (
            <div className="flex items-center gap-2">
              <Icon name="User" size={14} />
              <span>Dir. {movie.director}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {isReleased ? (
            <Link to="/movie-detail" className="block">
              <Button
                variant="default"
                className="w-full bg-conversion-orange hover:bg-orange-600 text-white font-medium"
              >
                <Icon name="Ticket" size={16} className="mr-2" />
                Book Now
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => console.log('Set reminder for:', movie.title)}
            >
              <Icon name="Bell" size={16} className="mr-2" />
              Set Reminder
            </Button>
          )}

          <Link to="/movie-detail" className="block">
            <Button
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground"
            >
              <Icon name="Info" size={16} className="mr-2" />
              View Details
            </Button>
          </Link>
        </div>

        {/* Notification Preferences */}
        {movie.notificationsEnabled && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="BellRing" size={12} />
              <span>Notifications enabled for trailers & showtimes</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistCard;
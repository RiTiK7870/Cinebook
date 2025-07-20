import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MovieHero = ({ movie }) => {
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  const handleTrailerPlay = () => {
    setIsTrailerPlaying(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={movie.backdropImage}
          alt={`${movie.title} backdrop`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-black/90 via-cinema-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/80 via-transparent to-cinema-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Movie Information */}
            <div className="space-y-6">
              {/* Movie Title */}
              <div className="space-y-2">
                <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-tight">
                  {movie.title}
                </h1>
                <p className="text-xl text-cinema-gold font-medium">
                  {movie.tagline}
                </p>
              </div>

              {/* Movie Meta */}
              <div className="flex flex-wrap items-center gap-4 text-gray-300">
                <span className="flex items-center space-x-2">
                  <Icon name="Calendar" size={18} />
                  <span>{movie.releaseYear}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Icon name="Clock" size={18} />
                  <span>{movie.duration}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Icon name="Users" size={18} />
                  <span>{movie.rating}</span>
                </span>
                <div className="flex space-x-2">
                  {movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={20}
                        color={i < Math.floor(movie.userRating) ? "#D4AF37" : "#6B7280"}
                        className={i < Math.floor(movie.userRating) ? "fill-current" : ""}
                      />
                    ))}
                  </div>
                  <span className="text-white font-semibold">{movie.userRating}/5</span>
                  <span className="text-gray-400">({movie.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-cinema-gold font-semibold">IMDb:</span>
                  <span className="text-white">{movie.imdbRating}/10</span>
                </div>
              </div>

              {/* Synopsis */}
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                {movie.synopsis}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="default"
                  className="bg-conversion-orange hover:bg-orange-600 text-white font-semibold px-8 py-3 text-lg"
                  iconName="Ticket"
                  iconPosition="left"
                >
                  Book Tickets
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-cinema-black px-8 py-3 text-lg"
                  iconName="Play"
                  iconPosition="left"
                  onClick={handleTrailerPlay}
                >
                  Watch Trailer
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 px-6 py-3"
                  iconName="Heart"
                  iconPosition="left"
                >
                  Add to Wishlist
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 px-6 py-3"
                  iconName="Share2"
                  iconPosition="left"
                >
                  Share
                </Button>
              </div>
            </div>

            {/* Movie Poster */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="w-80 h-[480px] rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <Image
                    src={movie.posterImage}
                    alt={`${movie.title} poster`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Play Button Overlay */}
                {!isTrailerPlaying && (
                  <button
                    onClick={handleTrailerPlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name="Play" size={24} color="white" className="ml-1" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {isTrailerPlaying && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setIsTrailerPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-cinema-gold transition-colors"
            >
              <Icon name="X" size={32} />
            </button>
            <iframe
              src={movie.trailerUrl}
              title={`${movie.title} trailer`}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={32} color="white" />
      </div>
    </div>
  );
};

export default MovieHero;
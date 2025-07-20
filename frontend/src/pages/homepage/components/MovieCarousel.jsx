import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MovieCarousel = ({ title, movies, category }) => {
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 320;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {title}
            </h2>
            <p className="text-muted-foreground">
              {category === 'trending' && 'Most popular movies right now'}
              {category === 'recommended' && 'Handpicked just for you'}
              {category === 'opening' && 'Fresh releases this week'}
            </p>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        {/* Movies Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className="flex-none w-72 movie-card-hover"
                style={{ scrollSnapAlign: 'start' }}
                onMouseEnter={() => setHoveredMovie(movie.id)}
                onMouseLeave={() => setHoveredMovie(null)}
              >
                <div className="bg-card rounded-xl overflow-hidden premium-shadow">
                  {/* Movie Poster */}
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className={`absolute inset-0 bg-cinema-black/80 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredMovie === movie.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="text-center space-y-4">
                        <Button
                          variant="default"
                          className="bg-conversion-orange hover:bg-orange-600 text-white"
                        >
                          <Icon name="Play" size={16} className="mr-2" />
                          Watch Trailer
                        </Button>
                        <Link to="/movie-detail">
                          <Button
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-cinema-black w-full"
                          >
                            <Icon name="Info" size={16} className="mr-2" />
                            More Info
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 bg-cinema-black/80 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-cinema-gold fill-current" />
                        <span className="text-white text-sm font-semibold">
                          {formatRating(movie.rating)}
                        </span>
                      </div>
                    </div>

                    {/* New Badge */}
                    {movie.isNew && (
                      <div className="absolute top-3 right-3 bg-conversion-orange rounded-full px-2 py-1">
                        <span className="text-white text-xs font-bold">NEW</span>
                      </div>
                    )}
                  </div>

                  {/* Movie Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
                      {movie.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>{movie.year}</span>
                      <span>{formatDuration(movie.duration)}</span>
                      <span className="bg-muted px-2 py-1 rounded text-xs">
                        {movie.rating_category}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {movie.description}
                    </p>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {movie.genres.slice(0, 2).map((genre, idx) => (
                        <span
                          key={idx}
                          className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Link to="/movie-detail" className="flex-1">
                        <Button
                          variant="default"
                          className="w-full bg-conversion-orange hover:bg-orange-600 text-white"
                        >
                          <Icon name="Ticket" size={16} className="mr-2" />
                          Book Now
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        className="flex-none"
                        onClick={() => console.log('Add to wishlist:', movie.title)}
                      >
                        <Icon name="Heart" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center mt-6 space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link to="/movie-detail">
            <Button
              variant="outline"
              className="border-cinema-gold text-cinema-gold hover:bg-cinema-gold hover:text-cinema-black"
            >
              View All {title}
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MovieCarousel;
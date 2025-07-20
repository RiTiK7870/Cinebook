import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const heroMovies = [
    {
      id: 1,
      title: "Dune: Part Two",
      backdrop: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop",
      trailer: "https://www.youtube.com/embed/Way9Dexny3w",
      rating: 8.9,
      genre: "Sci-Fi, Adventure",
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      releaseDate: "2024-03-01"
    },
    {
      id: 2,
      title: "Oppenheimer",
      backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
      trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
      rating: 8.7,
      genre: "Biography, Drama",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      releaseDate: "2023-07-21"
    },
    {
      id: 3,
      title: "Spider-Man: Across the Spider-Verse",
      backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop",
      trailer: "https://www.youtube.com/embed/cqGjhVJWtEg",
      rating: 9.1,
      genre: "Animation, Action",
      description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People.",
      releaseDate: "2023-06-02"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, heroMovies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);
  };

  const currentMovie = heroMovies[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden bg-cinema-black">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <Image
          src={currentMovie.backdrop}
          alt={currentMovie.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-black/90 via-cinema-black/60 to-cinema-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 flex items-center z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full"
        >
          <Icon name="ChevronLeft" size={24} />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-4 flex items-center z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full"
        >
          <Icon name="ChevronRight" size={24} />
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Movie Badge */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-conversion-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                Now Playing
              </span>
              <div className="flex items-center space-x-2 text-cinema-gold">
                <Icon name="Star" size={16} className="fill-current" />
                <span className="font-semibold">{currentMovie.rating}</span>
              </div>
              <span className="text-gray-300 text-sm">{currentMovie.genre}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Where Movie
              <span className="text-cinema-gold block">Magic Begins</span>
            </h1>

            {/* Movie Title */}
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">
              {currentMovie.title}
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-lg lg:text-xl mb-8 max-w-2xl leading-relaxed">
              {currentMovie.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/movie-detail">
                <Button
                  variant="default"
                  className="bg-conversion-orange hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Icon name="Play" size={20} className="mr-2" />
                  Watch Trailer
                </Button>
              </Link>

              <Link to="/movie-detail">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-cinema-black font-semibold px-8 py-4 text-lg transition-all duration-300"
                >
                  <Icon name="Ticket" size={20} className="mr-2" />
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span className="text-sm">
                  {new Date(currentMovie.releaseDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span className="text-sm">1.2M viewers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">Available in your city</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {heroMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-cinema-gold scale-125' :'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Play/Pause Control */}
      <div className="absolute bottom-8 right-8 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full"
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <Icon name="ChevronDown" size={24} color="white" className="opacity-60" />
      </div>
    </section>
  );
};

export default HeroSection;
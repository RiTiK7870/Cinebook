import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PopularMovies = () => {
  const popularMovies = [
    {
      id: 1,
      title: "Guardians of the Galaxy Vol. 3",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=300&h=450&fit=crop",
      bookings: 1247,
      revenue: "$18,705",
      rating: 4.8,
      change: "+15%",
      changeType: "increase"
    },
    {
      id: 2,
      title: "Spider-Man: Across the Spider-Verse",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
      bookings: 1156,
      revenue: "$17,340",
      rating: 4.9,
      change: "+8%",
      changeType: "increase"
    },
    {
      id: 3,
      title: "The Flash",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
      bookings: 892,
      revenue: "$13,380",
      rating: 4.2,
      change: "-3%",
      changeType: "decrease"
    },
    {
      id: 4,
      title: "Transformers: Rise of the Beasts",
      poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
      bookings: 743,
      revenue: "$11,145",
      rating: 4.1,
      change: "+12%",
      changeType: "increase"
    },
    {
      id: 5,
      title: "Indiana Jones 5",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
      bookings: 654,
      revenue: "$9,810",
      rating: 4.3,
      change: "+5%",
      changeType: "increase"
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 premium-shadow border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Popular Movies</h3>
          <p className="text-muted-foreground text-sm">Top performing movies this week</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} color="var(--color-success)" />
          <span className="text-sm font-medium text-success">+12.3% overall</span>
        </div>
      </div>

      <div className="space-y-4">
        {popularMovies.map((movie, index) => (
          <div
            key={movie.id}
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
              {index + 1}
            </div>
            
            <div className="relative w-12 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">{movie.title}</h4>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <Icon name="Ticket" size={14} color="var(--color-muted-foreground)" />
                  <span className="text-sm text-muted-foreground">{movie.bookings.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} color="var(--color-cinema-gold)" />
                  <span className="text-sm text-muted-foreground">{movie.rating}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-foreground">{movie.revenue}</div>
              <div className={`flex items-center justify-end text-sm font-medium ${
                movie.changeType === 'increase' ? 'text-success' : 'text-destructive'
              }`}>
                <Icon 
                  name={movie.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                  className="mr-1"
                />
                {movie.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-center text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
          View All Movies Analytics
        </button>
      </div>
    </div>
  );
};

export default PopularMovies;
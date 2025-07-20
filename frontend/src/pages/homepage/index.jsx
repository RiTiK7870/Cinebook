import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import MovieCarousel from './components/MovieCarousel';
import LiveActivity from './components/LiveActivity';
import CommunitySpotlight from './components/CommunitySpotlight';
import CinemaCulture from './components/CinemaCulture';
import Footer from './components/Footer';

const Homepage = () => {
  // Mock data for movie carousels
  const trendingMovies = [
    {
      id: 1,
      title: "Dune: Part Two",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      rating: 8.9,
      year: 2024,
      duration: 166,
      rating_category: "PG-13",
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      genres: ["Sci-Fi", "Adventure", "Drama"],
      isNew: true
    },
    {
      id: 2,
      title: "Oppenheimer",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: 8.7,
      year: 2023,
      duration: 180,
      rating_category: "R",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      genres: ["Biography", "Drama", "History"],
      isNew: false
    },
    {
      id: 3,
      title: "Spider-Man: Across the Spider-Verse",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      rating: 9.1,
      year: 2023,
      duration: 140,
      rating_category: "PG",
      description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People.",
      genres: ["Animation", "Action", "Adventure"],
      isNew: false
    },
    {
      id: 4,
      title: "The Batman",
      poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
      rating: 8.2,
      year: 2022,
      duration: 176,
      rating_category: "PG-13",
      description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
      genres: ["Action", "Crime", "Drama"],
      isNew: false
    },
    {
      id: 5,
      title: "Top Gun: Maverick",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      rating: 8.8,
      year: 2022,
      duration: 130,
      rating_category: "PG-13",
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.",
      genres: ["Action", "Drama"],
      isNew: false
    },
    {
      id: 6,
      title: "Everything Everywhere All at Once",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=400&h=600&fit=crop",
      rating: 8.1,
      year: 2022,
      duration: 139,
      rating_category: "R",
      description: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence.",
      genres: ["Action", "Adventure", "Comedy"],
      isNew: false
    }
  ];

  const recommendedMovies = [
    {
      id: 7,
      title: "Killers of the Flower Moon",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=400&h=600&fit=crop",
      rating: 7.8,
      year: 2023,
      duration: 206,
      rating_category: "R",
      description: "Members of the Osage tribe in the United States are murdered under mysterious circumstances in the 1920s.",
      genres: ["Crime", "Drama", "History"],
      isNew: true
    },
    {
      id: 8,
      title: "Guardians of the Galaxy Vol. 3",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      rating: 8.0,
      year: 2023,
      duration: 150,
      rating_category: "PG-13",
      description: "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and protect one of their own.",
      genres: ["Action", "Adventure", "Comedy"],
      isNew: false
    },
    {
      id: 9,
      title: "John Wick: Chapter 4",
      poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
      rating: 7.9,
      year: 2023,
      duration: 169,
      rating_category: "R",
      description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.",
      genres: ["Action", "Crime", "Thriller"],
      isNew: false
    },
    {
      id: 10,
      title: "Fast X",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      rating: 6.8,
      year: 2023,
      duration: 141,
      rating_category: "PG-13",
      description: "Dom Toretto and his family are targeted by the vengeful son of drug kingpin Hernan Reyes.",
      genres: ["Action", "Adventure", "Crime"],
      isNew: false
    },
    {
      id: 11,
      title: "Indiana Jones and the Dial of Destiny",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      rating: 7.2,
      year: 2023,
      duration: 154,
      rating_category: "PG-13",
      description: "Archaeologist Indiana Jones races against time to retrieve a legendary artifact that can change the course of history.",
      genres: ["Action", "Adventure"],
      isNew: false
    },
    {
      id: 12,
      title: "The Little Mermaid",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: 7.1,
      year: 2023,
      duration: 135,
      rating_category: "PG",
      description: "A young mermaid makes a deal with a sea witch to trade her beautiful voice for human legs.",
      genres: ["Adventure", "Family", "Fantasy"],
      isNew: false
    }
  ];

  const openingMovies = [
    {
      id: 13,
      title: "Madame Web",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      rating: 6.2,
      year: 2024,
      duration: 116,
      rating_category: "PG-13",
      description: "Cassandra Webb is a paramedic in Manhattan who may have clairvoyant abilities.",
      genres: ["Action", "Sci-Fi", "Thriller"],
      isNew: true
    },
    {
      id: 14,
      title: "Lisa Frankenstein",
      poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
      rating: 6.8,
      year: 2024,
      duration: 101,
      rating_category: "PG-13",
      description: "A coming of RAGE love story about a misunderstood teenager and her high school crush.",
      genres: ["Comedy", "Horror", "Romance"],
      isNew: true
    },
    {
      id: 15,
      title: "Ordinary Angels",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      rating: 7.5,
      year: 2024,
      duration: 118,
      rating_category: "PG",
      description: "A hairdresser single-handedly rallies an entire community to help a widowed father save the life of his critically ill young daughter.",
      genres: ["Drama"],
      isNew: true
    },
    {
      id: 16,
      title: "Land of Bad",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      rating: 6.9,
      year: 2024,
      duration: 113,
      rating_category: "R",
      description: "A Delta Force team fights for survival as they are hunted by an enemy in the mountains of Afghanistan.",
      genres: ["Action", "Thriller"],
      isNew: true
    },
    {
      id: 17,
      title: "Bob Marley: One Love",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: 7.3,
      year: 2024,
      duration: 107,
      rating_category: "PG-13",
      description: "The story of reggae legend Bob Marley\'s rise to fame and his impact on music and culture.",
      genres: ["Biography", "Drama", "Music"],
      isNew: true
    },
    {
      id: 18,
      title: "Argylle",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=400&h=600&fit=crop",
      rating: 6.7,
      year: 2024,
      duration: 139,
      rating_category: "PG-13",
      description: "A reclusive author who writes espionage novels about a secret agent gets caught up in a real-world espionage plot.",
      genres: ["Action", "Comedy", "Thriller"],
      isNew: true
    }
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>CineBook Pro - Where Movie Magic Begins | Premium Movie Booking Experience</title>
        <meta name="description" content="Discover and book movie tickets with CineBook Pro. Experience the magic of cinema with our premium booking platform featuring trending movies, exclusive content, and seamless theater selection." />
        <meta name="keywords" content="movie tickets, cinema booking, movie theaters, film tickets, IMAX, premium cinema experience" />
        <meta property="og:title" content="CineBook Pro - Where Movie Magic Begins" />
        <meta property="og:description" content="Your premier destination for movie ticket booking and cinema experiences. Discover, book, and enjoy the magic of movies like never before." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CineBook Pro - Where Movie Magic Begins" />
        <meta name="twitter:description" content="Premium movie booking experience with trending films, exclusive content, and seamless theater selection." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Movie Carousels */}
          <MovieCarousel 
            title="Trending Now" 
            movies={trendingMovies} 
            category="trending" 
          />

          <MovieCarousel 
            title="Just for You" 
            movies={recommendedMovies} 
            category="recommended" 
          />

          {/* Live Activity Feed */}
          <LiveActivity />

          <MovieCarousel 
            title="Opening This Week" 
            movies={openingMovies} 
            category="opening" 
          />

          {/* Community Spotlight */}
          <CommunitySpotlight />

          {/* Cinema Culture Editorial */}
          <CinemaCulture />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Homepage;
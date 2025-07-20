import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MovieHero from './components/MovieHero';
import ShowtimeSidebar from './components/ShowtimeSidebar';
import MovieInfo from './components/MovieInfo';
import CastCarousel from './components/CastCarousel';
import CommunityBuzz from './components/CommunityBuzz';
import RecommendationSection from './components/RecommendationSection';
import Icon from '../../components/AppIcon';

const MovieDetail = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mock movie data
  const movie = {
    id: 1,
    title: "Quantum Nexus",
    tagline: "Reality is just the beginning",
    releaseYear: "2024",
    duration: "2h 28min",
    rating: "PG-13",
    genres: ["Sci-Fi", "Action", "Thriller"],
    userRating: 4.3,
    imdbRating: 8.1,
    reviewCount: 2847,
    synopsis: `In a world where quantum technology has unlocked parallel dimensions, Dr. Sarah Chen discovers that her groundbreaking research has torn holes in reality itself. As alternate versions of herself begin appearing, she must navigate through multiple timelines to prevent a catastrophic collapse of the multiverse.`,
    fullSynopsis: `Dr. Sarah Chen, a brilliant quantum physicist, has spent years developing technology that could revolutionize human understanding of reality. Her latest experiment successfully opens a portal to parallel dimensions, but the celebration is short-lived when she realizes that her actions have created unstable rifts in the fabric of space-time.\n\nAs alternate versions of herself from different timelines begin appearing in her world, each carrying memories of different choices and outcomes, Sarah must confront the consequences of her ambition. Some versions of herself are allies, while others have become something far more dangerous.\n\nWith the help of her research partner Dr. Marcus Webb and a mysterious figure who claims to be from a timeline where the experiment never happened, Sarah embarks on a journey through multiple realities. Each dimension presents new challenges and reveals different aspects of what her life could have been.\n\nAs the barriers between worlds continue to weaken, Sarah discovers that she's not the only one who has been experimenting with quantum technology. A shadowy organization has been using similar research to harvest resources from dying timelines, and they see Sarah's breakthrough as the key to unlimited power.\n\nRacing against time as reality itself begins to unravel, Sarah must find a way to close the rifts she's created while preventing the organization from using her technology to destroy countless worlds. The fate of not just her reality, but all possible realities, hangs in the balance.`,
    directorVision: `Director Elena Rodriguez envisioned Quantum Nexus as more than just a science fiction spectacle. "I wanted to explore the very human question of 'what if' through the lens of cutting-edge science," Rodriguez explains. \"Every choice we make creates a ripple effect, and this film literalizes that concept by showing the consequences of our decisions across multiple realities.\"`,
    themes: ["Identity", "Consequences", "Scientific Ethics", "Parallel Lives", "Responsibility"],
    contentWarnings: ["Intense sci-fi violence", "Complex themes", "Mild language", "Brief disturbing images"],
    releaseDate: "July 13, 2024",
    language: "English",
    country: "United States",
    budget: "$180 million",
    boxOffice: "$524.7 million worldwide",
    distributor: "Universal Pictures",
    mpaaRating: "PG-13",
    mpaaReason: "for intense sci-fi action and violence, and brief strong language",
    aspectRatio: "2.39:1",
    soundMix: "Dolby Atmos, DTS:X",
    backdropImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080&fit=crop",
    posterImage: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    keyPersonnel: [
      {
        name: "Elena Rodriguez",
        role: "Director",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        previousWork: "Known for 'Stellar Drift' (2021)"
      },
      {
        name: "Michael Chen",
        role: "Producer",
        image: "https://randomuser.me/api/portraits/men/52.jpg",
        previousWork: "Producer of 'Time Fracture' (2020)"
      },
      {
        name: "Sarah Williams",
        role: "Cinematographer",
        image: "https://randomuser.me/api/portraits/women/38.jpg",
        previousWork: "Cinematographer for 'Neon Dreams' (2022)"
      },
      {
        name: "David Park",
        role: "Music Composer",
        image: "https://randomuser.me/api/portraits/men/41.jpg",
        previousWork: "Composer for 'Echoes of Tomorrow' (2023)"
      }
    ],
    productionCompanies: [
      {
        name: "Nexus Films",
        logo: "https://via.placeholder.com/100x100/1A1A1A/D4AF37?text=NF"
      },
      {
        name: "Quantum Studios",
        logo: "https://via.placeholder.com/100x100/00A8FF/FFFFFF?text=QS"
      },
      {
        name: "Reality Pictures",
        logo: "https://via.placeholder.com/100x100/FF6B35/FFFFFF?text=RP"
      },
      {
        name: "Dimension Works",
        logo: "https://via.placeholder.com/100x100/10B981/FFFFFF?text=DW"
      }
    ],
    filmingLocations: [
      {
        name: "Vancouver, Canada",
        description: "Primary filming location for laboratory scenes"
      },
      {
        name: "Los Angeles, USA",
        description: "Studio work and alternate reality sequences"
      },
      {
        name: "Tokyo, Japan",
        description: "Futuristic cityscape scenes"
      },
      {
        name: "Iceland",
        description: "Otherworldly landscape sequences"
      }
    ],
    trivia: [
      {
        title: "Real Quantum Physics Consultation",
        description: "The production team consulted with actual quantum physicists from MIT and Caltech to ensure the scientific concepts were as accurate as possible within the fictional framework.",
        source: "Production Notes"
      },
      {
        title: "Practical Effects Over CGI",
        description: "Director Elena Rodriguez insisted on using practical effects for 70% of the quantum portal sequences, creating real light displays using advanced projection mapping technology.",
        source: "Behind the Scenes Documentary"
      },
      {
        title: "Multiple Timeline Costumes",
        description: "The costume department created over 200 different variations of the main character's outfit to represent subtle differences across parallel dimensions.",
        source: "Costume Designer Interview"
      },
      {
        title: "Hidden Easter Eggs",
        description: "Each alternate reality contains hidden references to classic science fiction films, with over 50 easter eggs scattered throughout the movie.",
        source: "Director's Commentary"
      },
      {
        title: "Innovative Sound Design",
        description: "The sound team developed a unique 'quantum frequency' that plays at different pitches in each dimension, helping audiences subconsciously track which reality they're viewing.",
        source: "Sound Design Team"
      }
    ]
  };

  // Mock cast data
  const cast = [
    {
      id: 1,
      name: "Emma Stone",
      character: "Dr. Sarah Chen",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      popularity: "9.2",
      age: "35",
      nationality: "American",
      knownFor: "La La Land, Easy A, Superbad",
      awards: "Academy Award Winner, Golden Globe Winner",
      biography: `Emma Stone is an Academy Award-winning actress known for her versatile performances in both comedy and drama. Born in Scottsdale, Arizona, she began her acting career in theater before transitioning to film. Her breakthrough role came in the comedy 'Superbad' (2007), and she has since become one of Hollywood's most sought-after actresses.\n\nStone's portrayal of Mia in 'La La Land' earned her the Academy Award for Best Actress, and she has continued to challenge herself with diverse roles across genres. Her preparation for 'Quantum Nexus' included studying quantum physics and working with movement coaches to portray multiple versions of the same character.`,
      notableWorks: [
        {
          title: "La La Land",
          year: "2016",
          poster: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=100&h=150&fit=crop"
        },
        {
          title: "Easy A",
          year: "2010",
          poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=100&h=150&fit=crop"
        }
      ]
    },
    {
      id: 2,
      name: "Oscar Isaac",
      character: "Dr. Marcus Webb",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      popularity: "8.7",
      age: "44",
      nationality: "Guatemalan-American",
      knownFor: "Ex Machina, Inside Llewyn Davis, Star Wars",
      awards: "Golden Globe Nominee, Critics' Choice Award Winner",
      biography: `Oscar Isaac is a versatile actor and musician known for his intense and nuanced performances. Born in Guatemala and raised in Miami, Isaac studied at the Juilliard School before making his mark in independent films. His breakthrough came with the Coen Brothers' 'Inside Llewyn Davis,' showcasing his musical talents alongside his acting prowess.\n\nIsaac's ability to portray complex, morally ambiguous characters made him perfect for the role of Dr. Marcus Webb, Sarah's research partner who harbors secrets about the quantum experiments. His preparation included extensive research into theoretical physics and the ethical implications of scientific discovery.`,
      notableWorks: [
        {
          title: "Ex Machina",
          year: "2014",
          poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=150&fit=crop"
        },
        {
          title: "Inside Llewyn Davis",
          year: "2013",
          poster: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=150&fit=crop"
        }
      ]
    },
    {
      id: 3,
      name: "Lupita Nyong'o",
      character: "Agent Rivera",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      popularity: "8.9",
      age: "40",
      nationality: "Kenyan-Mexican",
      knownFor: "12 Years a Slave, Black Panther, Us",
      awards: "Academy Award Winner, SAG Award Winner",
      biography: `Lupita Nyong'o is an Academy Award-winning actress and author known for her powerful performances and advocacy work. Born in Mexico to Kenyan parents, she studied at Yale School of Drama before making her film debut in '12 Years a Slave,' which earned her an Oscar for Best Supporting Actress.\n\nIn 'Quantum Nexus,' Nyong'o plays Agent Rivera, a mysterious figure from an alternate timeline who becomes Sarah's guide through the multiverse. Her character serves as both ally and potential threat, requiring Nyong'o to balance vulnerability with strength throughout her performance.`,
      notableWorks: [
        {
          title: "12 Years a Slave",
          year: "2013",
          poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=150&fit=crop"
        },
        {
          title: "Us",
          year: "2019",
          poster: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=150&fit=crop"
        }
      ]
    },
    {
      id: 4,
      name: "Michael Shannon",
      character: "Director Hawkins",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      popularity: "8.1",
      age: "49",
      nationality: "American",
      knownFor: "The Shape of Water, Nocturnal Animals, Boardwalk Empire",
      awards: "Emmy Nominee, SAG Award Nominee",
      biography: `Michael Shannon is a critically acclaimed actor known for his intense and often unsettling performances. A veteran of both stage and screen, Shannon has built a reputation for portraying complex, often troubled characters with remarkable depth and authenticity.\n\nAs Director Hawkins, the head of the shadowy organization exploiting quantum technology, Shannon brings his signature intensity to create a villain who believes his actions are justified. His character serves as the primary antagonist, representing the dangers of unchecked scientific ambition.`,
      notableWorks: [
        {
          title: "The Shape of Water",
          year: "2017",
          poster: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=150&fit=crop"
        },
        {
          title: "Nocturnal Animals",
          year: "2016",
          poster: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=100&h=150&fit=crop"
        }
      ]
    }
  ];

  // Mock theater data
  const theaters = [
    {
      id: 1,
      name: "AMC Empire 25",
      location: "Times Square",
      distance: "0.5 mi",
      rating: "4.2",
      amenities: ["IMAX", "Dolby", "Reclining Seats", "Concessions"],
      showtimes: [
        { time: "10:30 AM", format: "Standard", price: "12.99" },
        { time: "1:45 PM", format: "IMAX", price: "19.99" },
        { time: "4:20 PM", format: "Dolby", price: "16.99" },
        { time: "7:15 PM", format: "Standard", price: "14.99" },
        { time: "10:30 PM", format: "IMAX", price: "19.99" }
      ]
    },
    {
      id: 2,
      name: "Regal Union Square",
      location: "Union Square",
      distance: "1.2 mi",
      rating: "4.0",
      amenities: ["4DX", "Premium Seating", "Bar", "Concessions"],
      showtimes: [
        { time: "11:00 AM", format: "Standard", price: "11.99" },
        { time: "2:30 PM", format: "4DX", price: "24.99" },
        { time: "5:45 PM", format: "Standard", price: "13.99" },
        { time: "8:30 PM", format: "4DX", price: "24.99" }
      ]
    },
    {
      id: 3,
      name: "Cinemark Lincoln Square",
      location: "Lincoln Center",
      distance: "2.1 mi",
      rating: "4.3",
      amenities: ["IMAX", "Luxury Recliners", "Reserved Seating", "Concessions"],
      showtimes: [
        { time: "12:15 PM", format: "Standard", price: "13.99" },
        { time: "3:30 PM", format: "IMAX", price: "18.99" },
        { time: "6:45 PM", format: "Standard", price: "15.99" },
        { time: "9:50 PM", format: "IMAX", price: "18.99" }
      ]
    }
  ];

  // Mock community data
  const reviews = [
    {
      id: 1,
      user: {
        name: "MovieBuff2024",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      rating: 5,
      date: "2 days ago",
      comment: `Absolutely mind-blowing! Elena Rodriguez has crafted a masterpiece that perfectly balances complex scientific concepts with emotional storytelling. Emma Stone's performance as multiple versions of Dr. Sarah Chen is nothing short of extraordinary. Each alternate version feels like a completely different person while still being recognizably the same character.\n\nThe visual effects are stunning, but what really impressed me was how the film uses practical effects alongside CGI. The quantum portal sequences feel real and tangible. The sound design deserves special mention - the way different dimensions have subtle audio cues helps you track which reality you're in.\n\nThis isn't just a sci-fi spectacle; it's a thoughtful exploration of choice, consequence, and identity. Highly recommended!`,
      likes: 47,
      spoilerWarning: false
    },
    {
      id: 2,
      user: {
        name: "CinematicReviews",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      rating: 4,
      date: "1 week ago",
      comment: `Quantum Nexus is an ambitious film that mostly succeeds in its goals. The concept of parallel dimensions is handled with surprising scientific accuracy, and the performances across the board are excellent. Oscar Isaac brings depth to what could have been a thankless supporting role.\n\nMy only criticism is that the third act becomes a bit too action-heavy, losing some of the philosophical depth that made the first two acts so compelling. However, the emotional core of the story remains strong throughout, and the ending is both satisfying and thought-provoking.\n\nDefinitely worth seeing in IMAX for the full visual experience.`,
      likes: 23,
      spoilerWarning: true
    },
    {
      id: 3,
      user: {
        name: "SciFiEnthusiast",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg"
      },
      rating: 4,
      date: "3 days ago",
      comment: `As someone with a background in physics, I was pleasantly surprised by how well the film handles quantum mechanics concepts. While obviously dramatized for entertainment, the core scientific principles are sound.\n\nThe film's exploration of the many-worlds interpretation is fascinating, and seeing how small changes ripple across different timelines is both entertaining and educational. Emma Stone's performance anchors the complex narrative beautifully.\n\nA few minor scientific liberties aside, this is one of the better hard sci-fi films in recent years.`,
      likes: 31,
      spoilerWarning: false
    }
  ];

  const discussions = [
    {
      id: 1,
      title: "Theory: The Real Villain Isn't Who You Think",
      user: {
        name: "QuantumTheory101",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg"
      },
      preview: "After watching the film three times, I've noticed some subtle clues that suggest Director Hawkins might not be the real antagonist...",
      timeAgo: "4 hours ago",
      replies: 23,
      views: 156
    },
    {
      id: 2,
      title: "Easter Eggs and References Megathread",
      user: {
        name: "EasterEggHunter",
        avatar: "https://randomuser.me/api/portraits/men/29.jpg"
      },
      preview: "Let's compile all the hidden references and easter eggs we've found. I've spotted at least 15 so far, including nods to classic sci-fi films...",
      timeAgo: "1 day ago",
      replies: 67,
      views: 423
    },
    {
      id: 3,
      title: "The Science Behind Quantum Nexus: Fact vs Fiction",
      user: {
        name: "PhysicsProf",
        avatar: "https://randomuser.me/api/portraits/women/42.jpg"
      },
      preview: "As a quantum physics professor, I wanted to break down what the film gets right and where it takes creative liberties...",
      timeAgo: "2 days ago",
      replies: 45,
      views: 289
    }
  ];

  const photos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=300&h=300&fit=crop",
      caption: "Opening night at AMC Empire!",
      user: { name: "MovieNight2024" }
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=300&fit=crop",
      caption: "IMAX experience was incredible",
      user: { name: "CinemaLover" }
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop",
      caption: "Best sci-fi film of the year!",
      user: { name: "SciFiFan2024" }
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      caption: "The visual effects blew my mind",
      user: { name: "VFXAppreciator" }
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      caption: "Emma Stone's performance was phenomenal",
      user: { name: "ActingCoach" }
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      caption: "Watching with the whole family",
      user: { name: "FamilyMovieTime" }
    }
  ];

  // Mock recommendations
  const recommendations = [
    {
      id: 2,
      title: "Temporal Echoes",
      year: "2023",
      genre: "Sci-Fi",
      rating: 4.1,
      reviewCount: 1892,
      duration: "2h 15min",
      ageRating: "PG-13",
      poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
      category: "similar"
    },
    {
      id: 3,
      title: "Reality Shift",
      year: "2024",
      genre: "Thriller",
      rating: 3.9,
      reviewCount: 2156,
      duration: "1h 58min",
      ageRating: "R",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
      category: "similar"
    },
    {
      id: 4,
      title: "Stellar Drift",
      year: "2021",
      genre: "Sci-Fi",
      rating: 4.5,
      reviewCount: 3421,
      duration: "2h 32min",
      ageRating: "PG-13",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
      category: "director"
    },
    {
      id: 5,
      title: "Dimension Walker",
      year: "2023",
      genre: "Action",
      rating: 4.2,
      reviewCount: 2743,
      duration: "2h 8min",
      ageRating: "PG-13",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=300&h=450&fit=crop",
      category: "genre"
    },
    {
      id: 6,
      title: "Neon Dreams",
      year: "2024",
      genre: "Sci-Fi",
      rating: 4.7,
      reviewCount: 4156,
      duration: "2h 22min",
      ageRating: "R",
      poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
      category: "trending"
    },
    {
      id: 7,
      title: "Time Fracture",
      year: "2022",
      genre: "Thriller",
      rating: 3.8,
      reviewCount: 1567,
      duration: "1h 47min",
      ageRating: "PG-13",
      poster: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop",
      category: "similar"
    },
    {
      id: 8,
      title: "Echoes of Tomorrow",
      year: "2023",
      genre: "Drama",
      rating: 4.0,
      reviewCount: 2234,
      duration: "2h 5min",
      ageRating: "PG-13",
      poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
      category: "director"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cinema-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Movie Hero Section */}
      <MovieHero movie={movie} />

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Movie Information */}
            <MovieInfo movie={movie} />

            {/* Cast & Crew */}
            <CastCarousel cast={cast} />

            {/* Community Buzz */}
            <CommunityBuzz 
              reviews={reviews}
              discussions={discussions}
              photos={photos}
            />

            {/* Recommendations */}
            <RecommendationSection recommendations={recommendations} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ShowtimeSidebar movie={movie} theaters={theaters} />
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-cinema-gold hover:bg-yellow-600 text-cinema-black rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
      >
        <Icon name="ChevronUp" size={24} />
      </button>

      {/* Footer */}
      <footer className="bg-cinema-black text-white py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cinema-gold to-yellow-500 rounded-lg flex items-center justify-center">
                  <Icon name="Film" size={24} color="#1A1A1A" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">CineBook Pro</h3>
                  <p className="text-sm text-gray-400">Where Movie Magic Begins</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Discover, explore, and book your next cinematic adventure with the ultimate movie booking platform.
              </p>
              <div className="flex space-x-4">
                <Icon name="Facebook" size={20} className="text-gray-400 hover:text-cinema-gold cursor-pointer transition-colors" />
                <Icon name="Twitter" size={20} className="text-gray-400 hover:text-cinema-gold cursor-pointer transition-colors" />
                <Icon name="Instagram" size={20} className="text-gray-400 hover:text-cinema-gold cursor-pointer transition-colors" />
                <Icon name="Youtube" size={20} className="text-gray-400 hover:text-cinema-gold cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Now Showing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Coming Soon</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Theaters</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CineBook Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MovieDetail;
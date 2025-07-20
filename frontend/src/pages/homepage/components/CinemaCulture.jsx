import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CinemaCulture = () => {
  const articles = [
    {
      id: 1,
      title: "The Evolution of IMAX Technology: From 70mm to Digital Perfection",
      excerpt: "Explore how IMAX has revolutionized the cinema experience over the decades, from its humble beginnings to today's cutting-edge digital projection systems.",
      image: "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=800&h=600&fit=crop",
      author: "Sarah Mitchell",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      category: "Technology",
      readTime: "8 min read",
      publishDate: "2024-03-10",
      featured: true
    },
    {
      id: 2,
      title: "Behind the Scenes: How Movie Theaters Are Adapting to Post-Pandemic World",
      excerpt: "An inside look at the innovative safety measures and enhanced experiences that theaters are implementing to welcome audiences back.",
      image: "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=800&h=600&fit=crop",
      author: "Michael Chen",
      authorAvatar: "https://randomuser.me/api/portraits/men/38.jpg",
      category: "Industry",
      readTime: "6 min read",
      publishDate: "2024-03-08",
      featured: false
    },
    {
      id: 3,
      title: "The Art of Movie Poster Design: Visual Storytelling in Marketing",
      excerpt: "Discover how movie posters have evolved as an art form and their crucial role in building anticipation for upcoming films.",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=600&fit=crop",
      author: "Emma Rodriguez",
      authorAvatar: "https://randomuser.me/api/portraits/women/29.jpg",
      category: "Design",
      readTime: "5 min read",
      publishDate: "2024-03-05",
      featured: false
    },
    {
      id: 4,
      title: "Dolby Atmos vs IMAX: Which Premium Audio Experience Reigns Supreme?",
      excerpt: "A comprehensive comparison of the leading audio technologies that are transforming how we experience movies in theaters.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      author: "David Park",
      authorAvatar: "https://randomuser.me/api/portraits/men/31.jpg",
      category: "Technology",
      readTime: "7 min read",
      publishDate: "2024-03-03",
      featured: false
    }
  ];

  const trends = [
    {
      id: 1,
      title: "4DX Theaters",
      description: "Motion seats and environmental effects",
      growth: "+45%",
      icon: "Zap"
    },
    {
      id: 2,
      title: "Premium Dining",
      description: "Gourmet meals during movies",
      growth: "+32%",
      icon: "Utensils"
    },
    {
      id: 3,
      title: "Private Screenings",
      description: "Exclusive theater rentals",
      growth: "+67%",
      icon: "Users"
    },
    {
      id: 4,
      title: "VR Experiences",
      description: "Virtual reality movie previews",
      growth: "+89%",
      icon: "Eye"
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'bg-electric-blue text-white',
      'Industry': 'bg-conversion-orange text-white',
      'Design': 'bg-cinema-gold text-cinema-black',
      'Culture': 'bg-purple-500 text-white'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Cinema Culture
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dive deep into the world of cinema with our exclusive insights, industry trends, and behind-the-scenes stories
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            {articles.filter(article => article.featured).map((article) => (
              <div key={article.id} className="bg-card rounded-2xl overflow-hidden premium-shadow mb-8">
                <div className="relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-conversion-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 lg:p-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={article.authorAvatar}
                        alt={article.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{article.author}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{formatDate(article.publishDate)}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="default"
                      className="bg-cinema-gold hover:bg-yellow-600 text-cinema-black font-semibold"
                    >
                      Read Article
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Other Articles */}
            <div className="grid md:grid-cols-2 gap-6">
              {articles.filter(article => !article.featured).map((article) => (
                <div key={article.id} className="bg-card rounded-xl overflow-hidden premium-shadow">
                  <div className="relative">
                    <Image
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-bold text-foreground mb-2 line-clamp-2 leading-tight">
                      {article.title}
                    </h4>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={article.authorAvatar}
                          alt={article.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div className="text-xs text-muted-foreground">
                          <p className="font-medium">{article.author}</p>
                          <p>{article.readTime}</p>
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
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cinema Trends */}
            <div className="bg-card rounded-xl p-6 premium-shadow">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Cinema Trends 2024
              </h3>
              
              <div className="space-y-4">
                {trends.map((trend) => (
                  <div key={trend.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200">
                    <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                      <Icon name={trend.icon} size={20} className="text-electric-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{trend.title}</h4>
                      <p className="text-sm text-muted-foreground">{trend.description}</p>
                    </div>
                    <div className="text-green-500 font-semibold text-sm">
                      {trend.growth}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-cinema-black to-gray-800 rounded-xl p-6 text-white">
              <div className="text-center">
                <Icon name="Mail" size={32} className="text-cinema-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Cinema Insider
                </h3>
                <p className="text-gray-300 text-sm mb-6">
                  Get weekly insights, exclusive interviews, and industry news delivered to your inbox.
                </p>
                
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cinema-gold"
                  />
                  <Button
                    variant="default"
                    className="w-full bg-cinema-gold hover:bg-yellow-600 text-cinema-black font-semibold"
                  >
                    Subscribe Now
                  </Button>
                </div>
                
                <p className="text-xs text-gray-400 mt-3">
                  No spam, unsubscribe anytime
                </p>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-card rounded-xl p-6 premium-shadow">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Popular Topics
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {['IMAX', 'Dolby Atmos', 'Film Analysis', 'Box Office', 'Streaming', 'Awards', 'Directors', 'Technology'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-muted hover:bg-electric-blue hover:text-white px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link to="/movie-detail">
            <Button
              variant="outline"
              className="border-cinema-gold text-cinema-gold hover:bg-cinema-gold hover:text-cinema-black"
            >
              Explore All Articles
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CinemaCulture;
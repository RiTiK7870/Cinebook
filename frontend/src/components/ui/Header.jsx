import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, User, Menu, X, ChevronDown, LogOut, Settings, CreditCard, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, userProfile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsProfileOpen(false);
      navigate('/');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const openAuthModal = (mode) => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cinema-gold to-yellow-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-cinema-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display text-xl font-bold text-gray-900">CineBook Pro</h1>
                <p className="text-xs text-gray-500 -mt-1">Where Movie Magic Begins</p>
              </div>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search movies, theaters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cinema-gold focus:border-transparent outline-none transition-all"
                  />
                </div>
              </form>
            </div>

            {/* Location Selector */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">New York</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-cinema-gold rounded-full flex items-center justify-center">
                      <span className="text-cinema-black text-sm font-semibold">
                        {userProfile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      {userProfile?.full_name || 'User'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {userProfile?.full_name || 'User'}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        {userProfile?.role === 'admin' && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-cinema-gold text-cinema-black rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      
                      <div className="py-1">
                        <Link
                          to="/user-dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3" />
                          My Dashboard
                        </Link>
                        
                        {userProfile?.role === 'admin' && (
                          <Link
                            to="/admin-dashboard"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Settings className="w-4 h-4 mr-3" />
                            Admin Dashboard
                          </Link>
                        )}
                        
                        <Link
                          to="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Heart className="w-4 h-4 mr-3" />
                          Watchlist
                        </Link>
                        
                        <Link
                          to="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <CreditCard className="w-4 h-4 mr-3" />
                          My Bookings
                        </Link>
                      </div>
                      
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openAuthModal('login')}
                    className="hidden sm:flex"
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => openAuthModal('signup')}
                    className="bg-cinema-gold hover:bg-yellow-600 text-cinema-black"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search movies, theaters..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cinema-gold focus:border-transparent outline-none"
                    />
                  </div>
                </form>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/movies"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Movies
                </Link>
                <Link
                  to="/theaters"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Theaters
                </Link>
                {!user && (
                  <button
                    onClick={() => {
                      openAuthModal('login');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors sm:hidden"
                  >
                    Sign In
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* Click outside to close dropdowns */}
      {(isProfileOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setIsProfileOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Header;
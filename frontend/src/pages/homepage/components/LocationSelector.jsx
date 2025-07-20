import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('New York');
  const [searchTerm, setSearchTerm] = useState('');

  const cities = [
    { name: 'New York', state: 'NY', theaters: 45, popular: true },
    { name: 'Los Angeles', state: 'CA', theaters: 52, popular: true },
    { name: 'Chicago', state: 'IL', theaters: 38, popular: true },
    { name: 'Houston', state: 'TX', theaters: 29, popular: true },
    { name: 'Phoenix', state: 'AZ', theaters: 24, popular: false },
    { name: 'Philadelphia', state: 'PA', theaters: 31, popular: false },
    { name: 'San Antonio', state: 'TX', theaters: 22, popular: false },
    { name: 'San Diego', state: 'CA', theaters: 27, popular: false },
    { name: 'Dallas', state: 'TX', theaters: 33, popular: false },
    { name: 'San Jose', state: 'CA', theaters: 19, popular: false },
    { name: 'Austin', state: 'TX', theaters: 21, popular: false },
    { name: 'Jacksonville', state: 'FL', theaters: 18, popular: false },
    { name: 'Fort Worth', state: 'TX', theaters: 16, popular: false },
    { name: 'Columbus', state: 'OH', theaters: 20, popular: false },
    { name: 'Charlotte', state: 'NC', theaters: 17, popular: false }
  ];

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularCities = cities.filter(city => city.popular);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.location-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city.name);
    setIsOpen(false);
    setSearchTerm('');
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would reverse geocode these coordinates
          console.log('Location:', position.coords.latitude, position.coords.longitude);
          // For demo, we'll just set to New York
          setSelectedCity('New York');
          setIsOpen(false);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="location-selector relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
      >
        <Icon name="MapPin" size={16} />
        <span className="hidden sm:inline">{selectedCity}</span>
        <Icon name="ChevronDown" size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-card rounded-xl shadow-2xl border border-border z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground mb-3">
              Choose Your City
            </h3>
            
            {/* Search */}
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-electric-blue text-foreground placeholder-muted-foreground"
              />
            </div>
          </div>

          {/* Current Location */}
          <div className="p-4 border-b border-border">
            <Button
              variant="ghost"
              onClick={getCurrentLocation}
              className="w-full justify-start text-electric-blue hover:text-blue-600 hover:bg-electric-blue/10"
            >
              <Icon name="Navigation" size={16} className="mr-3" />
              Use Current Location
            </Button>
          </div>

          {/* Cities List */}
          <div className="max-h-64 overflow-y-auto">
            {!searchTerm && (
              <div className="p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                  Popular Cities
                </h4>
                <div className="space-y-1">
                  {popularCities.map((city) => (
                    <button
                      key={`${city.name}-${city.state}`}
                      onClick={() => handleCitySelect(city)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors duration-200 ${
                        selectedCity === city.name ? 'bg-electric-blue/10 text-electric-blue' : 'text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="MapPin" size={14} />
                        <div className="text-left">
                          <p className="font-medium">{city.name}</p>
                          <p className="text-xs text-muted-foreground">{city.state}</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {city.theaters} theaters
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchTerm && (
              <div className="p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                  Search Results ({filteredCities.length})
                </h4>
                <div className="space-y-1">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <button
                        key={`${city.name}-${city.state}`}
                        onClick={() => handleCitySelect(city)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors duration-200 ${
                          selectedCity === city.name ? 'bg-electric-blue/10 text-electric-blue' : 'text-foreground'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name="MapPin" size={14} />
                          <div className="text-left">
                            <p className="font-medium">{city.name}</p>
                            <p className="text-xs text-muted-foreground">{city.state}</p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {city.theaters} theaters
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icon name="Search" size={32} className="mx-auto mb-2 opacity-50" />
                      <p>No cities found</p>
                      <p className="text-xs">Try a different search term</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!searchTerm && (
              <div className="p-4 border-t border-border">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                  All Cities
                </h4>
                <div className="space-y-1">
                  {cities.filter(city => !city.popular).map((city) => (
                    <button
                      key={`${city.name}-${city.state}`}
                      onClick={() => handleCitySelect(city)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors duration-200 ${
                        selectedCity === city.name ? 'bg-electric-blue/10 text-electric-blue' : 'text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="MapPin" size={14} />
                        <div className="text-left">
                          <p className="font-medium">{city.name}</p>
                          <p className="text-xs text-muted-foreground">{city.state}</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {city.theaters} theaters
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
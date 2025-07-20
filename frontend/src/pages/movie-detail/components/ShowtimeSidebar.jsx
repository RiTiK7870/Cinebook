import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShowtimeSidebar = ({ movie, theaters }) => {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  const dates = [
    { date: "Today", day: "Sun", dayNum: "13" },
    { date: "Tomorrow", day: "Mon", dayNum: "14" },
    { date: "Tue", day: "Tue", dayNum: "15" },
    { date: "Wed", day: "Wed", dayNum: "16" },
    { date: "Thu", day: "Thu", dayNum: "17" },
    { date: "Fri", day: "Fri", dayNum: "18" },
    { date: "Sat", day: "Sat", dayNum: "19" }
  ];

  const formats = [
    { id: 'all', name: 'All Formats', icon: 'Film' },
    { id: 'imax', name: 'IMAX', icon: 'Maximize' },
    { id: 'dolby', name: 'Dolby Atmos', icon: 'Volume2' },
    { id: '4dx', name: '4DX', icon: 'Gamepad2' },
    { id: 'standard', name: 'Standard', icon: 'Monitor' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBooking = (theater, showtime) => {
    navigate('/seat-selection', {
      state: {
        movie: movie,
        theater: theater,
        showtime: showtime,
        date: dates[selectedDate]
      }
    });
  };

  const filteredTheaters = theaters.map(theater => ({
    ...theater,
    showtimes: theater.showtimes.filter(showtime => 
      selectedFormat === 'all' || showtime.format.toLowerCase() === selectedFormat
    )
  })).filter(theater => theater.showtimes.length > 0);

  return (
    <div className={`w-full lg:w-96 bg-white rounded-2xl shadow-xl transition-all duration-300 ${
      isSticky ? 'lg:sticky lg:top-24' : ''
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-cinema-black">Book Tickets</h3>
          <div className="flex items-center space-x-2 text-cinema-gold">
            <Icon name="MapPin" size={16} />
            <span className="text-sm font-medium">New York</span>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Select Date</h4>
          <div className="grid grid-cols-7 gap-2">
            {dates.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(index)}
                className={`p-2 rounded-lg text-center transition-all duration-200 ${
                  selectedDate === index
                    ? 'bg-cinema-gold text-cinema-black font-semibold' :'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="text-xs">{date.date === "Today" || date.date === "Tomorrow" ? date.date : date.day}</div>
                <div className="text-sm font-medium">{date.dayNum}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Format Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Format</h4>
          <div className="grid grid-cols-2 gap-2">
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`p-3 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                  selectedFormat === format.id
                    ? 'bg-electric-blue text-white' :'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon name={format.icon} size={16} />
                <span className="text-sm font-medium">{format.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Theaters and Showtimes */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <h4 className="text-sm font-semibold text-gray-700">Theaters & Showtimes</h4>
          
          {filteredTheaters.map((theater) => (
            <div key={theater.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className="font-semibold text-cinema-black">{theater.name}</h5>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {theater.distance} • {theater.location}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} color="#D4AF37" className="fill-current" />
                  <span className="text-sm font-medium">{theater.rating}</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-3">
                {theater.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              {/* Showtimes */}
              <div className="grid grid-cols-3 gap-2">
                {theater.showtimes.map((showtime, index) => (
                  <button
                    key={index}
                    onClick={() => handleBooking(theater, showtime)}
                    className="p-2 border border-gray-300 rounded-lg hover:border-cinema-gold hover:bg-cinema-gold/10 transition-all duration-200 group"
                  >
                    <div className="text-sm font-semibold text-cinema-black group-hover:text-cinema-gold">
                      {showtime.time}
                    </div>
                    <div className="text-xs text-gray-500">{showtime.format}</div>
                    <div className="text-xs text-green-600 font-medium">
                      ${showtime.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Book Button */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button
            variant="default"
            className="w-full bg-conversion-orange hover:bg-orange-600 text-white font-semibold py-3"
            iconName="Zap"
            iconPosition="left"
          >
            Quick Book - Best Available
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">
            We'll find the best seats at the best price
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowtimeSidebar;
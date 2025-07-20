import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TheaterView3D from './components/TheaterView3D';
import SeatMap from './components/SeatMap';
import BookingSummary from './components/BookingSummary';
import GroupBookingTools from './components/GroupBookingTools';
import BookingTimer from './components/BookingTimer';
import ViewFromSeat from './components/ViewFromSeat';

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [groupSize, setGroupSize] = useState(2);
  const [viewMode, setViewMode] = useState('3d');
  const [showViewFromSeat, setShowViewFromSeat] = useState(false);
  const [selectedSeatForView, setSelectedSeatForView] = useState(null);
  const [userPreferences, setUserPreferences] = useState({
    type: 'couple',
    accessibility: false
  });

  // Mock data - in real app, this would come from route params or API
  const movieDetails = {
    title: "Guardians of the Galaxy Vol. 3",
    rating: "PG-13",
    duration: "2h 30m",
    genre: "Action, Adventure, Comedy"
  };

  const theater = {
    name: "CinePlex Downtown",
    address: "123 Main Street, Downtown",
    amenities: ["IMAX", "Dolby Atmos", "Reclining Seats", "Concessions"]
  };

  const showtime = {
    date: "July 13, 2025",
    time: "19:30",
    format: "IMAX 3D"
  };

  // Seat selection handlers
  const handleSeatSelect = (seatId, row, seatNumber) => {
    if (selectedSeats.length < groupSize && !selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const handleSeatDeselect = (seatId) => {
    setSelectedSeats(prev => prev.filter(seat => seat !== seatId));
  };

  const handleGroupSizeChange = (newSize) => {
    setGroupSize(newSize);
    // If new size is smaller, remove excess selected seats
    if (newSize < selectedSeats.length) {
      setSelectedSeats(prev => prev.slice(0, newSize));
    }
    
    // Update user preferences based on group size
    if (newSize === 2) {
      setUserPreferences(prev => ({ ...prev, type: 'couple' }));
    } else if (newSize >= 4) {
      setUserPreferences(prev => ({ ...prev, type: 'family' }));
    } else {
      setUserPreferences(prev => ({ ...prev, type: 'friends' }));
    }
  };

  const handleViewFromSeat = (seatId) => {
    setSelectedSeatForView(seatId);
    setShowViewFromSeat(true);
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === groupSize) {
      // In real app, pass booking data to payment page
      navigate('/payment-confirmation', {
        state: {
          movieDetails,
          theater,
          showtime,
          selectedSeats,
          groupSize
        }
      });
    }
  };

  const handleSeatUpgrade = (seatId) => {
    // Mock seat upgrade logic
    console.log(`Upgrading seat ${seatId}`);
  };

  const handleInviteFriends = (emails, message) => {
    // Mock invite functionality
    console.log('Inviting friends:', emails, message);
  };

  const handleTimeExpired = () => {
    // Handle timer expiration
    setSelectedSeats([]);
    alert('Your booking time has expired. Please select your seats again.');
  };

  const handleExtendTime = () => {
    console.log('Time extended by 5 minutes');
  };

  // Double-click handler for seat view
  const handleSeatDoubleClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      handleViewFromSeat(seatId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content */}
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button 
                onClick={() => navigate('/homepage')}
                className="text-gray-500 hover:text-gray-700"
              >
                Home
              </button>
              <Icon name="ChevronRight" size={16} color="#6B7280" />
              <button 
                onClick={() => navigate('/movie-detail')}
                className="text-gray-500 hover:text-gray-700"
              >
                {movieDetails.title}
              </button>
              <Icon name="ChevronRight" size={16} color="#6B7280" />
              <span className="text-gray-900 font-medium">Select Seats</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Select Your Seats
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Icon name="Film" size={16} />
                    <span>{movieDetails.title}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>{theater.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={16} />
                    <span>{showtime.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{showtime.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 lg:mt-0">
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Selected Seats</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {selectedSeats.length} of {groupSize}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/movie-detail')}
                    className="flex items-center space-x-2"
                  >
                    <Icon name="ArrowLeft" size={16} />
                    <span>Back</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Column - Theater View & Seat Map */}
            <div className="lg:col-span-3 space-y-8">
              {/* 3D Theater View */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Theater View</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Icon name="Users" size={16} />
                    <span>5 people currently selecting seats</span>
                  </div>
                </div>
                <TheaterView3D
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSeatSelect}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
              </div>

              {/* Interactive Seat Map */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Select Your Seats</h2>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSeats([])}
                      disabled={selectedSeats.length === 0}
                    >
                      <Icon name="RotateCcw" size={16} className="mr-1" />
                      Clear Selection
                    </Button>
                    <div className="text-sm text-gray-600">
                      Double-click selected seats to preview view
                    </div>
                  </div>
                </div>
                <div onDoubleClick={(e) => {
                  const seatElement = e.target.closest('[data-seat-id]');
                  if (seatElement) {
                    const seatId = seatElement.getAttribute('data-seat-id');
                    handleSeatDoubleClick(seatId);
                  }
                }}>
                  <SeatMap
                    selectedSeats={selectedSeats}
                    onSeatSelect={handleSeatSelect}
                    onSeatDeselect={handleSeatDeselect}
                    groupSize={groupSize}
                    userPreferences={userPreferences}
                  />
                </div>
              </div>

              {/* Smart Recommendations */}
              {selectedSeats.length === 0 && (
                <div className="bg-gradient-to-r from-cinema-gold/10 to-yellow-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Icon name="Lightbulb" size={20} className="mr-2 text-cinema-gold" />
                    Smart Recommendations
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Icon name="Heart" size={24} className="mx-auto mb-2 text-red-500" />
                      <h4 className="font-medium mb-1">Best for Couples</h4>
                      <p className="text-sm text-gray-600">Center seats E7-E8</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Icon name="Users" size={24} className="mx-auto mb-2 text-blue-500" />
                      <h4 className="font-medium mb-1">Family Friendly</h4>
                      <p className="text-sm text-gray-600">Aisle seats H1-H4</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Icon name="Star" size={24} className="mx-auto mb-2 text-cinema-gold" />
                      <h4 className="font-medium mb-1">Premium Experience</h4>
                      <p className="text-sm text-gray-600">Front premium A5-A6</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Booking Tools & Summary */}
            <div className="space-y-6">
              {/* Booking Timer */}
              <BookingTimer
                onTimeExpired={handleTimeExpired}
                onExtendTime={handleExtendTime}
              />

              {/* Group Booking Tools */}
              <GroupBookingTools
                groupSize={groupSize}
                onGroupSizeChange={handleGroupSizeChange}
                onInviteFriends={handleInviteFriends}
                selectedSeats={selectedSeats}
              />

              {/* Booking Summary */}
              <BookingSummary
                movieDetails={movieDetails}
                selectedSeats={selectedSeats}
                showtime={showtime}
                theater={theater}
                onProceedToPayment={handleProceedToPayment}
                onSeatUpgrade={handleSeatUpgrade}
                loyaltyDiscount={false}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">
                {selectedSeats.length} of {groupSize} seats selected
              </div>
              <div className="font-semibold text-gray-900">
                Total: ${(selectedSeats.length * 14.99).toFixed(2)}
              </div>
            </div>
            <Button
              variant="default"
              disabled={selectedSeats.length !== groupSize}
              className="bg-conversion-orange hover:bg-orange-600 text-white"
              onClick={handleProceedToPayment}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>

      {/* View from Seat Modal */}
      {showViewFromSeat && (
        <ViewFromSeat
          selectedSeat={selectedSeatForView}
          onClose={() => {
            setShowViewFromSeat(false);
            setSelectedSeatForView(null);
          }}
        />
      )}
    </div>
  );
};

export default SeatSelection;
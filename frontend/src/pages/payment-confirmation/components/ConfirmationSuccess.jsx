import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConfirmationSuccess = ({ bookingData, onDownloadTicket, onShareBooking }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const {
    bookingId,
    movie,
    theater,
    showtime,
    seats,
    pricing
  } = bookingData;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2024-01-01 ${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const shareOptions = [
    { name: 'Facebook', icon: 'Facebook', color: '#1877F2' },
    { name: 'Twitter', icon: 'Twitter', color: '#1DA1F2' },
    { name: 'Instagram', icon: 'Instagram', color: '#E4405F' },
    { name: 'WhatsApp', icon: 'MessageCircle', color: '#25D366' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Animation */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 transition-all duration-1000 ${
          animationComplete ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}>
          <Icon name="CheckCircle" size={40} color="#10B981" />
        </div>
        <h1 className="text-3xl font-bold text-cinema-black mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">Your tickets have been booked successfully</p>
      </div>

      {/* Digital Ticket */}
      <div className="bg-white rounded-xl premium-shadow overflow-hidden mb-6">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-cinema-black to-gray-800 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-cinema-gold rounded-lg flex items-center justify-center">
                <Icon name="Film" size={24} color="#1A1A1A" />
              </div>
              <div>
                <h2 className="font-bold text-lg">CineBook Pro</h2>
                <p className="text-sm text-gray-300">Digital Ticket</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">Booking ID</p>
              <p className="font-mono font-semibold">{bookingId}</p>
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <div className="w-24 h-36 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-cinema-black mb-2">{movie.title}</h3>
              <p className="text-gray-600 mb-4">{movie.genre} • {movie.duration} • {movie.rating}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="MapPin" size={16} color="#6B7280" />
                    <span className="text-sm font-medium text-cinema-black">Theater</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{theater.name}</p>
                  <p className="text-sm text-gray-600 ml-6">{theater.address}</p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Calendar" size={16} color="#6B7280" />
                    <span className="text-sm font-medium text-cinema-black">Date & Time</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{formatDate(showtime.date)}</p>
                  <p className="text-sm text-gray-600 ml-6">{formatTime(showtime.time)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Seats & QR Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Armchair" size={16} color="#6B7280" />
                <span className="font-medium text-cinema-black">Seats</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {seats.map((seat, index) => (
                  <div key={index} className="bg-cinema-gold/10 p-3 rounded-lg text-center">
                    <span className="font-semibold text-cinema-black">{seat.row}{seat.number}</span>
                    <p className="text-xs text-gray-600">{seat.type}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="QrCode" size={16} color="#6B7280" />
                <span className="font-medium text-cinema-black">Entry Code</span>
              </div>
              <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto flex items-center justify-center mb-2">
                <Icon name="QrCode" size={64} color="#6B7280" />
              </div>
              <p className="text-xs text-gray-600">Show this QR code at the theater</p>
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium text-cinema-black">Total Paid</span>
              <span className="text-xl font-bold text-cinema-black">{formatCurrency(pricing.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button
          variant="outline"
          fullWidth
          onClick={onDownloadTicket}
          iconName="Download"
          iconPosition="left"
        >
          Download Ticket
        </Button>
        
        <Button
          variant="default"
          fullWidth
          onClick={() => setShowQRCode(!showQRCode)}
          iconName="QrCode"
          iconPosition="left"
          className="bg-cinema-gold hover:bg-yellow-500 text-cinema-black"
        >
          Show QR Code
        </Button>
      </div>

      {/* Social Sharing */}
      <div className="bg-white rounded-xl p-6 premium-shadow mb-6">
        <h3 className="font-semibold text-cinema-black mb-4">Share Your Movie Plans</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => onShareBooking(option.name.toLowerCase())}
              className="flex flex-col items-center space-y-2 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-300"
            >
              <Icon name={option.icon} size={24} color={option.color} />
              <span className="text-sm text-gray-600">{option.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-electric-blue/10 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-cinema-black mb-4">What's Next?</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="Mail" size={16} color="#00A8FF" className="mt-1" />
            <div>
              <p className="text-sm font-medium text-cinema-black">Confirmation Email Sent</p>
              <p className="text-xs text-gray-600">Check your email for booking details and calendar invite</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Bell" size={16} color="#00A8FF" className="mt-1" />
            <div>
              <p className="text-sm font-medium text-cinema-black">Reminder Notifications</p>
              <p className="text-xs text-gray-600">We'll remind you 2 hours before showtime</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Star" size={16} color="#00A8FF" className="mt-1" />
            <div>
              <p className="text-sm font-medium text-cinema-black">Earn Rewards</p>
              <p className="text-xs text-gray-600">250 points added to your CineBook Rewards account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/homepage" className="flex-1">
          <Button variant="outline" fullWidth>
            Back to Home
          </Button>
        </Link>
        
        <Link to="/user-dashboard" className="flex-1">
          <Button 
            variant="default" 
            fullWidth
            className="bg-conversion-orange hover:bg-orange-600 text-white"
          >
            View My Bookings
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationSuccess;
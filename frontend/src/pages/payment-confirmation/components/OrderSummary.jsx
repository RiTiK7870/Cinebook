import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderSummary = ({ bookingData, promoCode, onPromoCodeChange, onApplyPromo }) => {
  const {
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

  return (
    <div className="bg-white rounded-xl p-6 premium-shadow">
      <h3 className="text-xl font-semibold text-cinema-black mb-6">Order Summary</h3>
      
      {/* Movie Information */}
      <div className="flex space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-cinema-black text-lg mb-1">{movie.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{movie.genre} • {movie.duration} • {movie.rating}</p>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={14} color="#6B7280" />
              <span className="text-sm text-gray-600">{theater.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} color="#6B7280" />
              <span className="text-sm text-gray-600">{formatDate(showtime.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} color="#6B7280" />
              <span className="text-sm text-gray-600">{formatTime(showtime.time)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Information */}
      <div className="mb-6">
        <h5 className="font-medium text-cinema-black mb-3">Selected Seats</h5>
        <div className="grid grid-cols-2 gap-2">
          {seats.map((seat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-cinema-gold/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Armchair" size={16} color="#D4AF37" />
                <span className="text-sm font-medium">{seat.row}{seat.number}</span>
              </div>
              <span className="text-sm text-gray-600">{seat.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Tag" size={16} color="#D4AF37" />
          <span className="font-medium text-cinema-black">Promo Code</span>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-gold focus:border-transparent"
          />
          <button
            onClick={onApplyPromo}
            className="px-4 py-2 bg-cinema-gold text-cinema-black font-medium rounded-lg hover:bg-yellow-500 transition-colors duration-300"
          >
            Apply
          </button>
        </div>
        {pricing.discount > 0 && (
          <div className="mt-2 flex items-center space-x-2">
            <Icon name="CheckCircle" size={14} color="#10B981" />
            <span className="text-sm text-green-600">Promo code applied successfully!</span>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tickets ({seats.length}x)</span>
          <span className="text-cinema-black">{formatCurrency(pricing.subtotal)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Convenience Fee</span>
          <span className="text-cinema-black">{formatCurrency(pricing.convenienceFee)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Taxes & Fees</span>
          <span className="text-cinema-black">{formatCurrency(pricing.taxes)}</span>
        </div>
        
        {pricing.discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-green-600">Discount</span>
            <span className="text-green-600">-{formatCurrency(pricing.discount)}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-cinema-black">Total</span>
            <span className="text-xl font-bold text-cinema-black">{formatCurrency(pricing.total)}</span>
          </div>
        </div>
      </div>

      {/* Loyalty Points */}
      <div className="bg-electric-blue/10 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Star" size={16} color="#00A8FF" />
          <span className="font-medium text-cinema-black">CineBook Rewards</span>
        </div>
        <p className="text-sm text-gray-600">
          You'll earn <span className="font-semibold text-electric-blue">250 points</span> from this purchase
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
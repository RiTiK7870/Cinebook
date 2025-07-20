import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingSummary = ({ 
  movieDetails, 
  selectedSeats, 
  showtime, 
  theater, 
  onProceedToPayment,
  onSeatUpgrade,
  loyaltyDiscount 
}) => {
  // Calculate pricing
  const calculateSeatPrice = (seatId) => {
    const row = seatId.charAt(0);
    if (['A', 'B', 'C'].includes(row)) return 18.99; // Premium
    if (['D', 'E', 'F', 'G', 'H', 'I', 'J'].includes(row)) return 14.99; // Standard
    return 11.99; // Economy
  };

  const subtotal = selectedSeats.reduce((total, seat) => total + calculateSeatPrice(seat), 0);
  const convenienceFee = selectedSeats.length * 2.50;
  const taxes = (subtotal + convenienceFee) * 0.08;
  const loyaltyDiscountAmount = loyaltyDiscount ? subtotal * 0.10 : 0;
  const total = subtotal + convenienceFee + taxes - loyaltyDiscountAmount;

  const formatTime = (time) => {
    return new Date(`2025-07-13T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Movie Header */}
      <div className="bg-gradient-to-r from-cinema-black to-gray-800 p-6 text-white">
        <div className="flex items-start space-x-4">
          <img
            src="https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=120&h=180&fit=crop"
            alt={movieDetails.title}
            className="w-16 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">{movieDetails.title}</h3>
            <div className="space-y-1 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={14} />
                <span>{theater.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} />
                <span>{showtime.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} />
                <span>{formatTime(showtime.time)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Seats */}
      <div className="p-6 border-b border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
          <Icon name="Armchair" size={18} className="mr-2" />
          Selected Seats ({selectedSeats.length})
        </h4>
        
        {selectedSeats.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Icon name="MousePointer" size={32} className="mx-auto mb-2 opacity-50" />
            <p>Select seats from the seating chart above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedSeats.map((seat) => {
              const price = calculateSeatPrice(seat);
              const seatType = ['A', 'B', 'C'].includes(seat.charAt(0)) ? 'Premium' : 
                              ['D', 'E', 'F', 'G', 'H', 'I', 'J'].includes(seat.charAt(0)) ? 'Standard' : 'Economy';
              
              return (
                <div key={seat} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cinema-gold rounded-lg flex items-center justify-center text-cinema-black font-medium text-sm">
                      {seat}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Seat {seat}</div>
                      <div className="text-sm text-gray-600">{seatType} Section</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">${price.toFixed(2)}</div>
                    {seatType === 'Economy' && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-electric-blue p-0 h-auto"
                        onClick={() => onSeatUpgrade(seat)}
                      >
                        Upgrade +$3
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pricing Breakdown */}
      {selectedSeats.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Price Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tickets ({selectedSeats.length})</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Convenience Fee</span>
              <span className="font-medium">${convenienceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & Fees</span>
              <span className="font-medium">${taxes.toFixed(2)}</span>
            </div>
            {loyaltyDiscount && (
              <div className="flex justify-between text-green-600">
                <span>Loyalty Discount (10%)</span>
                <span>-${loyaltyDiscountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loyalty Program */}
      {!loyaltyDiscount && (
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-cinema-gold/10 to-yellow-50">
          <div className="flex items-start space-x-3">
            <Icon name="Star" size={20} color="var(--color-cinema-gold)" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">Join CineBook Pro</h4>
              <p className="text-sm text-gray-600 mb-3">
                Get 10% off this booking and exclusive member benefits
              </p>
              <Button variant="outline" size="sm" className="border-cinema-gold text-cinema-gold hover:bg-cinema-gold hover:text-black">
                Join Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-6">
        <div className="space-y-3">
          <Button
            variant="default"
            fullWidth
            disabled={selectedSeats.length === 0}
            className="bg-conversion-orange hover:bg-orange-600 text-white font-semibold py-3"
            onClick={onProceedToPayment}
          >
            <Icon name="CreditCard" size={18} className="mr-2" />
            Proceed to Payment
          </Button>
          
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={12} />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="RefreshCw" size={12} />
              <span>Easy Refunds</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Smartphone" size={12} />
              <span>Mobile Tickets</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Timer */}
      <div className="bg-gray-50 px-6 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Icon name="Clock" size={14} />
            <span>Seats held for</span>
          </div>
          <div className="font-medium text-conversion-orange">
            14:32 remaining
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
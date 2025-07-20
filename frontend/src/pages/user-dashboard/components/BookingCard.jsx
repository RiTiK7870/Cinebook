import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking, type = 'upcoming' }) => {
  const isUpcoming = type === 'upcoming';
  const isPast = type === 'past';

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success text-success-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-accent text-accent-foreground';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-xl p-6 premium-shadow hover:shadow-lg transition-all duration-300 border border-border">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Movie Poster */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-36 lg:w-20 lg:h-30 rounded-lg overflow-hidden">
            <Image
              src={booking.moviePoster}
              alt={booking.movieTitle}
              className="w-full h-full object-cover"
            />
            {isUpcoming && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg text-foreground truncate">
                  {booking.movieTitle}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  <span>{formatDate(booking.date)}</span>
                  <Icon name="Clock" size={16} className="ml-2" />
                  <span>{formatTime(booking.time)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span className="truncate">{booking.theater}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Icon name="Armchair" size={16} />
                  <span>
                    {booking.seats.length} seat{booking.seats.length > 1 ? 's' : ''}: {booking.seats.join(', ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Icon name="CreditCard" size={16} />
                  <span className="font-medium text-foreground">${booking.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 lg:ml-4">
              {isUpcoming && booking.status === 'confirmed' && (
                <>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-cinema-gold hover:bg-yellow-600 text-cinema-black font-medium"
                    onClick={() => console.log('View ticket:', booking.id)}
                  >
                    <Icon name="Ticket" size={16} className="mr-2" />
                    View Ticket
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.log('Modify booking:', booking.id)}
                  >
                    <Icon name="Edit" size={16} className="mr-2" />
                    Modify
                  </Button>
                </>
              )}

              {isPast && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log('Rate movie:', booking.movieId)}
                >
                  <Icon name="Star" size={16} className="mr-2" />
                  Rate Movie
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => console.log('View details:', booking.id)}
              >
                <Icon name="Eye" size={16} className="mr-2" />
                Details
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code for upcoming bookings */}
      {isUpcoming && booking.status === 'confirmed' && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="QrCode" size={16} />
              <span>Booking ID: {booking.bookingId}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => console.log('Show QR code:', booking.bookingId)}
            >
              <Icon name="QrCode" size={16} className="mr-2" />
              Show QR
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
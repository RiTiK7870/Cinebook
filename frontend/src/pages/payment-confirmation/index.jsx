import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingProgress from './components/BookingProgress';
import OrderSummary from './components/OrderSummary';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import ConfirmationSuccess from './components/ConfirmationSuccess';

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('payment');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [bookingData, setBookingData] = useState({
    bookingId: 'CB' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    movie: {
      title: "Dune: Part Two",
      genre: "Sci-Fi, Adventure",
      duration: "2h 46m",
      rating: "PG-13",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=600&fit=crop"
    },
    theater: {
      name: "CineMax IMAX Downtown",
      address: "123 Cinema Boulevard, Downtown District, NY 10001",
      screen: "IMAX Screen 1"
    },
    showtime: {
      date: "2025-07-15",
      time: "19:30"
    },
    seats: [
      { row: "H", number: "12", type: "Premium" },
      { row: "H", number: "13", type: "Premium" }
    ],
    pricing: {
      subtotal: 32.00,
      convenienceFee: 4.50,
      taxes: 3.25,
      discount: 0,
      total: 39.75
    }
  });

  useEffect(() => {
    // Simulate loading booking data from previous steps
    const timer = setTimeout(() => {
      console.log('Booking data loaded');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePromoCodeChange = (code) => {
    setPromoCode(code);
  };

  const handleApplyPromo = () => {
    // Mock promo code validation
    if (promoCode.toLowerCase() === 'save10') {
      const discount = bookingData.pricing.subtotal * 0.1;
      setBookingData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          discount: discount,
          total: prev.pricing.subtotal + prev.pricing.convenienceFee + prev.pricing.taxes - discount
        }
      }));
    } else if (promoCode.toLowerCase() === 'first20') {
      const discount = bookingData.pricing.subtotal * 0.2;
      setBookingData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          discount: discount,
          total: prev.pricing.subtotal + prev.pricing.convenienceFee + prev.pricing.taxes - discount
        }
      }));
    }
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadTicket = () => {
    // Mock ticket download
    const ticketData = {
      ...bookingData,
      downloadTime: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(ticketData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `CineBook-Ticket-${bookingData.bookingId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleShareBooking = (platform) => {
    const shareText = `Just booked tickets for ${bookingData.movie.title} at ${bookingData.theater.name}! 🎬 #CineBookPro #MovieNight`;
    const shareUrl = window.location.origin + '/movie-detail';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      instagram: `https://www.instagram.com/`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-cinema-black mb-2">
              {currentStep === 'payment' ? 'Complete Your Booking' : 'Booking Confirmed!'}
            </h1>
            <p className="text-gray-600">
              {currentStep === 'payment' ?'Secure payment processing with 256-bit encryption' :'Your movie tickets are ready!'
              }
            </p>
          </div>

          {/* Progress Indicator */}
          <BookingProgress currentStep={currentStep} />

          {currentStep === 'payment' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  bookingData={bookingData}
                  promoCode={promoCode}
                  onPromoCodeChange={handlePromoCodeChange}
                  onApplyPromo={handleApplyPromo}
                />
              </div>

              {/* Payment Method */}
              <div className="lg:col-span-2">
                <PaymentMethodSelector
                  selectedMethod={selectedPaymentMethod}
                  onMethodChange={handlePaymentMethodChange}
                  onPaymentSubmit={handlePaymentSubmit}
                  isProcessing={isProcessing}
                />
              </div>
            </div>
          ) : (
            <ConfirmationSuccess
              bookingData={bookingData}
              onDownloadTicket={handleDownloadTicket}
              onShareBooking={handleShareBooking}
            />
          )}

          {/* Security Notice */}
          {currentStep === 'payment' && (
            <div className="mt-8 bg-white rounded-xl p-6 premium-shadow">
              <div className="text-center">
                <h3 className="font-semibold text-cinema-black mb-4">Your Security is Our Priority</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-cinema-black mb-1">SSL Encryption</h4>
                    <p className="text-sm text-gray-600">All data transmitted is encrypted using 256-bit SSL technology</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-cinema-black mb-1">PCI Compliant</h4>
                    <p className="text-sm text-gray-600">Payment processing meets the highest industry standards</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-cinema-black mb-1">Fraud Protection</h4>
                    <p className="text-sm text-gray-600">Advanced fraud detection and buyer protection policies</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PaymentConfirmation;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ViewFromSeat = ({ selectedSeat, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock seat view images - in real app, these would be actual photos from the theater
  const seatViews = {
    'A5': {
      images: [
        'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=600&fit=crop'
      ],
      quality: 'Excellent',
      distance: '35 feet',
      angle: 'Perfect center view',
      features: ['Premium sound', 'Reclining seats', 'Extra legroom']
    },
    'E7': {
      images: [
        'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=600&fit=crop'
      ],
      quality: 'Very Good',
      distance: '45 feet',
      angle: 'Optimal viewing angle',
      features: ['Standard comfort', 'Good sound quality', 'Clear sightlines']
    },
    'K10': {
      images: [
        'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=800&h=600&fit=crop'
      ],
      quality: 'Good',
      distance: '65 feet',
      angle: 'Slightly elevated view',
      features: ['Economy pricing', 'Standard seating', 'Clear view']
    }
  };

  const currentSeatData = seatViews[selectedSeat] || seatViews['E7'];
  const images = currentSeatData.images;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Excellent': return 'text-green-600';
      case 'Very Good': return 'text-blue-600';
      case 'Good': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getQualityStars = (quality) => {
    switch (quality) {
      case 'Excellent': return 5;
      case 'Very Good': return 4;
      case 'Good': return 3;
      default: return 2;
    }
  };

  if (!selectedSeat) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-800">View from Seat {selectedSeat}</h2>
            <p className="text-gray-600">See exactly what you'll experience</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Image Viewer */}
            <div className="space-y-4">
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={images[currentImageIndex]}
                  alt={`View from seat ${selectedSeat}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={prevImage}
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={nextImage}
                    >
                      <Icon name="ChevronRight" size={20} />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}

                {/* View Type Badge */}
                <div className="absolute top-2 left-2 bg-cinema-gold text-cinema-black px-3 py-1 rounded-full text-sm font-medium">
                  Actual View
                </div>
              </div>

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="flex space-x-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-cinema-gold' :'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Seat Information */}
            <div className="space-y-6">
              {/* Quality Rating */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">View Quality</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Overall Rating</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            size={16}
                            color={star <= getQualityStars(currentSeatData.quality) ? "#D4AF37" : "#D1D5DB"}
                            className={star <= getQualityStars(currentSeatData.quality) ? "fill-current" : ""}
                          />
                        ))}
                      </div>
                      <span className={`font-medium ${getQualityColor(currentSeatData.quality)}`}>
                        {currentSeatData.quality}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Distance to Screen</span>
                    <span className="font-medium">{currentSeatData.distance}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Viewing Angle</span>
                    <span className="font-medium">{currentSeatData.angle}</span>
                  </div>
                </div>
              </div>

              {/* Seat Features */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Seat Features</h3>
                <div className="space-y-2">
                  {currentSeatData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={16} color="#10B981" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Technical Specs</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Volume2" size={14} color="#6B7280" />
                    <span className="text-gray-600">Dolby Atmos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Monitor" size={14} color="#6B7280" />
                    <span className="text-gray-600">4K Projection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Accessibility" size={14} color="#6B7280" />
                    <span className="text-gray-600">Accessible Row</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Wifi" size={14} color="#6B7280" />
                    <span className="text-gray-600">Free WiFi</span>
                  </div>
                </div>
              </div>

              {/* User Reviews */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Recent Reviews</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            size={12}
                            color={star <= 5 ? "#D4AF37" : "#D1D5DB"}
                            className={star <= 5 ? "fill-current" : ""}
                          />
                        ))}
                      </div>
                      <span className="font-medium text-gray-700">Sarah M.</span>
                    </div>
                    <p className="text-gray-600">"Perfect center view, excellent sound quality!"</p>
                  </div>
                  
                  <div className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            size={12}
                            color="#D4AF37"
                            className="fill-current"
                          />
                        ))}
                        <Icon name="Star" size={12} color="#D1D5DB" />
                      </div>
                      <span className="font-medium text-gray-700">Mike R.</span>
                    </div>
                    <p className="text-gray-600">"Great seats, very comfortable for a 3-hour movie."</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={onClose}
                >
                  Close Preview
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  className="bg-cinema-gold hover:bg-yellow-600 text-cinema-black"
                  onClick={onClose}
                >
                  Select This Seat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFromSeat;
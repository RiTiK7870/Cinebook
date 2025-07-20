import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TheaterView3D = ({ selectedSeats, onSeatSelect, viewMode, onViewModeChange }) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  const handleRotate = (direction) => {
    setRotation(prev => prev + (direction === 'left' ? -15 : 15));
  };

  const handleZoom = (type) => {
    setZoom(prev => type === 'in' ? Math.min(prev + 0.2, 2) : Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="bg-cinema-black rounded-xl p-6 relative overflow-hidden">
      {/* 3D Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/70"
          onClick={() => handleRotate('left')}
        >
          <Icon name="RotateCcw" size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/70"
          onClick={() => handleRotate('right')}
        >
          <Icon name="RotateCw" size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/70"
          onClick={() => handleZoom('in')}
        >
          <Icon name="ZoomIn" size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/70"
          onClick={() => handleZoom('out')}
        >
          <Icon name="ZoomOut" size={18} />
        </Button>
      </div>

      {/* View Mode Toggle */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/50 rounded-lg p-1 flex">
          <Button
            variant={viewMode === '3d' ? 'default' : 'ghost'}
            size="sm"
            className={viewMode === '3d' ? 'bg-cinema-gold text-black' : 'text-white hover:bg-white/10'}
            onClick={() => onViewModeChange('3d')}
          >
            3D View
          </Button>
          <Button
            variant={viewMode === 'flat' ? 'default' : 'ghost'}
            size="sm"
            className={viewMode === 'flat' ? 'bg-cinema-gold text-black' : 'text-white hover:bg-white/10'}
            onClick={() => onViewModeChange('flat')}
          >
            Flat View
          </Button>
        </div>
      </div>

      {/* Theater 3D Visualization */}
      <div 
        className="relative h-96 flex items-center justify-center"
        style={{ 
          transform: `perspective(1000px) rotateY(${rotation}deg) scale(${zoom})`,
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Screen */}
        <div className="absolute top-8 w-full max-w-md h-4 bg-gradient-to-r from-gray-600 via-white to-gray-600 rounded-sm shadow-lg">
          <div className="text-center text-white text-xs mt-6 font-medium">SCREEN</div>
        </div>

        {/* Theater Perspective Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            <defs>
              <linearGradient id="perspectiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(212, 175, 55, 0.3)" />
                <stop offset="100%" stopColor="rgba(212, 175, 55, 0.1)" />
              </linearGradient>
            </defs>
            <path
              d="M50 50 L350 50 L320 250 L80 250 Z"
              fill="url(#perspectiveGradient)"
              stroke="rgba(212, 175, 55, 0.5)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Seating Area Indicator */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="bg-cinema-gold/20 border border-cinema-gold/50 rounded-lg px-4 py-2">
            <div className="text-cinema-gold text-sm font-medium text-center">
              Interactive Seating Chart Below
            </div>
            <div className="flex items-center justify-center mt-1">
              <Icon name="ChevronDown" size={16} color="var(--color-cinema-gold)" />
            </div>
          </div>
        </div>

        {/* View Angle Indicators */}
        {selectedSeats.length > 0 && (
          <div className="absolute bottom-8 right-8">
            <div className="bg-black/70 rounded-lg p-3 text-white">
              <div className="text-xs font-medium mb-1">View Quality</div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={12}
                    color={star <= 4 ? "#D4AF37" : "#6B7280"}
                    className={star <= 4 ? "fill-current" : ""}
                  />
                ))}
                <span className="text-xs ml-1">Excellent</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3D Features Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-black/50 rounded-lg p-3">
          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={14} />
                <span>View from Seat</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Rotate3D" size={14} />
                <span>360° Rotation</span>
              </div>
            </div>
            <div className="text-cinema-gold font-medium">
              Zoom: {Math.round(zoom * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheaterView3D;
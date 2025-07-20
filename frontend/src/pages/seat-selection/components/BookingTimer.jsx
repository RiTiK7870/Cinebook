import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const BookingTimer = ({ initialTime = 900, onTimeExpired, onExtendTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime); // 15 minutes in seconds
  const [isWarning, setIsWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        
        // Set warning states
        if (newTime <= 300 && newTime > 60) { // 5 minutes warning
          setIsWarning(true);
          setIsCritical(false);
        } else if (newTime <= 60) { // 1 minute critical
          setIsWarning(false);
          setIsCritical(true);
        } else {
          setIsWarning(false);
          setIsCritical(false);
        }
        
        // Time expired
        if (newTime <= 0) {
          clearInterval(timer);
          onTimeExpired();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeExpired]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((initialTime - timeLeft) / initialTime) * 100;
  };

  const getTimerColor = () => {
    if (isCritical) return 'text-red-600';
    if (isWarning) return 'text-orange-600';
    return 'text-green-600';
  };

  const getProgressColor = () => {
    if (isCritical) return 'bg-red-500';
    if (isWarning) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const handleExtendTime = () => {
    setTimeLeft(prevTime => prevTime + 300); // Add 5 more minutes
    setIsWarning(false);
    setIsCritical(false);
    onExtendTime();
  };

  return (
    <div className={`bg-white rounded-xl p-4 shadow-lg border-l-4 ${
      isCritical ? 'border-red-500' : isWarning ? 'border-orange-500' : 'border-green-500'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon 
            name="Clock" 
            size={20} 
            color={isCritical ? '#DC2626' : isWarning ? '#EA580C' : '#059669'} 
          />
          <h3 className="font-semibold text-gray-800">Booking Timer</h3>
        </div>
        <div className={`text-xl font-bold ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor()}`}
            style={{ width: `${100 - getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      {/* Timer Status Messages */}
      <div className="text-sm">
        {isCritical && (
          <div className="flex items-center space-x-2 text-red-600 mb-2">
            <Icon name="AlertTriangle" size={16} />
            <span className="font-medium">Hurry! Less than 1 minute remaining</span>
          </div>
        )}
        
        {isWarning && !isCritical && (
          <div className="flex items-center space-x-2 text-orange-600 mb-2">
            <Icon name="AlertCircle" size={16} />
            <span className="font-medium">5 minutes remaining - please complete your booking</span>
          </div>
        )}
        
        {!isWarning && !isCritical && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Icon name="Shield" size={16} />
            <span>Your seats are securely held</span>
          </div>
        )}
      </div>

      {/* Extend Time Option */}
      {(isWarning || isCritical) && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <button
            onClick={handleExtendTime}
            className="w-full bg-electric-blue hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Icon name="Plus" size={16} />
            <span>Extend Time (+5 min)</span>
          </button>
          <p className="text-xs text-gray-500 text-center mt-1">
            One-time extension available
          </p>
        </div>
      )}

      {/* Timer Info */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Seats held until timer expires</span>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>3 others viewing</span>
          </div>
        </div>
      </div>

      {/* Auto-save indicator */}
      <div className="mt-2 flex items-center justify-center space-x-1 text-xs text-gray-400">
        <Icon name="Save" size={12} />
        <span>Selection auto-saved</span>
      </div>
    </div>
  );
};

export default BookingTimer;
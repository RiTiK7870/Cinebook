import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const SeatMap = ({ selectedSeats, onSeatSelect, onSeatDeselect, groupSize, userPreferences }) => {
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [seatRecommendations, setSeatRecommendations] = useState([]);

  // Mock seat data with realistic theater layout
  const seatData = {
    sections: [
      {
        name: "Premium",
        rows: ['A', 'B', 'C'],
        seatsPerRow: 12,
        startSeat: 1,
        price: 18.99,
        type: 'premium'
      },
      {
        name: "Standard",
        rows: ['D', 'E', 'F', 'G', 'H', 'I', 'J'],
        seatsPerRow: 14,
        startSeat: 1,
        price: 14.99,
        type: 'standard'
      },
      {
        name: "Economy",
        rows: ['K', 'L', 'M', 'N'],
        seatsPerRow: 16,
        startSeat: 1,
        price: 11.99,
        type: 'economy'
      }
    ]
  };

  // Generate seat status (available, occupied, selected, etc.)
  const getSeatStatus = (row, seatNumber) => {
    const seatId = `${row}${seatNumber}`;
    
    if (selectedSeats.includes(seatId)) return 'selected';
    
    // Mock some occupied seats
    const occupiedSeats = ['A3', 'A4', 'B7', 'B8', 'D5', 'D6', 'F10', 'F11', 'H2', 'H3', 'J12', 'J13'];
    if (occupiedSeats.includes(seatId)) return 'occupied';
    
    // Mock some reserved seats (being held by other users)
    const reservedSeats = ['C5', 'C6', 'E8', 'E9'];
    if (reservedSeats.includes(seatId)) return 'reserved';
    
    // Mock accessibility seats
    const accessibilitySeats = ['D1', 'D14', 'G1', 'G14'];
    if (accessibilitySeats.includes(seatId)) return 'accessibility';
    
    return 'available';
  };

  // Get seat recommendations based on user preferences
  useEffect(() => {
    const recommendations = [];
    
    if (userPreferences?.type === 'couple' && groupSize === 2) {
      recommendations.push('E7', 'E8', 'F7', 'F8', 'G7', 'G8');
    } else if (userPreferences?.type === 'family' && groupSize > 2) {
      recommendations.push('H1', 'H2', 'H3', 'H4', 'I1', 'I2', 'I3', 'I4');
    } else if (userPreferences?.accessibility) {
      recommendations.push('D1', 'D14', 'G1', 'G14');
    }
    
    setSeatRecommendations(recommendations);
  }, [groupSize, userPreferences]);

  const getSeatClass = (status, row, seatNumber) => {
    const seatId = `${row}${seatNumber}`;
    const isRecommended = seatRecommendations.includes(seatId);
    const isHovered = hoveredSeat === seatId;
    
    const baseClass = "w-8 h-8 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-medium relative";
    
    switch (status) {
      case 'selected':
        return `${baseClass} bg-cinema-gold border-cinema-gold text-cinema-black shadow-lg transform scale-110`;
      case 'occupied':
        return `${baseClass} bg-gray-600 border-gray-600 text-gray-400 cursor-not-allowed`;
      case 'reserved':
        return `${baseClass} bg-red-500/30 border-red-500 text-red-300 cursor-not-allowed`;
      case 'accessibility':
        return `${baseClass} bg-blue-500/30 border-blue-500 text-blue-300 ${isHovered ? 'bg-blue-500/50' : ''}`;
      case 'available':
      default:
        return `${baseClass} bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 ${
          isRecommended ? 'ring-2 ring-cinema-gold/50 bg-cinema-gold/10' : ''
        } ${isHovered ? 'transform scale-105' : ''}`;
    }
  };

  const handleSeatClick = (row, seatNumber) => {
    const seatId = `${row}${seatNumber}`;
    const status = getSeatStatus(row, seatNumber);
    
    if (status === 'occupied' || status === 'reserved') return;
    
    if (selectedSeats.includes(seatId)) {
      onSeatDeselect(seatId);
    } else if (selectedSeats.length < groupSize) {
      onSeatSelect(seatId, row, seatNumber);
    }
  };

  const getSectionPrice = (sectionType) => {
    const section = seatData.sections.find(s => s.type === sectionType);
    return section?.price || 0;
  };

  return (
    <div className="bg-white rounded-xl p-6">
      {/* Screen Indicator */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-lg px-8 py-2 shadow-lg">
          <div className="text-gray-700 font-medium text-sm">SCREEN</div>
        </div>
      </div>

      {/* Seating Chart */}
      <div className="space-y-6">
        {seatData.sections.map((section) => (
          <div key={section.name} className="space-y-3">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-gray-800">{section.name}</h3>
                <span className="text-sm text-gray-600">${section.price}</span>
              </div>
              <div className="text-xs text-gray-500">
                {section.rows.length} rows • {section.seatsPerRow} seats per row
              </div>
            </div>

            {/* Rows */}
            <div className="space-y-2">
              {section.rows.map((row) => (
                <div key={row} className="flex items-center justify-center space-x-1">
                  {/* Row Label */}
                  <div className="w-8 text-center text-sm font-medium text-gray-600 mr-2">
                    {row}
                  </div>

                  {/* Seats */}
                  <div className="flex space-x-1">
                    {Array.from({ length: section.seatsPerRow }, (_, index) => {
                      const seatNumber = section.startSeat + index;
                      const seatId = `${row}${seatNumber}`;
                      const status = getSeatStatus(row, seatNumber);
                      
                      return (
                        <div
                          key={seatNumber}
                          className={getSeatClass(status, row, seatNumber)}
                          onClick={() => handleSeatClick(row, seatNumber)}
                          onMouseEnter={() => setHoveredSeat(seatId)}
                          onMouseLeave={() => setHoveredSeat(null)}
                          title={`${row}${seatNumber} - ${status} - $${section.price}`}
                        >
                          {status === 'accessibility' && (
                            <Icon name="Accessibility" size={12} />
                          )}
                          {status === 'selected' && (
                            <Icon name="Check" size={12} />
                          )}
                          {status === 'occupied' && (
                            <Icon name="X" size={10} />
                          )}
                          {status === 'reserved' && (
                            <Icon name="Clock" size={10} />
                          )}
                          {status === 'available' && !seatRecommendations.includes(seatId) && (
                            <span>{seatNumber}</span>
                          )}
                          {status === 'available' && seatRecommendations.includes(seatId) && (
                            <Icon name="Star" size={10} color="var(--color-cinema-gold)" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Row Label (Right) */}
                  <div className="w-8 text-center text-sm font-medium text-gray-600 ml-2">
                    {row}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-800 mb-3">Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-800 border border-gray-600 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-cinema-gold border border-cinema-gold rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-600 border border-gray-600 rounded"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500/30 border border-red-500 rounded"></div>
            <span>Reserved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500/30 border border-blue-500 rounded flex items-center justify-center">
              <Icon name="Accessibility" size={8} />
            </div>
            <span>Accessible</span>
          </div>
        </div>
      </div>

      {/* Seat Hover Info */}
      {hoveredSeat && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm">
            <span className="font-medium">Seat {hoveredSeat}</span>
            <span className="text-gray-600 ml-2">
              • View Quality: Excellent • Distance: 45ft from screen
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;
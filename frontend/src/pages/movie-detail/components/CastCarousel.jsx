import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CastCarousel = ({ cast }) => {
  const [selectedCast, setSelectedCast] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(cast.length / 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(cast.length / 4)) % Math.ceil(cast.length / 4));
  };

  const visibleCast = cast.slice(currentIndex * 4, (currentIndex + 1) * 4);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-cinema-black">Cast & Crew</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-10 h-10"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= Math.ceil(cast.length / 4) - 1}
            className="w-10 h-10"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleCast.map((member) => (
          <div
            key={member.id}
            className="group cursor-pointer"
            onClick={() => setSelectedCast(member)}
          >
            <div className="relative overflow-hidden rounded-xl mb-3">
              <Image
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-white bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    View Bio
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-cinema-black group-hover:text-cinema-gold transition-colors">
                {member.name}
              </h4>
              <p className="text-sm text-gray-600">{member.character}</p>
              <div className="flex items-center justify-center mt-2 space-x-1">
                <Icon name="Star" size={14} color="#D4AF37" className="fill-current" />
                <span className="text-sm text-gray-500">{member.popularity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cast Bio Modal */}
      {selectedCast && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedCast(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
              
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <Image
                  src={selectedCast.image}
                  alt={selectedCast.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">{selectedCast.name}</h3>
                  <p className="text-cinema-gold font-medium">{selectedCast.character}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Age</h4>
                    <p className="text-cinema-black">{selectedCast.age}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Nationality</h4>
                    <p className="text-cinema-black">{selectedCast.nationality}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Known For</h4>
                    <p className="text-cinema-black">{selectedCast.knownFor}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Awards</h4>
                    <p className="text-cinema-black">{selectedCast.awards}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Biography</h4>
                  <p className="text-gray-600 leading-relaxed">{selectedCast.biography}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Notable Works</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCast.notableWorks.map((work, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Image
                          src={work.poster}
                          alt={work.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div>
                          <h5 className="font-medium text-cinema-black">{work.title}</h5>
                          <p className="text-sm text-gray-500">{work.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    iconName="ExternalLink"
                    iconPosition="left"
                  >
                    IMDb Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-cinema-gold"
                  >
                    <Icon name="Share2" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CastCarousel;
import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MovieInfo = ({ movie }) => {
  const [activeTab, setActiveTab] = useState('synopsis');

  const tabs = [
    { id: 'synopsis', name: 'Synopsis', icon: 'FileText' },
    { id: 'details', name: 'Details', icon: 'Info' },
    { id: 'production', name: 'Production', icon: 'Camera' },
    { id: 'trivia', name: 'Trivia', icon: 'Lightbulb' }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-cinema-black">Movie Information</h3>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Share2">
            Share
          </Button>
          <Button variant="ghost" size="sm" iconName="Download">
            Download Info
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-cinema-black shadow-sm'
                : 'text-gray-600 hover:text-cinema-black'
            }`}
          >
            <Icon name={tab.icon} size={18} />
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {/* Synopsis Tab */}
        {activeTab === 'synopsis' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-cinema-black mb-3">Plot Summary</h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                {movie.fullSynopsis}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-cinema-black mb-3">Director's Vision</h4>
              <p className="text-gray-700 leading-relaxed">
                {movie.directorVision}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-cinema-black mb-3">Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {movie.themes.map((theme, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-cinema-gold/20 text-cinema-black rounded-full text-sm font-medium"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-cinema-black mb-3">Content Warnings</h4>
                <div className="space-y-2">
                  {movie.contentWarnings.map((warning, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Icon name="AlertTriangle" size={16} color="#F59E0B" />
                      <span className="text-gray-700">{warning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Release Date</h4>
                <p className="text-cinema-black">{movie.releaseDate}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Runtime</h4>
                <p className="text-cinema-black">{movie.duration}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Language</h4>
                <p className="text-cinema-black">{movie.language}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Country</h4>
                <p className="text-cinema-black">{movie.country}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Budget</h4>
                <p className="text-cinema-black">{movie.budget}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Box Office</h4>
                <p className="text-cinema-black">{movie.boxOffice}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Distributor</h4>
                <p className="text-cinema-black">{movie.distributor}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">MPAA Rating</h4>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm font-medium">
                    {movie.mpaaRating}
                  </span>
                  <span className="text-gray-600 text-sm">{movie.mpaaReason}</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Aspect Ratio</h4>
                <p className="text-cinema-black">{movie.aspectRatio}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Sound Mix</h4>
                <p className="text-cinema-black">{movie.soundMix}</p>
              </div>
            </div>
          </div>
        )}

        {/* Production Tab */}
        {activeTab === 'production' && (
          <div className="space-y-8">
            <div>
              <h4 className="font-semibold text-cinema-black mb-4">Key Personnel</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movie.keyPersonnel.map((person, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Image
                      src={person.image}
                      alt={person.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="font-semibold text-cinema-black">{person.name}</h5>
                      <p className="text-sm text-gray-600">{person.role}</p>
                      <p className="text-xs text-gray-500">{person.previousWork}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-cinema-black mb-4">Production Companies</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movie.productionCompanies.map((company, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      className="w-16 h-16 mx-auto mb-2 object-contain"
                    />
                    <p className="text-sm font-medium text-cinema-black">{company.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-cinema-black mb-4">Filming Locations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {movie.filmingLocations.map((location, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <Icon name="MapPin" size={20} color="#6B7280" />
                    <div>
                      <p className="font-medium text-cinema-black">{location.name}</p>
                      <p className="text-sm text-gray-600">{location.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trivia Tab */}
        {activeTab === 'trivia' && (
          <div className="space-y-6">
            {movie.trivia.map((item, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-cinema-gold/10 to-transparent border-l-4 border-cinema-gold rounded-r-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Lightbulb" size={20} color="#D4AF37" className="mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-cinema-black mb-2">{item.title}</h5>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    {item.source && (
                      <p className="text-sm text-gray-500 mt-2">Source: {item.source}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
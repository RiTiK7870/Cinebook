import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityBuzz = ({ reviews, discussions, photos }) => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  const tabs = [
    { id: 'reviews', name: 'Reviews', icon: 'Star', count: reviews.length },
    { id: 'discussions', name: 'Discussions', icon: 'MessageCircle', count: discussions.length },
    { id: 'photos', name: 'Photos', icon: 'Camera', count: photos.length }
  ];

  const handleRatingClick = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = () => {
    if (newReview.rating > 0 && newReview.comment.trim()) {
      console.log('Submitting review:', newReview);
      setShowReviewForm(false);
      setNewReview({ rating: 0, comment: '' });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-cinema-black">Community Buzz</h3>
        <Button
          variant="outline"
          onClick={() => setShowReviewForm(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Review
        </Button>
      </div>

      {/* Tabs */}
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
            <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                <Image
                  src={review.user.avatar}
                  alt={review.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-cinema-black">{review.user.name}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={16}
                              color={i < review.rating ? "#D4AF37" : "#E5E7EB"}
                              className={i < review.rating ? "fill-current" : ""}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="ThumbsUp" size={16} className="mr-1" />
                        {review.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MessageCircle" size={16} className="mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  {review.spoilerWarning && (
                    <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2 text-yellow-800">
                        <Icon name="AlertTriangle" size={16} />
                        <span className="text-sm font-medium">Contains Spoilers</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="p-4 border border-gray-200 rounded-lg hover:border-cinema-gold transition-colors">
              <div className="flex items-start space-x-4">
                <Image
                  src={discussion.user.avatar}
                  alt={discussion.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-cinema-black">{discussion.title}</h4>
                    <span className="text-sm text-gray-500">{discussion.timeAgo}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{discussion.preview}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>by {discussion.user.name}</span>
                    <span className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={14} />
                      <span>{discussion.replies} replies</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} />
                      <span>{discussion.views} views</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photos Tab */}
      {activeTab === 'photos' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-3 text-white">
                  <p className="text-sm font-medium">{photo.caption}</p>
                  <p className="text-xs opacity-80">by {photo.user.name}</p>
                </div>
              </div>
              <div className="absolute top-2 right-2 flex space-x-1">
                <button className="w-6 h-6 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="Heart" size={14} />
                </button>
                <button className="w-6 h-6 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="Share2" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-cinema-black">Write a Review</h3>
              <button
                onClick={() => setShowReviewForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      className="transition-colors"
                    >
                      <Icon
                        name="Star"
                        size={32}
                        color={star <= newReview.rating ? "#D4AF37" : "#E5E7EB"}
                        className={star <= newReview.rating ? "fill-current" : ""}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your thoughts about this movie..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cinema-gold focus:border-transparent resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  className="flex-1 bg-cinema-gold hover:bg-yellow-600 text-cinema-black"
                  onClick={handleSubmitReview}
                  disabled={newReview.rating === 0 || !newReview.comment.trim()}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityBuzz;
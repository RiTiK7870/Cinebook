import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoyaltyCard = ({ loyaltyData }) => {
  const {
    currentTier,
    points,
    nextTierPoints,
    pointsToNextTier,
    benefits,
    recentEarnings,
    availableRewards
  } = loyaltyData;

  const getTierColor = (tier) => {
    switch (tier.toLowerCase()) {
      case 'bronze':
        return {
          bg: 'bg-gradient-to-br from-amber-600 to-amber-800',
          text: 'text-amber-100',
          accent: 'text-amber-300'
        };
      case 'silver':
        return {
          bg: 'bg-gradient-to-br from-gray-400 to-gray-600',
          text: 'text-gray-100',
          accent: 'text-gray-300'
        };
      case 'gold':
        return {
          bg: 'bg-gradient-to-br from-cinema-gold to-yellow-600',
          text: 'text-yellow-100',
          accent: 'text-yellow-300'
        };
      case 'platinum':
        return {
          bg: 'bg-gradient-to-br from-purple-600 to-purple-800',
          text: 'text-purple-100',
          accent: 'text-purple-300'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-600 to-gray-800',
          text: 'text-gray-100',
          accent: 'text-gray-300'
        };
    }
  };

  const tierColors = getTierColor(currentTier);
  const progressPercentage = ((points % nextTierPoints) / nextTierPoints) * 100;

  return (
    <div className="bg-card rounded-xl overflow-hidden premium-shadow border border-border">
      {/* Loyalty Card Header */}
      <div className={`${tierColors.bg} p-6 relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-24 h-24 border border-current rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border border-current rounded-full"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Crown" size={24} className={tierColors.text} />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${tierColors.text}`}>
                  {currentTier} Member
                </h3>
                <p className={`text-sm ${tierColors.accent}`}>
                  CineBook Pro Loyalty
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${tierColors.text}`}>
                {points.toLocaleString()}
              </p>
              <p className={`text-sm ${tierColors.accent}`}>Points</p>
            </div>
          </div>

          {/* Progress to Next Tier */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${tierColors.accent}`}>
                Progress to next tier
              </span>
              <span className={`text-sm font-medium ${tierColors.text}`}>
                {pointsToNextTier} points to go
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Gift" size={18} className="text-cinema-gold" />
          Your Benefits
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm text-foreground">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Recent Earnings */}
        <div className="mb-6">
          <h5 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="TrendingUp" size={16} className="text-electric-blue" />
            Recent Earnings
          </h5>
          <div className="space-y-2">
            {recentEarnings.map((earning, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div className="flex items-center gap-2">
                  <Icon name="Plus" size={14} className="text-success" />
                  <span className="text-sm text-foreground">{earning.description}</span>
                </div>
                <span className="text-sm font-medium text-success">
                  +{earning.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Available Rewards */}
        <div className="mb-6">
          <h5 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="Gift" size={16} className="text-conversion-orange" />
            Available Rewards
          </h5>
          <div className="grid grid-cols-1 gap-3">
            {availableRewards.slice(0, 3).map((reward, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-conversion-orange/10 rounded-lg flex items-center justify-center">
                    <Icon name="Gift" size={18} className="text-conversion-orange" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{reward.title}</p>
                    <p className="text-xs text-muted-foreground">{reward.points} points</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={points < reward.points}
                  onClick={() => console.log('Redeem reward:', reward.title)}
                >
                  {points >= reward.points ? 'Redeem' : 'Locked'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="default"
            className="flex-1 bg-cinema-gold hover:bg-yellow-600 text-cinema-black font-medium"
            onClick={() => console.log('View all rewards')}
          >
            <Icon name="Gift" size={16} className="mr-2" />
            View All Rewards
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => console.log('View points history')}
          >
            <Icon name="History" size={16} className="mr-2" />
            Points History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;
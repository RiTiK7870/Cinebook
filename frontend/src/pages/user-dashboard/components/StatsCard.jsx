import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ icon, title, value, subtitle, trend, trendValue, color = 'cinema-gold' }) => {
  const getColorClasses = (colorName) => {
    const colorMap = {
      'cinema-gold': {
        bg: 'bg-cinema-gold/10',
        icon: 'text-cinema-gold',
        trend: 'text-cinema-gold'
      },
      'electric-blue': {
        bg: 'bg-electric-blue/10',
        icon: 'text-electric-blue',
        trend: 'text-electric-blue'
      },
      'conversion-orange': {
        bg: 'bg-conversion-orange/10',
        icon: 'text-conversion-orange',
        trend: 'text-conversion-orange'
      },
      'success': {
        bg: 'bg-success/10',
        icon: 'text-success',
        trend: 'text-success'
      },
      'purple': {
        bg: 'bg-purple-500/10',
        icon: 'text-purple-500',
        trend: 'text-purple-500'
      }
    };
    return colorMap[colorName] || colorMap['cinema-gold'];
  };

  const colors = getColorClasses(color);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
      default:
        return 'TrendingUp';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      case 'stable':
        return 'text-muted-foreground';
      default:
        return 'text-success';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 premium-shadow hover:shadow-lg transition-all duration-300 border border-border">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
              <Icon name={icon} size={24} className={colors.icon} />
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground text-sm">{title}</h3>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
          </div>

          {subtitle && (
            <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>
          )}

          {trend && trendValue && (
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 ${getTrendColor(trend)}`}>
                <Icon name={getTrendIcon(trend)} size={14} />
                <span className="text-sm font-medium">{trendValue}</span>
              </div>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
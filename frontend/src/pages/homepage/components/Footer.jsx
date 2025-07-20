import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Movies & Theaters': [
      { name: 'Now Playing', href: '/movie-detail' },
      { name: 'Coming Soon', href: '/movie-detail' },
      { name: 'Find Theaters', href: '/movie-detail' },
      { name: 'IMAX Locations', href: '/movie-detail' },
      { name: 'Premium Formats', href: '/movie-detail' }
    ],
    'Account & Support': [
      { name: 'My Account', href: '/user-dashboard' },
      { name: 'Order History', href: '/user-dashboard' },
      { name: 'Help Center', href: '/user-dashboard' },
      { name: 'Contact Us', href: '/user-dashboard' },
      { name: 'Refund Policy', href: '/user-dashboard' }
    ],
    'Company': [
      { name: 'About CineBook Pro', href: '/homepage' },
      { name: 'Careers', href: '/homepage' },
      { name: 'Press Room', href: '/homepage' },
      { name: 'Investor Relations', href: '/homepage' },
      { name: 'Partnerships', href: '/homepage' }
    ],
    'Legal': [
      { name: 'Terms of Service', href: '/homepage' },
      { name: 'Privacy Policy', href: '/homepage' },
      { name: 'Cookie Policy', href: '/homepage' },
      { name: 'Accessibility', href: '/homepage' },
      { name: 'Content Guidelines', href: '/homepage' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: '#' },
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'Instagram', icon: 'Instagram', href: '#' },
    { name: 'YouTube', icon: 'Youtube', href: '#' },
    { name: 'TikTok', icon: 'Music', href: '#' }
  ];

  const paymentMethods = [
    { name: 'Visa', icon: 'CreditCard' },
    { name: 'Mastercard', icon: 'CreditCard' },
    { name: 'PayPal', icon: 'Wallet' },
    { name: 'Apple Pay', icon: 'Smartphone' },
    { name: 'Google Pay', icon: 'Smartphone' }
  ];

  return (
    <footer className="bg-cinema-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Stay Connected with CineBook Pro
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest movie news, exclusive offers, and early access to tickets delivered straight to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cinema-gold focus:border-transparent"
                />
              </div>
              <Button
                variant="default"
                className="bg-cinema-gold hover:bg-yellow-600 text-cinema-black font-semibold px-8 py-3"
              >
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-gray-400 mt-4">
              Join 500,000+ movie lovers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/homepage" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cinema-gold to-yellow-500 rounded-lg flex items-center justify-center">
                <Icon name="Film" size={28} color="#1A1A1A" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white">
                  CineBook
                  <span className="text-cinema-gold ml-1">Pro</span>
                </h1>
                <p className="text-sm text-gray-400 -mt-1">Where Movie Magic Begins</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your premier destination for movie ticket booking and cinema experiences. 
              Discover, book, and enjoy the magic of movies like never before.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-cinema-gold hover:text-cinema-black rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-cinema-gold transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} CineBook Pro. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Bringing you closer to the movies you love since 2020.
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">We Accept:</span>
              <div className="flex space-x-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="w-8 h-8 bg-white/10 rounded flex items-center justify-center"
                    title={method.name}
                  >
                    <Icon name={method.icon} size={14} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <Icon name="Shield" size={16} className="text-green-400" />
                <span className="text-xs text-gray-300">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <Icon name="Lock" size={16} className="text-blue-400" />
                <span className="text-xs text-gray-300">PCI Compliant</span>
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <div className="flex flex-wrap justify-center items-center space-x-6 text-xs text-gray-400">
              <Link to="/homepage" className="hover:text-cinema-gold transition-colors duration-200">
                Sitemap
              </Link>
              <span>•</span>
              <Link to="/homepage" className="hover:text-cinema-gold transition-colors duration-200">
                Accessibility Statement
              </Link>
              <span>•</span>
              <Link to="/homepage" className="hover:text-cinema-gold transition-colors duration-200">
                Do Not Sell My Info
              </Link>
              <span>•</span>
              <Link to="/homepage" className="hover:text-cinema-gold transition-colors duration-200">
                Ad Choices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
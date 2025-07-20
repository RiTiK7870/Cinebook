import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GroupBookingTools = ({ groupSize, onGroupSizeChange, onInviteFriends, selectedSeats }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmails, setInviteEmails] = useState(['']);
  const [inviteMessage, setInviteMessage] = useState("Hey! I'm booking tickets for the movie. Want to join?");

  const handleAddEmail = () => {
    setInviteEmails([...inviteEmails, '']);
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...inviteEmails];
    newEmails[index] = value;
    setInviteEmails(newEmails);
  };

  const handleRemoveEmail = (index) => {
    const newEmails = inviteEmails.filter((_, i) => i !== index);
    setInviteEmails(newEmails);
  };

  const handleSendInvites = () => {
    const validEmails = inviteEmails.filter(email => email.trim() !== '');
    onInviteFriends(validEmails, inviteMessage);
    setShowInviteModal(false);
    setInviteEmails(['']);
  };

  const generateShareableLink = () => {
    const bookingId = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    return `https://cinebook.pro/join-booking/${bookingId}`;
  };

  const handleCopyLink = () => {
    const link = generateShareableLink();
    navigator.clipboard.writeText(link);
    // You could add a toast notification here
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Icon name="Users" size={20} className="mr-2" />
          Group Booking
        </h3>
        <div className="text-sm text-gray-600">
          {selectedSeats.length} of {groupSize} seats selected
        </div>
      </div>

      {/* Group Size Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          How many people are in your group?
        </label>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onGroupSizeChange(Math.max(1, groupSize - 1))}
            disabled={groupSize <= 1}
          >
            <Icon name="Minus" size={16} />
          </Button>
          <div className="w-16 text-center">
            <span className="text-xl font-semibold">{groupSize}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onGroupSizeChange(Math.min(8, groupSize + 1))}
            disabled={groupSize >= 8}
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Maximum 8 people per group booking</p>
      </div>

      {/* Quick Group Size Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Quick Select
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { size: 2, label: 'Couple', icon: 'Heart' },
            { size: 4, label: 'Family', icon: 'Home' },
            { size: 6, label: 'Friends', icon: 'Users' },
            { size: 8, label: 'Group', icon: 'Users2' }
          ].map((preset) => (
            <Button
              key={preset.size}
              variant={groupSize === preset.size ? 'default' : 'outline'}
              size="sm"
              className={`flex flex-col items-center py-3 h-auto ${
                groupSize === preset.size ? 'bg-cinema-gold text-black' : ''
              }`}
              onClick={() => onGroupSizeChange(preset.size)}
            >
              <Icon name={preset.icon} size={16} className="mb-1" />
              <span className="text-xs">{preset.label}</span>
              <span className="text-xs font-medium">{preset.size}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Seat Selection Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Seat Selection Progress</span>
          <span className="text-sm text-gray-600">{selectedSeats.length}/{groupSize}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-cinema-gold h-2 rounded-full transition-all duration-300"
            style={{ width: `${(selectedSeats.length / groupSize) * 100}%` }}
          ></div>
        </div>
        {selectedSeats.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {selectedSeats.map((seat) => (
              <span
                key={seat}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-cinema-gold/20 text-cinema-gold"
              >
                {seat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Invite Friends */}
      <div className="space-y-3">
        <Button
          variant="outline"
          fullWidth
          className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white"
          onClick={() => setShowInviteModal(true)}
        >
          <Icon name="Mail" size={16} className="mr-2" />
          Invite Friends via Email
        </Button>

        <Button
          variant="outline"
          fullWidth
          className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
          onClick={handleCopyLink}
        >
          <Icon name="Link" size={16} className="mr-2" />
          Copy Shareable Link
        </Button>

        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
            <Icon name="MessageCircle" size={14} className="mr-1" />
            WhatsApp
          </Button>
          <Button variant="outline" size="sm" className="text-blue-500 border-blue-200 hover:bg-blue-50">
            <Icon name="MessageSquare" size={14} className="mr-1" />
            Messenger
          </Button>
          <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50">
            <Icon name="Share2" size={14} className="mr-1" />
            More
          </Button>
        </div>
      </div>

      {/* Group Booking Benefits */}
      <div className="mt-6 p-4 bg-gradient-to-r from-cinema-gold/10 to-yellow-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2 flex items-center">
          <Icon name="Gift" size={16} className="mr-2 text-cinema-gold" />
          Group Booking Benefits
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-center">
            <Icon name="Check" size={12} className="mr-2 text-green-500" />
            Guaranteed adjacent seating
          </li>
          <li className="flex items-center">
            <Icon name="Check" size={12} className="mr-2 text-green-500" />
            15-minute extended hold time
          </li>
          <li className="flex items-center">
            <Icon name="Check" size={12} className="mr-2 text-green-500" />
            Group discount on concessions
          </li>
        </ul>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Invite Friends</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowInviteModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Addresses
                  </label>
                  {inviteEmails.map((email, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Input
                        type="email"
                        placeholder="friend@example.com"
                        value={email}
                        onChange={(e) => handleEmailChange(index, e.target.value)}
                        className="flex-1"
                      />
                      {inviteEmails.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveEmail(index)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddEmail}
                    className="mt-2"
                  >
                    <Icon name="Plus" size={14} className="mr-1" />
                    Add Another
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                    rows="3"
                    value={inviteMessage}
                    onChange={(e) => setInviteMessage(e.target.value)}
                    placeholder="Add a personal message..."
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setShowInviteModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    fullWidth
                    onClick={handleSendInvites}
                    className="bg-electric-blue hover:bg-blue-600"
                  >
                    Send Invites
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

export default GroupBookingTools;
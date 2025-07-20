import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingProgress = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Select Movie', icon: 'Film', completed: true },
    { id: 2, name: 'Choose Seats', icon: 'Armchair', completed: true },
    { id: 3, name: 'Payment', icon: 'CreditCard', completed: currentStep === 'confirmation' },
    { id: 4, name: 'Confirmation', icon: 'CheckCircle', completed: currentStep === 'confirmation' }
  ];

  return (
    <div className="bg-white rounded-xl p-6 premium-shadow mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                step.completed 
                  ? 'bg-cinema-gold text-cinema-black' 
                  : currentStep === 'payment'&& step.id === 3 ?'bg-electric-blue text-white' :'bg-gray-200 text-gray-500'
              }`}>
                <Icon 
                  name={step.icon} 
                  size={20} 
                  color={
                    step.completed 
                      ? '#1A1A1A' 
                      : currentStep === 'payment'&& step.id === 3 ?'#FFFFFF' :'#6B7280'
                  } 
                />
              </div>
              <span className={`text-sm font-medium mt-2 transition-colors duration-300 ${
                step.completed || (currentStep === 'payment' && step.id === 3)
                  ? 'text-cinema-black' :'text-gray-500'
              }`}>
                {step.name}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                steps[index + 1].completed ? 'bg-cinema-gold' : 'bg-gray-200'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookingProgress;
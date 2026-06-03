import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';

interface EmergencyButtonProps {
  onClick?: () => void;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/safety');
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={handleClick}
        className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-3xl shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex items-center gap-3 min-w-[160px] justify-center"
      >
        <Phone className="w-6 h-6" />
        <span className="text-base font-medium">紧急求助</span>
      </button>
    </div>
  );
};

export default EmergencyButton;
import React from 'react';
import { User, ScanFace, Link2, CheckCircle2, ArrowRight, X, LucideIcon } from 'lucide-react';

interface ActionCardProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'completed' | 'active' | 'pending';
  bgColor?: string;
  showClose?: boolean;
  onActionClick?: () => void;
  onClose?: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({
  stepNumber,
  title,
  description,
  icon: Icon,
  status,
  bgColor,
  showClose = false,
  onActionClick,
  onClose,
}) => {
  const getBackgroundColor = () => {
    if (bgColor) return bgColor;
    
    switch (status) {
      case 'completed':
        return 'bg-green-600';
      case 'active':
        return 'bg-blue-600';
      case 'pending':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getIconBackground = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-700';
      case 'active':
        return 'bg-blue-700';
      case 'pending':
        return 'bg-gray-700';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <div
      className={`${getBackgroundColor()} rounded-3xl p-8 min-h-[240px] flex flex-col justify-between transition-all duration-300 hover:scale-105 cursor-pointer relative overflow-hidden`}
      onClick={onActionClick}
    >
      {/* Close Button */}
      {showClose && onClose && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-sm transition-all duration-200 z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" strokeWidth={2} />
        </button>
      )}

      {/* Icon */}
      <div className={`${getIconBackground()} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
        <Icon className="w-7 h-7 text-white" strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-white text-xl font-semibold mb-3">
          Step {stepNumber} - {title}
        </h3>
        <p className="text-white/90 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center justify-end mt-6">
        {status === 'completed' ? (
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="text-white text-sm font-medium">Done</span>
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </div>
  );
};

// Example usage component
export const ActionCardDemo: React.FC = () => {
  const [visibleCards, setVisibleCards] = React.useState([1, 2, 3]);

  const cards = [
    {
      stepNumber: 1,
      title: 'Profile Registration',
      description: 'Create or confirm a new digital profile to access the Business Hub.',
      icon: User,
      status: 'completed' as const,
      bgColor: 'bg-green-600',
    },
    {
      stepNumber: 2,
      title: 'Identity Verification',
      description: 'Scan your face to confirm your identity and link yourself to your Business Hub profile.',
      icon: ScanFace,
      status: 'active' as const,
      bgColor: 'bg-blue-600',
    },
    {
      stepNumber: 3,
      title: 'Business Linking',
      description: "Get authorisation to link and access your business's accounts on the Business Hub.",
      icon: Link2,
      status: 'pending' as const,
      bgColor: 'bg-gray-600',
    },
  ];

  const handleCardClick = (stepNumber: number) => {
    console.log(`Card ${stepNumber} clicked`);
  };

  const handleClose = (stepNumber: number) => {
    console.log(`Card ${stepNumber} closed`);
    setVisibleCards(visibleCards.filter(id => id !== stepNumber));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards
            .filter(card => visibleCards.includes(card.stepNumber))
            .map((card) => (
              <ActionCard
                key={card.stepNumber}
                stepNumber={card.stepNumber}
                title={card.title}
                description={card.description}
                icon={card.icon}
                status={card.status}
                bgColor={card.bgColor}
                showClose={true}
                onActionClick={() => handleCardClick(card.stepNumber)}
                onClose={() => handleClose(card.stepNumber)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ActionCard;
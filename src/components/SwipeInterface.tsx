
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SwipeInterfaceProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  emptyMessage: string;
  isEmpty: boolean;
}

const SwipeInterface: React.FC<SwipeInterfaceProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  emptyMessage,
  isEmpty
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Add a class to prevent text selection during swiping
  useEffect(() => {
    if (isDragging) {
      document.body.classList.add('no-select');
    } else {
      document.body.classList.remove('no-select');
    }
    
    return () => {
      document.body.classList.remove('no-select');
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
    
    // Determine swipe direction for visual cues
    if (diff > 50) {
      setSwipeDirection('right');
    } else if (diff < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
    
    // Determine swipe direction for visual cues
    if (diff > 50) {
      setSwipeDirection('right');
    } else if (diff < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    if (offsetX > 100) {
      // Swipe right - Accept/Apply
      completeSwipeAnimation('right');
    } else if (offsetX < -100) {
      // Swipe left - Reject/Pass
      completeSwipeAnimation('left');
    } else {
      // Reset position
      setOffsetX(0);
      setSwipeDirection(null);
    }
    
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    if (offsetX > 100) {
      // Swipe right - Accept/Apply
      completeSwipeAnimation('right');
    } else if (offsetX < -100) {
      // Swipe left - Reject/Pass
      completeSwipeAnimation('left');
    } else {
      // Reset position
      setOffsetX(0);
      setSwipeDirection(null);
    }
    
    setIsDragging(false);
  };

  const completeSwipeAnimation = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      if (cardRef.current) {
        cardRef.current.classList.add('swiping-right');
        setTimeout(() => {
          onSwipeRight();
          resetCard();
        }, 300);
      } else {
        onSwipeRight();
        resetCard();
      }
    } else {
      if (cardRef.current) {
        cardRef.current.classList.add('swiping-left');
        setTimeout(() => {
          onSwipeLeft();
          resetCard();
        }, 300);
      } else {
        onSwipeLeft();
        resetCard();
      }
    }
  };

  const resetCard = () => {
    if (cardRef.current) {
      cardRef.current.classList.remove('swiping-left', 'swiping-right');
    }
    setOffsetX(0);
    setSwipeDirection(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        completeSwipeAnimation('left');
      } else if (e.key === 'ArrowRight') {
        completeSwipeAnimation('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const cardStyle: React.CSSProperties = {
    transform: `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)`,
    boxShadow: swipeDirection === 'right' 
      ? '0 10px 25px rgba(31, 223, 100, 0.3)' 
      : swipeDirection === 'left' 
        ? '0 10px 25px rgba(255, 94, 91, 0.3)' 
        : '0 10px 15px rgba(0, 0, 0, 0.1)',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  };

  const getBorderColor = () => {
    if (swipeDirection === 'right') return 'border-swapnet-green';
    if (swipeDirection === 'left') return 'border-swapnet-red';
    return 'border-gray-200';
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-[500px] flex flex-col">
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <p className="text-lg text-gray-500 text-center">{emptyMessage}</p>
        </div>
      ) : (
        <>
          <div 
            ref={cardRef}
            className={`swipe-card bg-white rounded-lg shadow-md overflow-hidden border-2 ${getBorderColor()}`}
            style={cardStyle}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {children}
            
            {swipeDirection === 'right' && (
              <div className="absolute top-4 right-4 bg-swapnet-green text-white font-bold py-2 px-4 rounded-full rotate-12 transform scale-110 transition-all">
                <Check className="mr-1 h-5 w-5 inline" />
                {window.location.pathname.includes('job-seeker') ? 'Apply' : 'Hire'}
              </div>
            )}
            
            {swipeDirection === 'left' && (
              <div className="absolute top-4 left-4 bg-swapnet-red text-white font-bold py-2 px-4 rounded-full -rotate-12 transform scale-110 transition-all">
                <X className="mr-1 h-5 w-5 inline" />
                {window.location.pathname.includes('job-seeker') ? 'Pass' : 'Skip'}
              </div>
            )}
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <Button 
              onClick={() => completeSwipeAnimation('left')}
              variant="outline" 
              size="icon"
              className="h-12 w-12 rounded-full border-2 border-swapnet-red text-swapnet-red hover:bg-swapnet-red hover:text-white"
            >
              <X className="h-6 w-6" />
            </Button>
            
            <Button 
              onClick={() => completeSwipeAnimation('right')}
              variant="outline" 
              size="icon"
              className="h-12 w-12 rounded-full border-2 border-swapnet-green text-swapnet-green hover:bg-swapnet-green hover:text-white"
            >
              <Check className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="text-center mt-4 text-sm text-gray-500">
            <p>Swipe right to {window.location.pathname.includes('job-seeker') ? 'apply' : 'select'}, left to pass</p>
            <p className="mt-1">Or use arrow keys ← →</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SwipeInterface;

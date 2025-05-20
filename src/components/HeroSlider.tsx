
import React, { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SlideProps {
  id: number;
  imageUrl: string;
  title: string;
}

const slides: SlideProps[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=3024',
    title: 'From Our Farms\nTo Your Hands'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3024',
    title: 'Quality Products\nFreshly Harvested'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80&w=3024',
    title: 'Sustaining Nature\nNourishing You'
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=3024',
    title: 'Innovation in\nAgriculture'
  }
];

const HeroSlider = () => {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [borderProgress, setBorderProgress] = useState(0);
  const totalDuration = 10000; // 10 seconds for the border animation

  // Get the next slide index
  const nextSlideIndex = (currentSlide + 1) % slides.length;

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, totalDuration); // Change slide every 10 seconds to match border animation

    return () => clearInterval(interval);
  }, [currentSlide]);

  // Progress bar animation
  useEffect(() => {
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(elapsed / totalDuration, 1);
      setProgress(nextProgress);
      setBorderProgress(nextProgress);
      
      if (elapsed < totalDuration) {
        requestAnimationFrame(animate);
      }
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [currentSlide]);

  const handleNextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
    setBorderProgress(0);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Animation duration
  }, [isAnimating]);

  // Generate the border animation styles
  const getBorderStyles = () => {
    const pos = borderProgress * 4; // 4 sides
    
    if (pos < 1) {
      // Top border animation (0-25%)
      const width = pos * 100;
      return {
        top: { width: `${width}%`, left: 0, right: 'auto' },
        right: { height: 0 },
        bottom: { width: 0 },
        left: { height: 0 }
      };
    } else if (pos < 2) {
      // Right border animation (25-50%)
      const height = (pos - 1) * 100;
      return {
        top: { width: '100%', left: 0, right: 'auto' },
        right: { height: `${height}%`, top: 0, bottom: 'auto' },
        bottom: { width: 0 },
        left: { height: 0 }
      };
    } else if (pos < 3) {
      // Bottom border animation (50-75%)
      const width = (pos - 2) * 100;
      return {
        top: { width: '100%', left: 0, right: 'auto' },
        right: { height: '100%', top: 0, bottom: 'auto' },
        bottom: { width: `${width}%`, right: 0, left: 'auto' },
        left: { height: 0 }
      };
    } else {
      // Left border animation (75-100%)
      const height = (pos - 3) * 100;
      return {
        top: { width: '100%', left: 0, right: 'auto' },
        right: { height: '100%', top: 0, bottom: 'auto' },
        bottom: { width: '100%', right: 0, left: 'auto' },
        left: { height: `${height}%`, bottom: 0, top: 'auto' }
      };
    }
  };

  const borderStyles = getBorderStyles();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 hero-slide ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={slide.imageUrl}
            alt={`Slide ${slide.id}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-start">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-xl animate-fade-in">
                <div className="text-white text-sm md:text-lg mb-2 md:mb-4">
                  Welcome to TenTwenty Farms
                </div>
                <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold whitespace-pre-line leading-tight">
                  {slide.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end gap-6">
            {/* Next button with animated border and preview image - Now positioned on the left */}
            <div className="relative">
              <button
                onClick={handleNextSlide}
                className="w-24 h-24 flex flex-col items-center justify-center text-white hover:text-gray-200 transition-colors duration-300 relative border border-transparent"
              >
                {/* Small preview image of next slide */}
                <div className="absolute inset-0 p-4 overflow-hidden">
                  <img 
                    src={slides[nextSlideIndex].imageUrl}
                    alt="Next slide preview"
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                {/* Next text */}
                <span className="text-white font-medium z-10">Next</span>
                
                {/* Animated borders */}
                <div className="absolute top-0 left-0 w-1 h-1 bg-white z-20" style={borderStyles.top}></div>
                <div className="absolute top-0 right-0 w-1 h-1 bg-white z-20" style={borderStyles.right}></div>
                <div className="absolute bottom-0 right-0 w-1 h-1 bg-white z-20" style={borderStyles.bottom}></div>
                <div className="absolute bottom-0 left-0 w-1 h-1 bg-white z-20" style={borderStyles.left}></div>
              </button>
            </div>
            
            {/* Slide indicator with line - Positioned on the right */}
            <div className="text-white flex items-center">
              <span className="text-xl font-semibold">{String(currentSlide + 1).padStart(2, '0')}</span>
              <div className="mx-2 w-16 h-px bg-gray-500 relative">
                <div className="absolute top-0 h-px bg-white" style={{ width: `${progress * 100}%` }}></div>
              </div>
              <span className="text-gray-300">{String(slides.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;

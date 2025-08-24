import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Веб-разработчик';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="text-center z-10 px-4">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Привет, я </span>
            <span className="gradient-text">Алексей</span>
          </h1>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-2xl md:text-4xl mb-8 text-muted-foreground">
            <span className="neon-text">{displayText}</span>
            <span className="animate-blink border-r-2 border-neon-primary ml-1"></span>
          </h2>
        </div>

        <div
          className="animate-fade-in space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center"
          style={{ animationDelay: '1s' }}
        >
          <Button
            onClick={() => {
              const element = document.querySelector('#projects');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="neon-glow bg-gradient-neon text-black font-semibold hover:scale-105 transition-transform duration-300"
          >
            Посмотреть проекты
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="border-neon-primary text-neon-primary hover:bg-neon-primary hover:text-black transition-all duration-300"
          >
            Связаться со мной
          </Button>
        </div>

        <div className="mt-16 animate-float">
          <button
            onClick={scrollToAbout}
            className="text-neon-primary hover:text-neon-secondary transition-colors duration-300 animate-bounce"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default HeroSection;
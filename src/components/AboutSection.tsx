import React, { useEffect, useRef, useState } from 'react';
import { Code, Palette, Zap } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Пишу чистый, читаемый и поддерживаемый код следуя лучшим практикам разработки.'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Создаю современные и интуитивные интерфейсы с фокусом на пользовательский опыт.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Оптимизирую производительность приложений для быстрой загрузки и отзывчивости.'
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center py-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-4xl md:text-6xl font-bold mb-8 gradient-text transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
            }`}
          >
            О себе
          </h2>

          <p
            className={`text-lg md:text-xl text-muted-foreground mb-16 leading-relaxed transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            Я веб-разработчик с {new Date().getFullYear() - 2019} летним опытом создания 
            современных веб-приложений. Специализируюсь на React, TypeScript и создании 
            интерактивных пользовательских интерфейсов. Всегда стремлюсь к совершенству 
            и изучению новых технологий.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`glass-effect p-8 rounded-2xl shadow-card hover:shadow-neon transition-all duration-500 group hover:scale-105 ${
                  isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${0.4 + index * 0.2}s` }}
              >
                <div className="neon-glow w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-neon group-hover:animate-glow">
                  <feature.icon size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-neon-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
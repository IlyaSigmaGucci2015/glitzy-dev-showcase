import React, { useState, useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const SkillsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: 'JavaScript', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Frontend' },
    { name: 'React', level: 92, category: 'Frontend' },
    { name: 'Vue.js', level: 85, category: 'Frontend' },
    { name: 'CSS/SCSS', level: 88, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 90, category: 'Frontend' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Express.js', level: 82, category: 'Backend' },
    { name: 'PostgreSQL', level: 80, category: 'Backend' },
    { name: 'MongoDB', level: 78, category: 'Backend' },
    { name: 'Git', level: 90, category: 'Tools' },
    { name: 'Docker', level: 75, category: 'Tools' }
  ];

  const categories = ['Frontend', 'Backend', 'Tools'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skills with staggered delays
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => new Set([...prev, skill.name]));
            }, index * 100);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen py-20"
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-4xl md:text-6xl font-bold text-center mb-16 gradient-text transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}
        >
          Навыки
        </h2>

        <div className="max-w-6xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <div
              key={category}
              className={`mb-12 transition-all duration-1000 ${
                isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
              }`}
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <h3 className="text-2xl font-semibold mb-8 text-neon-primary text-center">
                {category}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {getSkillsByCategory(category).map((skill) => (
                  <div
                    key={skill.name}
                    className="glass-effect p-6 rounded-xl shadow-card hover:shadow-neon transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-neon-primary font-semibold">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-neon rounded-full transition-all duration-1000 ease-out neon-glow"
                        style={{
                          width: animatedSkills.has(skill.name) ? `${skill.level}%` : '0%',
                          transition: 'width 1s ease-out'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive skill visualization */}
        <div
          className={`mt-16 text-center transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}
          style={{ animationDelay: '0.8s' }}
        >
          <div className="glass-effect inline-block px-8 py-6 rounded-2xl shadow-card">
            <h4 className="text-xl font-semibold mb-4 gradient-text">
              Общий опыт
            </h4>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold neon-text">{new Date().getFullYear() - 2019}+</div>
                <div className="text-muted-foreground">лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold neon-text">50+</div>
                <div className="text-muted-foreground">проектов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold neon-text">20+</div>
                <div className="text-muted-foreground">технологий</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
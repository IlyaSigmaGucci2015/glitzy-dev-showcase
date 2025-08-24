import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
}

const ProjectsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Современная платформа для интернет-торговли с полным функционалом.',
      fullDescription: 'Полнофункциональная платформа электронной коммерции с корзиной покупок, системой платежей, управлением заказами и административной панелью. Включает аутентификацию пользователей, поиск продуктов и отзывы.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Приложение для управления задачами с интуитивным интерфейсом.',
      fullDescription: 'Инструмент для управления проектами с возможностью создания команд, назначения задач, отслеживания прогресса и совместной работы. Включает канбан-доски, календарь и систему уведомлений.',
      technologies: ['React', 'Redux', 'Material-UI', 'Firebase'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Интерактивная панель с прогнозом погоды и красивой визуализацией.',
      fullDescription: 'Современная панель управления погодой с детальными прогнозами, интерактивными картами, историческими данными и персонализированными уведомлениями. Поддерживает множественные локации.',
      technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS3'],
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-20"
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-4xl md:text-6xl font-bold text-center mb-16 gradient-text transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}
        >
          Мои проекты
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group glass-effect rounded-2xl overflow-hidden shadow-card hover:shadow-neon transition-all duration-500 cursor-pointer hover:scale-105 ${
                isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-neon-primary group-hover:text-neon-secondary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-neon-primary/20 text-neon-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass-effect max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <div>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold gradient-text">
                  {selectedProject.title}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={24} />
                </Button>
              </div>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {selectedProject.fullDescription}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-neon-primary">
                  Технологии:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-neon-primary/20 text-neon-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="neon-glow bg-gradient-neon text-black">
                  <ExternalLink size={16} className="mr-2" />
                  Демо
                </Button>
                <Button variant="outline" className="border-neon-primary text-neon-primary">
                  <Github size={16} className="mr-2" />
                  GitHub
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно для заполнения';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Сообщение отправлено!",
      description: "Спасибо за ваше сообщение. Я свяжусь с вами в ближайшее время.",
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'alexey@example.com',
      href: 'mailto:alexey@example.com'
    },
    {
      icon: Phone,
      label: 'Телефон',
      value: '+7 (999) 123-45-67',
      href: 'tel:+79991234567'
    },
    {
      icon: MapPin,
      label: 'Местоположение',
      value: 'Москва, Россия',
      href: '#'
    }
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-20"
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-4xl md:text-6xl font-bold text-center mb-16 gradient-text transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}
        >
          Связаться со мной
        </h2>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-20px]'
            }`}
          >
            <h3 className="text-2xl font-semibold mb-8 neon-text">
              Давайте обсудим ваш проект
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Готов обсудить ваши идеи и помочь воплотить их в жизнь. 
              Свяжитесь со мной любым удобным способом, и мы найдем 
              лучшее решение для вашего проекта.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center glass-effect p-4 rounded-xl shadow-card hover:shadow-neon transition-all duration-300 group hover:scale-105 ${
                    isVisible ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-20px]'
                  }`}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="neon-glow w-12 h-12 flex items-center justify-center rounded-full bg-gradient-neon mr-4 group-hover:animate-glow">
                    <item.icon size={20} className="text-black" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium text-foreground">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'animate-fade-in-right' : 'opacity-0 translate-x-[20px]'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-2xl shadow-card">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={64} className="mx-auto mb-4 text-neon-primary animate-scale-in" />
                  <h3 className="text-2xl font-semibold mb-2 neon-text">Сообщение отправлено!</h3>
                  <p className="text-muted-foreground">Спасибо за ваше сообщение. Я свяжусь с вами в ближайшее время.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={handleChange}
                      className={`bg-input/50 border-border focus:border-neon-primary transition-colors duration-300 ${
                        errors.name ? 'border-destructive' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Ваш email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`bg-input/50 border-border focus:border-neon-primary transition-colors duration-300 ${
                        errors.email ? 'border-destructive' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <Textarea
                      name="message"
                      placeholder="Ваше сообщение"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`bg-input/50 border-border focus:border-neon-primary transition-colors duration-300 resize-none ${
                        errors.message ? 'border-destructive' : ''
                      }`}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full neon-glow bg-gradient-neon text-black font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2"></div>
                        Отправляю...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send size={16} className="mr-2" />
                        Отправить сообщение
                      </div>
                    )}
                  </Button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
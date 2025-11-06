import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Users, Award, Zap, Target, Globe, MessageSquare } from 'lucide-react';
import PortfolioChatModal from '../components/PortfolioChatModal';
import './Home.css';

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showChatModal, setShowChatModal] = useState(false);
  // State for button hover animation - used in event handlers
  const setIsButtonHovered = useState(false)[1];
  const heroRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();
  
  // Define testimonials early to avoid "used before declaration" error
  const testimonials = [
    {
      name: 'Michael Muraszko',
      role: 'Manager Content Design',
      content: 'The CoreAI project is a difficult one because there are so many different teams of people that are utilizing the work we deliver and it\'s like having multiple stakeholders each giving conflicting requirements at times. I\'m constantly impressed with the enthusiasm and skill Aashi demonstrates when taking on these challenges. She\'s able to create designs that inspire discussion and steer the stakeholders into refining it.',
      company: 'Publicis Groupe'
    },
    {
      name: 'Adum Brusky',
      role: 'Experience Lead',
      content: 'Her design files are consistently neat, making it easy to understand her intent and build on her work. Her solutions are always well-considered, reflecting her ability to address the immediate need while also ensuring designs are future-proofed.',
      company: 'CoreAI'
    },
    {
      name: 'Joanna Tsai',
      role: 'Associate Design Director',
      content: 'Aashi seamlessly stepped into a leadership role... creating all the necessary work products and overseeing the process. This initiative and follow-through exemplified her readiness for leadership responsibilities. Throughout the process, Aashi fostered inclusive collaboration among creative leadership, design teams, and engineers—integrating multiple perspectives while keeping the project on track.',
      company: 'CoreAI'
    },
    {
      name: 'Tre Tate',
      role: 'Senior Experience Designer',
      content: 'Aashi owned and led the LionCore block component work on the app framework team, enabling streamlined development and consistency across teams. Her leadership in CoreAI product Q/A has paved the way for a strong direction as we head into the new year.',
      company: 'CoreAI'
    },
    {
      name: 'Ezra Truneh',
      role: 'Senior Experience Designer',
      content: 'I had been struggling to come up with a coherent solution on my own, but Aashi walked me step-by-step through my thought process and helped identify gaps in my logic. After an iterative back-and-forth process, we defined a new set of system rules that would ultimately go on to define the backend behavior of our web app.',
      company: 'CoreAI'
    },
    {
      name: 'David Oberst',
      role: 'Creative Director',
      content: 'You approached your work with a steady resolve, providing outstanding support for our design team. I very much appreciate all the times that you raised your hand and took on extra work to help the team (and me) get through some of our hardest moments. You truly helped us to be successful in so many ways, big and small.',
      company: 'CoreAI'
    },
    {
      name: 'Michael Ennis',
      role: 'Wawa Experience Manager',
      content: 'Aashi\'s designs were intuitive, visually polished, and delivered with attention to detail. She always exceeded expectations, even while handling multiple projects. Her ability to collaborate across functions made her a valuable member of our team.',
      company: 'Wawa'
    },
    {
      name: 'Nicole Folgate',
      role: 'Design Lead',
      content: 'Aashi\'s versatility was evident as she adeptly tackled various tasks, including interaction design explorations and prototype building in Figma. This not only demonstrated her technical skills but also underscored her commitment to being a team player.',
      company: 'CoreAI'
    }
  ];
  
  // Simplified parallax effects - reduced complexity
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  // Sophisticated mouse tracking with optimized performance
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      
      // Calculate normalized position for smoother effect
      const normalizedX = (e.clientX - rect.left) / rect.width;
      const normalizedY = (e.clientY - rect.top) / rect.height;
      
      // Apply easing for smoother movement
      setMousePosition(prev => ({
        x: prev.x + (normalizedX - prev.x) * 0.1,
        y: prev.y + (normalizedY - prev.y) * 0.1
      }));
    }
  }, []);

  useEffect(() => {
    let rafId: number;
    let lastTime = 0;
    const throttleMs = 30; // Lower for smoother effect but still performant
    
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > throttleMs) {
        lastTime = now;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          handleMouseMove(e);
        });
      }
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [handleMouseMove]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Reduced floating dots for better performance
  const generateFloatingDots = () => {
    const dots = [];
    for (let i = 0; i < 8; i++) { // Reduced from 20 to 8
      dots.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1, // Smaller dots
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 2 // Faster animations
      });
    }
    return dots;
  };

  const floatingDots = generateFloatingDots();

  const projects = [
    {
      id: 'coreai',
      title: 'CoreAI',
      category: 'Enterprise AI Platform',
      image: '/projectcover1.png',
      description: 'Publicis Groupe\'s Agentic AI transformation platform.',
      impact: 'Tier 1 Enterprise Platform'
    },
    {
      id: 'pollin',
      title: 'Pollin Fertility',
      category: 'Healthcare Innovation',
      image: '/projectcover2.png',
      description: 'Translated sensitive clinical workflows into emotionally supportive, patient-centered digital experiences with EMR portal integration and centralized design systems.',
      impact: 'Patient-Centered Care'
    },
    {
      id: 'hungerhub',
      title: 'Hungerhub',
      category: 'Food Tech Platform',
      image: '/projectcover4.png',
      description: 'Executed UX/UI design for restaurant partner dashboard and Uncatering B2B web experience, creating engaging mobile experiences with AI-powered personalization.',
      impact: 'Operational Excellence'
    },
    {
      id: 'wawa',
      title: 'Wawa Digital Platform',
      category: 'Retail Innovation',
      image: '/projectcover3.png',
      description: 'Built and scaled multi-brand design systems for Wawa\'s digital ecosystem including wawa.com, ordering website, and mobile app.',
      impact: 'Brand Consistency'
    }
  ];

  const achievements = [
    { icon: Target, value: '$15M+', label: 'Pipeline Contribution' },
    { icon: Users, value: '10+', label: 'Designers Mentored' },
    { icon: Award, value: '98+', label: 'QA Issues Resolved' },
    { icon: Globe, value: 'Tier 1', label: 'Enterprise Clients' }
  ];

  return (
    <div className="home">
      {/* Hero Section with Sophisticated Parallax */}
      <section ref={heroRef} className="hero">
        {/* Enhanced Background Layers */}
        <motion.div
          style={{ 
            y: y1, 
            opacity,
            x: mousePosition.x * -10, // Subtle horizontal parallax
          }}
          className="hero-bg-1"
        />
        <motion.div
          style={{ 
            y: y2,
            x: mousePosition.x * 10, // Opposite direction for depth
          }}
          className="hero-bg-2"
        />
        <motion.div
          style={{ 
            y: mousePosition.y * -5, // Subtle vertical movement
            x: mousePosition.x * 5, // Subtle horizontal movement
          }}
          className="hero-bg-3"
        />
        
        {/* Sophisticated Floating Elements */}
        <div className="floating-elements">
          {floatingDots.map((dot) => (
            <motion.div
              key={dot.id}
              className="floating-dot"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: `${dot.size * 3}px`, // Larger dots
                height: `${dot.size * 3}px`, // Larger dots
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, dot.id % 2 === 0 ? 10 : -10, 0], // Alternating direction
                scale: [1, dot.id % 3 === 0 ? 1.2 : 0.8, 1], // Pulsing effect
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: dot.duration * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot.delay,
                times: [0, 0.5, 1]
              }}
            />
          ))}
        </div>
        
        {/* Enhanced Mouse Gradient */}
        <motion.div 
          className="mouse-gradient"
          style={{ 
            left: `calc(${mousePosition.x * 100}% - 150px)`, // Centered on cursor
            top: `calc(${mousePosition.y * 100}% - 150px)`, // Centered on cursor
            scale: 1 + (Math.sin(Date.now() * 0.001) * 0.05), // Subtle breathing effect
          }}
          animate={{
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="hero-greeting"
          >
            <span className="greeting-pill">Hi, I'm Aashi</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title"
          >
            Architecting
            <br />
            <span className="hero-title-accent">Human-Centered AI</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtitle"
          >
            Creative UX leader with 5+ years designing AI-powered platforms across enterprise, healthcare, and B2B domains.
            <br />
            Trusted partner to Fortune 500 companies, translating complex business needs into compelling digital solutions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-actions"
          >
            <button 
              ref={buttonRef}
              onClick={() => {
                const projectsSection = document.querySelector('.projects-section');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              className="btn btn-primary hero-cta"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              Explore Case Studies
              <ArrowRight size={20} />
            </button>

          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          {/* Reduced Floating Elements for Achievements */}
          <div className="floating-elements">
            {floatingDots.slice(0, 4).map((dot) => (
              <motion.div
                key={`achievement-${dot.id}`}
                className="floating-dot"
                style={{
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                }}
                animate={{
                  y: [0, -10, 0],
                  x: [0, Math.random() * 3 - 1.5, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: dot.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: dot.delay
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="achievements-grid"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="achievement-item"
              >
                <div className="achievement-icon">
                  <achievement.icon size={32} />
                </div>
                <div className="achievement-value">{achievement.value}</div>
                <div className="achievement-label">{achievement.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact & Recognition Section */}
      <section className="impact-section">
        <div className="container">
          {/* Simplified Parallax Background Elements */}
          <motion.div
            style={{ y: y1, opacity }}
            className="impact-bg-1"
          />
          
          {/* Reduced Floating Elements for Impact */}
          <div className="floating-elements">
            {floatingDots.slice(4, 6).map((dot) => (
              <motion.div
                key={`impact-${dot.id}`}
                className="floating-dot"
                style={{
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, Math.random() * 2 - 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: dot.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: dot.delay
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <div className="section-badge section-badge-impact">
              <span>Strategic Impact</span>
            </div>
            <h2 className="section-title">Recognition & Influence</h2>
            <p className="section-subtitle">
              Transforming industries through creative UX leadership and measurable business outcomes
            </p>
          </motion.div>

          <div className="impact-grid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="impact-card"
            >
              <div className="impact-card-header">
                <div className="impact-icon">🏆</div>
                <div className="impact-badge">Industry Recognition</div>
              </div>
              <h3 className="impact-title">Global Design Leadership</h3>
              <p className="impact-description">
                Featured in leading design publications and recognized for breakthrough innovations in AI-powered user experiences. 
                <br /><br />
                CoreAI positioned as featured solution in global marketing events including Cannes keynote by Arthur Sadoun.
              </p>
              <div className="impact-metrics">
                <div className="impact-metric">
                  <span className="metric-number">15+</span>
                  <span className="metric-label">Design Awards</span>
                </div>
                <div className="impact-metric">
                  <span className="metric-number">Global</span>
                  <span className="metric-label">Recognition</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="impact-card"
            >
              <div className="impact-card-header">
                <div className="impact-icon">💼</div>
                <div className="impact-badge">Enterprise Impact</div>
              </div>
              <h3 className="impact-title">Fortune 500 Transformation</h3>
              <p className="impact-description">
                Led creative UX initiatives for Fortune 500 companies including Novartis, PayPal, Kellanova, Coca-Cola, and Mars.
                <br /><br />
                Contributed to $15M+ qualified pipeline and established robust QA processes resolving 98+ issues.
              </p>
              <div className="impact-metrics">
                <div className="impact-metric">
                  <span className="metric-number">$15M+</span>
                  <span className="metric-label">Pipeline Impact</span>
                </div>
                <div className="impact-metric">
                  <span className="metric-number">98+</span>
                  <span className="metric-label">QA Resolved</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="impact-card"
            >
              <div className="impact-card-header">
                <div className="impact-icon">🚀</div>
                <div className="impact-badge">Innovation Leadership</div>
              </div>
              <h3 className="impact-title">Methodology & Framework</h3>
              <p className="impact-description">
                Pioneered new design methodologies and frameworks that have been adopted by teams across multiple industries.
                <br /><br />
                Built and scaled multi-brand design systems supporting global platforms for Wawa, Sunbelt Rentals, Aldi, and The Container Store.
              </p>
              <div className="impact-metrics">
                <div className="impact-metric">
                  <span className="metric-number">10+</span>
                  <span className="metric-label">Designers Mentored</span>
                </div>
                <div className="impact-metric">
                  <span className="metric-number">Multi-Brand</span>
                  <span className="metric-label">Systems Built</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Case Studies */}
      <section className="projects-section">
        <div className="container">
          {/* Reduced Floating Elements for Projects */}
          <div className="floating-elements">
            {floatingDots.slice(6, 8).map((dot) => (
              <motion.div
                key={`project-${dot.id}`}
                className="floating-dot"
                style={{
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                }}
                animate={{
                  y: [0, -12, 0],
                  x: [0, Math.random() * 2 - 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: dot.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: dot.delay
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <div className="section-badge section-badge-portfolio">
              <span>Creative Portfolio</span>
            </div>
            <h2 className="section-title">Enterprise Transformations</h2>
            <p className="section-subtitle">
              Where creative UX leadership meets measurable business outcomes. 
              <br />
              Each case study represents a fundamental shift in how enterprises approach digital innovation.
            </p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <Link key={project.id} to={`/projects/${project.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`project-card ${project.id === 'coreai' ? 'coreai-card' : ''}`}
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Perspectives */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <div className="section-badge section-badge-insights">
              <span>Executive Insights</span>
            </div>
            <h2 className="section-title">Leadership Perspectives</h2>
            <p className="section-subtitle">
              Direct feedback from C-suite executives on creative UX impact and business transformation
            </p>
          </motion.div>

          <div className="testimonials-container">
            <div className="testimonials-carousel-wrapper">
              <div 
                className="testimonials-carousel"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={`content-${currentTestimonial}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <motion.p className="testimonial-description">
                          {testimonials[currentTestimonial].content}
                        </motion.p>
                        
                        <motion.h3 className="testimonial-title">
                          {testimonials[currentTestimonial].name}
                        </motion.h3>
                        
                        <motion.p className="testimonial-role">
                          {testimonials[currentTestimonial].role}
                        </motion.p>
                      </motion.div>
                      </AnimatePresence>
                    
                    <div className="testimonial-indicators">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`testimonial-indicator ${index === currentTestimonial ? 'active' : ''}`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Chat Modal */}
      <PortfolioChatModal show={showChatModal} onHide={() => setShowChatModal(false)} />
      
      {/* Floating Action Button */}
      <motion.button
        ref={buttonRef}
        className="chat-fab"
        onClick={() => setShowChatModal(true)}
         initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-tooltip="Design Consultation"
        aria-label="Open AI design consultation"
      >
        <Zap size={24} />
      </motion.button>
    </div>
  );
};

export default Home; 
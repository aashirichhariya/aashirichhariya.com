import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Target, Zap, Award, Globe, Star, ChevronRight, Building2, Briefcase } from 'lucide-react';
import './CaseStudy.css';

const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects from Home page
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  // Mouse tracking from Home page
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const normalizedX = (e.clientX - rect.left) / rect.width;
      const normalizedY = (e.clientY - rect.top) / rect.height;
      setMousePosition(prev => ({
        x: prev.x + (normalizedX - prev.x) * 0.1,
        y: prev.y + (normalizedY - prev.y) * 0.1
      }));
    }
  }, []);

  useEffect(() => {
    let rafId: number;
    let lastTime = 0;
    const throttleMs = 30;
    
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
  
  // Add loaded class after component mounts for smooth animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate floating dots like Home page
  const generateFloatingDots = () => {
    const dots = [];
    for (let i = 0; i < 6; i++) {
      dots.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 2
      });
    }
    return dots;
  };

  const floatingDots = generateFloatingDots();

  const caseStudies = {
    coreai: {
      title: 'CoreAI',
      subtitle: 'Designing for an Agentic Future',
      category: 'AI Platform',
      company: 'Publicis Groupe',
      duration: 'May 2024 - Dec 2025',
      team: '50+ designers, 7+ teams',
      impact: '$100M+ new investment',
      description: 'As artificial intelligence shifts from static models to intelligent, autonomous agents, CoreAI set out to create a platform that empowers teams to build, customize, and run agentic workflows across industries. The v3 platform—codenamed Hudson—was a ground-up redesign built around modular agents that could reason, act, and collaborate. These agents weren\'t just tools—they were decision-makers with context, capable of driving real outcomes across domains like pharma, finance, and consumer goods.',
      challenge: 'In prior versions of CoreAI, building with AI was often too rigid for advanced customization, too complex for non-technical users, and lacking clear transparency into how agents reasoned and acted. The introduction of agentic workflows added a new layer of complexity—users weren\'t just calling models anymore; they were building intelligent systems that needed configuration, memory, tools, and oversight.',
      solution: 'We designed a flexible, agent-first platform that could support multiple types of users and workflows. I led the experience design across five key pillars: Block Container (Foundation of Everything), Build Mode (Workflow Creation Environment), Run Mode (Execution & Insights), Context Plane (Shared Memory & RAG), and ALX (Conversational User Interface). My goal was to unify these diverse surfaces into one seamless, flexible, and intuitive platform—whether you\'re building complex workflows or running a single-use task.',
      process: [
        '🔲 Block Container - Core building unit of the platform',
        '🔧 Build Mode - Drag-and-drop composition workflow creator',
        '▶️ Run Mode - Execution environment with insights',
        '🧠 Context Plane - Shared memory system with RAG',
        '💬 ALX - Conversational interface for natural interaction'
      ],
      technologies: ['Figma', 'FigJam', 'Mural', 'Jira', 'Confluence', 'MS Excel'],
      heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      outcomes: [
        'Helped secure $100M in new investment post-MVP',
        'Attracted $5M+ in new client business from enterprise sectors',
        'Enabled 7+ teams to ship on a shared design foundation',
        'Reduced time-to-workflow by over 40% for internal and external users',
        'Established CoreAI\'s reputation as a category-defining product in the agentic AI space'
      ],
      metrics: [
        { 
          label: 'Investment Secured', 
          value: '$100M+', 
          icon: Target
        },
        { 
          label: 'Client Business', 
          value: '$5M+', 
          icon: Globe
        },
        { 
          label: 'Teams Enabled', 
          value: '7+', 
          icon: Users
        },
        { 
          label: 'Workflow Efficiency', 
          value: '40%+', 
          icon: Award
        }
      ]
    },
    pollin: {
      title: 'Pollin Fertility',
      subtitle: 'AI-Enhanced Healthcare Platform',
      category: 'Health Tech',
      company: 'FH Health',
      duration: '8 months',
      team: '6 designers, 8 engineers',
      impact: 'Enhanced patient care outcomes',
      description: 'Led UX strategy and design for the Pollin Fertility App, translating sensitive clinical workflows into emotionally supportive, patient-centered digital experiences that prioritize both medical accuracy and human empathy.',
      challenge: 'Design a sensitive health application that balances medical accuracy with emotional support and user privacy while meeting clinical requirements and integrating with existing EMR systems.',
      solution: 'Developed and maintained a centralized design system and component library in Figma, enabling visual consistency and efficient scaling. Built strong working relationships with clinical, product, and engineering teams to ensure design solutions met both medical accuracy and brand tone.',
      process: [
        'Clinical Workflow Analysis & Patient Journey Mapping',
        'Centralized Design System & Component Library Development',
        'EMR Portal Design & Clinical Integration Strategy',
        'Cross-Functional Team Collaboration & Stakeholder Alignment',
        'Collaborative Creative Culture & Design Iteration'
      ],
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS', 'Healthcare APIs', 'EMR Integration', 'Figma'],
      heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      outcomes: [
        'Streamlined appointment scheduling, test tracking, and clinical reporting workflows',
        'Enhanced operational efficiency and patient care outcomes through intuitive design',
        'Developed centralized design system and component library for scalability',
        'Built strong relationships with clinical, product, and engineering teams',
        'Created emotionally supportive patient experiences that improved engagement'
      ],
      metrics: [
        { 
          label: 'Patient Engagement', 
          value: '85%+', 
          icon: Users
        },
        { 
          label: 'Clinical Efficiency', 
          value: '40%', 
          icon: Zap
        },
        { 
          label: 'Design System', 
          value: '100%', 
          icon: Award
        },
        { 
          label: 'EMR Integration', 
          value: 'Seamless', 
          icon: Globe
        }
      ]
    },
    hungerhub: {
      title: 'HungerHub',
      subtitle: 'AI-Driven Food Discovery Platform',
      category: 'Food Tech',
      company: 'HungerHub',
      duration: '7 months',
      team: '7 designers, 10 engineers',
      impact: '35% order increase',
      description: 'Executed UX and UI design for the restaurant partner dashboard and Uncatering B2B web experience, creating engaging mobile experiences with AI-powered personalization and seamless team coordination.',
      challenge: 'Design an app that simplifies food discovery while handling complex logistics and real-time updates across multiple user types including consumers, restaurant partners, and corporate clients.',
      solution: 'Implemented a location-aware interface with intelligent recommendations, seamless ordering, and real-time tracking that served both consumers and restaurant partners while optimizing operational workflows.',
      process: [
        'Multi-User Experience Design & Persona Development',
        'Restaurant Partner Dashboard & Operational Clarity',
        'Uncatering B2B Web Experience & Corporate Planning',
        'AI-Powered Discovery Algorithms & Personalization',
        'End-to-End Creative Project Management & Delivery'
      ],
      technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Stripe', 'AI/ML', 'Real-time Systems'],
      heroImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      outcomes: [
        'Drove 35% increase in order volume through optimized user experience',
        'Optimized restaurant partner dashboard operations and efficiency',
        'Created engaging mobile experiences for consumers with AI recommendations',
        'Delivered end-to-end creative projects aligned with business goals',
        'Established scalable platform supporting both B2B and B2C segments'
      ],
      metrics: [
        { 
          label: 'Order Volume', 
          value: '35%', 
          icon: Zap
        },
        { 
          label: 'User Experience', 
          value: 'Optimized', 
          icon: Award
        },
        { 
          label: 'Platform Users', 
          value: 'Multi-segment', 
          icon: Users
        },
        { 
          label: 'AI Integration', 
          value: 'Advanced', 
          icon: Star
        }
      ]
    },
    wawa: {
      title: 'Wawa Digital Platform',
      subtitle: 'Multi-Brand Design System',
      category: 'Retail Innovation',
      company: 'Publicis Sapient',
      duration: '12 months',
      team: '5 designers, 8 engineers',
      impact: 'Brand consistency across platforms',
      description: 'Built and scaled multi-brand design systems for Wawa\'s digital ecosystem including wawa.com, ordering website, and mobile app, ensuring brand consistency and efficient execution across teams.',
      challenge: 'Create a unified design system that maintains Wawa\'s brand identity while supporting multiple digital touchpoints including web, mobile, and ordering platforms with consistent user experiences.',
      solution: 'Developed a comprehensive design system with modular components, brand guidelines, and implementation standards that scaled across all Wawa digital properties while maintaining visual consistency and operational efficiency.',
      process: [
        'Brand Analysis & Digital Ecosystem Mapping',
        'Multi-Platform Design System Architecture',
        'Component Library Development & Documentation',
        'Cross-Platform Implementation & Quality Assurance',
        'Team Training & Design System Adoption'
      ],
      technologies: ['React', 'TypeScript', 'Figma', 'Design Systems', 'Brand Guidelines', 'Component Libraries'],
      heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      outcomes: [
        'Established unified brand experience across wawa.com, ordering website, and mobile app',
        'Improved design efficiency and consistency through centralized component library',
        'Reduced development time and maintained brand standards across all platforms',
        'Enhanced user experience consistency across multiple digital touchpoints',
        'Scaled design system to support future Wawa digital initiatives'
      ],
      metrics: [
        { 
          label: 'Platforms Supported', 
          value: '3+', 
          icon: Globe
        },
        { 
          label: 'Design Efficiency', 
          value: '60%', 
          icon: Zap
        },
        { 
          label: 'Brand Consistency', 
          value: '100%', 
          icon: Award
        },
        { 
          label: 'Component Library', 
          value: '200+', 
          icon: Star
        }
      ]
    }
  };

  const project = caseStudies[id as keyof typeof caseStudies];

  if (!project) {
    return (
      <div className="case-study-not-found">
        <div className="container">
          <h1>Case Study Not Found</h1>
          <Link to="/" className="back-link">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="case-study">
      {/* Hero Section with Home page patterns */}
      <section ref={heroRef} className={`case-study-hero ${isLoaded ? 'loaded' : ''}`}>
        {/* Enhanced Background Layers from Home page */}
        <motion.div
          style={{ 
            y: y1, 
            opacity,
            x: mousePosition.x * -10,
          }}
          className="hero-bg-1"
        />
        <motion.div
          style={{ 
            y: y2,
            x: mousePosition.x * 10,
          }}
          className="hero-bg-2"
        />
        <motion.div
          style={{ 
            y: mousePosition.y * -5,
            x: mousePosition.x * 5,
          }}
          className="hero-bg-3"
        />
        
        {/* Floating Elements from Home page */}
        <div className="floating-elements">
          {floatingDots.map((dot) => (
            <motion.div
              key={dot.id}
              className="floating-dot"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: `${dot.size * 3}px`,
                height: `${dot.size * 3}px`,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, dot.id % 2 === 0 ? 10 : -10, 0],
                scale: [1, dot.id % 3 === 0 ? 1.2 : 0.8, 1],
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
        
        {/* Mouse Gradient from Home page */}
        <motion.div 
          className="mouse-gradient"
          style={{ 
            left: `calc(${mousePosition.x * 100}% - 150px)`,
            top: `calc(${mousePosition.y * 100}% - 150px)`,
            scale: 1 + (Math.sin(Date.now() * 0.001) * 0.05),
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
        
        <div 
          className="hero-background"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        >
          <div className="hero-overlay">
            <div className="container">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="hero-content"
              >
                {/* Enhanced Back Button with Home page styling */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="back-button-container"
                >
                  <Link to="/" className="back-button-enhanced">
                    <div className="back-button-icon">
                      <ArrowLeft size={14} />
                    </div>
                    <span className="back-button-text">Back</span>
                  </Link>
                </motion.div>

                {/* Enhanced Company and Industry Display */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="project-meta"
                >
                  <div className="project-category-badge">
                    <Building2 size={14} />
                    <span>{project.category}</span>
                  </div>
                  <div className="project-company-badge">
                    <Briefcase size={14} />
                    <span>{project.company}</span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="project-title"
                >
                  {project.title}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="project-subtitle"
                >
                  {project.subtitle}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="case-study-content">
        <div className="container">
          <div className="content-grid">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="content-main"
            >
              <div className="project-overview">
                <h2>Project Overview</h2>
                <p>{project.description}</p>
              </div>

              <div className="project-challenge">
                <h2>The Challenge</h2>
                <p>{project.challenge}</p>
              </div>

              <div className="project-solution">
                <h2>The Solution</h2>
                <p>{project.solution}</p>
              </div>

              <div className="project-process">
                <h2>Process & Approach</h2>
                <ul>
                  {project.process.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="project-outcomes">
                <h2>Key Outcomes</h2>
                <ul>
                  {project.outcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="content-sidebar"
            >
              <div className="project-stats">
                <h3>Project Details</h3>
                <div className="stat-item">
                  <Calendar className="stat-icon" size={20} />
                  <div>
                    <div className="stat-label">Duration</div>
                    <div className="stat-value">{project.duration}</div>
                  </div>
                </div>
                <div className="stat-item">
                  <Users className="stat-icon" size={20} />
                  <div>
                    <div className="stat-label">Team</div>
                    <div className="stat-value">{project.team}</div>
                  </div>
                </div>
                <div className="stat-item">
                  <Target className="stat-icon" size={20} />
                  <div>
                    <div className="stat-label">Impact</div>
                    <div className="stat-value">{project.impact}</div>
                  </div>
                </div>
              </div>

              <div className="project-technologies">
                <h3>Technologies</h3>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Sophisticated Key Metrics */}
              <div className="project-metrics">
                <h3>Key Metrics</h3>
                <div className="metrics-grid">
                  {project.metrics.map((metric, index) => (
                    <motion.div 
                      key={index} 
                      className="metric-item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="metric-icon">
                        <metric.icon size={20} />
                      </div>
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-label">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy; 
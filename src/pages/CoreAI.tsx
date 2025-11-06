import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Award, Globe, Briefcase, Target } from 'lucide-react';
import './CaseStudy.css';
import './CoreAI.css';
import './StackedCards.css';
import CoverAI from '../CoverAI.png';
import blockContainer from '../block container.png';

const CoreAI: React.FC = () => {
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
      // Check if mouse is over the hero section only
      if (heroRef.current && e.target instanceof Node && heroRef.current.contains(e.target)) {
        const now = Date.now();
        if (now - lastTime > throttleMs) {
          lastTime = now;
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            handleMouseMove(e);
          });
        }
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

  // Custom styled component for each section
  const SectionHeader = ({ title }: { title: string }) => (
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="section-title"
    >
      {title}
    </motion.h2>
  );

  return (
    <div className="case-study">
      {/* Hero Section */}
      <section ref={heroRef} className={`case-study-hero ${isLoaded ? 'loaded' : ''}`}>
        {/* Enhanced Background Layers */}
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
        
        {/* Floating Elements */}
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
        
        {/* Mouse Gradient */}
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
          style={{ backgroundImage: `url(${CoverAI})` }}
        >
          <div className="hero-overlay">
            <div className="container">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="hero-content"
              >
                {/* Back Button */}
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

                {/* Company and Industry Display */}
                {/* Removed category and company badges from hero */}

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="project-title"
                >
                  CoreAI
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="project-subtitle project-tagline"
                >
                  Designing for an Agentic Future
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="case-study-content">
        <div className="container">
          {/* Project Overview Cards */}
          <div className="project-overview-cards">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="overview-card details-card"
            >
              <h3>Project Details</h3>
              <div className="details-grid">
                <div className="stat-item horizontal">
                  <Briefcase className="stat-icon" size={20} />
                  <div>
                    <div className="stat-label">Client</div>
                    <div className="stat-value">Publicis Groupe</div>
                    <div className="stat-description">Global leader transforming brands through innovative digital solutions.</div>
                  </div>
                </div>
                <div className="stat-item horizontal">
                  <Calendar className="stat-icon" size={20} />
                  <div>
                    <div className="stat-label">Duration</div>
                    <div className="stat-value">May 2024 - present</div>
                    <div className="stat-description">Continuous evolution through agile sprints and strategic iterations.</div>
                  </div>
                </div>
                <div className="stat-item horizontal">
                  <Users className="stat-icon" size={20} />
                  <div>
                    <div className="stat-label">Team</div>
                    <div className="stat-value">50+ creatives</div>
                    <div className="stat-description">Cross-functional excellence combining strategy, design, and engineering.</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="overview-card tools-card"
            >
              <h3>Tools</h3>
              <div className="tools-grid">
                <div 
                  className="tool-item tool-figma"
                  data-tooltip="Industry-leading design platform that dramatically improved our collaboration."
                >
                  Figma
                </div>
                <div 
                  className="tool-item tool-figjam"
                  data-tooltip="Revolutionized our brainstorming sessions with seamless Figma integration."
                >
                  FigJam
                </div>
                <div 
                  className="tool-item tool-jira"
                  data-tooltip="Streamlined our workflow tracking with unparalleled integration capabilities."
                >
                  Jira
                </div>
                <div 
                  className="tool-item tool-confluence"
                  data-tooltip="Centralized knowledge base that eliminated documentation silos."
                >
                  Confluence
                </div>
                <div 
                  className="tool-item tool-mural"
                  data-tooltip="Transformed our remote workshops with superior canvas flexibility."
                >
                  Mural
                </div>
                <div 
                  className="tool-item tool-excel"
                  data-tooltip="Still unmatched for data analysis and financial modeling despite newer alternatives."
                >
                  Excel
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="overview-card metrics-card"
            >
              <h3>Key Metrics</h3>
              <div className="metrics-grid horizontal">
                <div className="metric-item horizontal">
                  <div className="metric-icon">
                    <Target size={20} />
                  </div>
                  <div>
                    <div className="metric-value">$100M+</div>
                    <div className="metric-label">Investment</div>
                  </div>
                </div>
                
                <div className="metric-item horizontal">
                  <div className="metric-icon">
                    <Globe size={20} />
                  </div>
                  <div>
                    <div className="metric-value">$5M+</div>
                    <div className="metric-label">Client Business</div>
                  </div>
                </div>
                
                <div className="metric-item horizontal">
                  <div className="metric-icon">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="metric-value">7+</div>
                    <div className="metric-label">Teams</div>
                  </div>
                </div>
                
                <div className="metric-item horizontal">
                  <div className="metric-icon">
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="metric-value">40%+</div>
                    <div className="metric-label">Workflow Efficiency</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Featured Image */}
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="featured-image-container"
            >
              <img 
                src="https://i.imgur.com/NhAFJkw.jpg" 
                alt="CoreAI Interface Showcase" 
                className="featured-image"
              />
            </motion.div>
          
          {/* Main Content */}
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="content-no-card"
            >
              <div className="project-overview">
                <SectionHeader title="Introduction" />
                <p>As artificial intelligence shifts from static models to intelligent, autonomous agents, CoreAI set out to create a platform that empowers teams to build, customize, and run agentic workflows across industries.</p>
                
                <p>The v3 platform (codenamed Hudson) was a ground up redesign built around modular agents that could reason, act, and collaborate. These agents weren't just tools; they were decision makers with context, capable of driving real outcomes across domains like pharma, finance, and consumer goods.</p>
                
                <p>As Design Lead for the App Framework, I was responsible for designing CoreAI's foundational experiences:</p>
                <ul>
                  <li>The block container, the modular unit that powers every workflow</li>
                  <li>The Build Mode where teams create, test, and configure agentic workflows</li>
                  <li>The Run Mode where end users execute those workflows and see intelligent results</li>
                  <li>The Context Plane, a shared memory system powering contextual understanding</li>
                  <li>The ALX conversational UI (CUI), a chat interface that collects inputs, configures agents, and gathers insights in real time</li>
                </ul>
                
                <p>My goal was to unify these diverse surfaces into one seamless, flexible, and intuitive platform whether you're building complex workflows or running a single use task.</p>
              </div>

              <div className="project-challenge">
                <SectionHeader title="The Problem" />
                <p>In prior versions of CoreAI, building with AI was often:</p>
                <ul>
                  <li>Too rigid for advanced customization</li>
                  <li>Too complex for non-technical users</li>
                  <li>Lacking clear transparency into how agents reasoned and acted</li>
                </ul>
                
                <p>The introduction of agentic workflows added a new layer of complexity. Users weren't just calling models anymore; they were building intelligent systems that needed configuration, memory, tools, and oversight.</p>
                
                <div style={{ marginTop: "72px" }}>
                  <SectionHeader title="Key Challenges" />
                </div>
                <ul>
                  <li>Designing an approachable, modular system for building agent workflows</li>
                  <li>Ensuring clarity across multiple modes of interaction: visual and conversational</li>
                  <li>Creating a cohesive design system across 7+ teams and 50+ designers</li>
                  <li>Supporting data-rich, stateful, and asynchronous workflows without overwhelming the user</li>
                </ul>
              </div>

              <div className="project-solution">
                <SectionHeader title="The Solution" />
                <p>We designed a flexible, agent-first platform that could support multiple types of users and workflows.</p>
                <div className="key-pillars">
                  <div className="pillar-section">
                    <h4 className="pillar-title">Block Container</h4>
                    <div className="pillar-content">
                      <p>The block container is the core building unit of the entire CoreAI platform. Every agent, task, and tool is encapsulated inside a block—making it the visual and functional foundation of workflows.</p>
                      <p>I led the design of the block container system, which included:</p>
                      <ul>
                        <li>Consistent structure across input, processing, and output types</li>
                        <li>Support for agent configuration, task selection, and state handling</li>
                        <li>Clear affordances for connecting blocks in a visual workflow</li>
                        <li>Modular layout for expanding tools, nested logic, and context access</li>
                        <li>Integrated feedback (loading, error, success, tool status)</li>
                      </ul>
                      <p>The <a href="https://www.figma.com/design/s431WSi5rc1d7NL87v8EKf/Aashi-s-Drafts-2?node-id=67-21122&t=DioSJ2yfShOa6frA-1" target="_blank" rel="noopener noreferrer" className="figma-link">block container</a> had to support both novice users and advanced developers—serving as a scalable UI model for the entire platform.</p>
                    </div>
                    <img src={blockContainer} alt="Block Container Interface" className="full-width-image" />
                    <p className="image-caption">Block container component and documentation</p>
                  </div>
                  
                  <div className="pillar-section">
                    <h4 className="pillar-title">Build Mode</h4>
                    <div className="pillar-content">
                      <p>Build Mode is where creators and admins configure their agents and connect them into complete workflows. Think of it as a no code development environment for intelligent systems.</p>
                      <p>I designed this experience to prioritize:</p>
                      <ul>
                        <li>Drag-and-drop composition of agentic blocks</li>
                        <li>Seamless integration with the block container system</li>
                        <li>Modular configuration panels for agent settings, toolkits, and instructions</li>
                        <li>Workflow level access to the Context Plane for grounding reasoning</li>
                        <li>Visual cues for task types, execution paths, and dependencies</li>
                        <li>Testing and simulation capabilities within the editor</li>
                      </ul>
                      <p>We ensured <a href="https://www.figma.com/design/s431WSi5rc1d7NL87v8EKf/CoreAI-Project-Files?node-id=138-39409&t=WDgHQXrbbjhFu5ps-1" target="_blank" rel="noopener noreferrer" className="figma-link">Build Mode</a> empowered creators without overwhelming them by balancing transparency with control.</p>
                    </div>
                  </div>
                  
                  <div className="pillar-section">
                    <h4 className="pillar-title">Run Mode</h4>
                    <div className="pillar-content">
                      <p>Run Mode is where workflows are triggered by end users to generate intelligent outputs. Here, the focus shifts from creation to execution, delivering a clean, minimal experience.</p>
                      <p>I led the design of:</p>
                      <ul>
                        <li>Templated views tailored to each workflow type (e.g., summarization, Q&A, content generation)</li>
                        <li>Inline customization of inputs without needing to return to Build Mode</li>
                        <li>Real-time feedback from the agent execution engine</li>
                        <li>Expandable insights panel to show reasoning paths, context sources, and tool actions</li>
                        <li>Integration with ALX for hybrid CUI + GUI interactions</li>
                      </ul>
                      <p>This was the interface most clients touched daily, so clarity, speed, and confidence were key.</p>
                    </div>
                    <video className="full-width-image" controls>
                      <source src="/Working prototype.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  <div className="pillar-section">
                    <h4 className="pillar-title">Context Plane: Shared Memory & RAG</h4>
                    <div className="pillar-content">
                      <p>Agentic workflows require more than just input—they need access to relevant context to reason well.</p>
                      <p>I led the design of the Context Plane UI, which allows users to:</p>
                      <ul>
                        <li>Upload documents, databases, and structured data sources</li>
                        <li>View, edit, and manage contextual knowledge tied to a workflow</li>
                        <li>Inspect what an agent "sees" when making decisions</li>
                        <li>Ensure safe, predictable Retrieval-Augmented Generation (RAG)</li>
                        <li>Handle fallback states and error messaging for missing or malformed context</li>
                      </ul>
                      <p><a href="https://www.figma.com/design/s431WSi5rc1d7NL87v8EKf/CoreAI-Project-Files?node-id=63872-189725&t=WDgHQXrbbjhFu5ps-1" target="_blank" rel="noopener noreferrer" className="figma-link">Context Plane</a> was designed for both builders and operators so we made the system transparent, with clear flows for adding, validating, and inspecting context.</p>
                    </div>
                    {/* Removed image placeholder as requested */}
                  </div>
                  
                  <div className="pillar-section">
                    <h4 className="pillar-title">ALX: Conversational User Interface (CUI)</h4>
                    <div className="pillar-content">
                      <p>Not all users interact via visual workflows; many prefer natural language. ALX is our conversational UI layer, designed to:</p>
                      <ul>
                        <li>Guide users through configuring and triggering workflows</li>
                        <li>Collect user inputs, documents, and parameters via conversation</li>
                        <li>Request additional information dynamically (e.g., clarification questions)</li>
                        <li>Provide summaries, suggestions, or next steps in plain language</li>
                        <li>Surface reasoning paths, tool usage, and context access in a transparent way</li>
                      </ul>
                      <p>I designed ALX to balance familiar chat interactions with the depth of agentic reasoning happening behind the scenes. This included:</p>
                      <ul>
                        <li>Structured message components (e.g. form fields, cards, buttons) for hybrid input</li>
                        <li>Dynamic prompt construction based on workflow requirements</li>
                        <li>Smart fallback flows for errors, ambiguity, or missing data</li>
                        <li>Reuse of block-level metadata to ensure consistency between GUI and CUI modes</li>
                      </ul>
                      <p><a href="https://www.figma.com/design/s431WSi5rc1d7NL87v8EKf/CoreAI-Project-Files?node-id=63874-19075&t=YCDOsOuFE3vKvGSE-1" target="_blank" rel="noopener noreferrer" className="figma-link">ALX chat user interface</a> became the human facing layer of the agentic platform, helping users interact with complex AI systems in a natural, conversational way.</p>
                    </div>
                    {/* Removed image placeholder as requested */}
                  </div>
                </div>
              </div>

              <div className="project-research">
                <SectionHeader title="Research and Insights" />
                <p>Our research process spanned stakeholders, industries, and interface modalities:</p>
                <ul>
                  <li>Discovery interviews with pharma, CPG, and finance users</li>
                  <li>Internal testing of early Build/Run Mode prototypes</li>
                  <li>Context mapping for RAG flows and knowledge injection</li>
                  <li>Chat usability testing for ALX prototypes</li>
                  <li>Workflow complexity analysis across agents and tools</li>
                </ul>

                <p><strong>Key insights:</strong></p>
                <ul>
                  <li>Users wanted to understand how decisions were made, not just get results</li>
                  <li>CUI was useful but needed to be predictable and grounded</li>
                  <li>Modularity was essential for both UX and dev teams working in parallel</li>
                  <li>Transparency and feedback were non-negotiable in high-stakes domains</li>
                </ul>
              </div>

              <div className="project-designs">
                <SectionHeader title="Final Deliverables" />
                <p>Together, these systems delivered:</p>
                <ul>
                  <li>A modular workflow builder grounded in agent logic</li>
                  <li>Block containers that scaled across hundreds of use cases</li>
                  <li>A flexible Run Mode that respected vertical-specific needs</li>
                  <li>A powerful Context Plane for grounding AI in real data</li>
                  <li>A natural, intuitive ALX chat interface for conversational interaction</li>
                </ul>
                <p>All built on a shared design system and component library, enabling rapid development and consistent experiences across the entire platform.</p>
                
                {/* Full-width auto-play carousel */}
                <div className="carousel-container">
                  <div className="carousel-track" style={{ 
                    display: 'flex',
                    width: '400%' // 4 slides * 100%
                  }}>
                    <div className="carousel-slide" style={{ width: '100%', minHeight: '500px', margin: '40px 20px', overflow: 'hidden', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                      <img src="/2.png" alt="CoreAI Interface 2" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                    </div>
                    <div className="carousel-slide" style={{ width: '100%', minHeight: '500px', margin: '40px 20px', overflow: 'hidden', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                      <img src="/3.png" alt="CoreAI Interface 3" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                    </div>
                    <div className="carousel-slide" style={{ width: '100%', minHeight: '500px', margin: '40px 20px', overflow: 'hidden', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                      <img src="/4.png?v=new" alt="CoreAI Interface 4" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                    </div>
                    <div className="carousel-slide" style={{ width: '100%', minHeight: '500px', margin: '40px 20px', overflow: 'hidden', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                      <img src="/5.png" alt="CoreAI Interface 5" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-accessibility">
                <SectionHeader title="Accessibility and Inclusivity" />
                <p>We made intentional choices to design for broad accessibility:</p>
                <ul>
                  <li>Keyboard-friendly navigation in blocks and canvas</li>
                  <li>WCAG-compliant contrast and focus states</li>
                  <li>Screen reader support for configuration and execution flows</li>
                  <li>Simplified conversational flows in ALX for non-technical users</li>
                  <li>Error-resilient interactions across all UI modes</li>
                </ul>
                <p>We also considered varying AI literacy levels, building guidance and fallback mechanisms into both GUI and CUI interfaces.</p>
              </div>

              <div className="project-leadership">
                <SectionHeader title="Team Leadership & Mentorship" />
                <p>As the CoreAI platform scaled across teams and clients, I recognized that great systems aren't just well designed; they're sustainable, shareable, and teachable.</p>
                
                <p>I led cross functional initiatives that helped stabilize a v1 launch timeline, align 50+ designers on shared standards, and reduce engineering ambiguity through clear QA practices. My leadership on the Block Container system and Build Mode UX wasn't just about polish; it enabled our teams to ship faster and scale smarter across strategic accounts like Novartis, Eli Lilly, PayPal, and TCCC.</p>
                
                <p>I also invested in building the systems around the work:</p>
                <ul>
                  <li>Created documentation that designers and engineers could grow within</li>
                  <li>Defined component standards in collaboration with the design systems team</li>
                  <li>Mentored peers through design logic, not just outputs</li>
                  <li>Fostered a culture of calm, clarity, and cross-disciplinary collaboration</li>
                </ul>
                
                <p>Leadership, for me, isn't about claiming credit. It's about making space for better ideas, quieter voices, and more thoughtful execution. And it's about holding high standards while multiplying the talent around you.</p>
              </div>

              <div className="project-outcomes">
                <SectionHeader title="Outcomes and Reflections" />
                <p>The CoreAI v3 platform set a new standard for agentic design. Outcomes included:</p>
                <ul>
                  <li>Helped secure $100M in new investment post-MVP</li>
                  <li>Attracted $5M+ in new client business from enterprise sectors</li>
                  <li>Enabled 7+ teams to ship on a shared design foundation</li>
                  <li>Reduced time-to-workflow by over 40% for internal and external users</li>
                  <li>Established CoreAI's reputation as a category-defining product in the agentic AI space</li>
                </ul>
                
                <p>The block container system, Build/Run Modes, Context Plane, and ALX interface now serve as the blueprint for how we build agentic systems at scale with clarity, flexibility, and trust.</p>
              </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CoreAI;
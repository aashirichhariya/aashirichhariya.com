import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Projects.css';

const Projects: React.FC = () => {
  const caseStudies = [
    {
      id: 'coreai',
      title: 'CoreAI',
      subtitle: 'Enterprise AI Transformation Platform',
      category: 'AI Platform',
      description: 'Provided strategic and creative leadership for Publicis Groupe\'s flagship AI transformation platform, delivering Tier 1 enterprise experiences for Novartis, PayPal, Kellanova, Coca-Cola, and Mars.',
      technologies: ['React', 'TypeScript', 'Framer Motion', 'Three.js', 'Design Systems', 'Enterprise UX'],
      heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 'pollin',
      title: 'Pollin Fertility',
      subtitle: 'AI-Enhanced Healthcare Platform',
      category: 'Health Tech',
      description: 'Led UX strategy and design for the Pollin Fertility App, translating sensitive clinical workflows into emotionally supportive, patient-centered digital experiences with EMR portal integration.',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS', 'Healthcare APIs', 'EMR Integration', 'Figma'],
      heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 'hungerhub',
      title: 'HungerHub',
      subtitle: 'AI-Driven Food Discovery Platform',
      category: 'Food Tech',
      description: 'Executed UX/UI design for restaurant partner dashboard and Uncatering B2B web experience, creating engaging mobile experiences with AI-powered personalization.',
      technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Stripe', 'AI/ML', 'Real-time Systems'],
      heroImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 'wawa',
      title: 'Wawa Digital Platform',
      subtitle: 'Multi-Brand Design System',
      category: 'Retail Innovation',
      description: 'Built and scaled multi-brand design systems for Wawa\'s digital ecosystem including wawa.com, ordering website, and mobile app, ensuring brand consistency and efficient execution.',
      technologies: ['React', 'TypeScript', 'Figma', 'Design Systems', 'Brand Guidelines', 'Component Libraries'],
      heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ];

  return (
    <div className="projects">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1 className="hero-title">Case Studies</h1>
            <p className="hero-subtitle">
              Creative UX leadership solutions that leverage AI to transform business outcomes and user experiences across enterprise, healthcare, and B2B platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="case-studies">
        <div className="container">
          <div className="case-studies-list">
            {caseStudies.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="case-study-item"
              >
                <Link to={`/projects/${project.id}`} className="case-study-link">
                  {/* Hero Image */}
                  <div className="case-study-hero">
                    <div 
                      className="hero-image"
                      style={{ backgroundImage: `url(${project.heroImage})` }}
                    >
                      <div className="hero-overlay">
                        <div className="hero-content">
                          <div className="project-category">{project.category}</div>
                          <h2 className="project-title">{project.title}</h2>
                          <p className="project-subtitle">{project.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="case-study-details">
                    <div className="details-content">
                      {/* Project Description */}
                      <div className="project-description">
                        <p>{project.description}</p>
                      </div>

                      {/* Technologies */}
                      <div className="technologies">
                        <div className="tech-tags">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects; 
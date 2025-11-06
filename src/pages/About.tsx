import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Github, MapPin, Calendar, Users, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './About.css';

const About: React.FC = () => {
  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Mail, href: 'mailto:hello@portfolio.com', label: 'Email' },
  ];

  const skills = [
    'Figma', 'Sketch', 'Adobe Creative Suite', 'Miro', 'UserTesting',
    'Design Thinking', 'Systems Thinking', 'Accessibility Standards', 'A/B Testing',
    'Agentic AI UX', 'Design Systems for AI Products', 'Scalable Product Strategy',
    'Jira', 'Confluence', 'Agile', 'SCRUM', 'QA Documentation'
  ];

  const caseStudies = [
    {
      id: 'coreai',
      title: 'CoreAI Platform',
      company: 'Publicis Sapient',
      description: 'Revolutionary AI transformation platform delivering Tier 1 enterprise experiences for Fortune 500 clients including Novartis, PayPal, Kellanova, Coca-Cola, and Mars.',
      impact: '$15M+ qualified pipeline',
      category: 'AI Platform',
      image: '/api/placeholder/400/300'
    },
    {
      id: 'pollin',
      title: 'Pollin Fertility App',
      company: 'FH Health',
      description: 'Comprehensive fertility tracking platform translating sensitive clinical workflows into emotionally supportive, patient-centered digital experiences.',
      impact: 'Enhanced patient care outcomes',
      category: 'Health Tech',
      image: '/api/placeholder/400/300'
    },
    {
      id: 'hungerhub',
      title: 'Hungerhub Platform',
      company: 'Hungerhub',
      description: 'Smart food delivery and restaurant discovery app with B2B corporate meal planning, real-time order tracking, and seamless team coordination.',
      impact: 'Optimized operational workflows',
      category: 'Food Tech',
      image: '/api/placeholder/400/300'
    },
    {
      id: 'wawa',
      title: 'Wawa Digital Experience',
      company: 'Wawa',
      description: 'Comprehensive digital ordering system including website and mobile app, streamlining the customer journey from discovery to fulfillment.',
      impact: 'Enhanced customer experience',
      category: 'Retail Tech',
      image: '/api/placeholder/400/300'
    }
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1 className="hero-title">About Me</h1>
            <p className="hero-subtitle">
              Creative UX leader with 5+ years of experience designing human-centered, AI-powered platforms across enterprise, healthcare, and B2B domains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            {/* Personal Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="about-story"
            >
              <h2 className="section-title">Crafting Digital Excellence</h2>
              <div className="story-content">
                <p>
                  Combines strategic thinking with high-caliber visual execution to shape intuitive, emotionally resonant user experiences. Proven ability to develop and scale design systems, lead cross-functional teams, and execute Tier 1 creative initiatives from concept to launch.
                </p>
                <p>
                  Trusted partner to clients and stakeholders, translating complex business needs into compelling digital solutions. When I'm not designing, you'll find me exploring new technologies, mentoring emerging designers, or sharing insights about the future of digital experiences.
                </p>
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h3 className="social-title">Connect With Me</h3>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <social.icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Profile Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="profile-section"
            >
              <div className="profile-card">
                <div className="profile-avatar">👨‍🎨</div>
                <h3 className="profile-title">Product Lead</h3>
                <p className="profile-subtitle">5+ years of experience in product design</p>
                
                <div className="profile-stats">
                  <div className="stat-item">
                    <Calendar size={20} />
                    <span>5+ Years</span>
                  </div>
                  <div className="stat-item">
                    <Users size={20} />
                    <span>10+ Teams</span>
                  </div>
                  <div className="stat-item">
                    <Award size={20} />
                    <span>15+ Projects</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Technical Skills</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="skills-grid"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="skill-item"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="case-studies-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Featured Case Studies</h2>
            <p className="section-subtitle">
              A showcase of transformative projects that demonstrate strategic thinking and measurable business impact
            </p>
          </motion.div>

          <div className="case-studies-grid">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="case-study-card"
              >
                <div className="case-study-image">
                  <div className="case-study-content">
                    <div className="case-study-category">{study.category}</div>
                    <h3 className="case-study-title">{study.title}</h3>
                    <div className="case-study-company">{study.company}</div>
                    <p className="case-study-description">{study.description}</p>
                    <div className="case-study-impact">
                      <strong>Impact:</strong> {study.impact}
                    </div>
                    <Link
                      to={`/projects/${study.id}`}
                      className="case-study-link"
                    >
                      View Full Case Study
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 
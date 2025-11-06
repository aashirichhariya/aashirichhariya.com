import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, Send } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Mail, href: 'mailto:hello@portfolio.com', label: 'Email' },
  ];

  // Generate floating dots for footer
  const generateFooterDots = () => {
    const dots = [];
    for (let i = 0; i < 6; i++) {
      dots.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
        duration: Math.random() * 4 + 4
      });
    }
    return dots;
  };

  const footerDots = generateFooterDots();

  return (
    <footer className="footer">
      {/* Floating elements for footer */}
      <div className="footer-floating-elements">
        {footerDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="footer-floating-dot"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
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
      
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="footer-brand"
          >
            <h3 className="footer-logo">Aashi</h3>
            <p className="footer-description">
              Transforming enterprise landscapes through strategic design thinking and innovative digital solutions. 
              <br />
              Leading the future of human-centered AI experiences.
            </p>
            
            {/* Social Links */}
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
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="footer-contact"
          >
            <h4 className="contact-title">Start a Conversation</h4>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="form-textarea"
                  placeholder="Describe your project vision and goals..."
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="submit-btn"
              >
                Send Inquiry
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="footer-bottom"
        >
          <p className="copyright">
            © 2024 Aashi. All rights reserved.
          </p>
          <p className="made-with">
            Designed with purpose, engineered for impact
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 
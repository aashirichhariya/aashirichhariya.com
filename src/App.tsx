import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import CoreAI from './pages/CoreAI';
import './App.css';

// ScrollToTop component to ensure pages start at the top
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Force scroll to top on route change and page refresh
    window.scrollTo(0, 0);
    
    // Also handle page refresh specifically
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);
  
  return null;
}

// Main App component with routes
function AppContent() {
  const location = useLocation();
  
  return (
    <div className="App bg-black text-white min-h-screen">
      <ScrollToTop />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<CaseStudy />} />
            <Route path="/projects/coreai" element={<CoreAI />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

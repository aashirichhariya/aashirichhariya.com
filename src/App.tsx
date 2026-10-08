import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Chrome from './components/Chrome';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import PlatePage from './pages/PlatePage';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

import './styles/monograph.css';
import './styles/react.css';

const ScrollReset: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
};

const App: React.FC = () => (
  <Router>
    <ScrollReset />
    <Chrome />
    <main id="top">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:id" element={<PlatePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;

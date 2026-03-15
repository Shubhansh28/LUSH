import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    // Scroll to top on refresh
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomCursor />

      {loading && <PageLoader onComplete={() => setLoading(false)} />}

      <Header onMenuClick={() => setNavOpen(true)} />
      <Navbar isOpen={navOpen} onClose={() => setNavOpen(false)} />

      <main className="bg-white min-h-screen">
        <Hero onExploreClick={() => setNavOpen(true)} />
        <About />
        <Projects />
        <Footer />
      </main>
    </>
  );
}

export default App;

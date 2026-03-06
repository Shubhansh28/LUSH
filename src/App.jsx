import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on refresh
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && <PageLoader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <main className="bg-lush-dark min-h-screen">
        <Hero />
        <About />
        <Projects />
        <Footer />
      </main>
    </>
  );
}

export default App;

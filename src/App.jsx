import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ArchitecturePage from './components/ArchitecturePage';
import ProjectDetailsPage from './components/ProjectDetailsPage';
import InteriorPage from './components/InteriorPage';
import LandscapePage from './components/LandscapePage';
import ManagementPage from './components/ManagementPage';
import CompletedProjectsPage from './components/CompletedProjectsPage';
import AboutPage from './components/AboutPage';
import ProjectInquiryForm from './components/ProjectInquiryForm';
import ContactPage from './components/ContactPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <CustomCursor />

      {loading && <PageLoader onComplete={() => setLoading(false)} />}

      <Header 
        onStartProject={() => setIsInquiryModalOpen(true)}
      />

      <ProjectInquiryForm 
        isOpen={isInquiryModalOpen} 
        onClose={() => setIsInquiryModalOpen(false)} 
      />

      <main className="bg-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/architecture/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/completed-projects" element={<CompletedProjectsPage />} />
          <Route path="/interior" element={<InteriorPage />} />
          <Route path="/landscape" element={<LandscapePage />} />
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer onStartProject={() => setIsInquiryModalOpen(true)} />
      </main>
    </>
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

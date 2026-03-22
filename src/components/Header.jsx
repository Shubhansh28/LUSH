import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Completed Projects', href: '/completed-projects' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

const Header = ({ onStartProject }) => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setScrolled(latest > 50);
        });
    }, [scrollY]);

    // Animate background opacity based on scroll
    const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
    const borderColorOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

    return (
        <motion.header
            className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
            style={{
                backgroundColor: `rgba(255, 255, 255, ${bgOpacity.get()})`,
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: `1px solid rgba(0, 0, 0, ${borderColorOpacity.get()})`,
                pointerEvents: 'auto'
            }}
        >
            <div className="relative flex items-center justify-center px-4 sm:px-6 md:px-12 py-4 md:py-6">
                {/* Logo Area - Absolute positioned to the extreme left */}
                <div className="absolute left-2 sm:left-4 md:left-6 flex items-center top-2 md:top-4 z-[60]">
                    <Link to="/" className="block">
                        <img
                            src="/lush-new-logo.png"
                            alt="LUSH Logo"
                            className="h-12 md:h-16 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Navigation Links - Centered */}
                <nav className="flex items-center gap-4 md:gap-8 lg:gap-12">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.href}
                            className="relative py-2 text-[10px] sm:text-[11px] md:text-[13px] font-inter font-light uppercase tracking-[0.1em] md:tracking-[0.2em] text-lush-dark/60 hover:text-lush-dark transition-colors duration-300 group"
                        >
                            {item.label}
                            {/* Animated underline */}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-lush-red group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                        </Link>
                    ))}
                </nav>

                {/* Right side CTA */}
                <div className="absolute right-4 sm:right-6 md:right-12 hidden lg:flex items-center">
                    <button 
                        onClick={onStartProject}
                        className="px-6 py-2 border border-lush-dark text-[10px] uppercase tracking-widest font-bold hover:bg-lush-dark hover:text-white transition-all duration-300"
                    >
                        Start a Project
                    </button>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;

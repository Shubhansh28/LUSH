import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Completed Projects', href: '/completed-projects' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/#contact' },
];

const Header = () => {
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
                {/* Logo Area - Absolute positioned to the left */}
                <div className="absolute left-4 sm:left-6 md:left-12 flex items-center">
                    <Link to="/">
                        <img
                            src="/lush-logo.png?v=2"
                            alt="LUSH Logo"
                            className="h-8 md:h-10 w-auto"
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
            </div>
        </motion.header>
    );
};

export default Header;

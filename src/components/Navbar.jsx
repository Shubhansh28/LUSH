import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { label: 'Architecture', href: '#architecture' },
    { label: 'Interior', href: '#interior' },
    { label: 'Landscape Design', href: '#landscape' },
    { label: 'Project Management', href: '#management' },
];

const Navbar = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.nav
                    initial={{ y: '-100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{
                        duration: 0.7,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    className="fixed top-0 left-0 w-full z-[100]"
                >
                    {/* Glassmorphism background */}
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl border-b border-lush-dark/5" />

                    <div className="relative flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex items-center"
                        >
                            <img
                                src="/lush-logo.png?v=2"
                                alt="LUSH Living"
                                className="h-8 sm:h-10 md:h-12 w-auto"
                            />
                        </motion.div>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.35 + index * 0.08,
                                        duration: 0.5,
                                        ease: [0.76, 0, 0.24, 1],
                                    }}
                                    className="nav-link relative px-5 py-2 text-[13px] font-inter font-light uppercase tracking-[0.2em] text-lush-dark/60 hover:text-lush-dark transition-colors duration-300 group"
                                >
                                    {item.label}
                                    {/* Animated underline */}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-lush-red group-hover:w-3/4 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            onClick={onClose}
                            className="ml-4 sm:ml-6 w-12 h-12 flex items-center justify-center rounded-full border border-lush-dark/20 hover:border-lush-red/50 hover:bg-lush-red/10 transition-all duration-300 group"
                            aria-label="Close navigation"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                className="text-lush-dark/50 group-hover:text-lush-dark transition-colors duration-300"
                            >
                                <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </motion.button>
                    </div>

                    {/* Mobile Nav Links - full-width vertical stack */}
                    <div className="relative md:hidden flex flex-col items-center gap-1 px-4 pb-6">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                initial={{ opacity: 0, y: -15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.35 + index * 0.08,
                                    duration: 0.5,
                                    ease: [0.76, 0, 0.24, 1],
                                }}
                                className="w-full text-center py-3 text-sm font-inter font-light uppercase tracking-[0.15em] text-lush-dark/60 hover:text-lush-dark transition-colors duration-300 border-b border-lush-dark/5 last:border-b-0"
                            >
                                {item.label}
                            </motion.a>
                        ))}
                    </div>

                    {/* Subtle bottom glow line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="relative h-[1px] bg-gradient-to-r from-transparent via-lush-red/50 to-transparent origin-center"
                    />
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
